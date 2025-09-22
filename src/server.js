require('dotenv').config();
const express = require('express');
const {PrismaClient} = require("./generated/prisma");
const app = express();
const port = process.env.PORT;

const prisma = new PrismaClient();

app.use(express.json());



app.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { TaskDescription } = req.body;
    const task = await prisma.task.create({
        data: { TaskDescription }
    });
    res.status(201).json(task);
});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})