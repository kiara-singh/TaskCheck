import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialData, buttonText }) {
  const [taskData, setTaskData] = useState(initialData);

  useEffect(() => {
      setTaskData(initialData); // This will make sure `taskData` is updated with the full task, including _id
  }, [initialData]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitting:", taskData); // Log the task data to verify it's correct
      onSubmit(taskData); // This sends the full task data, including _id, to the parent
  };

  return (
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="name"
              value={taskData.name || ''}  // Bind to taskData.name
              onChange={handleChange}
              placeholder="Task Name"
              required
          />
          <button type="submit">{buttonText}</button>
      </form>
  );
}


export default TaskForm;
