import apartmentHome from "../assets/apartmentHome.jpg";

export default function Home() { 
  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <img 
          src={apartmentHome} 
          alt="Pretty Apartment!" 
        />
        <h1 className="homepage-title">
          Apartment Predictor
        </h1>
      </div>
    </div>
  );
}