import {useContext, useState} from "react";
import { ProjectContext } from "../../context/ProjectContext";
import ProjectEditForm from "./EditProjectForm";
import { AuthContext } from "../../context/AuthContext";

const statusColors = {
  assigned: "bg-blue-100 text-blue-700",
  inprogress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};
const maxLength = 60;

const priorityColors = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

const ProjectCard = ({ project, onClick }) => {
  const {isAdmin} = useContext(AuthContext);
  const{deleteProject, fetchAllProjects} = useContext(ProjectContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const deleteClick = async () => {
    await deleteProject(project.projectId);
    fetchAllProjects();
  }
  return (
    <div
      // onClick={onClick}
      className="bg-white border rounded-xl p-5 hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-slate-800 cursor-pointer hover:text-blue-600 hover:border-b-1 hover:border-blue-600 transition-all" onClick={onClick}>
          {project.title}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
        {project.description.slice(0,Math.min(project.description.length,maxLength))}...
      </p>

      {/* Meta Info */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex items-center gap-2 ">
          <span className="text-slate-500">Members:</span>
          <span className="font-medium">
            {project.members?.length || 0}
          </span>
        </div>
        {isAdmin&&(<>
        <button onClick={() => setShowEditForm(true)} className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2 h-10 w-16 hover:bg-blue-600 transition-colors cursor-pointer z-10">Edit</button>
        {showEditForm && <ProjectEditForm onClose={() => setShowEditForm(false)} project={project}/>}
        <button className="text-white bg-red-500 px-2 py-1 rounded-lg ml-2 h-10 w-16 hover:bg-red-600 cursor-pointer" onClick={deleteClick}>Delete</button>
        </>)}
        <div className="flex items-center gap-1">
          <span className="text-slate-500">Priority:</span>
          <span
            className={`font-semibold ${priorityColors[project.priority]}`}
          >
            {project.priority}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
        <span>Tasks: {project.tasks?.length || 0}</span>
        <span>
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
