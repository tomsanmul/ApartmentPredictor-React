
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./navigation/SideBar";
import HomePage from "./pages/HomePage";
import ApartmentPage from "./pages/ApartmentPage";
import ApartmentFilterPage from "./pages/ApartmentFilterPage";
import SchoolMapPage from "./pages/SchoolMapPage";
import Reviews from "./review/Reviews";
import "./App.css";
import { ApartmentServiceProvider } from "./middleware/apartmentService";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh'
  };
  
  const buttonStyle = {
    position: 'fixed',
    top: '16px',
    left: '16px',
    zIndex: 1000
  };
  
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '8px',
    marginLeft: '48px',
    width: '100%'
  };
  
  return (
    <BrowserRouter>
      <ApartmentServiceProvider>
        <div style={containerStyle}>
          <IconButton onClick={toggleDrawer(true)} style={buttonStyle}>
            <MenuIcon />
          </IconButton>
          <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
          
          <main style={mainStyle}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apartments" element={<ApartmentPage />} />
              <Route path="/apartmentFilter" element={<ApartmentFilterPage />} />
              <Route path="/reviews/apartment/:id" element={<Reviews />} />
              <Route path="/schoolMap" element={<SchoolMapPage />} />

            </Routes>
          </main>
        </div>
      </ApartmentServiceProvider>
    </BrowserRouter>
  );
}
