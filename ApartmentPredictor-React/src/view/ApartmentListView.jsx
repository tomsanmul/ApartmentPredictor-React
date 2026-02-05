import { useState } from "react";
import ApartmentCreateView from "../view/ApartmentCreateView";

const ApartmentListView = ({ apartments, onDelete }) => {
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const handleEdit = (id) => {
    alert("Editing apartment \n" + id);
  };

  
  const handleDelete = (id) => {
      if (window.confirm("¿Are you sure you want to delete this apartment? \n" + id))
        {
            onDelete(id);
        }

  };



  return (
    <>
      <h1>Apartments</h1>

      {/* Formulario de creación */}
      {showCreateForm && (
        <ApartmentCreateView onClose={() => setShowCreateForm(false)} />
      )}

      {/* Grid de cards */}
      <div className="apartment-cards">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="apartment-item">
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
              Hot Water: {apartment.hotwaterheating} | AC: {apartment.airconditioning} | Pref Area: {apartment.prefarea} | Furnishing: {apartment.furnishingstatus}
            </div>

            <div className="apartment-button-edit">
              <button className="btn edit-btn" onClick={() => handleEdit(apartment.id)}>Edit</button>
              <button className="btn delete-btn" onClick={() => handleDelete(apartment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="apartment-button-create" style={{ marginTop: "1rem" }}>
        <button
          className="btn create-btn"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Apartment
        </button>
      </div>
    </>
  );
};

export default ApartmentListView;
