import React from 'react'

import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
//shadcn imports
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"




const MenuSidebar = () => {
  return (
    <Sheet>
  <SheetTrigger className='md:hidden pr-4'><Menu/></SheetTrigger>
  <SheetContent side='left' className='p-0 bg-secondary pt-10 w-32'>
    <Sidebar/>      
  </SheetContent>
</Sheet>
  )
}

export default MenuSidebar
