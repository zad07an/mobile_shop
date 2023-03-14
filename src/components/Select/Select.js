import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function SelectComponent({productOptions, company, setCompany}) {

  const handleChange = (event) => {
    setCompany(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 250 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Company</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={company}
        label="Company"
        onChange={handleChange}
      >
        <MenuItem value='all'>All</MenuItem>
        {
          productOptions.map((option, idx) => {
            return <MenuItem key={idx} value={option}>{option[0].toUpperCase()}{option.slice(1)}</MenuItem>
          })
        }
      </Select>
    </FormControl>
  </Box>
  )
}
