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

export const dummyComments = [
  {
    _id: "c1",
    content: "We should finalize the UI before moving to backend integration.",
    task: "task123",
    user: "user001",
    createdAt: "2024-10-01T10:15:00Z",
    updatedAt: "2024-10-01T10:15:00Z"
  },
  {
    _id: "c2",
    content: "API structure looks good. I'll start working on authentication.",
    task: "task123",
    user: "user002",
    createdAt: "2024-10-01T11:30:00Z",
    updatedAt: "2024-10-01T11:30:00Z"
  },
  {
    _id: "c3",
    content: "Please make sure to handle edge cases for project deletion.",
    task: "task123",
    user: "user003",
    createdAt: "2024-10-01T13:05:00Z",
    updatedAt: "2024-10-01T13:05:00Z"
  },
  {
    _id: "c4",
    content: "I have updated the task priorities based on today's discussion.",
    task: "task123",
    user: "user001",
    createdAt: "2024-10-01T15:45:00Z",
    updatedAt: "2024-10-01T15:45:00Z"
  }
];

export const dummyActivities = [
  {
    "_id": "65b8a101a1c1a1a1a1a1a101",
    "actor": "65b89f001a2b3c4d5e6f7001",
    "action": "Created",
    "project": "65b899991a2b3c4d5e6f9001",
    "entityType": "Task",
    "entityId": "65b8a222a1c1a1a1a1a1a222",
    "createdAt": "2026-02-05T10:15:30.000Z",
    "updatedAt": "2026-02-05T10:15:30.000Z"
  },
  {
    "_id": "65b8a102a1c1a1a1a1a1a102",
    "actor": "65b89f001a2b3c4d5e6f7002",
    "action": "Updated",
    "project": "65b899991a2b3c4d5e6f9001",
    "entityType": "Task",
    "entityId": "65b8a222a1c1a1a1a1a1a222",
    "createdAt": "2026-02-05T11:00:00.000Z",
    "updatedAt": "2026-02-05T11:00:00.000Z"
  },
  {
    "_id": "65b8a103a1c1a1a1a1a1a103",
    "actor": "65b89f001a2b3c4d5e6f7001",
    "action": "Deleted",
    "project": "65b899991a2b3c4d5e6f9001",
    "entityType": "Task",
    "entityId": "65b8a333a1c1a1a1a1a1a333",
    "createdAt": "2026-02-05T12:45:10.000Z",
    "updatedAt": "2026-02-05T12:45:10.000Z"
  },
  {
    "_id": "65b8a104a1c1a1a1a1a1a104",
    "actor": "65b89f001a2b3c4d5e6f7003",
    "action": "Created",
    "project": "65b899991a2b3c4d5e6f9001",
    "entityType": "Project",
    "entityId": "65b899991a2b3c4d5e6f9001",
    "createdAt": "2026-02-04T09:30:00.000Z",
    "updatedAt": "2026-02-04T09:30:00.000Z"
  },
  {
    "_id": "65b8a105a1c1a1a1a1a1a105",
    "actor": "65b89f001a2b3c4d5e6f7002",
    "action": "Updated",
    "project": "65b899991a2b3c4d5e6f9001",
    "entityType": "Project",
    "entityId": "65b899991a2b3c4d5e6f9001",
    "createdAt": "2026-02-06T08:20:45.000Z",
    "updatedAt": "2026-02-06T08:20:45.000Z"
  }
]


export default assets;