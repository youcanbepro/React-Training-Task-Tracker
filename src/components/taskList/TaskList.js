import React from 'react'
import { Paper, Box, Typography, Chip,  } from '@mui/material';

import { TaskListItem } from './taskListItem/TaskListItem';
import { TaskCard } from './taskListItem/TaskCard';


export const TaskList = ({title,tasks}) => {

const getTitleColor =()=>{
  if(title.toString()==="Backlog")
      return "warning"
    else  if(title.toString()==="In Progress")
      return "primary"
}

  return (
    <Box mx={5} my={5}>
        <Box mx={5}>
          <Box pt={3} pb={5} sx={{display:"flex", justifyContent:"center" } }>
            <Chip color={getTitleColor()} label={title}  />
          </Box>
          {tasks.map(task => (
             <TaskCard task={task}/>
          ))}
           
        </Box>
    </Box>
  )
}
