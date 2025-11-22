import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    const res = await axios.get(`${API}/deliveries`);
    setDeliveries(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this delivery?")) {
      await axios.delete(`${API}/deliveries/${id}`);
      fetchDeliveries();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const filteredDeliveries = deliveries.filter(d =>
    d.reference.toLowerCase().includes(search.toLowerCase()) ||
    d.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#c41e3a" }}>Delivery</h2>
        <div>
          <input
            type="text"
            placeholder="Search by reference & contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button onClick={() => navigate("/operations/deliveries/new")}>+ New</button>
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#888" }}>
        Allow user to search Delivery based on reference & contacts
      </p>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th>Reference</th>
            <th>From</th>
            <th>To</th>
            <th>Contact</th>
            <th>Scheduled Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.reference}</td>
              <td>{delivery.from?.name || "WH/Stock"}</td>
              <td>{delivery.to}</td>
              <td>{delivery.contact}</td>
              <td>{formatDate(delivery.scheduledDate)}</td>
              <td>{delivery.status}</td>
              <td>
                <button onClick={() => navigate(`/operations/deliveries/edit/${delivery._id}`)}>Edit</button>
                <button onClick={() => handleDelete(delivery._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <p><strong>Populate all delivery orders</strong></p>
      </div>
    </div>
  );
}

export default DeliveryList;