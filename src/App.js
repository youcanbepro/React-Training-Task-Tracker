import { TaskForm } from "./components/taskForm/TaskForm"
import { MemoTaskList } from "./components/taskList/TaskList"

import { TaskStore } from "./components/utils/TaskStore"
import { MuiNavBar } from "./components/utils/components/MuiNavBar"
import { Box, Container, CssBaseline, Stack, styled, Typography } from "@mui/material"
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
    <>
      <Container maxWidth="sm">
        <MuiNavBar />
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }} pb={4}>
          <Stack spacing={1} direction={"row"}>
            <MemoTaskList title="Backlog" tasks={tasks} />
            <MemoTaskList title="In Progress" tasks={wipTasks} />
            <MemoTaskList title="Completed" tasks={tasksHistory} />
          </Stack>
          {msg.msgAc === msgAction.create && (
            <StyledBox>
              <TaskForm></TaskForm>
            </StyledBox>
          )}
          <MuiDialog />
          {allTasks() === 0 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body1" color={"text.secondary"}>
                {" "}
                No tasks found.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default App
