import React, { useState } from 'react'
import Navbar from '../components/Navbar'
//import { tasks, users } from "../assets/assets";
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext';
import { ProjectContext } from '../../context/ProjectContext';
import AddRemoveMemberForm from '../components/AddRemoveMemberForm';



const Task = () => {
  const {projects, addMember} = useContext(ProjectContext);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const {id} = useParams();
  const project = projects.find((p)=>p._id===id);
  // console.log(project);
  const {isAdmin, authUser} = useContext(AuthContext);
  const {tasks, fetchAllTasksOfProject, fetchTaskOfUser} = useContext(TaskContext);
  // const getUserName = (id) =>
  //   users.find(u => u._id === id)?.name || "Unassigned";
  useEffect(()=>{
    if(isAdmin){
      fetchAllTasksOfProject(id);
    }else{
      fetchTaskOfUser(id);
    }
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

  return (
    <div>
        
        <Navbar/>
        <div className="p-6 max-w-7xl mx-auto">
          <div className='flex justify-between'>
            <h1 className='text-3xl'>{project.title}</h1>
            {isAdmin&&<>
            <button className='mr-1 border px-2 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' onClick={() => setShowMemberForm(true)}> + Add member</button>
            {showMemberForm&&<AddRemoveMemberForm onClose={() => setShowMemberForm(false)} project={project} state = {"add"}/>}
            <button className='mr-50 border px-2 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer' onClick={() => setShowMemberForm(true)}> - Remove member</button>
            {showMemberForm&&<AddRemoveMemberForm onClose={() => setShowMemberForm(false)} project={project} state = {"remove"}/>}
            </>}
          </div>
          
          <div className='mt-3 mb-3 border rounded-lg px-5 py-3'>
            <p>{project.description}</p>
          </div>
      <h1 className="text-2xl font-bold mb-3">Tasks</h1>

      <div className="grid gap-4 border px-2 py-5 rounded-xl">
        {tasks.filter(task => task.project === id).map(task => (
          <div
            key={task._id}
            className="p-4 bg-white border rounded-lg hover:shadow transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-slate-600">
                  {task.description}
                </p>
              </div>

              <span className={`text-xs px-2 py-1 bg-slate-100 rounded ${statusColors[task.status]}`}>
                {task.status}
              </span>
            </div>

            <div className="flex justify-between mt-4 text-sm">
              {/* <span>Assigned to: {getUserName(task.assignedTo)}</span> */}
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