import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ApartmentCreate from "./ApartmentCreate";
import ApartmentDetail from "./ApartmentDetail";
import Navigation from "../components/NavigationList";

const ApartmentListView = ({ apartments = [], loading, onCreate, onUpdate, onDelete, onPageChange}) => {

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingApartmentId, setEditingApartmentId] = useState(null);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

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
    if (window.confirm("Are you sure you want to delete this apartment?\n" + id)) {
      onDelete(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingApartmentId) {

        const apartmentToUpdate = {
          ...newApartment,
          id: editingApartmentId
        };

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
      <h2>List of Apartments</h2>

      {!showCreateForm && (
        <div className="apartment-button-create">
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

      {loading && (
        <div className="loading-container">
          <CircularProgress />
          <p>Loading apartments...</p>
        </div>
      )}

      {!loading && apartments.length === 0 && (
        <p>No apartments found.</p>
      )}

      {!loading && apartments.length > 0 && (
        <div className="apartment-cards">

          {apartments.map((apartment) => (

            <div key={apartment.id} className="apartment-item">

              <img
                src={`/img/${apartment.id}.jpg`}
                alt={`Apartment ${apartment.id}`}
                className="apartment-img"
                onClick={() => handleDetail(apartment)}
              />

              <div className="apartment-header">
                PRICE: ${apartment.price}
              </div>

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
      )}

      {/* PAGINATION */}
      <Navigation onPageChange={onPageChange} />

      {showCreateForm && (
        <ApartmentCreate
          apartmentData={newApartment}
          onChange={setNewApartment}
          onSubmit={handleSubmit}
          onClose={() => setShowCreateForm(false)}
          isEditing={!!editingApartmentId}
        />
      )}

      {showDetailForm && selectedApartment && (
        <ApartmentDetail
          apartment={selectedApartment}
          onClose={() => setShowDetailForm(false)}
        />
      )}

    </>
  );
};

export default ApartmentListView;