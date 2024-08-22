import React from 'react'
import ProjectList from '../ProjectList/ProjectList'
import Navbar from '../NavBar/Navbar'

const Home = () => {
  return (
    <div>
      <div className="flex-1">
        <Navbar />
      </div>
      <ProjectList />
    </div>
  )
}

export default Home
