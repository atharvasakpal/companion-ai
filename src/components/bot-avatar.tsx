'use client'

import React from 'react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

interface BotAvatarProps{
    src: string
}


const BotAvatar = ({src}: BotAvatarProps) => {
  return (
    <div>
      <Avatar className='h-12 w-12'>

        <AvatarImage src={src}/>

      </Avatar>
    </div>
  )
}

export default BotAvatar
