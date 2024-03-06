import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import Container from "./components/Container";
import Header from "./components/Header";
import InputTask from "./components/InputTask";
import TaskContent from "./components/TaskContent";

function App() {
  //pasar las tareas a local storage
  let initialTasks = JSON.parse(localStorage.getItem("task"));

  if (!initialTasks) {
    initialTasks = [];
  }

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    if (initialTasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, [initialTasks, tasks]);

  const createTask = (task) => {
    //hacemos copia de todas las tareas que tenemos ya guardadas y le pasamos la nueva tarea para añadirla al resto
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    const currentTask = tasks.filter((task) => task.idTask !== id);
    setTasks(currentTask);
  }
  

  return (
    <Container>
      <Header />
      <InputTask createTask={createTask} />
      <TaskContent tasks = {tasks} deleteTask = {deleteTask}/>
    </Container>
  );
}

export default App;
