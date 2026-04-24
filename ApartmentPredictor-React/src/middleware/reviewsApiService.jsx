/**
 * @fileoverview ReviewsAPIService - Service for managing review data via REST API
 * @module middleware/reviewsApiService
 */

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/review";

/**
 * @typedef {Object} Review
 * @property {number} [id]
 * @property {string} title
 * @property {string} content
 * @property {number} rating
 * @property {string} reviewDate
 * @property {string} reviewer
 * @property {number} apartmentId
 */

const ReviewsAPIService = {

    getAll: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw error;
        }
    },

    page: async (pageNo) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/page`, { params: { pageNo } });
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw error;
        }
    },

    getByApartmentId: async (apartmentId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/apartment/${apartmentId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews by apartment:", error);
            throw error;
        }
    },

    createReview: async (review) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/create`, review);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateReview: async (review) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/update`, review);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteReview: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/deleteById`, { params: { id } });
            return response.data;
        } catch (error) {
            alert("Failed to delete Review: " + id + "\n" + error);
            console.error(error);
            throw error;
        }
    }
};

export default ReviewsAPIService;