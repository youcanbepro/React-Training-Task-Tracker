import React from 'react'
import { Paper, Box, Typography,  } from '@mui/material';
import { TaskStore } from '../utils/TaskStore';
import { TaskListItem } from './taskListItem/TaskListItem';


export const TaskList = () => {

    const {tasks} = TaskStore.useStore()

  return (
    <Box mx={5} my={5}>
      <Paper mx={5}>
        <Box mx={5}>
          <Box pt={3} pb={5}>
            <Typography variant='h4'>Task Tracker</Typography>
          </Box>
          {tasks.map(task => (
             <TaskListItem task={task}/>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}
