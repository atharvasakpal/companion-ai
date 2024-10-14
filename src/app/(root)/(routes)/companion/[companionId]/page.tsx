import CompanionForm from '@/components/companion-form'
import prismadb from '@/lib/prismadb'
import React from 'react'



interface CompanionIdProps{
    params: {
        companionId : string
    }
}

const CompanionIdPage = async({params}: CompanionIdProps) => {

    //TODO : check subsciption
    const companion = await prismadb.companion.findUnique({
        where:{
            id: params.companionId
        }
    })

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
