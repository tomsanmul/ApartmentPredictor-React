// src/components/ThemeSelector.jsx
import { Switch, Box, Typography } from "@mui/material";

export default function ThemeSelector({ mode, toggleTheme }) {
  return (
    <Box display="flex" alignItems="center">
      <Switch checked={mode === "dark"} onChange={toggleTheme} />
      <Typography variant="body2" sx={{ ml: 1 }}>
        {mode === "dark" ? "Dark Mode ON" : "Dark Mode OFF"}
      </Typography>
    </Box>
  );
}