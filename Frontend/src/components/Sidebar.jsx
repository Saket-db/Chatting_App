import React from 'react'
import { useChatStore } from '../store/useChatStore'

const Sidebar = () => {
    const{getUsers, users, isUsersLoading, selectedUser, setSelectedUser,} = useChatStore()
  return (
    <div>
      
    </div>
  )
}

export default Sidebar
