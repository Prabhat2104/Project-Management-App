import React, { useEffect, useContext, useState } from 'react'
import Navbar from '../components/Navbar'
//import {projects} from '../assets/assets'
import ProjectCard from '../components/ProjectCard'
import {useNavigate} from 'react-router-dom'
//import {AuthContext} from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProjects, fetchProjectOfUser, createProject, updateProject, deleteProject } from '../features/projectSlice'
//import { ProjectContext } from '../../context/ProjectContext'
import toast from 'react-hot-toast'
import ProjectForm from '../components/CreateProjectForm'
import socket from '../socket/socket'

const Project = () => {
    const navigate = useNavigate();
    //const {isAdmin, authUser} = useContext(AuthContext);
    const {isAdmin, authUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);
    //This below section is for test purpose only
    // let projectToShow = [];
    // if(isAdmin){
    //     projectToShow = [...projectToShow,...projects];
    // }else{
    //     projectToShow = [...projectToShow,projects[0]];
    // }
    // console.log(isAdmin);
    // useEffect(()=>{
    //     console.log(JSON.parse(localStorage.getItem("user")));
    // },[])

    const {projects, loading, error} = useSelector((state) => state.project);

    useEffect(() => {
      if(!projects.length) return;
      projects.forEach((project)=>{
        socket.emit("join:project",`project:${project.projectId}`);
      });
      return () => {
        projects.forEach((project) => {
          socket.emit("leave:project",`project:${project.projectId}`);
        })
      }
    },[projects])


    //const {projects, fetchAllProjects, fetchProjectOfUser, createProject} = useContext(ProjectContext);
    
    useEffect(()=>{
      // if(!authUser.token)
      //   return;
        //if(authLoading) return;
        if(authUser.isAdmin===true){
          dispatch(fetchAllProjects());
        }else{
        dispatch(fetchProjectOfUser());
        }
    },[])
    
  return (
    <div>
        <Navbar/>
        <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {isAdmin && (
            <button onClick={() => setShowCreateProjectForm(true)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer mb-2 transition"
            >
              + Create New Project
            </button>
          )}
          {showCreateProjectForm && <ProjectForm onClose={() => setShowCreateProjectForm(false)}/>}

      <div className="grid gap-4" >
        {projects.map(project => (
          <ProjectCard onClick = {() => navigate(`/task/${project._id}`)} key={project._id} project={project} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Project