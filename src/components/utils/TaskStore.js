
import React, { useContext, useEffect, useState } from "react"
import { msgAction, popUpType } from "../BackendDeclarations"


 

function createStore() {
  const Context = React.createContext()

  function Provider({ children }) {
  
    const [tasks, setTasks] = useState([])
      const [completedTasks, setcompletedTasks] = useState([ { id: "r4", text: 'Deep  macho Dive',summary:"Performance enhancing",  completed: true } ])
    const [msg, setMsg]=useState({id:"",msg:msgAction.cancel})
    const [popUp, setPopUp]=useState({id:"",popUp:popUpType.none})

      const saveTasks= (updatedTasks)=>{
localStorage.setItem("tasks",JSON.stringify(updatedTasks))
   }
   useEffect(() => {
  const tasksLocal = localStorage.getItem("tasks")
    if (tasksLocal)
    setTasks(JSON.parse(tasksLocal))
else 
setTasks([
    { id: "r1", text: 'React Fundamentals',summary:"Get fimiliar with the basics ", completed: false },
    { id: "r2", text: 'Hooks',summary:"All the hooks ",  completed: false },
    { id: "r3", text: 'Deep Dive',summary:"Performance enhancing",  completed: false }
  ])
  // localStorage.clear()
    },[])
     useEffect(() => {
 switch (popUpType) {
    case popUpType.delete:
        
        break;
 
    default:
        break;
 }
    },[popUp])
 /**
   * Handles the click on the delete button and removes it from the tasks list.
   *
   * @param {number} taskId
   */
  const handleTaskDelete = (taskId) => {
    // Filter all tasks excpet task with passed id
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
       saveTasks(updatedTasks)
  };

   const handleTaskMove = (taskId) => {
    // Filter all tasks excpet task with passed id
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setcompletedTasks([...updatedTasks, completedTasks]);
   // saveTasks(updatedTasks)
  };
    /**
   * Handels the click on a task and toggles the complete property of the task object.
   *
   * @param {number} taskId
   */
  const handleTaskClick = (taskId) => {
    // Iterate all tasks and find passed task by id
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        // Toggle completed property
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks)
  };



    const contextObject = {
      tasks,

      setTasks,
      handleTaskDelete,
      saveTasks,
      handleTaskClick,
      sendMsg:setMsg,
      msg,
      popUp,
      setPopUp,
      tasksHistory:completedTasks
    }

    return <Context.Provider value={contextObject}>{children}</Context.Provider>
  }

  const useStore = () => useContext(Context)
  return { Provider, useStore }
}

export const TaskStore = createStore()
