import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Project from './pages/Project'
import Task from './pages/Task'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { useEffect, useState, useContext } from 'react'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import socket from './socket/socket';
// import { setupProjectSocketListeners } from './features/projectSlice';
// import { setupTaskSocketListeners } from './features/taskSlice'

const App = () => {
  // const [isAdmin, setIsAdmin] = useState(true);
  //const {authUser} = useContext(AuthContext); 
  const token = useSelector((state) => state.auth.token);
  const authUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();

  
  // useEffect(() => {
  //   setupProjectSocketListeners(dispatch);
  //   setupTaskSocketListeners(dispatch);
  // }, []);

  useEffect(() => {
    if (token) {
      socket.auth = { token };
      socket.connect();
      console.log("Attempting socket connection...");
    }
    else {
      socket.disconnect();
    }

    return () => {
      socket.disconnect();
    }
  }, [token])

  useEffect(() => {
    if (authUser?._id) {
      socket.emit("join:user", authUser._id);
      console.log("Joined socket as user:", authUser._id);
    }
  }, [authUser]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Login />} />
        <Route path='/project' element={authUser ? <Project /> : <Login />} />
        <Route path='/task/:id' element={authUser ? <Task /> : <Login />} />
        {/* <Route path = '/profile' element  = {authUser? <Profile/> : <Login/> }/> */}
        <Route path='/login' element={authUser ? <Home /> : <Login />} />
        <Route path='/register' element={authUser ? <Home /> : <Register />} />
      </Routes>
    </div>
  )
}

export default App