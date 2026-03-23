import axios from "axios";

const API_BASE_URL = "/api/v1/apartment";

const ApartmentApiService = {
  getAllApartments: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      console.log("API Response:", response);
      console.log("Apartments Data:", response.data);
      console.log("First Apartment:", response.data[0]);
      console.log("Headers", response.headers);
      console.log("Headers date", response.headers.date);
      console.log("Status", response.status);
      return response.data;
    } catch (error) {
      console.error("Error fetching apartments:", error);
      throw error;
    }
  },

  getApartmentById: async (apartmentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${apartmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching apartment ${apartmentId}:`, error);
      throw error;
    }
  },

  createApartment: async (apartment) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, apartment);
      return response.data;
    } catch (error) {
      console.error("Error creating apartment:", error);
      throw error;
    }
  },

  updateApartment: async (apartment) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/update`, apartment);
      return response.data;
    } catch (error) {
      console.error(`Error updating apartment ${apartment.id}:`, error);
      throw error;
    }
  },

  deleteApartment: async (apartmentId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteById?id=${apartmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting apartment ${apartmentId}:`, error);
      throw error;
    }
  },

  filterApartments: async (filters) => {
    try {
      // Remove empty/falsy values and use axios params
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([value]) => Boolean(value))
      );

      const response = await axios.get(`${API_BASE_URL}/filter`, { params: cleanParams });
      return response.data;
    } catch (error) {
      console.error("Error filtering apartments:", error);
      throw error;
    }
  },

};

export default ApartmentApiService;