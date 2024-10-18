import CompanionForm from '@/components/companion-form'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import React from 'react'



interface CompanionIdProps{
    params: {
        companionId : string
    }
}



const CompanionIdPage = async({params}: CompanionIdProps) => {
  const {userId} = auth();

    //TODO : check subsciption
    const companion = await prismadb.companion.findUnique({
        where:{
            id: params.companionId
        }
    })

    if(!userId)
    {
      return auth().redirectToSignIn()
    }

    const categories = await prismadb.category.findMany()


  return (
    <div>
      <CompanionForm
      initialData = {companion}
      categories  = {categories}
      />
    </div>
  )
}

export default CompanionIdPage
