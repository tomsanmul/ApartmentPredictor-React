/**
 * @fileoverview SchoolsAPIService - Service for managing school data via REST API
 * @module middleware/schoolsApiService
 */

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/school";

/**
 * @typedef {Object} School
 * @property {number} [id]
 * @property {string} name
 * @property {string} address
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} [type] - school type (primary, secondary, etc.)
 */

const SchoolsAPIService = {

    getAll: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error fetching schools:", error);
            throw error;
        }
    },

    page: async (pageNo) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/page`, { params: { pageNo } });
            return response.data;
        } catch (error) {
            console.error("Error fetching schools:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching school:", error);
            throw error;
        }
    },

    createSchool: async (school) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/create`, school);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateSchool: async (school) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/update`, school);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteSchool: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/deleteById`, { params: { id } });
            return response.data;
        } catch (error) {
            alert("Failed to delete School: " + id + "\n" + error);
            console.error(error);
            throw error;
        }
    },

    filterSchools: async (filters) => {
        try {
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([, v]) => v != null && v !== "")
            );
            const response = await axios.get(`${API_BASE_URL}/filter`, { params: cleanFilters });
            return response.data;
        } catch (error) {
            console.error("Error filtering schools:", error);
            throw error;
        }
    }
};

export default SchoolsAPIService;