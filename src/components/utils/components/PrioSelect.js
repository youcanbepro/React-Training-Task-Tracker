import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PrioSelect() {
  const [priority, setPriority] = React.useState(0);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel  variant="standard" id="demo-simple-select-autowidth-label">Priority</InputLabel>
        <Select
            variant="standard"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={priority}
          onChange={handleChange}
          label="Prio"
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={20}>High</MenuItem>
          <MenuItem value={21}>Medium</MenuItem>
          <MenuItem value={22}>Low</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
