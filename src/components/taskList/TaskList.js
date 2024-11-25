import React from 'react'
import { Paper, Box, Typography, Chip, Badge,  } from '@mui/material';
import { TaskCard } from './taskListItem/TaskCard';


export const TaskList = ({title,tasks}) => {

const getTitleColor =()=>{
  if(title.toString()==="Backlog")
      return "warning"
    else  if(title.toString()==="In Progress")
      return "primary"
}
  return (
    <Box sx={{flexGrow:".33"}} elevation={2} >
    <Box mx={5} my={5} >
        <Box mx={5}>
          <Box pt={3} pb={5} sx={{display:"flex", justifyContent:"center" } }>
            <Chip color={getTitleColor()} label={title} />
              <Badge badgeContent={tasks.length} showZero color='primary'>
              </Badge> 
          </Box>
          {tasks.map(task => (
             <TaskCard  title={title} task={task}/>
          ))}
        </Box>
    </Box>
    </Box>
  )
}
