import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapIcon from "@mui/icons-material/Map";

function NavigationList({ toggleDrawer }) {
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Apartments", icon: <ApartmentIcon />, path: "/apartments" },
    {text: "Apartment Filter", icon: <ApartmentIcon />, path: "/apartmentFilter" },
    {text: "School Map", icon: <MapIcon />, path: "/schoolMap" }
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default NavigationList;
