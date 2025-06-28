import React, { use } from 'react'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from "react-hot-toast";



const Register = () => {

  const {axios} = useAppContext();


  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] =useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const {data} = await axios.post('/api/user/register',{email,password,name})

      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }    
  }
  const {navigate} = useAppContext();

  function handleLogin() {
    navigate('/login');
  }

  

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>

          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <p className='font-light'>Enter Details</p>
          </div>

          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input onChange={e=> setEmail(e.target.value)} value={email}
              type="email" placeholder='your email id' required className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>

            <div className='flex flex-col'>
              <label>Name</label>
              <input onChange={e => setName(e.target.value)} value={name}
              type="name" placeholder='your Password' required className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>

            <div className='flex flex-col'>
              <label>Password</label>
              <input onChange={e => setPassword(e.target.value)} value={password}
              type="password" placeholder='your Password' required className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>

            <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'> Register </button>

            <div className='cursor-pointer mt-5 '>Already have an account 
              <button onClick={handleLogin} className='w-3xs py-3 ml-10 mt-4 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Register
