import { useState, useEffect } from "react";
import * as tasksService from "./services/tasksService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";


function App() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <>
      <TaskForm
      addTask={addTask}/>
      <TaskList 
      tasks={tasks}
      toggleTask={toggleTask}
      deleteTask={deleteTask}/>
    </>
  );
}

export default App;
