import { useState } from "react";

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
        <form id="AparmentCreate">
              <p>Price: <input type="text" id="Price" name="Price" /></p>
              <p>Area: <input type="text" id="Area" name="Area" /></p>
              <p>Bedrooms <input type="text" id="Bedrooms" name="Bedrooms" /></p>
              <p>Bathrooms: <input type="Bathrooms" id="Bathrooms" name="Price" /></p>
              <p>Stories: <input type="text" id="Stories" name="Stories" /></p>
              <p>Mainroad <input type="text" id="Mainroad" name="Mainroad" /></p>
              <p>Guestroom: <input type="text" id="Guestroom" name="Guestroom" /></p>
              <p>Basement: <input type="text" id="Basement" name="Basement" /></p>
              <p>Hotwaterheating <input type="text" id="Hotwaterheating" name="Hotwaterheating" /></p>
              <p>Airconditioning: <input type="text" id="Airconditioning" name="Airconditioning" /></p>
              <p>Parking <input type="text" id="Parking" name="Parking" /></p>
              <p>Prefarea: <input type="text" id="Prefarea" name="Prefarea" /></p>
              <p>Furnishingstatus: <input type="text" id="Furnishingstatus" name="Furnishingstatus" /></p>
              <p>Reviews <input type="text" id="Reviews" name="Reviews" /></p>


              <button  type="submit" id="btnCreate" name ="btnCreate" >
        </button>

        </form>

      </div>
    </>
  );
};

export default ApartmentListView;
