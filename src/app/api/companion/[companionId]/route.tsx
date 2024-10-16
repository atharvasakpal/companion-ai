import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request , {params}: {params:{companionId:string}}){
    try{
        const body = await request.json();
        const user = await currentUser();

        const {src, name, description , categoryId, instructions, seed} = body

        if(!params.companionId)
        {
            return new NextResponse('Companion Id is required!', {status: 400})
        }

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
        const companion =  await prismadb.companion.update({
            where: {
                id: params.companionId
            },

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
        console.log("[COMPANION_PATCH]", error);
        return new NextResponse('Internal Error',{status:500});
    }
}


export async function DELETE(request: Request,{params}: {params:{companionId:string}}){

    try{
            const {userId} = auth()
            if(!userId)
            {
                return new NextResponse('Unauthorized',{status: 401})
            }

            const companion = await prismadb.companion.delete({
                where:{
                    userId,
                    id: params.companionId
                }
            })
            return NextResponse.json(companion);
    }
    catch(error)
    {
        console.log("[COMPANION_DELETE]", error);
        return new NextResponse('Internal Error',{status:500})
        
    }

}