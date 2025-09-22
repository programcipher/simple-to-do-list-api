const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();

exports.getRetrieveTasks = async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
}

exports.postAddTask = async (req, res) => {
    const { TaskDescription } = req.body;
    const task = await prisma.task.create({
        data: { TaskDescription }
    });
    res.status(201).json(task);
}

exports.putUpdateTask = async (req, res) => {
    const{id} = req.params;
    const { TaskDescription } = req.body;

    try {
        const updateUser = await prisma.task.update({
            where: {Id: parseInt(id)},
            data: {TaskDescription: TaskDescription}
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