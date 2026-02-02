import {createContext,useState, useContext, useEffect} from "react";
//import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext(null);

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [comments, setComments] = useState([]);
    const {axios} = useContext(AuthContext);

    const fetchAllTasksOfProject = async (projectId) => {
        try {
            console.log("Fetching tasks of project")
            const {data} = await axios.get(`/api/task/get/${projectId}`);
            if(data.success){
                setTasks(data.tasks);
                // toast.success(data.message);
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

    const fetchTaskOfUser = async (projectId) => {
        try {
            console.log("Fetching tasks of an user in this project");
            const {data} = await axios.get(`/api/task/get/${projectId}`);
            if(data.success){
                setTasks(data.tasks.filter(task => task.assignedTo === JSON.parse(localStorage.getItem("user"))._id));
                // toast.success(data.message);
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

    const addNewTask = async(taskDetails) => {
        try {
            const {data} = await axios.post('/api/task/create',taskDetails);
            if (data.success) {
                setTasks((prev)=>[...prev,data.task])
                toast.success(data.message);
                return true;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }

    const updateTask = async(taskDetails) => {
        try {
            const {data} = await axios.put(`/api/task/update/${taskDetails._id}`,taskDetails);
            if (data.success) {
                const updatedTask = tasks.find((t) => t._id===taskDetails._id);
                const filteredTask = tasks.filter((t) => t._id!==taskDetails._id);
                setTasks(filteredTask);
                setTasks((prev) => [...prev, updatedTask]);
                toast.success(data.message);
                return true;
            } else {
                toast.error(error.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }

    const removeTask = async(taskId) => {
        try {
            const {data} = await axios.delete(`/api/task/delete/${taskId}`);
            if (data.success) {
                const savedTasks = tasks.filter((t)=> t._id!==taskId);
                setTasks(savedTasks);
                toast.success(data.message);
                return true;
            } else {
                toast.error(error.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }

    const getAllComments = async(taskId) => {
        try {
            const {data} = await axios.get(`/api/comment/getComments/${taskId}`);
            if(data.success){
                //console.log(comments);
                setComments(data.comments);
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

    const createComment = async(commentDetails) => {
        try {
            console.log("Creating new comment");
            const {data} = await axios.post('/api/comment/create', commentDetails);
            if(data.success){
                setComments((prev)=>[...prev,data.comment]);
                return true;
            }

        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }

    const value = {
        tasks,
        comments,
        setComments,
        setTasks,
        fetchAllTasksOfProject,
        fetchTaskOfUser,
        addNewTask,
        updateTask,
        removeTask,
        getAllComments,
        createComment
    }
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}


