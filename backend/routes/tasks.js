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




module.exports = router;
