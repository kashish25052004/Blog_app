import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const {navigate,token} = useAppContext();


  function handleLogoClick() {
    navigate('/');
  }
  function handleLoginClick() {
    navigate('/admin');
  }

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <div className='flex justify-center items-center '>
        
        {/* <img  onClick = {handleLogoClick} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' /> */}
        <h1 className='text-4xl'>Blog<span className='text-blue-800'>T</span>oCrack</h1>

      </div>
        

        <button onClick={handleLoginClick} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'> 
          {token ? 'Dashboard' : 'Login'} 
          <img src={assets.arrow} alt="arrow" className='w-3' />
          
        </button>
      
    </div>
  )
}

export default Navbar
