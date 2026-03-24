import React from "react";
import "../index.css";

export default function ApartmentsFilter() {
  return (
    <div className="filter-container">
      <h2 className="filter-title">Filter Apartments</h2>

      <div className="filter-field">
        <label>Price min:</label>
        <input type="text" placeholder="Ej: 1000" />
      </div>

      <div className="filter-field">
        <label>Parkings:</label>
        <input type="number" placeholder="Ej: 1" />
      </div>

      <div className="filter-field">
        <label>Reviews min:</label>
        <input type="number" placeholder="Ej: 10" />
      </div>

      <div className="filter-field">
        <label>Schools min:</label>
        <input type="number" placeholder="Ej: 2" />
      </div>

      <button className="filter-button">FILTER</button>
    </div>
  );
};

