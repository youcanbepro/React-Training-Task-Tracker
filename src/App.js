import { TaskForm } from "./components/taskForm/TaskForm"
import { TaskList } from "./components/taskList/TaskList"

import { TaskStore } from "./components/utils/TaskStore"
import { MuiNavBar } from "./components/utils/components/MuiNavBar"
import { Box, Container, Stack, styled, Typography } from "@mui/material"
import { msgAction } from "./components/BackendDeclarations"
import { MuiDialog } from "./components/utils/components/MuiDialog"

/**
 * Simple task tracker app.
 * (For training purposes)
 */
const StyledBox = styled(Box)({
  position: "fixed",
  zIndex: 1051,
  top: 100,
  left: 0,
  right: 0,
  margin: "0 auto"
})
function App() {
  const { tasks, msg, tasksHistory, wipTasks, allTasks } = TaskStore.useStore()

  return (
    <Container>
      <MuiNavBar />
      <Box pb={4}>
        <Stack spacing={1} direction={"row"}>
          <TaskList title="Backlog" tasks={tasks} />
          <TaskList title="In Progress" tasks={wipTasks} />
          <TaskList title="Completed" tasks={tasksHistory} />
        </Stack>
        {msg.msgAc === msgAction.create && (
          <StyledBox>
            <TaskForm></TaskForm>
          </StyledBox>
        )}
        <MuiDialog open={msg.msgAc === msgAction.delete} />
        {allTasks() === 0 && (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body1" color={"text.secondary"}>
              {" "}
              No tasks found.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default App
