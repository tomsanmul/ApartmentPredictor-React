const ApartmentDetail = ({ apartment, onClose }) => {
  if (!apartment) return null;

  return (
    <div
      className="create-form-overlay"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
      }}
    >
      <div
        className="create-form"
        style={{ maxWidth: '400px', width: '100%', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px' }}
      >
        <h2>Apartment Detail</h2>

        <img
          src={`/img/${apartment.id}.jpg`}
          alt={`Apartment ${apartment.id}`}
          style={{ width: '100%', borderRadius: '4px', marginBottom: '1rem' }}
        />

        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem', marginBottom: '1rem' }}>
              <p><strong>Parking:</strong> {apartment.parking}</p>
              <p><strong>Basement:</strong> {apartment.basement}</p>
              <p><strong>Air Conditioning: </strong> {apartment.airconditioning}</p>
              <p><strong>Furnishing:</strong> {apartment.furnishingstatus}</p>
              <p><strong>Main Road: </strong> {apartment.mainroad}</p>
              <p><strong>Parking: </strong> {apartment.parking}</p>
              <p><strong>Guestroom: </strong> {apartment.guestroom}</p>
              <p><strong>Main Road: </strong> {apartment.mainroad}</p>
              <p><strong>Hot Water: </strong> {apartment.hotwaterheating}</p>
              <p><strong>Pref Area: </strong> {apartment.prefarea}</p>
        </div>

        <button className="btn cancel-btn" onClick={onClose} style={{ width: '100%' }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ApartmentDetail;
