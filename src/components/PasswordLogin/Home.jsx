import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import ProjectList from '../ProjectList/ProjectList'
import Navbar from '../NavBar/Navbar'

const Home = () => {
    const history = useNavigate()
    const handleClick = () =>{
        signOut(auth).then(val =>{
            history('/')
        })
    }
  return (
    <div>
      <div className='flex-1'>
        <Navbar/>
        <button onClick={handleClick}>SignOut</button>
      </div>
        <ProjectList/>
    </div>
  )
}

export default Home;
