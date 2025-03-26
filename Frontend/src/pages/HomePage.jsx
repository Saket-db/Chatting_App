import React from 'react';
import { useChatStore } from '../store/useChatStore';


const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div>
      Home
    </div>
  )
}

export default HomePage
