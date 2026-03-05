import { useState, useEffect } from "react";
import { useApartmentService  } from "../services/apartmentServiceContext.jsx";

export const useApartments = () => {
  const apartmentService = useApartmentService(); // llama al context/service

    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const fetchApartments = async () => {
            try 
            {
                const data = await apartmentService.getAll();
                setApartments(data);
            } 
            catch (error) 
            {
                console.error(error);
                throw error;
            }
        };

        fetchApartments();
    }, []);

    return { apartments };

}
