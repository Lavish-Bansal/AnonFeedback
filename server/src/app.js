import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json({limit: "16kb"}));
app.use(urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.send("welcome to server");
})


// routes import
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/messageRoute.js"


// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/message", messageRouter);

export { app };