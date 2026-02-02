import React, { useState } from 'react'
import Navbar from '../components/Navbar'
//import { tasks, users } from "../assets/assets";
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { ProjectContext } from '../../context/ProjectContext';
import { AuthContext } from '../../context/AuthContext';
import AddRemoveMemberForm from '../components/AddRemoveMemberForm';
import CreateTaskForm from '../components/CreateTaskForm';
import { SquarePen } from 'lucide-react';
import { Trash } from 'lucide-react';
import EditTaskForm from '../components/EditTaskForm';
import CommentModal from '../components/CommentModal';




const Task = () => {
  const {projects, addMember} = useContext(ProjectContext);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const[showCreateTask, setShowCreateTask] = useState(false);
  const [state, setState] = useState("");
  const [taskId, setTaskId] = useState("");
  const[showEditTask, setShowEditTask] = useState(false);
  const[showComments, setShowComments] = useState(false);
  const {id} = useParams();
  const project = projects.find((p)=>p._id===id);
  // console.log(project);
  const {isAdmin, authUser} = useContext(AuthContext);
  const {tasks, fetchAllTasksOfProject, fetchTaskOfUser, removeTask} = useContext(TaskContext);
  const {fetchAllProjects, fetchProjectOfUser} = useContext(ProjectContext);
  // const getUserName = (id) =>
  //   users.find(u => u._id === id)?.name || "Unassigned";
  useEffect(()=>{
    if(authUser.isAdmin){
      fetchAllTasksOfProject(id);
      fetchAllProjects();
    }else{
      fetchProjectOfUser();
      fetchTaskOfUser(id);
    }
    console.log(tasks);
  },[])

  const statusColors = {
  assigned: "bg-blue-100 text-blue-700",
  inprogress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};

const priorityColors = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};
//const projectTasks = tasks.filter(task => task.project === id);

  return (
    <div>
        <Navbar/>
        <div className="p-6 max-w-7xl mx-auto">
          <div className='flex justify-between'>
            <h1 className='text-3xl'>{project?.title}</h1>
            {isAdmin&&<>
            <button className='mr-1 border px-2 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' onClick={() => {setShowMemberForm(true);
              setState("add")}
            }> + Add member</button>
            {showMemberForm&&<AddRemoveMemberForm onClose={() => setShowMemberForm(false)} project={project} state = {state}/>}
            <button className='mr-50 border px-2 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer' onClick={() => {
              setShowMemberForm(true)
              setState("remove")
            }}> - Remove member</button>
            {showMemberForm&&<AddRemoveMemberForm onClose={() => setShowMemberForm(false)} project={project} state = {state}/>}
            </>}
          </div>
          
          <div className='mt-3 mb-3 border rounded-lg px-5 py-3'>
            <p>{project?.description}</p>
          </div>
          <div className='flex justify-between'>
            <h1 className="text-2xl font-bold mb-3">Tasks</h1>
            {isAdmin&&<button onClick = {() => {setShowCreateTask(true)}} className='border px-2 mb-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 cursor-pointer'>+ Add New Task</button>}
          </div>
          {showCreateTask&&<CreateTaskForm onClose={() => setShowCreateTask(false)}/>}

      <div className="grid gap-4 border px-2 py-5 rounded-xl">
        {/* {const projectTasks = tasks.filter(task => task.project === id); */}
        {tasks.map(task => (
          <div
            key={task._id}
            className="p-4 bg-white border rounded-lg hover:shadow transition shadow-lg "
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                {isAdmin&&<div className='flex gap-4 mt-1 mb-1'>
                  <SquarePen className='cursor-pointer 
                  fill-blue-400 hover:fill-blue-500'
                  onClick={() => {setShowEditTask(true)
                    setTaskId(task._id);
                  }}/>
                  {showEditTask&&taskId===task._id&&<EditTaskForm
                  onClose={() => setShowEditTask(false)} task={task}/>}
                  
                  <Trash className='cursor-pointer fill-red-400  hover:fill-red-500' onClick={() => removeTask(task._id)} />
                </div>}
                <p className="text-sm text-slate-600">
                  {task.description}
                </p>
              </div>

              <span className={`text-xs px-2 py-1 bg-slate-100 rounded ${statusColors[task.status]}`}>
                {task.status}
              </span>
            </div>

            <div className="flex justify-between mt-4 text-sm">
              <span className='hover:border-b cursor-pointer mb-3' onClick={() => {
                setShowComments(true)
                setTaskId(task._id)
                }}>View Comments </span>
              {showComments&&taskId===task._id&&<CommentModal onClose={() => {setShowComments(false)}} taskId={taskId}/>}
              <span className={`font-medium ${priorityColors[task.priority]}`}>
                Priority: {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Task