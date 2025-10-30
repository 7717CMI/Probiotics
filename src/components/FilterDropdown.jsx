import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

function FilterDropdown({ label, value, onChange, options, multiple = true }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: colors.grey[100] }}>{label}</InputLabel>
        <Select
          value={value || (multiple ? [] : "")}
          onChange={onChange}
          multiple={multiple}
          label={label}
          sx={{
            color: colors.grey[100],
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.grey[400],
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.grey[300],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.blueAccent[500],
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterDropdown;

