import React from "react"
import { MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material"

// List of color options
const colors = [
  { name: "Red", hex: "#90caf9" },
  { name: "Green", hex: "#a5d6a7" },
  { name: "Blue", hex: "#ffe082" },
  { name: "Yellow", hex: "#ce93d8" },
  { name: "Indigo", hex: "#9fa8da" },
  { name: "White", hex: "#ffffff" }
]

const MuiColorSelect = ({ selectedColor, setSelectedColor }) => {
  const handleChange = (event) => {
    setSelectedColor(event.target.value)
  }

  return (
    <Box sx={{ width: 200, margin: "0 auto", textAlign: "center" }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" id="color-select-label">
          Color your card
        </InputLabel>

        <Select variant="standard" labelId="color-select-label" value={selectedColor} onChange={handleChange}>
          {colors.map((color) => (
            <MenuItem key={color.name} value={color.hex}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1
                }}
              >
                <Box
                  sx={{
                    width: 160,
                    height: 16,
                    backgroundColor: color.hex,
                    border: "1px solid #ccc"
                  }}
                />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default MuiColorSelect
