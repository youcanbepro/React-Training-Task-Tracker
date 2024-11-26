import React from "react"
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { TaskStore } from "../TaskStore"
import { msgAction } from "../../BackendDeclarations"

export const MuiDialog = () => {
  const { msg, sendMsg, handleTaskDelete } = TaskStore.useStore()
  return (
    <Dialog
      open={msg.msgAc === msgAction.delete}
      onClose={() => sendMsg({ msgAc: msgAction.none })}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">Delete Task ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">Are you sure that you want to delete this Task?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => sendMsg({ msgAc: msgAction.none })}>No</Button>
        <Button
          variant="contained"
          onClick={() => {
            sendMsg({ msgAc: msgAction.none })
            handleTaskDelete(msg.id)
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
