// src/App.jsx
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ApartmentList from "./apartment/ApartmentList";
import { ApartmentServiceProvider } from "./services/apartmentServiceProvider";

import Home from "./pages/Home";
import ApartmentsPage from "./pages/ApartmentsPage";
import Login from "./pages/Login";

export default function App() {
  // Hooks dentro del componente → correcto
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApartmentServiceProvider>
        <Router>
          <Sidebar toggleTheme={toggleTheme} mode={mode} />

          <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${160}px` }}>
            <Toolbar /> {/* para espacio bajo AppBar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apartments" element={<ApartmentsPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
        </Router>
      </ApartmentServiceProvider>
    </ThemeProvider>
  );
}