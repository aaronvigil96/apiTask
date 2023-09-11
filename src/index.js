import express from 'express';
import taskRoute from './v1/routes/taskRoute.js';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", taskRoute);

app.listen(process.env.PORT);
console.log(`Server running in port: ${process.env.PORT}`);