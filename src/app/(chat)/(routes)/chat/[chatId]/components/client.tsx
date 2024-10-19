'use client'

import ChatHeader from '@/components/chat-header'
import { Companion, Message } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { useCompletion } from 'ai/react'
import ChatForm from '@/components/chat-form'
import ChatMessages from '@/components/ChatMessages'
import { ChatMessageProps } from '@/components/chat-message'
import { ChatRequestOptions } from 'ai'

interface ChatClientProps{
    companion: Companion & {messages: Message[],
        _count:{
            messages :number
        }
     }
}

const ChatClient = ({companion}: ChatClientProps) => {


    const router = useRouter()
    // const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages)

    const [messages, setMessages] = useState<ChatMessageProps[]>(
        companion.messages.map(message => ({
            role: message.role as 'user' | 'system',
            content: message.content
        }))
    )

    const {input,
            isLoading,
            handleInputChange,
            handleSubmit,
            setInput,
                } = useCompletion({
                api:`/api/chat/${companion.id}`,
                onFinish(prompt, completion)
                {
                    const systemMessage : ChatMessageProps= {
                        role: 'system',
                        content: completion
                    };
                    setMessages((current)=>[...current , systemMessage]);
                    setInput("");
                    const pathname = usePathname();
                    router.push(pathname);
                    router.refresh();
                    
                   
                }
                 
            });



    

    // const OnSubmit= (e: FormEvent<HTMLFormElement>)=>{
    //     const userMessage: ChatMessageProps = {
    //         role: 'user',
    //         content: input
    //     }

    //     setMessages((current)=>[...current, userMessage])
    //     handleSubmit(e);
    // }

    const OnSubmit= (e: FormEvent<HTMLFormElement>,chatRequestOptions?: ChatRequestOptions)=>{
        const userMessage: ChatMessageProps = {
            role: 'user',
            content: input
        }

        setMessages((current)=>[...current, userMessage])
        handleSubmit(e);
    }

  return (
    <div className='flex flex-col h-screen p-4 space-y-2'>
      <ChatHeader companion={companion}/>
      <ChatMessages companion={companion} isLoading={isLoading} messages={messages}/>
      <ChatForm
      isLoading = {isLoading}
      input = {input}
      handleInputChange ={handleInputChange}
      onSubmit = {OnSubmit}
      />
    </div>
  )
}

export default ChatClient
