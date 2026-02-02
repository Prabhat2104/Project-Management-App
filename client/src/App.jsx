import React from 'react'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Project from './pages/Project'
import Task from './pages/Task'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { useState, useContext } from 'react'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import {AuthContext} from '../context/AuthContext';
const App = () => {
  // const [isAdmin, setIsAdmin] = useState(true);
  const {authUser} = useContext(AuthContext); 
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true}/>
    <Routes>
      <Route path = '/' element  = {authUser? <Home/> : <Login/> }/>
      <Route path = '/project' element  = {authUser? <Project /> : <Login/> }/>
      <Route path = '/task/:id' element  = {authUser? <Task/> : <Login/> }/>
      {/* <Route path = '/profile' element  = {authUser? <Profile/> : <Login/> }/> */}
      <Route path = '/login' element  = {authUser? <Home/> : <Login/>}/>
      <Route path = '/register' element  = {authUser? <Home/> : <Register/>}/>
      </Routes>
    </div>
  )
}

export default App