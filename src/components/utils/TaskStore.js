
import React, { useContext, useEffect,  useState } from "react"
import { msgAction } from "../BackendDeclarations"

function createStore() {
  const Context = React.createContext()

  function Provider({ children }) {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setcompletedTasks] = useState([])
    const [wipTasks, setWipTasks] = useState([])
    const [msg, setMsg]=useState({id:"",msg:msgAction.cancel})
    /**
   * Handles the click on the delete button and removes it from the tasks list.
   *
   * @param {Array} updatedTasks
   */
      const saveTasks = (updatedTasks)=>{
      localStorage.setItem("tasks",JSON.stringify(updatedTasks))
   }

   useEffect(() => {
  const tasksLocal = localStorage.getItem("tasks")
    if (tasksLocal)
    setTasks(JSON.parse(tasksLocal))
    },[])
      
 /**
   * Handles the click on the delete button and removes it from the tasks list.
   *
   * @param {number} taskId
   */
  const handleTaskDelete = (taskId) => {
    // Filter all tasks excpet task with passed id
   if(tasks.find((task)=>task.id===taskId))
   {
       setTasks(tasks.filter(task => task.id !== taskId));
  return
   }
 
    if(wipTasks.find((task)=>task.id===taskId))
    {
     setWipTasks( wipTasks.filter(task => task.id !== taskId));
return
    }
      if(completedTasks.find((task)=>task.id===taskId))
      {setcompletedTasks(completedTasks.filter(task => task.id !== taskId));}
      // saveTasks(updatedTasks)
  };

   const handleTaskMove = (taskId) => {
    // Filter all tasks excpet task with passed id
    const taskFound = tasks.find(task => task.id === taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks)
    setWipTasks([...wipTasks, taskFound]);

   // saveTasks(updatedTasks)
  };
   const handleTaskMoveBack = (taskId) => {
    // Filter all tasks excpet task with passed id
    const taskFound = wipTasks.find(task => task.id === taskId);
    const updatedTasks = wipTasks.filter(task => task.id !== taskId);
    setWipTasks(updatedTasks)
    setTasks([...tasks, taskFound]);

   // saveTasks(updatedTasks)
  };
    /**
   * Handels the click on a task and toggles the complete property of the task object.
   *
   * @param {number} taskId
   */
  const handleTaskClick = (taskId) => {
    // Iterate all tasks and find passed task by id
    const updatedTask = wipTasks.find(task => task.id === taskId
    );
     const updatedTasks = wipTasks.filter(task => task.id !== taskId);
    setWipTasks(updatedTasks) 
    setcompletedTasks([...completedTasks,{...updatedTask,completed:true}]);
   // saveTasks(updatedTasks)
  };

    /**
   * Creates a new task
   *
   * @param {text,summary} task
   */
  const handleCreateTask= ({text,summary,prio,color}) => {

    // generate a unique id
   setTasks([...tasks,{id:"r"+Math.random()+(+tasks.length+1),...{text,summary,prio,color},completed:false} ])
  };

    const contextObject = {
      tasks,
      allTasks:()=> wipTasks.length+completedTasks.length+tasks.length,
      setTasks,
      handleTaskDelete,
      saveTasks,
      handleTaskClick,
      sendMsg:setMsg,
      msg,
      tasksHistory:completedTasks,
      wipTasks,
      setWipTasks,
      handleCreateTask,
      handleTaskMove,
      handleTaskMoveBack
    }

    return <Context.Provider value={contextObject}>{children}</Context.Provider>
  }

  const useStore = () => useContext(Context)
  return { Provider, useStore }
}

export const TaskStore = createStore()
