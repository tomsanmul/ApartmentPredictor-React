import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/apartment"

const ApartmentsAPIService = {

    gettAll: async () => {
        try
        {
            const response = await axios.get(`${API_BASE_URL}/getAll`);
            console.log("API Response:", response);
            console.log("Apartments Data:", response.data);
            console.log("First Apartment:", response.data[0]);
            console.log("Headers", response.headers);
            console.log("Headers date", response.headers.date);
            console.log("Status", response.status);
            return response.data;
        } 
        catch (error) 
        {
            console.error("Error fetching apartments:", error);
            throw error;
        }
    },

    setApartments: async (apartment) => {
        try
        {
            const response = await axios.post(`${API_BASE_URL}/create`, apartment );
            return response.data;
        } 
        catch (error) 
        {
            console.error(error);
            throw error;
        }
    },

    updateApartment: async (apartment) => {
        try
        {
            console.log("Updating apartment:", apartment);
            const response = await axios.post(`${API_BASE_URL}/update`, apartment );
            return response.data;
        }
        catch (error) 
        {
            console.error(error);
            throw error;
        }
    },

    deleteApartment: async (id) => {
        try 
        {
            const response = await axios.delete(`${API_BASE_URL}/deleteById`, { params: { id } });
            return response.data;
        }
        
        catch (error) 
        {
            alert("Failed to delete Apartment: " + id + "\n" + error);
            console.error(error);
            throw error;
        }
    }

}

export default ApartmentsAPIService;

