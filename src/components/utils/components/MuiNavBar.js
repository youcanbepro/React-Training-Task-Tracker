import { AppBar, Avatar,  Fab, IconButton, Stack, styled, Toolbar, Tooltip, Typography } from '@mui/material'
import { blue } from '@mui/material/colors';
import CatchingPokemonIcon from '@mui/icons-material/Dashboard'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import { TaskStore } from '../TaskStore';
import { msgAction } from '../../BackendDeclarations';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});
export const MuiNavBar = () => {
    const {sendMsg,allTasks} = TaskStore.useStore()
  return (
    <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }} color='primary'>
        <Toolbar>
                 
            <IconButton size='large' edge="start" color='inherit' aria-label='logo'>
                <CatchingPokemonIcon/>
                </IconButton>
                <Typography variant='h6' component="div" sx={{flexGrow:1}}>
                    TASKMASTER
                </Typography>
                <Stack direction={'row'} spacing={2}>
       
                <Tooltip sx={{zIndex:100}} title="Create Task" arrow  placement='top'open={allTasks()===0}>
       <StyledFab color="primary" aria-label="add" onClick={()=>sendMsg({msgAc:msgAction.create}) }>
            <AddIcon />
          </StyledFab>
    </Tooltip>
               <Avatar sx={{ bgcolor: blue[500]   }}>RR</Avatar>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}
