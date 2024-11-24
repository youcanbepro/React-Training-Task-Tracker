import { TaskForm } from "./components/taskForm/TaskForm";
import { TaskList } from "./components/taskList/TaskList";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TaskStore } from './components/utils/TaskStore';
/**
 * Simple task tracker app.
 * (For training purposes)
 */

function App() {
    const {tasks,tasksHistory} = TaskStore.useStore()

  return (

    <>
     <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
        <TaskList title={"Task Tracker"} tasks={tasks} />
          <TaskList  title={"Task History"} tasks={tasksHistory} />
    </>
  );
}

export default App;