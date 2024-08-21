import React,{useContext } from 'react'
import { useAuth } from '../../AuthContext'

const Navbar = () => {
    const{userName}= useAuth()
  return (
    <nav className='flex text-center justify-center  border-red-500 border-2 gap-2'>
        <h1>Logo</h1>
        <ul>
        {userName && (
          <li>Welcome, {userName}</li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
