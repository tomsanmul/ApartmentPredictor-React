import { useReducer, useContext } from "react";
import { SchoolServiceContext } from "../services/schoolServiceContext.jsx";

const initialState = {
    schools: [],
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
                schools: action.payload.schools,
                totalPages: action.payload.totalPages,
                totalElements: action.payload.totalElements,
                currentPage: action.payload.currentPage,
                pageSize: action.payload.pageSize,
                loading: false
            };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "CREATE_SCHOOL":
            return { ...state, schools: [...state.schools, action.payload] };
        case "UPDATE_SCHOOL":
            return {
                ...state,
                schools: state.schools.map((s) => s.id === action.payload.id ? action.payload : s)
            };
        case "DELETE_SCHOOL":
            return { ...state, schools: state.schools.filter((s) => s.id !== action.payload) };
        case "SET_SCHOOLS":
            return { ...state, schools: action.payload, loading: false };
        default:
            return state;
    }
};

export const useSchools = () => {
    const schoolService = useContext(SchoolServiceContext);

    if (!schoolService) {
        throw new Error("useSchools must be used inside SchoolServiceProvider");
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchPageSchools = async (pageNo) => {
        dispatch({ type: "FETCH_START" });
        try {
            const data = await schoolService.page(pageNo);
            dispatch({
                type: "FETCH_SUCCESS",
                payload: {
                    schools: data.content,
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

    const filterSchools = async (filters) => {
        dispatch({ type: "FETCH_START" });
        try {
            const data = await schoolService.filterSchools(filters);
            dispatch({ type: "SET_SCHOOLS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error });
            console.error(error);
        }
    };

    const createSchool = async (school) => {
        try {
            const created = await schoolService.createSchool(school);
            dispatch({ type: "CREATE_SCHOOL", payload: created });
            return created;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateSchool = async (school) => {
        try {
            const updated = await schoolService.updateSchool(school);
            dispatch({ type: "UPDATE_SCHOOL", payload: updated });
            return updated;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteSchool = async (id) => {
        try {
            await schoolService.deleteSchool(id);
            dispatch({ type: "DELETE_SCHOOL", payload: id });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        schools: state.schools,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        totalElements: state.totalElements,
        pageSize: state.pageSize,
        loading: state.loading,
        error: state.error,
        fetchPageSchools,
        filterSchools,
        createSchool,
        updateSchool,
        deleteSchool
    };
};