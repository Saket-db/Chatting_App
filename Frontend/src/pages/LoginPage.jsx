import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
    const [ShowPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const { login, isLoggingIn } = useAuthStore();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      login(formData);
    }; 
  
  
  
  
  
  
  
  
  
  
  
  return (
    <div>
      Login
    </div>
  )
}

export default LoginPage
