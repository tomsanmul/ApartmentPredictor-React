import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/SideBar";
import { ApartmentServiceProvider } from "./services/apartmentServiceProvider";

import Home from "./pages/Home";
import ApartmentsPage from "./pages/ApartmentsPage";
import Login from "./pages/Login";

export default function App() {

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

          <Box sx={{ display: "flex" }}> {/* 👈 ESTA LINEA ES LA CLAVE */}

            <Sidebar toggleTheme={toggleTheme} mode={mode} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apartments" element={<ApartmentsPage />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>

          </Box>

        </Router>
      </ApartmentServiceProvider>

    </ThemeProvider>
  );
}