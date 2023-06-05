import { Paper, Box, Typography, Button, Grid, Divider } from '@mui/material';
import { useState } from 'react';

/**
 * Simple task tracker app.
 * (For training purposes)
 */
function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false }
  ]);

  /**
   * Handels the click on a task and toggles the complete property of the task object.
   *
   * @param {number} taskId
   */
  const handleTaskClick = (taskId) => {
    // Iterate all tasks and find passed task by id
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        // Toggle completed property
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  /**
   * Handles the click on the delete button and removes it from the tasks list.
   *
   * @param {number} taskId
   */
  const handleTaskDelete = (taskId) => {
    // Filter all tasks excpet task with passed id
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <Box mx={5} my={5}>
      <Paper mx={5}>
        <Box mx={5}>
          <Box pt={3} pb={5}>
            <Typography variant='h4'>Task Tracker</Typography>
          </Box>
          {tasks.map(task => (
            <>
              <Grid key={task.id} container justifyContent={"space-between"}>
                <Grid item>
                  <Typography
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    onClick={() => handleTaskClick(task.id)}
                  >
                    {task.text}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant='contained' onClick={() => handleTaskDelete(task.id)}>Delete</Button>
                </Grid>
              </Grid>
              <Box my={2}>
                <Divider />
              </Box>
            </>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default App;