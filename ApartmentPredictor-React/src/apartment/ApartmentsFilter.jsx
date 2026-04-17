/**
 * @fileoverview ApartmentsFilter - Component for filtering apartment listings
 * @module apartment/ApartmentsFilter
 * @description 
 *    Proporciona una interfaz de usuario completa para filtrar apartamentos
 *    segun multiples criterios: precio, area, habitaciones, banos, pisos,
 *    caracteristicas adicionales (aparcamiento, cerca de carretera principal, etc.)
 *    
 *    El componente gestiona el estado local de los filtros y notifica
 *    al componente padre cuando se aplican o resetean los filtros.
 *    
 * @author ApartmentPredictor Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import "../index.css";

/**
 * @typedef {Object} FilterState
 * @description Estado de los filtros del formulario
 * @property {string|number} minPrice - Precio mnimo del apartamento
 * @property {string|number} maxPrice - Precio maximo del apartamento
 * @property {string|number} minArea - Area mnima en metros cuadrados
 * @property {string|number} maxArea - Area maxima en metros cuadrados
 * @property {string|number} bedrooms - Numero de habitaciones
 * @property {string|number} bathrooms - Numero de banos
 * @property {string|number} stories - Numero de pisos
 * @property {string|number} parking - Numero de plazas de parking
 * @property {string} mainroad - Indicador si esta cerca de carretera principal ("yes"|"no")
 * @property {string} guestroom - Indicador si tiene habitacion de invitados ("yes"|"no")
 * @property {string} basement - Indicador si tiene sotano ("yes"|"no")
 * @property {string} hotwaterheating - Indicador si tiene calefaccion de agua caliente ("yes"|"no")
 * @property {string} airconditioning - Indicador si tiene aire acondicionado ("yes"|"no")
 * @property {string} prefarea - Indicador si esta en area preferida ("yes"|"no")
 * @property {string} furnishingstatus - Estado de amueblamiento ("none"|"furnished"|"unfurnished"|"semi-furnished")
 */

/**
 * @typedef {Object} ParsedFilters
 * @description Filtros parseados con valores numericos convertidos
 * @extends FilterState
 * @property {number|null} minPrice - Precio mnimo (numero o null)
 * @property {number|null} maxPrice - Precio maximo (numero o null)
 * @property {number|null} minArea - Area mnima (numero o null)
 * @property {number|null} maxArea - Area maxima (numero o null)
 * @property {number|null} bedrooms - Numero de habitaciones (numero o null)
 * @property {number|null} bathrooms - Numero de banos (numero o null)
 * @property {number|null} stories - Numero de pisos (numero o null)
 * @property {number|null} parking - Numero de plazas de parking (numero o null)
 */

/**
 * @typedef {Object} ApartmentsFilterProps
 * @description Props del componente ApartmentsFilter
 * @property {function(ParsedFilters|null): void} onFilter - Callback invoked when filters are applied or reset
 */

/**
 * Component for filtering apartments with multiple criteria
 * 
 * @component
 * @param {ApartmentsFilterProps} props - Component props
 * @param {function(ParsedFilters|null): void} props.onFilter - Callback to notify parent of filter changes
 * 
 * @example
 * // Usage example:
 * const handleFilter = (filters) => {
 *   console.log("Filters applied:", filters);
 *   // Call API with filters
 * };
 * 
 * <ApartmentsFilter onFilter={handleFilter} />
 * 
 * @returns {JSX.Element} The filter form component
 * 
 * @category Apartment
 * @subcategory Components
 */
