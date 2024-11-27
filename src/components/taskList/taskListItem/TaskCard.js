import {
  Box,
  Card,
  CardContent,
  Typography,
  Snackbar,
  CardActions,
  Tooltip,
  Paper,
  Chip,
  Stack,
  Divider
} from "@mui/material"
import React, { useState } from "react"
import { TaskStore } from "../../utils/TaskStore"
import { useLongPress } from "../../utils/useLongPress"
import { msgAction } from "../../BackendDeclarations"
import Alert from "@mui/material/Alert"
import Fab from "@mui/material/Fab"
import DoneIcon from "@mui/icons-material/Done"
import DeleteIcon from "@mui/icons-material/Delete"
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined"
import "./taskCard.css"

export const TaskCard = ({ task, title }) => {
  const { handleTaskClick, sendMsg, msg, handleTaskMove, handleTaskMoveBack } = TaskStore.useStore()
  const [snackVisibility, setSnackVisibility] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackVisibility(false)
  }

  const getChipLabel = () => {
    if (task.prio === 0) return "None"
    if (task.prio === 1) return "Low"
    if (task.prio === 2) return "Medium"
    if (task.prio === 3) return "High"
  }

  const getChipColor = () => {
    if (task.prio === 0) return "secondary"
    if (task.prio === 1) return "success"
    if (task.prio === 2) return "warning"
    if (task.prio === 3) return "error"
  }

  const getBgColor = () => {
    return task.color
  }

  return (
    <Box sx={{ position: "relative" }}>
      {task.id === msg.id && msg.msgAc === msgAction.toDelete && (
        <Tooltip title="Delete Task" arrow placement="top">
          <Fab
            sx={{ position: "absolute" }}
            size="small"
            color="primary"
            aria-label="delete"
            onClick={() => {
              sendMsg({ id: task.id, msgAc: msgAction.delete })
            }}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
      )}
      <Box
        className={task.id === msg.id && msg.msgAc === msgAction.toDelete ? "jiggle" : ""}
        key={task.id}
        width={"300px"}
        padding={"10px"}
        {...useLongPress(() => sendMsg({ id: task.id, msgAc: msgAction.toDelete }), { ms: 1500 })}
        onPointerDown={() => {
          if (msg.msgAc === msgAction.toDelete) sendMsg({ msgAc: msgAction.none })
        }}
      >
        <Card elevation={task.completed ? 0 : 1} className={task.completed ? "disabled" : ""}>
          <CardContent>
            <Paper
              elevation={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: getBgColor(),
                height: 80
              }}
            >
              <Typography
                style={{ textDecoration: task.completed ? "line-through" : "none" }}
                gutterBottom
                variant="h6"
                component={"div"}
              >
                {task.text}
              </Typography>
            </Paper>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 50
              }}
              variant="body2"
              color={"text.secondary"}
            >
              {task.summary}
            </Typography>

            <Stack spacing={18} direction={"row"}>
              <Box>
                <Stack>
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 20
                      }}
                      variant="body2"
                      color={"text.secondary"}
                    >
                      Created:
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 20
                      }}
                      variant="body2"
                      color={"text.secondary"}
                    >
                      {task.createdOn}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              {task.completedOn && (
                <Box>
                  <Stack>
                    <Box>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 20
                        }}
                        variant="body2"
                        color={"text.secondary"}
                      >
                        Completed:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 20
                        }}
                        variant="body2"
                        color={"text.secondary"}
                      >
                        {task.completedOn}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
          <Divider />

          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            <Stack spacing={2} direction={"row"}>
              <Stack direction={"row-reverse"} spacing={15}>
                {title === "Backlog" && (
                  <Tooltip title="Move to WIP" arrow placement="top">
                    <Fab
                      size="small"
                      variant="extended"
                      color="primary"
                      aria-label="moveTo"
                      onClick={() => {
                        handleTaskMove(task.id)
                      }}
                    >
                      <MoveDownOutlinedIcon sx={{ transform: "rotate(-90deg) scaleX(-1)" }} />
                    </Fab>
                  </Tooltip>
                )}
                {title === "In Progress" && (
                  <Tooltip title="Complete" arrow placement="top">
                    <Fab
                      variant="extended"
                      size="small"
                      color="primary"
                      aria-label="complete"
                      onClick={() => {
                        handleTaskClick(task.id)
                        setSnackVisibility(true)
                      }}
                    >
                      <DoneIcon />
                    </Fab>
                  </Tooltip>
                )}
                {title === "In Progress" && (
                  <Tooltip title="Move to Backlog" arrow placement="top">
                    <Fab
                      size="small"
                      variant="extended"
                      color="primary"
                      aria-label="move"
                      onClick={() => {
                        handleTaskMoveBack(task.id)
                      }}
                    >
                      <MoveDownOutlinedIcon sx={{ transform: "rotate(90deg)" }} />
                    </Fab>
                  </Tooltip>
                )}
              </Stack>
              <Chip color={getChipColor()} label={getChipLabel()} />
            </Stack>
          </CardActions>
        </Card>

        {
          <Snackbar autoHideDuration={2000} open={snackVisibility} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
              Congratulations on completing the task !!!
            </Alert>
          </Snackbar>
        }
      </Box>
    </Box>
  )
}
