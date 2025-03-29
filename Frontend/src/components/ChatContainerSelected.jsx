import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
// import { useEffect } from 'react'

const ChatContainerSelected = () => {

  const{messages, getMessages, isMessageLoading, selectdUser} = useChatStore()

  useEffect(() =>{
    getMessages(selectdUser._id)
  },[selectdUser._id, getMessages])

  if(isMessageLoading) return
  <div>Loading..</div>

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <p>messages..</p>

      <MessageInput/>
    </div>
  )
}

export default ChatContainerSelected
