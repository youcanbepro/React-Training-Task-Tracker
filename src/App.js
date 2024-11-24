import { TaskForm } from "./components/taskForm/TaskForm";
import { TaskList } from "./components/taskList/TaskList";

/**
 * Simple task tracker app.
 * (For training purposes)
 */

function App() {


  return (

    <>
        <TaskList />
        <TaskForm/>
    </>
  );
}

export default App;