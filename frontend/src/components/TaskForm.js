import { useState } from "react";

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

function TaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle){
            alert("Title cannot be empty!");
            return;
        }

        const newTask = {
            title: trimmedTitle,
            description: description,
            priority: priority,
            completed: false,
            createdAt: new Date(),
        };

        addTask(newTask);
        setTitle("");
        setDescription("");
        setPriority("low");
        }

    return (
        <div className="TaskForm">
            <h2>Add new task:</h2>
            <form onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <br />
            <button type="submit">Add Task</button>
            </form>
        </div>
    );
}


export default TaskForm;