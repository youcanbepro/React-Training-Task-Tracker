import { TaskForm } from "./components/taskForm/TaskForm";
import { TaskList } from "./components/taskList/TaskList";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TaskStore } from './components/utils/TaskStore';
import { MuiNavBar } from "./components/utils/components/MuiNavBar";
import { Divider, Stack } from "@mui/material";
import { msgAction } from "./components/BackendDeclarations";
/**
 * Simple task tracker app.
 * (For training purposes)
 */

function App() {
    const {tasks,msg,tasksHistory,wipTasks} = TaskStore.useStore()

  return (
    <>
<MuiNavBar/>
<Stack   spacing={1} direction={'row'} >
        <TaskList title="Backlog" tasks={tasks} />
        <TaskList title="In Progress" tasks={wipTasks} />
        <TaskList  title="Completed" tasks={tasksHistory} />
        { msg.msgAc===msgAction.create&&<TaskForm></TaskForm>}
</Stack>
  

    </>

  );
}

export default App;