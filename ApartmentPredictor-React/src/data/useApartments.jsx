import axios from "axios";
import { useEffect, useState } from "react";


export const useApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get("/api/apartment/getAll");
        console.log("API Response:", response);
        console.log("Apartments Data:", response.data);
        console.log("First Apartment:", response.data[0]);
        console.log("Headers", response.headers);
        console.log("Headers date", response.headers.date);
        console.log("Status", response.status);
        const apartmentsData = response.data;
        setApartments(apartmentsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setIsAxiosError(error.isAxiosError || false);
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);


  const createApartment = async (apartment) => {
  try {

    const response = await axios.post(
      "http://localhost:8080/api/apartment/create",
      apartment
    );
    setApartments(prev => [...prev, response.data]); // actualizar la lista
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const updateApartment = async (apartment) => {
  console.log("Updating apartment:", apartment);
  const response = await axios.post(
    "http://localhost:8080/api/apartment/update",
    apartment
  );

  setApartments(prev =>
    prev.map(a => (a.id === apartment.id ? response.data : a))
  );

  return response.data;
};



  const deleteApartment = async (id) => {
    try {
        await axios.delete(
          "http://localhost:8080/api/apartment/deleteById",
          { params: { id } }
        );

        setApartments(prev =>
          prev.filter(apartment => apartment.id !== id)
        );
        }catch (error){

          alert("Failed to delete Apartment: " + id + "\n" + error);
        }
    }


  return {
    apartments,
    isLoading,
    isAxiosError,
    updateApartment,
    createApartment,
    deleteApartment
  };
};
