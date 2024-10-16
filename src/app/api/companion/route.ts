import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const body = await request.json();
        const user = await currentUser();

        const {src, name, description , categoryId, instructions, seed} = body

        if(!user || !user.id || !user.firstName)
        {
            return new NextResponse('Unauthorized', {status: 401});
        }

        if(!src || ! name || ! description || !categoryId || !instructions)
        {
            return new NextResponse('Misssing fields required' , {status: 400})
        }


        //checking for subscription

        //creating into the db !!
        const companion =  await prismadb.companion.create({
            data: {
                categoryId,
                userId: user.id,
                username: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }
        })
        return NextResponse.json(companion);


    }
    catch(error)
    {
        console.log("[COMPANION_POST]", error);
        return new NextResponse('Internal Error',{status:500});
    }
}