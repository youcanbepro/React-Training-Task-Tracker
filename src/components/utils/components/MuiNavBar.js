import { AppBar, Avatar, Chip, Fab, IconButton, Stack, styled, Toolbar, Tooltip, Typography } from '@mui/material'
import { green, pink } from '@mui/material/colors';
import CatchingPokemonIcon from '@mui/icons-material/Dashboard'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

export const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});
export const MuiNavBar = () => {
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
       
                <Tooltip title="Create Task" arrow  placement='top' >
       <StyledFab color="primary" aria-label="add">
            <AddIcon />
          </StyledFab>
    </Tooltip>

               <Avatar sx={{ bgcolor: green[500]   }}>RR</Avatar>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}
