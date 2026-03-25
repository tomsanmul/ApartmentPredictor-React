import React, { useState } from "react";
import "../index.css";

export default function ApartmentsFilter({ onFilter }) {
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
    };

  onFilter(parsedFilters);
};


  return (
    <div className="filter-container">
      <h2 className="filter-title">Filter Apartments</h2>

      {/* FILA 1 */}
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

      {/* FILA 2 */}
     <div className="filter-row">
        <div className="filter-field">
          <label>Stories</label>
          <input type="number" name="stories" value={filters.stories} onChange={handleChange} />
        </div>

        <div className="filter-field">
          <label>Parking</label>
          <input type="number" name="parking" value={filters.parking} onChange={handleChange} />
        </div>

        {/* CHECKBOXES */}
          <div className="checkbox-group">
            <label>Main Road <input type="checkbox" name="mainroad" onChange={handleChange} /></label>
            <label>Guest Room <input type="checkbox" name="guestroom" onChange={handleChange} /></label>
            <label>Basement <input type="checkbox" name="basement" onChange={handleChange} /></label>
            <label>Hot Water <input type="checkbox" name="hotwaterheating" onChange={handleChange} /></label>
            <label>Air Conditioning <input type="checkbox" name="airconditioning" onChange={handleChange} /></label>
            <label>Preferred Area <input type="checkbox" name="prefarea" onChange={handleChange} /></label>
          </div>

        {/* SELECT */}
        <div className="filter-field furnishing">
          <label>Furnishing</label>
          <select name="furnishingstatus" value={filters.furnishingstatus} onChange={handleChange}>
            <option value="none">none</option>
            <option value="furnished">furnished</option>
            <option value="unfurnished">unfurnished</option>
            <option value="semi-furnished">semi-furnished</option>
          </select>
        </div>

        {/* BOTÓN AQUÍ */}
          <div className="button-container">
            <button className="filter-button" onClick={handleSubmit}>   
            FILTER
          </button>
          </div>
      </div>
    </div>   
  );
}
