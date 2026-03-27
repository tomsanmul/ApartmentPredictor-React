import apartmentHome from "../../public/img/apartmentHome.jpg";
import { Link } from "react-router-dom";

export default function Home() { 
  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h2 className="homepage-title">Welcome to Apartment Predictor</h2>     
        <Link to="/apartments" className="image-card">
          <img 
            src={apartmentHome} 
            alt="Pretty Apartment!" 
          />
        </Link>
      </div>
    </div>
  );
}