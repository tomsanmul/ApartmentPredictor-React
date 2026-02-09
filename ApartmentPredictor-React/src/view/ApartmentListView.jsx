import { useState } from "react";

const ApartmentListView = ({ apartments, onCreate, onUpdate, onDelete }) => {
  
  //HOOK per controlar / mostrar el formulari per crear / editar
  const [showCreateForm, setShowCreateForm] = useState(false);

  //HOOK que controla l'estat del camps del formulari.
  // Ens servirà per validar-los, pasar-lo al Axios per fer el POST, i per resetar-los "" después.
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

  //HOOK per controlar si estem editant o crean un nou Apartment. 
  // Si id es null, estem creant. Si te id, estem editan
  const [editingApartmentId, setEditingApartmentId] = useState(null);


  //Funció que es cridada per el botó EDIT
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
    setEditingApartmentId(apartment.id);  // Guardem el ID que volem editar
    setShowCreateForm(true);              // Obrim el formulari
  };

  //Funció que es cridada per el botó DELETE
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
          const apartmentToUpdate = { ...newApartment, id: editingApartmentId };
          await onUpdate(apartmentToUpdate);
          alert("Apartment updated!");
    } else {
          // Estam creant
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
            <img src="../img/1.jpg" />
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


      {/* Formulario escondido para crear un nuevo apartamento y/o Updatearlo */}  

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
          <form id="ApartmentCreate" className="create-form" onSubmit={handleSubmit}>  {/*Evita que el formulario recargue la página*/}
            <h2>{editingApartmentId ? "Edit Apartment" : "Create Apartment"}</h2>

            <div className="form-grid">
              <label>
                Price
                <input type="text" name="price" value={newApartment.price} placeholder="Enter price in €" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, price: e.target.value })
                  } 
                />
              </label>

              <label>
                Area
                <input type="text" name="area" value={newApartment.area} placeholder="Square meters" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, area: e.target.value })
                  }
                />
              </label>

              <label>
                Bedrooms
                <input type="text" name="bedrooms" value={newApartment.bedrooms} placeholder="Number of bedrooms (Ex: 1,2,3...)" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, bedrooms: e.target.value })
                  }
                />
              </label>

              <label>
                Bathrooms
                <input type="text" name="bathrooms" value={newApartment.bathrooms} placeholder="Number of bathrooms (Ex: 1,2,3...)" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, bathrooms: e.target.value })
                  }
                />
              </label>

              <label>
                Basement
                <input type="text" name="basement" value={newApartment.basement} placeholder="yes / no" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, basement: e.target.value })
                  }
                />
              </label>

              <label>
                Air conditioning
                <input type="text" name="airconditioning" value={newApartment.airconditioning} placeholder="yes / no" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, airconditioning: e.target.value })
                  }
                />
              </label>

              <label>
                Parking
                <input type="text" name="parking" value={newApartment.parking} placeholder="Number of parkins (Ex: 1,2,3...)" 
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, parking: e.target.value })
                  }
                />
              </label>

              <label>
                Furnishing status
                <input type="text" name="furnishingstatus" value={newApartment.furnishingstatus} placeholder="unfurnished / semi-furnished"
                  onChange={(e) =>
                    setNewApartment({ ...newApartment, furnishingstatus: e.target.value })
                  }
                />
              </label>

            </div>

            <div className="form-actions">
              <button type="submit" className={editingApartmentId ? "update-btn" : "register-btn"}>
              {editingApartmentId ? "Update" : "Register"}</button>
              
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
