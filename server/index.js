import express from "express";
import 'dotenv/config';
import connectdb from "./src/config/connectDB.js";
import userRouter from "./src/routes/authRoutes.js";
import projectRouter from "./src/routes/projectRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import activityRouter from "./src/routes/activityLogRoutes.js";
import cors from "cors";
import commentRouter from "./src/routes/commentRoutes.js";
import http from 'http';
import { initSocket } from "./src/socket/socket.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

await connectdb();

const PORT = process.env.PORT || 3000;

app.get('/api/status', (req, res) => {
  res.send('Server is live');
});

app.use('/api/auth', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/task', taskRouter);
app.use('/api/comment', commentRouter);
app.use('/api/activity', activityRouter);

const server = http.createServer(app);

initSocket(server);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
