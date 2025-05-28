import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));