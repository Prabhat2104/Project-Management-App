import express from "express";
import 'dotenv/config';
import connectdb from "./src/config/connectDB.js";
import userRouter from "./src/routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectdb();

const PORT = process.env.PORT || 3000;

app.get('/api/status', (req, res) => {
    res.send('Server is live');
});

app.use('/api/auth', userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
