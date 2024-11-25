import { Box, Card, CardContent, Typography, Button, Grid, Divider, Snackbar, CardActions, Tooltip, Paper, TextField  } from '@mui/material'
import React, { useState } from 'react'
import { TaskStore } from '../../utils/TaskStore';
import { useLongPress } from '../../utils/useLongPress';
import { msgAction } from '../../BackendDeclarations';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import "./taskCard.css"

export const TaskCard = ({task, title}) => {
      const {handleTaskClick,sendMsg,msg} = TaskStore.useStore()
   const [snackVisibility, setSnackVisibility]= useState(false)

  const handleClose = (
    event,
    reason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
   setSnackVisibility(false)
  };



  return (
    <Box sx={{position:"relative"}}>
    { task.id===msg.id&&msg.msgAc===msgAction.toDelete&&<Tooltip   title="Delete Task" arrow  placement='top' >
       <Fab sx={{position:"absolute"}} size='small' color="primary" aria-label="delete"  onClick={() => {
                    sendMsg({id:task.id,msgAc:msgAction.delete})
                  } }>
            <DeleteIcon />
          </Fab>
    </Tooltip>}
     <Box className={task.id===msg.id&&msg.msgAc===msgAction.toDelete&&"jiggle"} key={task.id} width={"300px"} padding={"10px"} {...useLongPress(() =>  
                   sendMsg({id:task.id,msgAc:msgAction.toDelete}), { ms: 1500 })}>
                    

    <Card>
    <CardContent>
        <Paper  elevation={1} sx={{display:"flex",justifyContent:"center" , alignItems:"center", height:80}}>
        <Typography  style={{ textDecoration: task.completed ? 'line-through' : 'none', }} gutterBottom variant='h6' component={'div'}>{task.text}</Typography>
        </Paper>
    <Typography  sx={{display:"flex",justifyContent:"center" , alignItems:"center", height:50}}  variant='body2' color={'text.secondary'}>{task.summary}</Typography>
    </CardContent>
    <CardActions sx={{display:"flex"}}>
<Box sx={{display:"flex",flexDirection:"row-reverse",gap:"10px", justifyContent:"end" }}>
  {title==="Backlog"&&<Tooltip   title="Move to WIP" arrow  placement='top' >
       <Fab size='small' color="primary" aria-label="move"  onClick={() => {
                  } }>
            <SendIcon />
          </Fab>
    </Tooltip>}
   

   {title==="In Progress"&&<Tooltip title="Complete" arrow  placement='top' >
       <Fab size='small' color="primary" aria-label="complete"  onClick={() => {
                  
                  } }>
            <DoneIcon />
          </Fab>
    </Tooltip>}
</Box>
</CardActions>
</Card>

{<Snackbar autoHideDuration={2000} open={snackVisibility} onClose={handleClose}>
              <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         Congratulations on completing the task !!!
        </Alert>
            </Snackbar>
              }

    </Box>
    </Box>
     
   
  )
}
