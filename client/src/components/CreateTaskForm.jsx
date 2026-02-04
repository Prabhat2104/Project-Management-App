import React from 'react'
import { useState } from 'react'
import { X } from 'lucide-react';
//import { useContext } from 'react';
//import { TaskContext } from '../../context/TaskContext';
//import {ProjectContext} from '../../context/ProjectContext'
import { useSelector, useDispatch } from 'react-redux';
import {addNewTask, fetchAllTasksOfProject} from '../features/taskSlice'



const CreateTaskForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("notstarted");
  const[assignedTo, setAssignedTo] = useState("");

  //const {addNewTask, fetchAllTasksOfProject} = useContext(TaskContext);

  //const {projects}  = useContext(ProjectContext);
  const {projects} = useSelector((state) => state.project);
  const dispatch = useDispatch();


  const handleSubmit = async(e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      priority,
      status,
      assignedTo,
      projectId: Number(projectId),
    };

    //const result = await addNewTask(projectData);
    dispatch(addNewTask(taskData));
    // if(result){
    //   const project_id = projects.find((p) => p.projectId===projectId)._id
    //   fetchAllTasksOfProject(project_id);
    // }
      onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      
      {/* BLUR + BLOCK BACKGROUND */}
      <div
        // onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL CONTENT */}
      <div className="fixed inset-0 flex items-center justify-center">
       <form
  onSubmit={handleSubmit}
  className="bg-white text-gray-600 w-[360px] p-6 rounded-lg border border-gray-300/60 shadow-lg z-10"
>

    <div className='flex items-center justify-between'>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 pb-1 border-b-2">
            Add New Task
        </h2>
        <X className="cursor-pointer mb-4 pb-1" onClick={onClose}/>
    </div>


  <label className="font-medium">Title Of Task</label>
  <input
    className="w-full border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3"
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />

  <label className="font-medium">Description</label>
  <textarea
    rows="3"
    className="w-full resize-none border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
  />

  <label className="font-medium">Priority</label>
  <select
    className="w-full border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3 bg-white"
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <label className="font-medium">Status</label>
  <select
    className="w-full border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3 bg-white"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="notstarted">notstarted</option>
    <option value="inprogress">inprogress</option>
    <option value="completed">completed</option>
  </select>

  <label className="font-medium">Project ID</label>
  <input
    className="w-full border mt-1 mb-5 border-gray-400/40 outline-none rounded py-2 px-3"
    type="number"
    value={projectId}
    onChange={(e) => setProjectId(e.target.value)}
    required
  />

  <label className="font-medium">Assigned To</label>
  <input
    className="w-full border mt-1 mb-5 border-gray-400/40 outline-none rounded py-2 px-3"
    type="text"
    placeholder='Enter the email'
    value={assignedTo}
    onChange={(e) => setAssignedTo(e.target.value)}
    required
  />

  <button
    type="submit"
    className="w-full bg-indigo-500 py-2.5 rounded text-white font-medium hover:bg-indigo-600 transition"
  >
    Create New Task
  </button>
</form>

      </div>

    </div>
  );
};

export default CreateTaskForm;
