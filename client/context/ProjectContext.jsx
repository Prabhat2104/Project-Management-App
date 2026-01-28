import axios from "axios";
import {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProjectContext = createContext(null);

export const ProjectProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
    const {authUser} = useContext(AuthContext);
    const fetchAllProjects = async() => {
        try {
            console.log("Fetching all project for admin");
            const {data} = await axios.get("/api/project/getAll");
            if(data.success){
                setProjects(data.projects);
                toast.success(data.message);
                return true;
            }
            else{
                toast.error(data.message);
                return false;
            }
            
        } catch (error) {
            toast.error(error.message);
            return false;
            
        }
    }
    const fetchProjectOfUser = async () => {
        try {
            console.log(`Fetching project for user ${authUser.name}`)
            const {data} = await axios.get("/api/project/get");
            if(data.success){
                setProjects(data.projects);
                toast.success(data.message);
                return true;
            }
            else{
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
            
        }
    }
    const createProject = async(projectData) => {
        try {
            console.log("Creating new project");
            const {data} = await axios.post("/api/project/create", projectData);
            if(data.success){
                toast.success(data.message);
                return true;
            }
            else{
                toast.error(data.message);
                return false;
            }
            
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }
    const updateProject = async(projectData) => {
        try {
            console.log("Updating the project");
            const {data} = await axios.put(`/api/project/update/${projectData.projectId}`, projectData);
            if(data.success){
                toast.success(data.message);
                return true;
            }
            else{
                toast.error(error.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }

    const deleteProject = async(projectId) => {
        try {
            console.log("Deleting the project");
            const {data} = await axios.delete(`/api/project/delete/${projectId}`);
            if(data.success){
                toast.success(data.message);
                return true;
            }
            
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }
    const addMember = async(member, projectId) => {
        try {
            console.log("Adding new member to the project");
            const {data} = await axios.put(`/api/project/addMember/${projectId}`, {member});
            if (data.success){
                toast.success(data.message);
                return true;
            } else{
                toast.error(error.message);
                return false;
            }
            
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }
    const removeMember = async(member, projectId) => {
        try {
            console.log("Removing member from the project");
            const {data} = await axios.put(`/api/project/deleteMember/${projectId}`, {member});
            if (data.success){
                toast.success(data.message);
                return true;
            } else{
                toast.error(error.message);
                return false;
            }
            
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }
    const value = {
        projects,
        setProjects,
        fetchAllProjects,
        fetchProjectOfUser,
        createProject,
        updateProject,
        deleteProject,
        addMember,
        removeMember
    }
    return(
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

