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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Separator } from './ui/separator'
import ImageUpload from './image-upload'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Wand2 } from 'lucide-react'

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
    instructions: z.string().min(100, {
        message: "Atleast 100 characters required"
     }),
    seed: z.string().refine(val => val.length === 0 || val.length >= 100, {
    message: "At least 100 characters required if not empty"
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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='col-span-2 md:col-span-1'>

                            <FormLabel>Name</FormLabel>
                            <FormControl>
                            <Input disabled={isLoading} placeholder='Elon Musk' {...field} />
                            </FormControl>
                             <FormDescription>
                                This is how your AI companion will be named
                            </FormDescription>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                    />


                    <FormField
                        control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className='col-span-2 md:col-span-1'>

                            <FormLabel>Description</FormLabel>
                            <FormControl>
                            <Input disabled={isLoading} placeholder='CEO & founder of Tesla , SpaceX' {...field} />
                            </FormControl>
                            <FormDescription>
                                Short Description of your AI companion
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />


                    <FormField
                        control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {categories.map((item)=>(
                                         <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                    ))}
                                   
                                    
                                </SelectContent>
                            </Select>


                            <FormDescription>
                                Select a category for your AI
                            </FormDescription>
                                    <FormMessage />
                        </FormItem>
                    )}
                    />

                </div>
                <div className='space-y-2 w-full'>
                    <div>
                        <h3 className='text-lg font-medium'>
                            Configuration
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            Detailed instructions for AI behaviour
                        </p>
                    </div>
                    <Separator />
                </div>
                        <FormField
                        control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem className='col-span-2 md:col-span-1'>

                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                            <Textarea className='bg-background resize-none' rows={7} disabled={isLoading} placeholder='You are Elon Musk, the visionary entrepreneur and CEO of Tesla and SpaceX. You speak with a mix of casual confidence and intellectual depth, often diving into topics like space exploration, AI, clean energy, and innovation. You’re known for your optimistic view of the future, bold predictions, and sometimes playful or quirky sense of humor. You like to think outside the box and aren’t afraid of tackling hard challenges. While you may drop a joke or meme reference now and then, your thoughts are always focused on solving big problems. Respond with brevity but clarity, using a direct, no-nonsense style.' {...field} />
                            </FormControl>
                            <FormDescription>
                                Describe your companion's backstory and relevant details
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />



                    <FormField
                        control={form.control}
                    name="seed"
                    render={({ field }) => (
                        <FormItem className='col-span-2 md:col-span-1'>

                            <FormLabel>Example conversation</FormLabel>
                            <FormControl>
                            <Textarea className='bg-background resize-none' rows={7} disabled={isLoading} placeholder='Human: Hey Elon, what do you think is the next big leap in space exploration? Will we see humans on Mars soon?
Elon Musk: Yeah, absolutely. I’d say getting humans to Mars is the big one. It’s the next logical step for making life multi-planetary. SpaceX is making a lot of progress with Starship. If things go well, I think we could see an uncrewed mission to Mars in the next 3-4 years, maybe a crewed one shortly after.' />
                            </FormControl>
                            <FormDescription>
                               Write a seed conversation between a Human and your companion
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />


                    <div className='w-full flex justify-center'>
                        <Button size='lg' disabled={isLoading}>{initialData? 'Edit Your Companion' : 'Create Your Companion'}<Wand2 className='ml-2'/></Button>
                    </div>
            </form>
        </Form>
      
    </div>
  )
}

export default CompanionForm
