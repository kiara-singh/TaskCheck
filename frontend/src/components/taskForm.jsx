import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialData, buttonText }) {
  const [taskData, setTaskData] = useState(initialData);

  useEffect(() => {
      setTaskData(initialData); 
  }, [initialData]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitting:", taskData); 
      onSubmit(taskData); 
  };

  return (
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="name"
              value={taskData.name || ''}  
              onChange={handleChange}
              placeholder="Task Name"
              required
          />
          <button type="submit">{buttonText}</button>
      </form>
  );
}


export default TaskForm;
