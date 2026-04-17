/**
 * @fileoverview ApartmentsAPIService - Service for managing apartment data via REST API
 * @module middleware/apartmentsApiService
 * @description 
 *    Proporciona metodos para interactuar con el backend de ApartmentPredictor.
 *    Maneja todas las operaciones CRUD (Create, Read, Update, Delete) y filtrado
 *    de apartamentos a traves del API REST del servidor Spring Boot.
 *    
 *    Utiliza axios para realizar peticiones HTTP asincronas con manejo de errores.
 *    
 * @author ApartmentPredictor Team
 * @version 1.0.0
 * @requires axios
 */

import axios from "axios";

/**
 * URL base del API de apartamentos
 * @constant {string}
 * @default "http://localhost:8080/api/v1/apartment"
 */
const API_BASE_URL = "http://localhost:8080/api/v1/apartment";

/**
 * @typedef {Object} Apartment
 * @description Objeto que representa un apartamento
 * @property {number} [id] - Identificador unico del apartamento
 * @property {number} price - Precio del apartamento
 * @property {number} area - Area en metros cuadrados
 * @property {number} bedrooms - Numero de habitaciones
 * @property {number} bathrooms - Numero de banos
 * @property {number} stories - Numero de pisos
 * @property {number} parking - Numero de plazas de parking
 * @property {string} mainroad - Cerca de carretera principal ("yes"|"no")
 * @property {string} guestroom - Tiene habitacion de invitados ("yes"|"no")
 * @property {string} basement - Tiene sotano ("yes"|"no")
 * @property {string} hotwaterheating - Calefaccion de agua caliente ("yes"|"no")
 * @property {string} airconditioning - Aire acondicionado ("yes"|"no")
 * @property {string} prefarea - Area preferida ("yes"|"no")
 * @property {string} furnishingstatus - Estado de amueblamiento
 */

/**
 * @typedef {Object} PageResponse
 * @description Respuesta paginada del API
 * @property {Apartment[]} content - Lista de apartamentos en la pagina
 * @property {number} totalElements - Total de elementos
 * @property {number} totalPages - Total de paginas
 * @property {number} number - Numero de pagina actual
 * @property {number} size - Tamanio de pagina
 */

/**
 * @typedef {Object} ParsedFilters
 * @description Filtros para busqueda de apartamentos
 * @property {number|null} minPrice - Precio mnimo
 * @property {number|null} maxPrice - Precio maximo
 * @property {number|null} minArea - Area mnima
 * @property {number|null} maxArea - Area maxima
 * @property {number|null} bedrooms - Numero de habitaciones
 * @property {number|null} bathrooms - Numero de banos
 * @property {number|null} stories - Numero de pisos
 * @property {number|null} parking - Numero de plazas de parking
 */

/**
 * Service object for apartment API operations
 * @namespace ApartmentsAPIService
 * @type {Object}
 * 
 * @example
 * // Importar el servicio
 * import ApartmentsAPIService from "../middleware/apartmentsApiService";
 * 
 * // Obtener todos los apartamentos
 * const apartments = await ApartmentsAPIService.getAll();
 * 
 * // Crear un nuevo apartamento
 * await ApartmentsAPIService.createApartment(apartmentData);
 * 
 * // Filtrar apartamentos
 * const filtered = await ApartmentsAPIService.filterApartments({ minPrice: 100000 });
 */
