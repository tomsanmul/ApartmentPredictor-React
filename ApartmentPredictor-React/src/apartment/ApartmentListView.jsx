import { useState } from "react";
import ApartmentDetail from "./ApartmentDetail";


const ApartmentListView = ({ apartments, onCreate, onUpdate, onDelete }) => {

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newApartment, setNewApartment] = useState({
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    basement: "",
    airconditioning: "",
    parking: "",
    furnishingstatus: ""
  });
  const [editingApartmentId, setEditingApartmentId] = useState(null);

  const [showDetailForm, setShowDetailForm] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleDetail = (apartment) => {
    setSelectedApartment(apartment);
    setShowDetailForm(true);
  };

  const handleEdit = (apartment) => {
    setNewApartment({
      price: apartment.price,
      area: apartment.area,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      basement: apartment.basement,
      airconditioning: apartment.airconditioning,
      parking: apartment.parking,
      furnishingstatus: apartment.furnishingstatus
    });
    setEditingApartmentId(apartment.id);
    setShowCreateForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Are you sure you want to delete this apartment? \n" + id)) {
      onDelete(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApartmentId) {
        const apartmentToUpdate = { ...newApartment, id: editingApartmentId };
        await onUpdate(apartmentToUpdate);
        alert("Apartment updated!");
      } else {
        const created = await onCreate(newApartment);
        alert("Apartment created! ID: " + created.id);
      }
      setNewApartment({
        price: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        basement: "",
        airconditioning: "",
        parking: "",
        furnishingstatus: ""
      });
      setEditingApartmentId(null);
      setShowCreateForm(false);
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <>
      <h2>List of Apartments:</h2>

      <div className="apartment-cards">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="apartment-item">
            <img src={`/public/img/${apartment.id}.jpg`} className="apartment-img" />
            <div className="apartment-header">PRICE: ${apartment.price}</div>

            <div className="apartment-grid">
              <div><strong>Area:</strong> {apartment.area} sq ft</div>
              <div><strong>Bedrooms:</strong> {apartment.bedrooms}</div>
              <div><strong>Bathrooms:</strong> {apartment.bathrooms}</div>
              <div><strong>Stories:</strong> {apartment.stories}</div>
            </div>

            <div className="apartment-button-edit">
              <button className="btn detail-btn" onClick={() => handleDetail(apartment)}>Details</button>
              <button className="btn edit-btn" onClick={() => handleEdit(apartment)}>Edit</button>
              <button className="btn delete-btn" onClick={() => handleDelete(apartment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {!showCreateForm && (
        <div className="apartment-button-create" style={{ marginTop: "1rem" }}>
          <button
            className="btn create-btn"
            onClick={() => {
              setEditingApartmentId(null);
              setShowCreateForm(true);
            }}
          >
            Create New Apartment
          </button>
        </div>
      )}

      {showCreateForm && (
        <div className="create-form-overlay">
          <form id="ApartmentCreate" className="create-form" onSubmit={handleSubmit}>
            <h2>{editingApartmentId ? "Edit Apartment" : "Create Apartment"}</h2>
            <div className="form-grid">
              <label>Price<input type="text" value={newApartment.price} onChange={(e) => setNewApartment({...newApartment, price: e.target.value})} placeholder="Enter price in €" /></label>
              <label>Area<input type="text" value={newApartment.area} onChange={(e) => setNewApartment({...newApartment, area: e.target.value})} placeholder="Square meters" /></label>
              <label>Bedrooms<input type="text" value={newApartment.bedrooms} onChange={(e) => setNewApartment({...newApartment, bedrooms: e.target.value})} placeholder="Number of bedrooms" /></label>
              <label>Bathrooms<input type="text" value={newApartment.bathrooms} onChange={(e) => setNewApartment({...newApartment, bathrooms: e.target.value})} placeholder="Number of bathrooms" /></label>
              <label>Basement<input type="text" value={newApartment.basement} onChange={(e) => setNewApartment({...newApartment, basement: e.target.value})} placeholder="yes / no" /></label>
              <label>Air conditioning<input type="text" value={newApartment.airconditioning} onChange={(e) => setNewApartment({...newApartment, airconditioning: e.target.value})} placeholder="yes / no" /></label>
              <label>Parking<input type="text" value={newApartment.parking} onChange={(e) => setNewApartment({...newApartment, parking: e.target.value})} placeholder="Number of parkings" /></label>
              <label>Furnishing status<input type="text" value={newApartment.furnishingstatus} onChange={(e) => setNewApartment({...newApartment, furnishingstatus: e.target.value})} placeholder="unfurnished / semi-furnished" /></label>
            </div>
            <div className="form-actions">
              <button type="submit" className={editingApartmentId ? "update-btn" : "register-btn"}>{editingApartmentId ? "Update" : "Register"}</button>
              <button type="button" className="btn cancel-btn" onClick={() => setShowCreateForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {showDetailForm && selectedApartment && (
        < ApartmentDetail 
          apartment={selectedApartment} 
          onClose={() => setShowDetailForm(false)} 
        />
      )}

    </>
  );
};

export default ApartmentListView;