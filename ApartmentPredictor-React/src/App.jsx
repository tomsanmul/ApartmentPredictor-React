import ApartmentList from "./apartment/ApartmentList";
import "./App.css";

export default function App() {
  return (

    <div className="App">
      <header className="app-header">
        <h1>🏢 Apartment Predictor</h1>
        <p className="subtitle">Discover, create, and manage your apartments easily!</p>
      </header>
      <ApartmentList />
    </div>
    
  );
}