const ApartmentsAPIService = {

    /**
     * Obtiene todos los apartamentos del servidor
     * 
     * @function getAll
     * @memberof ApartmentsAPIService
     * @async
     * @returns {Promise<Apartment[]>} Promise que resuelve con un array de apartamentos
     * @throws {Error} Error cuando la peticion falla
     * 
     * @example
     * try {
     *   const apartments = await ApartmentsAPIService.getAll();
     *   console.log("Total apartments:", apartments.length);
     * } catch (error) {
     *   console.error("Error fetching apartments:", error);
     * }
     */
    getAll: async () => {
        try
        {
            const response = await axios.get(`${API_BASE_URL}/getAll`);
            console.log("Apartments loaded:", response.data);
            return response.data;
        } 
        catch (error) 
        {
            console.error("Error fetching apartments:", error);
            throw error;
        }
    },

    /**
     * Obtiene una pagina especifica de apartamentos (paginacion)
     * 
     * @function page
     * @memberof ApartmentsAPIService
     * @async
     * @param {number} pageNo - Numero de pagina (0-indexed)
     * @returns {Promise<PageResponse>} Promise que resuelve con la respuesta paginada
     * @throws {Error} Error cuando la peticion falla
     * 
     * @example
     * // Obtener la segunda pagina de resultados
     * const page2 = await ApartmentsAPIService.page(1);
     * console.log("Page 2 apartments:", page2.content);
     */
    page: async (pageNo) => {
        try
        {
            const response = await axios.get(`${API_BASE_URL}/page`, { params: { pageNo } });
            console.log("Apartments loaded:", response.data);
            return response.data;
        } 
        catch (error) 
        {
            console.error("Error fetching apartments:", error);
            throw error;
        }
    },

    /**
     * Crea un nuevo apartamento en el servidor
     * 
     * @function createApartment
     * @memberof ApartmentsAPIService
     * @async
     * @param {Apartment} apartment - Datos del apartamento a crear
     * @returns {Promise<Apartment>} Promise que resuelve con el apartamento creado
     * @throws {Error} Error cuando la peticion falla
     * 
     * @example
     * const newApartment = {
     *   price: 250000,
     *   area: 120,
     *   bedrooms: 3,
     *   bathrooms: 2,
     *   stories: 2,
     *   parking: 1,
     *   mainroad: "yes",
     *   guestroom: "no",
     *   basement: "yes",
     *   hotwaterheating: "no",
     *   airconditioning: "yes",
     *   prefarea: "no",
     *   furnishingstatus: "furnished"
     * };
     * const created = await ApartmentsAPIService.createApartment(newApartment);
     */
    createApartment: async (apartment) => {
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

    /**
     * Actualiza un apartamento existente en el servidor
     * 
     * @function updateApartment
     * @memberof ApartmentsAPIService
     * @async
     * @param {Apartment} apartment - Datos actualizados del apartamento (debe incluir ID)
     * @returns {Promise<Apartment>} Promise que resuelve con el apartamento actualizado
     * @throws {Error} Error cuando la peticion falla
     * 
     * @example
     * const updatedApartment = {
     *   id: 1,
     *   price: 275000,
     *   area: 125,
     *   bedrooms: 3,
     *   bathrooms: 2,
     *   stories: 2,
     *   parking: 2,
     *   mainroad: "yes",
     *   guestroom: "no",
     *   basement: "yes",
     *   hotwaterheating: "no",
     *   airconditioning: "yes",
     *   prefarea: "no",
     *   furnishingstatus: "furnished"
     * };
     * const result = await ApartmentsAPIService.updateApartment(updatedApartment);
     */
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

    /**
     * Elimina un apartamento del servidor por su ID
     * 
     * @function deleteApartment
     * @memberof ApartmentsAPIService
     * @async
     * @param {number} id - Identificador unico del apartamento a eliminar
     * @returns {Promise<Object>} Promise que resuelve con la respuesta del servidor
     * @throws {Error} Error cuando la peticion falla
     * 
     * @example
     * try {
     *   await ApartmentsAPIService.deleteApartment(123);
     *   console.log("Apartment deleted successfully");
     * } catch (error) {
     *   console.error("Failed to delete apartment:", error);
     * }
     */
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
    },

    /**
     * Filtra apartamentos segun los criterios proporcionados
     * 
     * @function filterApartments
     * @memberof ApartmentsAPIService
     * @async
     * @param {ParsedFilters} filters - Objeto con los filtros a aplicar
     * @param {number|null} [filters.minPrice=null] - Precio mnimo
     * @param {number|null} [filters.maxPrice=null] - Precio maximo
     * @param {number|null} [filters.minArea=null] - Area mnima
     * @param {number|null} [filters.maxArea=null] - Area maxima
     * @param {number|null} [filters.bedrooms=null] - Numero de habitaciones
     * @param {number|null} [filters.bathrooms=null] - Numero de banos
     * @param {number|null} [filters.stories=null] - Numero de pisos
     * @param {number|null} [filters.parking=null] - Numero de plazas de parking
     * @returns {Promise<Apartment[]>} Promise que resuelve con array de apartamentos filtrados
     * @throws {Error} Error cuando la peticion falla
     * 
     * @example
     * // Filtrar apartamentos con precio entre 100k y 300k
     * const filtered = await ApartmentsAPIService.filterApartments({
     *   minPrice: 100000,
     *   maxPrice: 300000
     * });
     * 
     * @example
     * // Filtrar apartamentos con 3+ habitaciones
     * const threeBedrooms = await ApartmentsAPIService.filterApartments({
     *   bedrooms: 3
     * });
     */
    filterApartments: async (filters) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/filter`, {
                params: filters
            });
            console.log("Filtered apartments:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error filtering apartments:", error);
            throw error;
        }
    }

}

export default ApartmentsAPIService;
