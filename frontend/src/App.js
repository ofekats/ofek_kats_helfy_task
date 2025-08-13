import { useState, useEffect } from "react";
import * as tasksService from "./services/tasksService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import "./style/styles.css";


function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  async function fetchTasks(){
    const data = await tasksService.getAllTasks();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(task){
    const newTask = await tasksService.addTask(task);
    setTasks([...tasks, newTask]);
  }

  async function deleteTask(taskId){
    await tasksService.deleteTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  async function toggleTask(taskId){
    const updatedTask = await tasksService.toggleTask(taskId);
    setTasks(tasks.map(t => (t.id === taskId ? updatedTask : t)));
  }

  function getFilteredTasks(tasks, filter) {
    return tasks.filter(task => {
      if (filter === "all"){
        return true;
      }
      if (filter === "completed"){
        return task.completed;
      }
      if (filter === "pending"){
        return !task.completed;
      }
  });
}

  return (
    <>
      <TaskForm
      addTask={addTask}/>
      
      <TaskFilter filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={getFilteredTasks(tasks, filter)}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </>
  );
}

export default App;
