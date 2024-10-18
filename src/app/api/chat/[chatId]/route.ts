import { StreamingTextResponse } from "ai";
import { LangChainStream } from "ai";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CallbackManager } from "langchain/callbacks";
import { NextResponse } from "next/server";
import { Replicate, ReplicateInput } from "langchain/llms/replicate";

import MemoryManager from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";
import { userInfo } from "os";


export async function POST(request:Request, {params}:{params:{chatId: string}}){
    try{
        const {prompt} = await request.json();
        const user = await currentUser()

        if(!user || !user.firstName || !user.id)
        {
            return new NextResponse('unauthorised', {status: 401});
        }

        //rate limiting
        const identifier = request.url + "-" + user.id;
        const {success} = await rateLimit(identifier)

        if(!success)
        {
            return new NextResponse('rate limit exceeded', {status:429});
        }


        const companion = await prismadb.companion.update({
            where:{
                id: params.chatId,
                
            },
            data:{
                messages:{
                    create:{
                        content: prompt,
                        role: 'user',
                        userId: user.id
                    }
                }
            }
        });

        if(!companion)
        {
            return new NextResponse('companion not found', {status:404});
        }


        const name = companion.id;
        const companion_file_name = name+'.txt';

        const companionKey = {
            companionName : name,
            userId : user.id,
            modelName: 'llama2-13b'
        }


        const memoryManager = await MemoryManager.getInstance();

        const records = await memoryManager.readLatestHistory(companionKey);
        if(records.length === 0)
        {
            await memoryManager.seedChatHistory(companion.seed, '\n\n', companionKey);
        }

        await memoryManager.writeToHistory("User: "+prompt+'\n',companionKey);

        const recentChatHistory  = await memoryManager.readLatestHistory(companionKey);

        const similarDocs = await memoryManager.vectorSearch(recentChatHistory,companion_file_name);

        let relevantHistory = "";

        if(!!similarDocs && similarDocs.length !==0)
        {
            relevantHistory = similarDocs.map((doc)=>doc.pageContent).join('\n');
        }

        const { stream, handlers } = LangChainStream();

        const model = new Replicate({
        model: "a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
        input: {
            max_length: 2048,
        },
        apiKey: process.env.REPLICATE_API_TOKEN,
        callbackManager: CallbackManager.fromHandlers(handlers),
        });

        model.verbose = true;

        const resp = String(
            await model
            .call(
        `
        ONLY generate NO more than three sentences as ${companion.name}. DO NOT generate more than three sentences. 
        Make sure the output you generate starts with '${companion.name}:' and ends with a period.

       ${companion.instructions}

       Below are relevant details about ${companion.name}'s past and the conversation you are in.
       ${relevantHistory}


            ${recentChatHistory}\n${companion.name}:`
            )
      .catch(console.error)
        );


        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n");
        const response = chunks[0];

        await memoryManager.writeToHistory("" + response.trim(), companionKey);
        var Readable = require("stream").Readable;

        let s = new Readable();
        s.push(response);
        s.push(null);

        if (response !== undefined && response.length > 1) {
            memoryManager.writeToHistory("" + response.trim(), companionKey);

            await prismadb.companion.update({
                where:{
                    id: params.chatId,
                },
                data:{
                    messages:{
                        create:{
                            content: response.trim(),
                            role: 'system',
                            userId: user.id
                        }
                    }
                }
            })
        }

        return new StreamingTextResponse(s);

    }
    catch(error)
    {
        console.log("[CHAT_POST]",error);
        return new NextResponse('Internal Error',{status:500});
    }

}
