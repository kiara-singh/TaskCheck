import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData = {}, buttonText = "Save Task" }) => {
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    if (initialData.name) {
      setTaskName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    onSubmit({ ...initialData, name: taskName }); // Pass updated or new task to onSubmit
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Task Name</label>
        <input
          type="text"
          className="form-control"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} // Update task name as user types
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        {buttonText} {/* Button text based on mode */}
      </button>
    </form>
  );
};

export default TaskForm;
