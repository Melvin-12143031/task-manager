const DeleteDialog = ({
  dialogRef,
  taskToDelete,
  confirmDelete,
  closeDeleteDialog
}) => {
  return (
    <dialog ref={dialogRef}>

      <h2>Delete Task?</h2>

      <p>
        Are you sure you want to delete "
        {taskToDelete?.title}
        "?
      </p>

      <div className="dialog-buttons">

        <button onClick={confirmDelete}>
          Delete
        </button>

        <button onClick={closeDeleteDialog}>
          Cancel
        </button>

      </div>

    </dialog>
  );
};

export default DeleteDialog;