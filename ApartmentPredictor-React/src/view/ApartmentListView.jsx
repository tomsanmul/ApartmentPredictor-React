
import { useState } from "react";
import ApartmentCreateView from "../view/ApartmentCreateView";



const ApartmentListView = ({ apartments, isLoading, isAxiosError }) => {

  const [showCreateForm, setShowCreateForm] = useState(false);


  {showCreateForm && (
  <ApartmentCreateView
    onClose={() => setShowCreateForm(false)}
  />
)}


  if (isLoading) {
    return (
      <>
        <h1>Apartments</h1>
        <p>This is an exercise to test react render</p>
        <p>Loading...</p>
      </>
    );
  }

  if (isAxiosError) {
    return (
      <>
        <h1>Apartments</h1>
        <p>This is an exercise to test react render</p>
        <p>Error loading apartments. Please try again later.</p>
      </>
    );
  }

    return (
    <>
      <h1>Apartments</h1>
      <p>This is an exercise to test react render</p>

      {/* Lista de apartamentos */}
      <ul className="apartment-list">
        {apartments.map((apartment) => (
          <li key={apartment.id} className="apartment-item">
            <div className="apartment-header">
              ID: {apartment.id} | ${apartment.price}
            </div>

            <div className="apartment-grid">
              <div>
                <strong>Area:</strong> {apartment.area} sq ft
              </div>
              <div>
                <strong>Bedrooms:</strong> {apartment.bedrooms}
              </div>
              <div>
                <strong>Bathrooms:</strong> {apartment.bathrooms}
              </div>
              <div>
                <strong>Stories:</strong> {apartment.stories}
              </div>
            </div>

            <div className="apartment-features">
              <span>Main Road: {apartment.mainroad}</span>
              <span>Parking: {apartment.parking}</span>
              <span>Guestroom: {apartment.guestroom}</span>
              <span>Basement: {apartment.basement}</span>
            </div>

            <div className="apartment-meta">
              Hot Water: {apartment.hotwaterheating} | AC:{" "}
              {apartment.airconditioning} | Pref Area: {apartment.prefarea} |
              Furnishing: {apartment.furnishingstatus}
            </div>

            <div className="apartment-button-edit">
              <button className="btn edit-btn" type="submit" name="btnEdit">
                Edit
              </button>
              <button className="btn delete-btn" type="submit" name="btnDelete">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="apartment-button-create" style={{ marginTop: "1rem" }}>
        <button className="btn create-btn" type="submit" name="btnCreate" onClick={() => setShowCreateForm(true)}>
          Create New Apartment
        </button>
      </div>
    </>
  );
};


export default ApartmentListView;
