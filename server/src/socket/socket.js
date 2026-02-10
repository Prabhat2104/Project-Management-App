import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  // io.on("connection", (socket) => {
  //   console.log("Socket connected:", socket.id);

  //   socket.on("disconnect", () => {
  //     console.log("Socket disconnected:", socket.id);
  //   });
  // });

  io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // const userId = socket.user.id
  // socket.join(`user:${userId}`);

  socket.on("join:user", (userId) => {
    socket.join(`user:${userId}`);
    console.log(`User ${userId} joined room user:${userId}`);
  });


  socket.on("join:project", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined ${room}`);
  })

  socket.on("leave:project", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} leaving ${room}`)
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});



};



export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
