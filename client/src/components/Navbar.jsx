import React from 'react'
import assets from '../assets/assets'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Profile from '../pages/Profile'
import {AuthContext} from '../../context/AuthContext'
import { useContext } from 'react'
import { SquareMenu } from 'lucide-react';
const Navbar = () => {
  const navigate = useNavigate()
  const {logout} = useContext(AuthContext)
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all h-20">
        <img className='rounded-full h-40 w-60' src={assets.logo} alt="ProjectFlow"/>

   

  

    <div className ="flex items-center gap-8">
      <Link to = '/' className='hover:border-b hover:scale-110 transition-all duration-200'>
      Home
      </Link>
      {/* <Link to = '/task' className='hover:border-b hover:scale-110 transition-all duration-200'>
        Tasks
      </Link> */}
      <Link to = '/project' className='hover:border-b hover:scale-110 transition-all duration-200'>
        Projects
      </Link>
    </div>

    <div className="relative inline-block group">
      {/* More Button */}
      {/* <img src={assets.menu_icon} className='h-7 w-7'/> */}
      <SquareMenu className='h-7 w-7 cursor-pointer'/>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg 
                      opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-110 
                      transition-all duration-200 z-20">
        <button onClick={()=>{navigate('/profile')}} className="w-full text-center px-4 py-2 text-sm hover:bg-slate-100 mt-1">
          Update Profile
        </button>
        <button onClick={logout} className="w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-slate-100 mb-1">
          Logout
        </button>
      </div>
    </div>
</nav>

  )
}

export default Navbar