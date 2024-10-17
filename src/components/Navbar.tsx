import { Home, Menu, Plus, Settings, Sparkle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {Poppins} from 'next/font/google'
import { cn } from '@/lib/utils'
import { useClerk, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { ModeToggle } from './ui/ModeToggle'
import MenuSidebar from './MenuSidebar'

const font  = Poppins({
        weight: '600',
        subsets: ['latin']
    })


  
const Navbar = () => {

 

  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 bottom-b border-primary/10 bg-secondary h-16'>

        <div className='flex items-center'>
            
            <MenuSidebar/>

            <Link href='/'>
            <h1 className={cn('hidden md:block text-xl md: tesxt-3xl font-bold text-primary', font.className)}>Companion ai</h1>
             </Link>
        </div>

        <div className='flex items-center gap-x-3'>
           
            <Button variant='outline' size='sm'>Upgrade <Sparkles className='h-4 w-4 fill-white text-white ml-2'/></Button>
            <ModeToggle/>
            <UserButton/>

        </div>
    </div>
  )
}

export default Navbar
