import React from 'react'
import { useState } from 'react'
import { X } from 'lucide-react';
import { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';


const ProjectForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [projectId, setProjectId] = useState("");

  const {createProject, fetchAllProjects} = useContext(ProjectContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
      priority,
      projectId: Number(projectId),
    };

    const result = await createProject(projectData);
    if(result){
      fetchAllProjects();
    }
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
            Create New Project
        </h2>
        <X className="cursor-pointer mb-4 pb-1" onClick={onClose}/>
    </div>


  <label className="font-medium">Project Title</label>
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

  <label className="font-medium">Project ID</label>
  <input
    className="w-full border mt-1 mb-5 border-gray-400/40 outline-none rounded py-2 px-3"
    type="number"
    value={projectId}
    onChange={(e) => setProjectId(e.target.value)}
    required
  />

  <button
    type="submit"
    className="w-full bg-indigo-500 py-2.5 rounded text-white font-medium hover:bg-indigo-600 transition"
  >
    Create Project
  </button>
</form>

      </div>

    </div>
  );
};

export default ProjectForm;