export default function ApartmentsFilter({ onFilter }) {
  /**
   * Estado local de los filtros
   * @type {[FilterState, function]}
   */
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    parking: "",
    mainroad: "no",
    guestroom: "no",
    basement: "no",
    hotwaterheating: "no",
    airconditioning: "no",
    prefarea: "no",
    furnishingstatus: "none"
  });

  /**
   * Maneja los cambios en los campos del formulario
   * Convierte checkboxes a "yes"/"no" y mantiene strings para inputs normales
   * 
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e - Evento de cambio
   * @returns {void}
   * 
   * @private
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        [name]: checked ? "yes" : "no"
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Maneja el envio del formulario de filtros
   * Parsea los valores a numeros y notifica al componente padre
   * 
   * @returns {void}
   * 
   * @example
   * // Cuando se hace clic en el boton FILTER:
   * // 1. Convierte strings vacios a null
   * // 2. Convierte strings numericos a numeros
   * // 3. Llama a onFilter con los filtros parseados
   * 
   * @private
   */
  const handleSubmit = () => {
    const parsedFilters = {
      ...filters,
      minPrice: filters.minPrice ? Number(filters.minPrice) : null,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
      minArea: filters.minArea ? Number(filters.minArea) : null,
      maxArea: filters.maxArea ? Number(filters.maxArea) : null,
      bedrooms: filters.bedrooms ? Number(filters.bedrooms) : null,
      bathrooms: filters.bathrooms ? Number(filters.bathrooms) : null,
      stories: filters.stories ? Number(filters.stories) : null,
      parking: filters.parking ? Number(filters.parking) : null,
      mainroad: filters.mainroad || "no",
      guestroom: filters.guestroom || "no",
      basement: filters.basement || "no",
      hotwaterheating: filters.hotwaterheating || "no",
      airconditioning: filters.airconditioning || "no",
      prefarea: filters.prefarea || "no",
    };
    console.log(parsedFilters);
    onFilter(parsedFilters);
  };  

  /**
   * Resetea todos los filtros a sus valores por defecto
   * Notifica al componente padre con null para limpiar los filtros
   * 
   * @returns {void}
   * 
   * @example
   * // Cuando se hace clic en el boton RESET:
   * // 1. Restablece todos los campos a sus valores iniciales
   * // 2. Llama a onFilter(null) para indicar que no hay filtros activos
   * 
   * @private
   */
  const resetFilters = () => {
    const defaultFilters = {
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      bedrooms: "",
      bathrooms: "",
      stories: "",
      parking: "",
      mainroad: "no",
      guestroom: "no",
      basement: "no",
      hotwaterheating: "no",
      airconditioning: "no",
      prefarea: "no",
      furnishingstatus: "none"
    };

    setFilters(defaultFilters);

    // Resetea los filtros en el componente padre
    onFilter(null);
  };

  return (
    <div className="filter-container">
      <h3 className="filter-title">Filter Apartments</h3>

      {/* FILA 1 - Filtros numericos basicos */}
      <div className="filter-row grid-row">
        <div className="filter-field">
          <label>Min Price</label>
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleChange} />
        </div>

        <div className="filter-field">
          <label>Max Price</label>
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} />
        </div>

        <div className="filter-field">
          <label>Min Area</label>
          <input type="number" name="minArea" value={filters.minArea} onChange={handleChange} />
        </div>

        <div className="filter-field">
          <label>Max Area</label>
          <input type="number" name="maxArea" value={filters.maxArea} onChange={handleChange} />
        </div>

        <div className="filter-field">
          <label>Bedrooms</label>
          <input type="number" name="bedrooms" value={filters.bedrooms} onChange={handleChange} />
        </div>

        <div className="filter-field">
          <label>Bathrooms</label>
          <input type="number" name="bathrooms" value={filters.bathrooms} onChange={handleChange} />
        </div>
      </div>

      {/* FILA 2 - Filtros adicionales y controles */}
      <div className="filter-row">
        <div className="filter-field">
          <label>Stories</label>
          <input type="number" name="stories" value={filters.stories} onChange={handleChange} />
        </div>

        <div className="filter-field">
          <label>Parking</label>
          <input type="number" name="parking" value={filters.parking} onChange={handleChange} />
        </div>

        {/* CHECKBOXES - Caracteristicas adicionales */}
        <div className="checkbox-group">
          <label>Main Road <input type="checkbox" name="mainroad" onChange={handleChange} /></label>
          <label>Guest Room <input type="checkbox" name="guestroom" onChange={handleChange} /></label>
          <label>Basement <input type="checkbox" name="basement" onChange={handleChange} /></label>
          <label>Hot Water <input type="checkbox" name="hotwaterheating" onChange={handleChange} /></label>
          <label>Air Conditioning <input type="checkbox" name="airconditioning" onChange={handleChange} /></label>
          <label>Preferred Area <input type="checkbox" name="prefarea" onChange={handleChange} /></label>
        </div>

        {/* SELECT - Estado de amueblamiento */}
        <div className="filter-field furnishing">
          <label>Furnishing</label>
          <select name="furnishingstatus" value={filters.furnishingstatus} onChange={handleChange}>
            <option value="none">none</option>
            <option value="furnished">furnished</option>
            <option value="unfurnished">unfurnished</option>
            <option value="semi-furnished">semi-furnished</option>
          </select>
        </div>

        {/* BOTONES - Aplicar y Resetear filtros */}
        <div className="button-container">
          <button className="filter-button" onClick={handleSubmit}>
          FILTER
        </button>
        <button className="reset-button" onClick={resetFilters}>
          RESET
        </button>
        </div>
      </div>
    </div>   
  );
}
