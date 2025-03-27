import React from 'react';
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-14 bg-base-100/50'>
        <div className='max-w-md text-center space-y-6'>
            <div className='flex justify-center gap-4 mb-4'>
                <div className='relative'>
                    <div className='w-15 h-15 rounded-2xl bg-primary/18 flex items-center justify-center animate-bounce'>
                    <MessageSquare className = "w-7 h-7 text-primary"/>

                    </div>
                </div>
            </div>

            <h2 className='text-xl font-bold'>Welcome to Chatify!</h2>
            <p className='text-base-content/50'>
            Select a conversation from the sidebar to start chatting</p>

        </div>

      
    </div>
  )
}

export default NoChatSelected
