const express = require("express");
const router = express.Router();
const data = require("../data/task_arr");

/*
data example:
 {
 id:number
 title:string
 description:string
 completed:boolean
 createdAt:Date
 priority:'low' | 'medium'| 'high'
*/

// GET /api/tasks - Get all tasks
router.get("/", (req, res) => {
    console.log("Get all tasks");
    res.json(data.tasks);
});

// POST /api/tasks - Create a new task
router.post("/", (req, res) => {
    console.log("Create a new task");
    const { title, description, completed, priority, createdAt } = req.body;
    
    //validate data
    if (!title || typeof title !== "string") {
        console.error("Title is required and must be a string");
        return res.status(400).json({ error: "Title is required and must be a string" });
    }
    const validPriorities = ["low", "medium", "high"];
    if (priority && !validPriorities.includes(priority)) {
        console.error("Priority must be 'low', 'medium' or 'high'");
        return res.status(400).json({ error: "Priority must be 'low', 'medium' or 'high'" });
    }

    const newTask = {
        id: data.nextId++,
        title,
        description: description || "",
        completed: completed || false,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        priority: priority || "low"
    };


    data.tasks.push(newTask);
    console.log("New task created id:", newTask.id);
    res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update a task
router.put("/:id", (req, res) => {
    console.log("Update a task");
    const taskId = parseInt(req.params.id);
    const task = data.tasks.find(t => t.id === taskId);

    if (!task) {
        console.error("Task not found");
        return res.status(404).json({ error: "Task not found" });
    }

    const { title, description, completed, priority } = req.body;

    //validate data and change it
    if (title !== undefined && typeof title === "string"){
        task.title = title;
    } 
    if (description !== undefined && typeof description === "string"){
        task.description = description;
    } 
    if (completed !== undefined && typeof completed === "boolean"){
        task.completed = completed;
    } 
    const validPriorities = ["low", "medium", "high"];
    if (priority !== undefined && validPriorities.includes(priority)){
        task.priority = priority;
    } 
    console.log("Task updated id:", taskId);
    res.json(task);
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", (req, res) => {
    console.log("Delete a task");
    const taskId = parseInt(req.params.id);
    const indexToDel = data.tasks.findIndex(t => t.id === taskId);
    if (indexToDel === -1){
        console.error("Task not found");
        return res.status(404).json({ error: "Task not found" });
    } 
    data.tasks.splice(indexToDel, 1);
    console.log("Task deleted id:", taskId);
    res.status(204).send();
});

//PATCH /api/tasks/:id/toggle - Toggle task completion status
router.patch("/:id/toggle", (req, res) => {
    console.log("Toggle task completion status");
    const taskId = parseInt(req.params.id);
    const task = data.tasks.find(t => t.id === taskId);

    if (!task) {
        console.error("Task not found");
        return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed;
    console.log("Task id:", taskId, " completion toggled to ", task.completed);

    res.json(task);
});

module.exports = router;
