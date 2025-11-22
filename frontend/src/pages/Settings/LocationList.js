import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [filterWarehouse, setFilterWarehouse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/warehouses`).then((res) => setWarehouses(res.data));
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [filterWarehouse]);

  const fetchLocations = async () => {
    const url = filterWarehouse ? `${API}/locations?warehouse=${filterWarehouse}` : `${API}/locations`;
    const res = await axios.get(url);
    setLocations(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this location?")) {
      await axios.delete(`${API}/locations/${id}`);
      fetchLocations();
    }
  };

  return (
    <div>
      <h2>Location</h2>
      <div>
        <select value={filterWarehouse} onChange={(e) => setFilterWarehouse(e.target.value)}>
          <option value="">All Warehouses</option>
          {warehouses.map((wh) => (
            <option key={wh._id} value={wh._id}>{wh.name}</option>
          ))}
        </select>
        <button onClick={() => navigate("/settings/location/new")}>+ Add Location</button>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Short Code</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc._id}>
              <td>{loc.name}</td>
              <td>{loc.shortCode}</td>
              <td>{loc.warehouse?.name}</td>
              <td>
                <button onClick={() => navigate(`/settings/location/edit/${loc._id}`)}>Edit</button>
                <button onClick={() => handleDelete(loc._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationList;