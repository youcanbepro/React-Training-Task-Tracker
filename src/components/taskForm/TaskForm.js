
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';


export const TaskForm = () => {
  return (
    <>
        <Box sx={{ alignItems:"center"}} mx={5} my={5}>
      <Paper elevation={12} mx={5}>
        <Box mx={5}>
          <Box pt={3} pb={5}>
            <Typography variant='h6'>Add Task</Typography>
          </Box>
          <Stack spacing={2}>
 <Stack direction={"column"} spacing={3}>
  <TextField required variant='outlined' label='Enter Title'></TextField>
<TextField multiline minRows={3} variant='outlined' label='Enter Description'></TextField>
 </Stack>

          </Stack>
          <Box pt={3} pb={5}>
               <Button variant='contained' onClick={() => {
                  

                  } }>Create Task</Button>
          </Box>
        
        </Box>
        
      </Paper>
    </Box>
    </>
  )
}


