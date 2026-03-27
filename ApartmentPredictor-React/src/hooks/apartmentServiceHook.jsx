// SEGONA VERSIÓ apartmentServiceHoook 
//-------------------------------------
// Un Hook useReduer,  que gestiona varios estats (como LOADING, ERROR, etc etc ).
// OBJECTIU: Centralitzar tots el Hoks


import { useReducer, useContext } from "react";
import { ApartmentServiceContext } from "../services/apartmentServiceContext.jsx";

const initialState = {
  apartments: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {  ...state, apartments: action.payload.apartments, totalPages: action.payload.totalPages, totalElements: action.payload.totalElements, 
                currentPage: action.payload.currentPage, loading: false};
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_APARTMENT":
      return { ...state, apartments: [...state.apartments, action.payload] };
    case "UPDATE_APARTMENT":
      return { ...state, apartments: state.apartments.map((a) => a.id === action.payload.id ? action.payload : a), };
    case "DELETE_APARTMENT":
      return { ...state, apartments: state.apartments.filter((a) => a.id !== action.payload), };
    case "FILTER_APARTMENTS":
      return { ...state, apartments: action.payload, loading: false };
    default:
      return state;
  }
};

export const useApartments = () => {
  const apartmentService = useContext(ApartmentServiceContext);

  if (!apartmentService) {
    throw new Error("useApartments must be used inside ApartmentServiceProvider");
  }

  const [state, dispatch] = useReducer(reducer, initialState);

    const fetchPageApartments = async (pageNo) => {

      dispatch({ type: "FETCH_START" });
      try {
        const data = await apartmentService.page(pageNo);
        console.log("PAGE DATA:", data);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            apartments: data.content,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number
          }
      });

      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload: error
        });

        console.error(error);
      }

    };

    //FILTER APARTMENTS
    const filterApartments = async (filters) => {
      dispatch({ type: "FETCH_START" });

      try {
        const data = await apartmentService.filterApartments(filters);

        dispatch({
          type: "FILTER_APARTMENTS",
          payload: data
        });

      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload: error
        });

        console.error(error);
      }
    };


  // CRUD operations
  const createApartment = async (apartment) => {
    try {
      const created = await apartmentService.createApartment(apartment);
      dispatch({ type: "CREATE_APARTMENT", payload: created });
      return created;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateApartment = async (apartment) => {
    try {
      const updated = await apartmentService.updateApartment(apartment);
      dispatch({ type: "UPDATE_APARTMENT", payload: updated });
      return updated;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteApartment = async (id) => {
    try {
      await apartmentService.deleteApartment(id);
      dispatch({ type: "DELETE_APARTMENT", payload: id });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    apartments: state.apartments,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    loading: state.loading,
    error: state.error,
    fetchPageApartments,
    filterApartments,
    createApartment,
    updateApartment,
    deleteApartment,
  };
};