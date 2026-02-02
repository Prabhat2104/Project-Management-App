import React from 'react'
import { useState } from 'react'
import { X } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const UpdateProfile = ({ onClose }) => {
  const {authUser, updateProfile} = useContext(AuthContext);
  const [name, setName] = useState(authUser.name);
  const [email, setEmail] = useState(authUser.email);
  const [password, setPassword] = useState("");

  
  const handleSubmit = async(e) => {
    e.preventDefault();
      const profileData = {
      name,
      email,
      }
    
    if(password.length>0){
      const profileDataWithPassword = [...profileData,password];
      const result = await updateProfile(profileDataWithPassword);
    }
    else{
      const result = await updateProfile(profileData);
    }
    // if(result){
    //     fetchAllProjects();
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
            Update Profile
        </h2>
        <X className="cursor-pointer mb-4 pb-1" onClick={onClose}/>
    </div>


  <label className="font-medium">Name</label>
  <input
    className="w-full border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

  <label className="font-medium">Email</label>
  <input
  type='email'
    className="w-full border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <label className="font-medium">Password</label>
  <input
  type='password'
    className="w-full border mt-1 mb-4 border-gray-400/40 outline-none rounded py-2 px-3"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder='Enter the password to be updated'
  />

  <button
    type="submit"
    className="w-full bg-indigo-500 py-2.5 rounded text-white font-medium hover:bg-indigo-600 transition"
  >
    Update Profile
  </button>
</form>

      </div>

    </div>
  );
};

export default UpdateProfile;
