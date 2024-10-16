'use client'
import { Companion } from '@prisma/client'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import ChatMessage, { ChatMessageProps } from './chat-message'


interface ChatMessagesProps{
    messages: ChatMessageProps[],
    isLoading: boolean,
    companion:  Companion
}


const ChatMessages = ({messages=[] , isLoading, companion}: ChatMessagesProps) => {

    const scrollRef = useRef<ElementRef<'div'>>(null); //scroll to latest message

    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior: 'smooth'})
    },[messages.length ])
    

    const [fakeLoading, setFakeLoading] = useState(messages.length===0?true: false);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setFakeLoading(false)
        },1000)

        return ()=>{
            clearTimeout(timeout)
        }
    },[])
  return (

    <div className='flex-1'>
      <ChatMessage
      isLoading = {fakeLoading}
      src={companion.src}
      role='system'
      content={`Hello, I am ${companion.name}, ${companion.description}`}
      />

      {messages.map((message)=>(
        <ChatMessage
        key={message.content }
        role={message.role}
        content={message.content}
        src={message.src}/>
      ))}

      {isLoading && (
        <ChatMessage
        role='system'
        src={companion.src}
        isLoading/>
      )}
        <div ref={scrollRef}/>
        
    </div>
  )
}

export default ChatMessages
