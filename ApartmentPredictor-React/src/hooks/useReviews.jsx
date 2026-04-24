import { useReducer, useContext } from "react";
import { ReviewServiceContext } from "../services/reviewServiceContext.jsx";

const initialState = {
    reviews: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    pageSize: 0,
    loading: false,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return {
                ...state,
                reviews: action.payload.reviews,
                totalPages: action.payload.totalPages,
                totalElements: action.payload.totalElements,
                currentPage: action.payload.currentPage,
                pageSize: action.payload.pageSize,
                loading: false
            };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "CREATE_REVIEW":
            return { ...state, reviews: [...state.reviews, action.payload] };
        case "UPDATE_REVIEW":
            return {
                ...state,
                reviews: state.reviews.map((r) => r.id === action.payload.id ? action.payload : r)
            };
        case "DELETE_REVIEW":
            return { ...state, reviews: state.reviews.filter((r) => r.id !== action.payload) };
        case "SET_REVIEWS":
            return { ...state, reviews: action.payload, loading: false };
        default:
            return state;
    }
};

export const useReviews = () => {
    const reviewService = useContext(ReviewServiceContext);

    if (!reviewService) {
        throw new Error("useReviews must be used inside ReviewServiceProvider");
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchPageReviews = async (pageNo) => {
        dispatch({ type: "FETCH_START" });
        try {
            const data = await reviewService.page(pageNo);
            dispatch({
                type: "FETCH_SUCCESS",
                payload: {
                    reviews: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number,
                    pageSize: data.size
                }
            });
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error });
            console.error(error);
        }
    };

    const fetchReviewsByApartment = async (apartmentId) => {
        dispatch({ type: "FETCH_START" });
        try {
            const data = await reviewService.getByApartmentId(apartmentId);
            dispatch({ type: "SET_REVIEWS", payload: Array.isArray(data) ? data : [data] });
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error });
            console.error(error);
        }
    };

    const createReview = async (review) => {
        try {
            const created = await reviewService.createReview(review);
            dispatch({ type: "CREATE_REVIEW", payload: created });
            return created;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateReview = async (review) => {
        try {
            const updated = await reviewService.updateReview(review);
            dispatch({ type: "UPDATE_REVIEW", payload: updated });
            return updated;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteReview = async (id) => {
        try {
            await reviewService.deleteReview(id);
            dispatch({ type: "DELETE_REVIEW", payload: id });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        reviews: state.reviews,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        totalElements: state.totalElements,
        pageSize: state.pageSize,
        loading: state.loading,
        error: state.error,
        fetchPageReviews,
        fetchReviewsByApartment,
        createReview,
        updateReview,
        deleteReview
    };
};