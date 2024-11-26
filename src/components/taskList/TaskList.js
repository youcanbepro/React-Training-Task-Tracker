import React from "react"
import { Box, Chip, Badge } from "@mui/material"
import { TaskCard } from "./taskListItem/TaskCard"

export const TaskList = ({ title, tasks }) => {
  const getTitleColor = () => {
    if (title.toString() === "Backlog") return "warning"
    else if (title.toString() === "In Progress") return "primary"
  }
  return (
    <Box sx={{ flexGrow: ".33" }} elevation={2}>
      <Box mx={4} my={4}>
        <Box mx={4}>
          <Box pt={2} pb={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Chip color={getTitleColor()} label={title} />
            <Badge badgeContent={tasks.length} showZero color="primary"></Badge>
          </Box>
          {tasks.map((task) => (
            <TaskCard key={task.id} title={title} task={task} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
