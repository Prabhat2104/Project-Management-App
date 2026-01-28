import logo from "../assets/Logo.png";
import menu_icon from "../assets/menu_icon.png";

const assets = {
    logo,
    menu_icon
}

export const users = [
  {
    _id: "64f1a1a1a1a1a1a1a1a1a101",
    name: "Admin User",
    email: "admin@projectflow.com",
    role: "admin",
    isAdmin: true,
    isDeleted: false,
    projects: ["64f2b2b2b2b2b2b2b2b2b201"],
    tasks: []
  },
  {
    _id: "64f1a1a1a1a1a1a1a1a1a102",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "user",
    isAdmin: false,
    isDeleted: false,
    projects: ["64f2b2b2b2b2b2b2b2b2b201"],
    tasks: ["64f3c3c3c3c3c3c3c3c3c301"]
  },
  {
    _id: "64f1a1a1a1a1a1a1a1a1a103",
    name: "Anjali Verma",
    email: "anjali@gmail.com",
    role: "user",
    isAdmin: false,
    isDeleted: false,
    projects: ["64f2b2b2b2b2b2b2b2b2b201"],
    tasks: ["64f3c3c3c3c3c3c3c3c3c302"]
  }
];

export const projects = [
  {
    _id: "64f2b2b2b2b2b2b2b2b2b201",
    title: "ProjectFlow Website",
    description: "A project management web application for teams.",
    status: "inprogress",
    priority: "low",
    admin: "64f1a1a1a1a1a1a1a1a1a101",
    members: [
      "64f1a1a1a1a1a1a1a1a1a102",
      "64f1a1a1a1a1a1a1a1a1a103"
    ],
    tasks: [
      "64f3c3c3c3c3c3c3c3c3c301",
      "64f3c3c3c3c3c3c3c3c3c302"
    ],
    projectId: 1001,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-20T12:00:00Z"
  },
  {
    _id: "64f2b2b2b2b2b2b2b2b2b202",
    title: "Backend of chat app",
    description: "The chat app backend is built using Node.js and Express.js.",
    status: "completed",
    priority: "medium",
    admin: "64f1a1a1a1a1a1a1a1a1a101",
    members: [
      "64f1a1a1a1a1a1a1a1a1a102",
      "64f1a1a1a1a1a1a1a1a1a103"
    ],
    tasks: [
      "64f3c3c3c3c3c3c3c3c3c301",
      "64f3c3c3c3c3c3c3c3c3c302"
    ],
    projectId: 1002,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-20T12:00:00Z"
  },

];

export const tasks = [
  {
    _id: "64f3c3c3c3c3c3c3c3c3c301",
    title: "Design Home Page",
    description: "Create UI for home page using Tailwind CSS.",
    status: "inprogress",
    priority: "medium",
    assignedTo: "64f1a1a1a1a1a1a1a1a1a102",
    project: "1001",
    comments: ["64f4d4d4d4d4d4d4d4d4d401"],
    isCompleted: false,
    createdAt: "2025-01-11T09:30:00Z",
    updatedAt: "2025-01-18T14:00:00Z"
  },
  {
    _id: "64f3c3c3c3c3c3c3c3c3c302",
    title: "Setup Backend Models",
    description: "Create MongoDB schemas for Project, Task, User.",
    status: "completed",
    priority: "high",
    assignedTo: "64f1a1a1a1a1a1a1a1a1a103",
    project: "1001",
    comments: ["64f4d4d4d4d4d4d4d4d4d402"],
    isCompleted: true,
    createdAt: "2025-01-09T11:00:00Z",
    updatedAt: "2025-01-15T16:30:00Z"
  }
];

export const comments = [
  {
    _id: "64f4d4d4d4d4d4d4d4d4d401",
    content: "Homepage layout looks clean. Add CTA button.",
    task: "64f3c3c3c3c3c3c3c3c3c301",
    user: "64f1a1a1a1a1a1a1a1a1a101",
    createdAt: "2025-01-12T10:15:00Z"
  },
  {
    _id: "64f4d4d4d4d4d4d4d4d4d402",
    content: "Schemas look good. Removed duplicate timestamps.",
    task: "64f3c3c3c3c3c3c3c3c3c302",
    user: "64f1a1a1a1a1a1a1a1a1a101",
    createdAt: "2025-01-14T09:45:00Z"
  }
];

export default assets;