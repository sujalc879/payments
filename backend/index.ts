import express from 'express'
const app = express();

import cors from 'cors'
import mongoose from 'mongoose';

import authRoutes from './routes/auth.route';
import accountRoutes from './routes/account.route';

import middleware from './middleware/middleware';

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/api/v1", authRoutes);

app.use(middleware);

app.use("/api/v1", accountRoutes);

app.listen(PORT, async () => {
    await mongoose.connect(process.env.DATABASE_URL!);

    console.log("database is connected");
    console.log("the server is listning on port " + PORT);
})