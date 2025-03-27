import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';

const Sidebar = () => {
    const{getUsers, users, isUsersLoading, selectedUser, setSelectedUser,} = useChatStore()

    const onlineUsers = [];


    useEffect(() => {
        getUsers()
    }, [getUsers])

    if(isUsersLoading) return <SidebarSkeleton/>

  return (
    <div>
      
    </div>
  )
}

export default Sidebar
