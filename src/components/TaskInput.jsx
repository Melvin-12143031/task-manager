const TaskInput = ({
  input,
  setInput,
  addTask,
  setError
}) => {

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="input-section">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError("");
        }}
        onKeyDown={handleKeyDown}
        placeholder="Enter new task..."
      />

      <button onClick={addTask}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;