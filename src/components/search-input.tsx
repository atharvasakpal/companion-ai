'use client'

import { Search } from 'lucide-react'
import React from 'react'
import { Input } from "@/components/ui/input"


const SearchInput = () => {
  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground'/>
        <Input className='pl-10 bg-primary/10' placeholder='Search...'/>
    </div>
  )
}

export default SearchInput
