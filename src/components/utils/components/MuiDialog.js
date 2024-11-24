import React from 'react'
import { Button, Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { TaskStore } from '../TaskStore'
import { msgAction } from '../../BackendDeclarations'

export const MuiDialog = ({open,onClose}) => {
       const {msg,handleTaskDelete} = TaskStore.useStore()
  return (
     <Dialog 
     
     open ={open}
     onClose={()=>{onClose(false)}}
    aria-labelledby='dialog-title'
    aria-describedby='dialog-description'>
      <DialogTitle id="dialog-title">Delete Task ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">Are you sure you want to delete this Task?
          You can choose to move to History
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>onClose(false)}>No</Button>
        <Button variant='contained' onClick={()=>{onClose(false)
          if(msg.msgAc===msgAction.delete)
          {
            handleTaskDelete(msg.id)
          }

        }}>Yes</Button>
         <Button variant='contained' onClick={()=>{onClose(false)
          if(msg.msgAc===msgAction.delete)
          {
            handleTaskDelete(msg.id)
          }

        }}>Move</Button>
      </DialogActions>
    </Dialog>
  )
}
