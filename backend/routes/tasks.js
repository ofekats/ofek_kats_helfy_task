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
    console.log("send all tasks");
    res.json(data.tasks);
});




module.exports = router;
