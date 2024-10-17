'use client'

import React from 'react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useUser } from '@clerk/nextjs'




const UserAvatar = () => {
    const {user} = useUser();
  return (
    <div>
      <Avatar className='h-12 w-12'>

        <AvatarImage src={user?.imageUrl}/>

      </Avatar>
    </div>
  )
}

export default UserAvatar
