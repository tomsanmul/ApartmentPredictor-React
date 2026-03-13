// src/components/Sidebar.jsx
import ThemeSelector from "./ThemeSelector";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 160;

export default function Sidebar({ toggleTheme, mode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Apartment Predictor
          </Typography>
          <ThemeSelector mode={mode} toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/apartments">
              <ListItemText primary="Apartments" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}