'use client'

import { Category, Companion } from '@prisma/client'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'

//shadcn imports
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from './ui/separator'
import ImageUpload from './image-upload'

interface CompanionFormProps{
    initialData  : Companion | null,
    categories : Category[]
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
     }),
    description: z.string().min(1, {
        message: "Description is required"
     }),
    instructions: z.string().min(300, {
        message: "Atleast 200 characters required"
     }),
    seed: z.string().min(300, {
        message: "Atleast 200 characters required"
    }),
    src: z.string().min(1, {
        message: "Image is required"
     }),
    categoryId: z.string().min(1, {
        message: "Category is required"
     }),
    

})

const CompanionForm = ({initialData, categories}: CompanionFormProps) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues: initialData ||  {
            name: '',
            description: '',
            instructions: '',
            seed:'',
            src: '',
            categoryId: undefined
        }
    })

    const isLoading = form.formState.isSubmitting

    const OnSubmit = async(values:z.infer<typeof formSchema>)=>{
        console.log(values)
    }

  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)} className='space-y-8 pb-10'>
                <div className='space-y-2 w-full '>
                    <div>
                        <h3 className='text-lg font-medium'>
                            General Information
                            <p className='text-sm text-muted-foreground'>Genral information about your Companion</p>
                        </h3>
                    </div>
                    <Separator className='bg-primary/10'/>
                </div>
                <FormField
                    control={form.control}
                    name="src"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-center justify-center space-y-4 col-span-2'>
                        
                        <FormControl>
                            <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value}/>
                        </FormControl>
                        
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </form>
        </Form>
      
    </div>
  )
}

export default CompanionForm
