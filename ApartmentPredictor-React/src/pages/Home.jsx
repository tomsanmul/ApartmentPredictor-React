import apartmentHome from "../assets/apartmentHome.jpg";

export default function Home() { 
  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h2 className="homepage-title">Welcome to Apartment Predictor</h2>
        <img 
          src={apartmentHome} 
          alt="Pretty Apartment!" 
        />   
      </div>
    </div>
  );
}