import express, { Request, Response } from "express";
import connectToDB from "./database/connectToDB";
import userRouter from "./routes/user.routes";
import contentRouter from "./routes/content.routes";

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
    await connectToDB();
})