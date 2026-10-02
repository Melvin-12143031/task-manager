import { useRef, useState } from "react";
import initialTasks from "./data/tasks.json"
import "./App.css";

import Task from "./components/Task";
import TaskCounter from "./components/TaskCounter";
import SearchBar from "./components/SearchBar";
import TaskInput from "./components/TaskInput";
import EditDialog from "./components/EditDialog";
import DeleteDialog from "./components/DeleteDialog";


const App = () => {

  // ====================
  // State
  // ====================

  const [tasks, setTasks] = useState(initialTasks);

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editError, setEditError] = useState("");

  const [deleteTaskId, setDeleteTaskId] = useState(null);

  // Dialog refs

  const editDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);


  // ====================
  // Add Task
  // ====================

  const addTask = () => {
    const title = input.trim();

    if (!title) {
      setError("You cannot input an empty task.");
      return;
    }

    const alreadyExists = tasks.some(
      (task) =>
        task.title.toLowerCase() === title.toLowerCase()
    );

    if (alreadyExists) {
      setError("Task already exists!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask
    ]);

    setInput("");
    setError("");
  };


  // ====================
  // Edit Task
  // ====================

  const editTask = (id) => {
    const task = tasks.find(
      (task) => task.id === id
    );

    if (!task) return;

    setEditTaskId(id);
    setEditTitle(task.title);
    setEditError("");

    editDialogRef.current?.showModal();
  };


  const saveEdit = () => {
    const title = editTitle.trim();

    if (!title) {
      setEditError("Task title cannot be empty.");
      return;
    }

    const alreadyExists = tasks.some(
      (task) =>
        task.id !== editTaskId &&
        task.title.toLowerCase() === title.toLowerCase()
    );

    if (alreadyExists) {
      setEditError("Task already exists!");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTaskId
          ? { ...task, title }
          : task
      )
    );

    closeEditDialog();
  };


  const closeEditDialog = () => {
    setEditTaskId(null);
    setEditTitle("");
    setEditError("");

    editDialogRef.current?.close();
  };


  // ====================
  // Delete Task
  // ====================

  const deleteTask = (id) => {
    setDeleteTaskId(id);

    deleteDialogRef.current?.showModal();
  };


  const confirmDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task.id !== deleteTaskId
      )
    );

    closeDeleteDialog();
  };


  const closeDeleteDialog = () => {
    setDeleteTaskId(null);

    deleteDialogRef.current?.close();
  };


  // ====================
  // Toggle Task
  // ====================

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed
          }
          : task
      )
    );
  };


  // ====================
  // Counters
  // ====================

  const allTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const incompleteTasks = tasks.filter(
    (task) => !task.completed
  ).length;


  // ====================
  // Search
  // ====================

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // ====================
  // JSX
  // ====================

  return (
    <div className="todo-app">
      <div className="app-header">
        <h1>Melvin's Task</h1>
      </div>

      <TaskInput
        input={input}
        setInput={setInput}
        addTask={addTask}
        setError={setError}
      />

      {error && (<p className="error">{error}</p>)}

      <SearchBar
        search={search}
        setSearch={setSearch}
        setError={setError}
      />

      <TaskCounter
        allTasks={allTasks}
        completedTasks={completedTasks}
        incompleteTasks={incompleteTasks}
      />

      <ul>
        {filteredTasks.map((task) =>
          <Task
            id={task.id}
            title={task.title}
            completed={task.completed}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        )}
      </ul>



      <EditDialog
        dialogRef={editDialogRef}
        editTitle={editTitle}
        editError={editError}
        setEditTitle={setEditTitle}
        setEditError={setEditError}
        saveEdit={saveEdit}
        closeEditDialog={closeEditDialog}
      />

       <DeleteDialog 
       dialogRef={deleteDialogRef}
       taskToDelete={tasks.find((task) => task.id === deleteTaskId)}
       confirmDelete={confirmDelete}
       closeDeleteDialog={closeDeleteDialog}
       /> 

    </div>
  );
};

export default App;