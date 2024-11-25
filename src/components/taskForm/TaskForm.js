
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Dialog, Paper, Stack, TextField, Typography } from '@mui/material';
import { TaskStore } from '../utils/TaskStore';
import { msgAction } from '../BackendDeclarations';
import { useState } from 'react';
import MuiColorSelect from '../utils/components/MuiColorSelect';


export const TaskForm = () => {

  const [title,setTitle]=useState("")
  const [summary,setSummary]=useState("")

    const {handleCreateTask,sendMsg,msg} = TaskStore.useStore()
  return (
    
     <Dialog
     open={msg.msgAc===msgAction.create}
     onClose={()=>{sendMsg({msgAc:msgAction.none})}}
    aria-labelledby='dialog-title'
    aria-describedby='dialog-description'>
        <Box mx={5}>
          <Box pt={3} pb={5}>
            <Typography variant='h6'>Add Task</Typography>
          </Box>
          <Stack spacing={2}>
 <Stack direction={"column"} spacing={3}>
  <TextField required variant='outlined' label='Enter Title' onChange={(event)=>{setTitle(event.target.value)}}></TextField>
<TextField multiline minRows={3} variant='outlined' label='Enter Description' onChange={(event)=>{setSummary(event.target.value)}}></TextField>
 </Stack>
<MuiColorSelect/>


          </Stack>
          <Box pt={3} pb={5}>
               <Button variant='contained' onClick={() => {
                  handleCreateTask({text:title,summary:summary})
sendMsg({msgAc:msgAction.none})
                  } }>Create Task</Button>
          </Box>
        
        </Box>
        

    </Dialog>
  )
}


