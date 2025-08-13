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
        return res.status(400).json({ error: "Title is required and must be a string" });
    }
    const validPriorities = ["low", "medium", "high"];
    if (priority && !validPriorities.includes(priority)) {
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
    res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update a task
router.put("/:id", (req, res) => {
    console.log("Update a task");
    const taskId = parseInt(req.params.id);
    const task = data.tasks.find(t => t.id === taskId);

    if (!task) {
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

    res.json(task);
});


module.exports = router;
