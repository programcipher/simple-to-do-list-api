const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const taskStatus = require("../constants/task.constants");

exports.getRetrieveTasks = async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
}

exports.getRetrieveTask = async (req, res) => {
    const id = req.params.id;
    try{
        const task = await prisma.task.findUnique({
                where: {Id: parseInt(id)}
            }
        );
        res.json(task);
    }catch (error){
        res.status(400).send({error: error.message})
    }
}

exports.postAddTask = async (req, res) => {
    const { TaskDescription,TaskStatus } = req.body;
    const task = await prisma.task.create({
        data: { TaskDescription: TaskDescription,
            TaskStatus: TaskStatus
        }
    });
    res.status(201).json(task);
}

exports.putUpdateTask = async (req, res) => {
    const{id} = req.params;
    const { TaskDescription,TaskStatus } = req.body;

    try {
        const updateUser = await prisma.task.update({
            where: {Id: parseInt(id)},
            data: { TaskDescription: TaskDescription,
                    TaskStatus: TaskStatus
                }
        })
        res.json(updateUser);
    }catch (error){
        res.status(400).json({error: error.message});
    }
}

exports.deleteTask = async (req, res) => {
    const {id} = req.params;
    try{
        const deleteUser = await prisma.task.delete({where: {Id: parseInt(id)}});
        res.json(deleteUser);
    }catch (error){
        res.status(400).json({error: error.message});
    }
}