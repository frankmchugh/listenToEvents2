
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ethereumController from './viem-test.js';

dotenv.config();
const app = express();

// Routes & Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ethereum", ethereumController);

// Starting server
app.listen(process.env.PORT, () => console.log("Server has started!"));