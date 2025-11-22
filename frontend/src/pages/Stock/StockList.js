import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newStock, setNewStock] = useState({
    product: "",
    perUnitCost: "",
    onHand: "",
    freeToUse: ""
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const res = await axios.get(`${API}/stocks`);
    setStocks(res.data);
  };

  // Handle Edit
  const handleEdit = (stock) => {
    setEditingId(stock._id);
    setEditForm({
      product: stock.product,
      perUnitCost: stock.perUnitCost,
      onHand: stock.onHand,
      freeToUse: stock.freeToUse
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    await axios.put(`${API}/stocks/${id}`, {
      ...editForm,
      perUnitCost: Number(editForm.perUnitCost),
      onHand: Number(editForm.onHand),
      freeToUse: Number(editForm.freeToUse)
    });
    setEditingId(null);
    fetchStocks();
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  // Handle Add
  const handleAddChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await axios.post(`${API}/stocks`, {
      ...newStock,
      perUnitCost: Number(newStock.perUnitCost),
      onHand: Number(newStock.onHand),
      freeToUse: Number(newStock.freeToUse)
    });
    setNewStock({ product: "", perUnitCost: "", onHand: "", freeToUse: "" });
    setShowAdd(false);
    fetchStocks();
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this stock item?")) {
      await axios.delete(`${API}/stocks/${id}`);
      fetchStocks();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#c41e3a" }}>Stock</h2>
        <button onClick={() => setShowAdd(!showAdd)}>+ Add Stock</button>
      </div>

      <p style={{ color: "#888", fontSize: "12px" }}>
        This page contains the warehouse details & location.
      </p>

      {/* Add New Stock Form */}
      {showAdd && (
        <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h4>Add New Stock</h4>
          <input
            type="text"
            name="product"
            placeholder="Product"
            value={newStock.product}
            onChange={handleAddChange}
          />
          <input
            type="number"
            name="perUnitCost"
            placeholder="Per Unit Cost"
            value={newStock.perUnitCost}
            onChange={handleAddChange}
          />
          <input
            type="number"
            name="onHand"
            placeholder="On Hand"
            value={newStock.onHand}
            onChange={handleAddChange}
          />
          <input
            type="number"
            name="freeToUse"
            placeholder="Free to Use"
            value={newStock.freeToUse}
            onChange={handleAddChange}
          />
          <button onClick={handleAdd}>Save</button>
          <button onClick={() => setShowAdd(false)}>Cancel</button>
        </div>
      )}

      {/* Stock Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th>Product</th>
            <th>Per Unit Cost</th>
            <th>On Hand</th>
            <th>Free to Use</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              {editingId === stock._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="product"
                      value={editForm.product}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="perUnitCost"
                      value={editForm.perUnitCost}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="onHand"
                      value={editForm.onHand}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="freeToUse"
                      value={editForm.freeToUse}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(stock._id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{stock.product}</td>
                  <td>{stock.perUnitCost} Rs</td>
                  <td>{stock.onHand}</td>
                  <td>{stock.freeToUse}</td>
                  <td>
                    <button onClick={() => handleEdit(stock)}>Edit</button>
                    <button onClick={() => handleDelete(stock._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", padding: "10px", border: "1px dashed #ccc" }}>
        <p>User must be able to update the stock from here.</p>
      </div>
    </div>
  );
}

export default StockList;