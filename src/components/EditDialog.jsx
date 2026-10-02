const EditDialog = ({
  dialogRef,
  editTitle,
  setEditTitle,
  editError,
  setEditError,
  saveEdit,
  closeEditDialog
}) => {

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  return (
    <dialog ref={dialogRef}>

      <h2>Edit Task</h2>

      {editError && (
        <p className="error">
          {editError}
        </p>
      )}

      <input
        type="text"
        value={editTitle}
        onChange={(e) => {
          setEditTitle(e.target.value);
          setEditError("");
          // Clear error when typing
          // setEditError is handled in App
        }}
        onKeyDown={handleKeyDown}
        autoFocus
      />

      <div className="dialog-buttons">

        <button onClick={saveEdit}>
          Save
        </button>

        <button onClick={closeEditDialog}>
          Cancel
        </button>

      </div>

    </dialog>
  );
};

export default EditDialog;