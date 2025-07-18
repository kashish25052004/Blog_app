import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext';
import toast from "react-hot-toast";

const layout = () => {

  // const navigate = useNavigate()
  // // Function to handle logo click and navigate to the home page

  // const handleLogoClick = () => {
  //   navigate('/')
  // }
  // const logout = () =>{
  //   navigate('/');
  // }

  const navigate = useNavigate()
  const { axios, setToken } = useAppContext();
  // Function to handle logo click and navigate to the home page

  const handleLogoClick = () => {
    navigate('/')
  }
  
  const logout = () => {
    try {
      setToken(null)
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      navigate('/');
      toast.success("Logout successfully")
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
    <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
      {/* <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={handleLogoClick}/> */}
      <h1 className='text-4xl cursor-pointer' onClick={handleLogoClick} >Blog<span className='text-blue-800'>T</span>oCrack</h1>
      <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>

    </div>

    <div className='flex h-[calc(100vh-70px)]'>
      <Sidebar />
      <Outlet />

    </div>
      
    </>
  )
}

export default layout
