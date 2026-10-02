const TaskCounter = ({
  allTasks,
  completedTasks,
  incompleteTasks
}) => {
  return (
    <div className="task-counter">

      <span className="counter all">
        <i></i>
        All: {allTasks}
      </span>

      <span className="counter completed">
        <i></i>
        Completed: {completedTasks}
      </span>

      <span className="counter incomplete">
        <i></i>
        Incomplete: {incompleteTasks}
      </span>

    </div>
  );
};

export default TaskCounter;