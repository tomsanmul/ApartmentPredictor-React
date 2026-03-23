
import {
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useApartmentService } from "../../middleware/apartmentServiceHooks";

const ApartmentFilter = () => {
  // State to hold the filter values
  const [filters, setFilters] = useState({
    maxPrice: "",
    minArea: "",
    minBedrooms: "",
    minBathrooms: "",
    minParking: "",
    furnishingStatus: "",
    mainroad: "",
    guestroom: "",
    basement: "",
    hotwaterheating: "",
    airconditioning: "",
    prefarea: "",
    minSchools: "",
    textOnReview: "",
  });
  
  // State to hold the filtered apartments
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Custom hook to access the apartment service
  const apartmentService = useApartmentService();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apartmentService.filterApartments(filters);
      setFilteredApartments(data);
    } catch (error) {
      console.error("Filter error:", error);
      setError(error.message || "Failed to fetch data");
      setFilteredApartments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {/* Filters Section */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Filter (Plain) Apartments</Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <TextField
          label="Max Price"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Area"
          name="minArea"
          type="number"
          value={filters.minArea}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Bedrooms"
          name="minBedrooms"
          type="number"
          value={filters.minBedrooms}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Bathrooms"
          name="minBathrooms"
          type="number"
          value={filters.minBathrooms}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Parking"
          name="minParking"
          type="number"
          value={filters.minParking}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          select
          label="Furnishing Status"
          name="furnishingStatus"
          value={filters.furnishingStatus}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="furnished">Furnished</MenuItem>
          <MenuItem value="semi-furnished">Semi-Furnished</MenuItem>
          <MenuItem value="unfurnished">Unfurnished</MenuItem>
        </TextField>
        <TextField
          select
          label="Main Road"
          name="mainroad"
          value={filters.mainroad}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Guest Room"
          name="guestroom"
          value={filters.guestroom}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Basement"
          name="basement"
          value={filters.basement}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Hot Water Heating"
          name="hotwaterheating"
          value={filters.hotwaterheating}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Air Conditioning"
          name="airconditioning"
          value={filters.airconditioning}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Preferred Area"
          name="prefarea"
          value={filters.prefarea}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          label="Min Schools"
          name="minSchools"
          type="number"
          value={filters.minSchools}
          onChange={handleFilterChange}
          variant="outlined"
          inputProps={{ min: 0, max: 100 }}
        />
        <TextField
          label="Text on Review"
          name="textOnReview"
          value={filters.textOnReview}
          onChange={handleFilterChange}
          variant="outlined"
        />
      </div>
      
      {/* Apply Filters Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={applyFilters}
        disabled={loading}
        style={{ margin: "20px 0" }}
      >
        {loading ? <CircularProgress size={24} /> : "Apply Filters"}
      </Button>
      
      {/* Error Message */}
      {error && (
        <Typography color="error" style={{ marginBottom: "20px" }}>
          Error: {error}
        </Typography>
      )}
      
      {/* Results Table */}
      <br />
      <Typography color="success" style={{ marginBottom: "20px" }}>
        There are {filteredApartments.length} results.
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Bathrooms</TableCell>
              <TableCell>Parking</TableCell>
              <TableCell>Furnishing</TableCell>
              <TableCell>Main Road</TableCell>
              <TableCell>Guest Room</TableCell>
              <TableCell>Basement</TableCell>
              <TableCell>Hot Water</TableCell>
              <TableCell>AC</TableCell>
              <TableCell>Preferred Area</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApartments.length > 0
              ? filteredApartments.map((apartment) => (
                  <TableRow key={apartment.id}>
                    <TableCell>{apartment.id}</TableCell>
                    <TableCell>${apartment.price}</TableCell>
                    <TableCell>{apartment.area} sq ft</TableCell>
                    <TableCell>{apartment.bedrooms}</TableCell>
                    <TableCell>{apartment.bathrooms}</TableCell>
                    <TableCell>{apartment.parking}</TableCell>
                    <TableCell>{apartment.furnishingStatus || "N/A"}</TableCell>
                    <TableCell>{apartment.mainroad ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.guestroom ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.basement ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.hotwaterheating ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.airconditioning ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.prefarea ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))
              : !loading && (
                  <TableRow>
                    <TableCell colSpan={14} style={{ textAlign: "center" }}>
                      No matching records found.
                    </TableCell>
                  </TableRow>
                )}
            {loading && (
              <TableRow>
                <TableCell colSpan={14} style={{ textAlign: "center" }}>
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ApartmentFilter;
