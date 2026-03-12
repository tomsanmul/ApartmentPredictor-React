import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import ApartmentList from "./apartment/ApartmentList";
import { ApartmentServiceProvider } from "./services/apartmentServiceProvider";
import Sidebar from "./components/sidebar";

import "./App.css";

export default function App() {

  const [mode, setMode] = useState("light");

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: mode
      }
    }),
  [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ApartmentServiceProvider>
        <div className="App">
          <header className="app-header">
            <h1>🏢 Apartment Predictor</h1>
            <p className="subtitle">
              Discover, create, and manage your apartments easily!
            </p>
          </header>

          <Sidebar toggleTheme={toggleTheme} mode={mode} />

          <ApartmentList />

        </div>
      </ApartmentServiceProvider>

    </ThemeProvider>
  );
}