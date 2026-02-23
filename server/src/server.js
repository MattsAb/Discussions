import "dotenv/config";
import express from 'express';
import cors from "cors"
import discussionRouter from './routes/discussionRoutes.js'
import authRouter from './routes/authRoutes.js'
import commentRouter from './routes/commnetRoutes.js'
import authMiddleware from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173'}));

app.use(express.json())

app.use('/auth', authRouter)

app.use('/comment', authMiddleware, commentRouter)

app.use('/',discussionRouter)


app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})