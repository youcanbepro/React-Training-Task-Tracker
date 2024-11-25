import { TaskForm } from "./components/taskForm/TaskForm";
import { TaskList } from "./components/taskList/TaskList";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TaskStore } from './components/utils/TaskStore';
import { MuiNavBar, StyledFab } from "./components/utils/components/MuiNavBar";
import { Box, Divider, Stack, styled } from "@mui/material";
import { msgAction } from "./components/BackendDeclarations";
import { MuiDialog } from "./components/utils/components/MuiDialog";
import { useState } from "react";
/**
 * Simple task tracker app.
 * (For training purposes)
 */
const StyledBox = styled(Box)({
  position: 'fixed',
  zIndex: 1051,
  top: 100,
  left: 0,
  right: 0,
  margin: '0 auto',
});
function App() {
    const {tasks,msg,tasksHistory,wipTasks,sendMsg} = TaskStore.useStore()

  return (
    <>
<MuiNavBar/>
<Stack   spacing={1} direction={'row'} >
        <TaskList title="Backlog" tasks={tasks} />
        <TaskList title="In Progress" tasks={wipTasks} />
        <TaskList  title="Completed" tasks={tasksHistory} />
       
</Stack>
   { msg.msgAc===msgAction.create&&
   <StyledBox >
          <TaskForm></TaskForm>
          </StyledBox>
   }
   <MuiDialog open={msg.msgAc===msgAction.delete}/>

    </>

  );
}

export default App;