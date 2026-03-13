const ApartmentCreate = ({ apartmentData, onChange, onSubmit, onClose, isEditing }) => {
  return (
    <div className="create-form-overlay">
      <form id="ApartmentCreate" className="create-form" onSubmit={onSubmit}>
        <h2>{isEditing ? "Edit Apartment" : "Create Apartment"}</h2>
        <div className="form-grid">
          <label>Price<input type="text" value={apartmentData.price} onChange={(e) => onChange({...apartmentData, price: e.target.value})} placeholder="Enter price in €" /></label>
          <label>Area<input type="text" value={apartmentData.area} onChange={(e) => onChange({...apartmentData, area: e.target.value})} placeholder="Square meters" /></label>
          <label>Bedrooms<input type="text" value={apartmentData.bedrooms} onChange={(e) => onChange({...apartmentData, bedrooms: e.target.value})} placeholder="Number of bedrooms" /></label>
          <label>Bathrooms<input type="text" value={apartmentData.bathrooms} onChange={(e) => onChange({...apartmentData, bathrooms: e.target.value})} placeholder="Number of bathrooms" /></label>
          <label>Basement<input type="text" value={apartmentData.basement} onChange={(e) => onChange({...apartmentData, basement: e.target.value})} placeholder="yes / no" /></label>
          <label>Air conditioning<input type="text" value={apartmentData.airconditioning} onChange={(e) => onChange({...apartmentData, airconditioning: e.target.value})} placeholder="yes / no" /></label>
          <label>Parking<input type="text" value={apartmentData.parking} onChange={(e) => onChange({...apartmentData, parking: e.target.value})} placeholder="Number of parkings" /></label>
          <label>Furnishing status<input type="text" value={apartmentData.furnishingstatus} onChange={(e) => onChange({...apartmentData, furnishingstatus: e.target.value})} placeholder="unfurnished / semi-furnished" /></label>
        </div>
        <div className="form-actions">
          <button type="submit" className={isEditing ? "update-btn" : "register-btn"}>{isEditing ? "Update" : "Register"}</button>
          <button type="button" className="btn cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ApartmentCreate;