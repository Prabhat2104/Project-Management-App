import React, { useEffect } from 'react'
import { useState } from 'react'
import { X } from 'lucide-react';
import { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import { useDispatch } from 'react-redux';
import {addMember, removeMember} from '../features/projectSlice'


const AddRemoveMemberForm = ({ onClose, project, state }) => {
  const [email, setEmail] = useState("");

  //const {addMember, removeMember} = useContext(ProjectContext);
  const member = email;
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(state==="add"){
        dispatch(addMember({member,projectId:project.projectId}));
    }
    else{
        dispatch(removeMember({member,projectId:project.projectId}));
    }
      onClose();
  };

  // useEffect(()=>{
  //   console.log(state);
  // },[])

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
            {state==="add"?"Add Member":"Remove Member"}
        </h2>
        <X className="cursor-pointer mb-4 pb-1" onClick={onClose}/>
    </div>


  <label className="font-medium">Email</label>
  <input
    className="w-full border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3"
    type="text"
    placeholder='Enter the email'
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <button
    type="submit"
    className="w-full bg-indigo-500 py-2.5 rounded text-white font-medium hover:bg-indigo-600 transition"
  >
    {state==="add"?"Add Member":"Remove Member"}
  </button>
</form>

      </div>

    </div>
  );
};

export default AddRemoveMemberForm;
