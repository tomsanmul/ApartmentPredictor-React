// PRIMERA VERSIÓ apartmentServiceHoook 
//-------------------------------------

// Només 1 Hi ha Hook useState que gestiona el array de Apartments
// Próxima versión: fer-ho amb un Hook useReduer,  amb l'objectiu d'afegir més Hooks per gestionar diferents estats de varias coses 
// i que no es compliqui el codi.


import { useState, useEffect, useContext } from "react";
import { ApartmentServiceContext } from "../services/apartmentServiceContext.jsx";

export const useApartments = () => {

  const apartmentService = useContext(ApartmentServiceContext);

  if (!apartmentService) {   //compruebo que NO se utilice el Hook sin el Provider y de error!
    throw new Error("useApartments must be used inside ApartmentServiceProvider");
  }

  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await apartmentService.getAll();
        setApartments(data);
      } 
      catch (error) {
        console.error("Error loading apartments:", error);
      }
    };

    fetchApartments();

  }, [apartmentService]);

  const createApartment = async (apartment) => {
      try
        {
          const created = await apartmentService.createApartment(apartment);
          setApartments((prev) => [...prev, created]);
          return created;
        }
        catch (error){
          console.log("Error creating apartment:", error);         
        }
  }

  const updateApartment = async (apartment) => {
      try
        {
          const updated  = await apartmentService.updateApartment(apartment);
          setApartments((prev) => prev.map((a) => (a.id ===updated.id ? updated : a)));
          return updated;
        }
        catch (error){
          console.log("Error updating apartment:", error);      
        }
  }

  const deleteApartment = async (id) => {
      try
        {
          await apartmentService.deleteApartment(id);
          setApartments((prev) => prev.filter((a) => a.id !== id)); 
          alert("Apartment Deleted!");
        }
        catch (error){
          console.log("Error deleting apartment:", error);      
        }
  }


  return { 
    apartments,
    createApartment,
    updateApartment,
    deleteApartment
  };

};