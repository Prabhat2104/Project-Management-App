import express from "express";
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/status', (req, res) => {
    res.send('Server is live');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
