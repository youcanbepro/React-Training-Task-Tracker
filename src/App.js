import { TaskForm } from "./components/taskForm/TaskForm";
import { TaskList } from "./components/taskList/TaskList";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TaskStore } from './components/utils/TaskStore';
import { MuiNavBar } from "./components/utils/components/MuiNavBar";
import { Divider, Stack } from "@mui/material";
/**
 * Simple task tracker app.
 * (For training purposes)
 */

function App() {
    const {tasks,tasksHistory} = TaskStore.useStore()

  return (
    <>
<MuiNavBar/>
<Stack  direction={'row'} divider={<Divider orientation="vertical" flexItem/>}>
        <TaskList title="Backlog" tasks={tasks} />
        <TaskList title="In Progress" tasks={tasksHistory} />
        <TaskList  title="Completed" tasks={tasksHistory} />
</Stack>
  

    </>

  );
}

export default App;