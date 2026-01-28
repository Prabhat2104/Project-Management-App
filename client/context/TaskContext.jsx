import {createContext,useState, useContext, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const TaskContext = createContext(null);

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);

    const fetchAllTasksOfProject = async (projectId) => {
        try {
            console.log("Fetching tasks of project")
            const {data} = await axios.get(`/api/task/get/${projectId}`);
            if(data.success){
                setTasks(data.tasks);
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

    const fetchTaskOfUser = async (projectId) => {
        try {
            console.log("Fetching tasks of an user in this project");
            const {data} = await axios.get(`/api/task/get/${projectId}`);
            if(data.success){
                setTasks(data.tasks.filter(task => task.assignedTo === JSON.parse(localStorage.getItem("user"))._id));
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

    const value = {
        tasks,
        setTasks,
        fetchAllTasksOfProject,
        fetchTaskOfUser
    }
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}


