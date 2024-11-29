import React, { useContext, useState } from "react"
import { msgAction } from "../BackendDeclarations"
import moment from "moment"

/**
 * This is a hook using Context API that stores the state of the APP
 * This can be shared by components with the Provider
 * @param  none
 * @returns  React Context object
 */

function createStore() {
  const Context = React.createContext()

  function Provider({ children }) {
    // hooks for Tasks in different state
    const [tasks, setTasks] = useState([])

    const [completedTasks, setcompletedTasks] = useState([])

    const [wipTasks, setWipTasks] = useState([])

    // hook for handling actions in the app
    const [msg, setMsg] = useState({ id: "", msg: msgAction.cancel })

    const today = new Date() //gets date today

    /**
     * Handles the click on the delete button and removes it from the tasks list.
     *
     * @param {number} taskId
     */
    const handleTaskDelete = (taskId) => {
      // Filter all tasks excpet task with passed id
      if (tasks.find((task) => task.id === taskId)) {
        setTasks(tasks.filter((task) => task.id !== taskId))
        return
      }

      if (wipTasks.find((task) => task.id === taskId)) {
        setWipTasks(wipTasks.filter((task) => task.id !== taskId))
        return
      }
      if (completedTasks.find((task) => task.id === taskId)) {
        setcompletedTasks(completedTasks.filter((task) => task.id !== taskId))
      }
    }

    /**
     * Handles the click to move the task from Backlog to WIP.
     *
     * @param {number} taskId
     */

    const handleTaskMove = (taskId) => {
      // Filter all tasks excpet task with passed id
      const taskFound = tasks.find((task) => task.id === taskId)
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
      setWipTasks([...wipTasks, taskFound])
    }

    /**
     * Handles the click to move the task from WIP to Backlog.
     *
     * @param {number} taskId
     */
    const handleTaskMoveBack = (taskId) => {
      // Filter all tasks excpet task with passed id
      const taskFound = wipTasks.find((task) => task.id === taskId)
      const updatedTasks = wipTasks.filter((task) => task.id !== taskId)
      setWipTasks(updatedTasks)
      setTasks([...tasks, taskFound])
    }

    /**
     * Handels the click on a task and toggles the complete property of the task object and moves the Tasks from
     * WIP to Completed
     * @param {number} taskId
     */
    const handleTaskClick = (taskId) => {
      // Iterate all tasks and find passed task by id
      const updatedTask = wipTasks.find((task) => task.id === taskId)
      const updatedTasks = wipTasks.filter((task) => task.id !== taskId)
      setWipTasks(updatedTasks)
      setcompletedTasks([
        ...completedTasks,
        { ...updatedTask, completed: true, completedOn: moment(today).locale("de-DE").format("ll").slice(0, -6) }
      ])
    }

    /**
     * Creates a new task
     *
     * @param {text,summary,prio,color,task}
     */
    const handleCreateTask = ({ text, summary, prio, color }) => {
      // generate a unique id and set the Task Object
      setTasks([
        ...tasks,
        {
          id: "r" + Math.random() + (+tasks.length + 1),
          ...{ text, summary, prio, color },
          completed: false,
          createdOn: moment(today).locale("de-DE").format("ll").slice(0, -6),
          completedOn: null
        }
      ])
    }
    // Context Object exposed . Can be consumed with a Wrapping Provider

    const contextObject = {
      tasks,
      allTasks: () => wipTasks.length + completedTasks.length + tasks.length,
      setTasks,
      handleTaskDelete,
      handleTaskClick,
      sendMsg: setMsg,
      msg,
      tasksHistory: completedTasks,
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
