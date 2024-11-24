import React, { useState } from 'react'
import {  Box, Typography, Button, Grid, Divider, Snackbar } from '@mui/material';
import { TaskStore } from '../../utils/TaskStore';
import { useLongPress } from '../../utils/useLongPress';
import { MuiDialog } from '../../utils/components/MuiDialog';
import { msgAction } from '../../BackendDeclarations';
import Alert from '@mui/material/Alert';

export const TaskListItem = (task) => {
   const {handleTaskClick,sendMsg,msg} = TaskStore.useStore()
  const [visible, setVisible]= useState(false)
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
    < >
        <Grid   key={task.task.id} container justifyContent={"space-between"}>
                <Grid style={{pointerEvents: task.task.completed===true?"none":"all"}} item {...useLongPress(() =>  
                   sendMsg({id:task.task.id,msgAc:msgAction.edit}), { ms: 1500 })}>
                  <Typography
                    style={{ textDecoration: task.task.completed ? 'line-through' : 'none', }}
                    onClick={() => {
                      if(msg.msgAc===msgAction.edit) return false
                       handleTaskClick(task.task.id)
                        setSnackVisibility(true)
                      }}
                  >
                    {task.task.text}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant='contained' onClick={() => {
                    setVisible(true)
                    sendMsg({id:task.task.id,msgAc:msgAction.delete})

                  } }>Delete</Button>
                </Grid>
              </Grid>
              <Box my={2}>
                <Divider />
              </Box>
              {visible && <MuiDialog open={visible} onClose={setVisible}/>}
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
    </>

  )
}
