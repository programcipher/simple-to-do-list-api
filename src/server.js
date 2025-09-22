require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskController = require('./controllers/task');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/tasks', taskController.getRetrieveTasks);
app.get('/tasks/:id', taskController.getRetrieveTask);
app.post('/tasks', taskController.postAddTask);
app.put('/tasks/:id', taskController.putUpdateTask);
app.delete('/tasks/:id', taskController.deleteTask);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})