import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

function ReceiptList() {
  const [receipts, setReceipts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    const res = await axios.get(`${API}/receipts`);
    setReceipts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this receipt?")) {
      await axios.delete(`${API}/receipts/${id}`);
      fetchReceipts();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const filteredReceipts = receipts.filter(r => 
    r.reference.toLowerCase().includes(search.toLowerCase()) ||
    r.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#c41e3a" }}>Receipts</h2>
        <div>
          <input
            type="text"
            placeholder="Search by reference & contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button onClick={() => navigate("/operations/receipts/new")}>+ New</button>
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#888" }}>
        Allow user to search Receipts based on reference & contacts
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
          {filteredReceipts.map((receipt) => (
            <tr key={receipt._id}>
              <td>{receipt.reference}</td>
              <td>{receipt.from}</td>
              <td>{receipt.to?.name || "WH/Stock"}</td>
              <td>{receipt.contact}</td>
              <td>{formatDate(receipt.scheduledDate)}</td>
              <td>{receipt.status}</td>
              <td>
                <button onClick={() => navigate(`/operations/receipts/edit/${receipt._id}`)}>Edit</button>
                <button onClick={() => handleDelete(receipt._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <p><strong>Populate all stock orders added to warehousing order</strong></p>
        <p>Location of warehouse</p>
      </div>
    </div>
  );
}

export default ReceiptList;