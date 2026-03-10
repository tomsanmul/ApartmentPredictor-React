import { Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography, Box } from "@mui/material";

const drawerWidth = 240;

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Mi App
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        <Toolbar />

        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button>
            <ListItemText primary="Usuarios" />
          </ListItem>

          <ListItem button>
            <ListItemText primary="Configuración" />
          </ListItem>
        </List>

      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        <Typography>
          Contenido principal aquí
        </Typography>
      </Box>

    </Box>
  );
}
