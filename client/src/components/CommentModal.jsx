import React, { useContext, useLayoutEffect } from 'react'
import { useEffect, useState, usueContext } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import { X } from "lucide-react";
import { TaskContext } from '../../context/TaskContext';
import { AuthContext} from '../../context/AuthContext'
//import { dummyComments } from '../assets/assets';


const CommentModal = ({onClose, taskId}) => {
    //const comments = dummyComments;
    //const [comments, setComments] = useState([]);
    const{ comments,getAllComments, setComments, createComment} =  useContext(TaskContext);
    const {authUser} = useContext(AuthContext);
    const [content, setContent] = useState("");

    useEffect(() => {
    fetchComments();
  }, [taskId]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/comment/getComments/${taskId}`);
      if (data.success) setComments(data.comments);
    } catch (error) {
      toast.error("Failed to load comments");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(authUser);
    if (!content.trim()) return;
    const commentDetail = {
      user : authUser.name,
      task_id: taskId,
      content

    }
    setContent("");
    createComment(commentDetail);

  };

  return (
     <>
      {/* 🔹 Blur Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      {/* 🔹 Full Screen Modal */}
      <div className="fixed inset-0 z-50 flex flex-col bg-white">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Task Comments</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Comments (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {comments?.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              No comments yet
            </p>
          )}

          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-100 rounded-lg p-4"
            >
              <p className="text-sm text-gray-800">{comment.content}</p>
              <div className='flex justify-between mt-2'>
                <span className='text-xs text-green-500'>{comment.user}</span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
              </div>
              
              
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t p-4 flex gap-3"
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded px-3 py-2 outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 rounded hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default CommentModal