import { useState } from "react";

const ApartmentListView = ({ apartments, onCreate, onUpdate, onDelete }) => {
  
  //HOOK per controlar / msotrar el formulari pero crear / editar
  const [showCreateForm, setShowCreateForm] = useState(false);

  //HOOK que controla el estado de los campos del formulario, y me servirá para validarlo, pasárlo al Axios para el POST, y resetarlo después
  const [newApartment, setNewApartment] = useState({
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      basement: "",
      airconditioning: "",
      parking: "",
      furnishingstatus: ""
  })

  //HOOK per coontrolar si estem editan o crean un nou.  Si es null → estamos creant .Si te id, estem edtan
  const [editingApartmentId, setEditingApartmentId] = useState(null);

  
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
    setEditingApartmentId(apartment.id);  // Guardamos el ID del que editamos
    setShowCreateForm(true);               // Abrimos el formulario
  };

  
  const handleDelete = (id) => {
      if (window.confirm("¿Are you sure you want to delete this apartment? \n" + id))
        {
            onDelete(id);
        }

  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingApartmentId) {
      // Estamos editando
      await onUpdate(editingApartmentId, newApartment);
      alert("Apartment updated!");
    } else {
      // Estamos creando
      const created = await onCreate(newApartment);
      alert("Apartment created! ID: " + created.id);
    }

    // Reset
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
      <h1>Apartments</h1>

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
              <button className="btn edit-btn" onClick={() => handleEdit(apartment)}>Edit</button>
              <button className="btn delete-btn" onClick={() => handleDelete(apartment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>


      {/* Formulario escondido para crear un nuevo apartamento */}  

      {!showCreateForm && (
        <div className="apartment-button-create" style={{ marginTop: "1rem" }}>
          <button
            className="btn create-btn"
            onClick={() => setShowCreateForm(true)}
          >
            Create New Apartment
          </button>
        </div>
        )}

       {showCreateForm && (
        <div className="create-form-overlay">
          <form id="ApartmentCreate" className="create-form" onSubmit={handleSubmit}>  {/*Evita que el formulario recargue la página*/}
            <h2>Create Apartment</h2>

            <div className="form-grid">
              <label>
                Price
                <input type="text" name="price" placeholder="Enter price in €" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, price: e.target.value })
                  } 
                />
              </label>

              <label>
                Area
                <input type="text" name="area" placeholder="Square meters" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, area: e.target.value })
                  }
                />
              </label>

              <label>
                Bedrooms
                <input type="text" name="bedrooms" placeholder="Number of bedrooms (Ex: 1,2,3...)" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, bedrooms: e.target.value })
                  }
                />
              </label>

              <label>
                Bathrooms
                <input type="text" name="bathrooms" placeholder="Number of bathrooms (Ex: 1,2,3...)" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, bathrooms: e.target.value })
                  }
                />
              </label>

              <label>
                Basement
                <input type="text" name="basement" placeholder="yes / no" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, basement: e.target.value })
                  }
                />
              </label>

              <label>
                Air conditioning
                <input type="text" name="airconditioning" placeholder="yes / no" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, airconditioning: e.target.value })
                  }
                />
              </label>

              <label>
                Parking
                <input type="text" name="parking" placeholder="Number of parkins (Ex: 1,2,3...)" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, parking: e.target.value })
                  }
                />
              </label>

              <label>
                Furnishing status
                <input type="text" name="furnishingstatus" placeholder="unfurnished / semi-furnished"
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, furnishingstatus: e.target.value })
                  }
                />
              </label>

            </div>

            <div className="form-actions">
              <button className="register-btn" type="submit">
                    {editingApartmentId ? "Update" : "Register"}
              </button>
              <button
                className="btn cancel-btn"
                type="button"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </>
  );
};

export default ApartmentListView;
