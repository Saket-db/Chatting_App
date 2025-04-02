import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from "../store/useAuthStore";
// import {useFormatTime} from "react-intl-hooks",
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
// import { MessageTimeStamp } from "stream-chat-react"
// import { useEffect } from 'react'

const ChatContainerSelected = () => {
  const messageEndRef = useRef(null);
  const{messages, getMessages, isMessageLoading, selectedUser} = useChatStore()
  const {authUser} = useAuthStore();

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "Unknown time";
    
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Displays AM/PM format
    }).format(new Date(timestamp));
  };
  

  useEffect(() =>{
    getMessages(selectedUser._id)
  },[selectedUser._id, getMessages])

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if(isMessageLoading) return
  <div>Loading..</div>

  return (
    <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader />

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
          ref={messageEndRef}
        >
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser?.profilePic || "https://res.cloudinary.com/dyy1u7wvc/image/upload/v1742831930/skyswnfq1cpwysmf7slp.png"
                    : selectedUser.profilePic || "https://res.cloudinary.com/dyy1u7wvc/image/upload/v1742831930/skyswnfq1cpwysmf7slp.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
      <div ref={messageEndRef}></div>
    </div>

    <MessageInput />
  </div>
  )
}

export default ChatContainerSelected
