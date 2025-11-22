import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

function DeliveryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    contact: "",
    scheduledDate: "",
    deliveryAddress: "",
    responsiblePerson: "",
    operationType: "",
    from: "",
    status: "Draft",
    products: []
  });

  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [reference, setReference] = useState("");

  useEffect(() => {
    axios.get(`${API}/warehouses`).then(res => setWarehouses(res.data));
    axios.get(`${API}/products`).then(res => setProducts(res.data));

    if (isEdit) {
      axios.get(`${API}/deliveries/${id}`).then(res => {
        const data = res.data;
        setReference(data.reference);
        setForm({
          contact: data.contact,
          scheduledDate: data.scheduledDate?.split("T")[0] || "",
          deliveryAddress: data.deliveryAddress || "",
          responsiblePerson: data.responsiblePerson || "",
          operationType: data.operationType || "",
          from: data.from?._id || "",
          status: data.status,
          products: data.products.map(p => ({
            product: p.product?._id || "",
            quantity: p.quantity
          }))
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...form.products];
    updated[index][field] = field === "quantity" ? Number(value) : value;
    setForm({ ...form, products: updated });
  };

  const addProduct = () => {
    setForm({ ...form, products: [...form.products, { product: "", quantity: 0 }] });
  };

  const removeProduct = (index) => {
    const updated = form.products.filter((_, i) => i !== index);
    setForm({ ...form, products: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`${API}/deliveries/${id}`, form);
    } else {
      await axios.post(`${API}/deliveries`, form);
    }
    navigate("/operations/deliveries");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#c41e3a" }}>Delivery</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setForm({ ...form, status: "Waiting" })}>Validate</button>
        <button onClick={() => alert("Print functionality")}>Print</button>
        <button onClick={() => navigate("/operations/deliveries")}>Cancel</button>
        <span style={{ float: "right" }}>
          Draft → Waiting → Ready → Done
        </span>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>{isEdit ? reference : "New Delivery"}</strong>
      </div>

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Delivery Address:</td>
              <td>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={form.deliveryAddress}
                  onChange={handleChange}
                />
              </td>
              <td>Scheduled Date:</td>
              <td>
                <input
                  type="date"
                  name="scheduledDate"
                  value={form.scheduledDate}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Responsible Person:</td>
              <td>
                <input
                  type="text"
                  name="responsiblePerson"
                  value={form.responsiblePerson}
                  onChange={handleChange}
                />
              </td>
              <td>Operation Type:</td>
              <td>
                <input
                  type="text"
                  name="operationType"
                  value={form.operationType}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Source Warehouse:</td>
              <td>
                <select name="from" value={form.from} onChange={handleChange} required>
                  <option value="">Select Warehouse</option>
                  {warehouses.map(wh => (
                    <option key={wh._id} value={wh._id}>{wh.name}</option>
                  ))}
                </select>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Contact:</td>
              <td>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Customer name"
                  required
                />
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <h4 style={{ marginTop: "20px" }}>Products</h4>
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {form.products.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={item.product}
                    onChange={(e) => handleProductChange(index, "product", e.target.value)}
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <button type="button" onClick={() => removeProduct(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addProduct} style={{ marginTop: "10px" }}>+ Add Product</button>

        <div style={{ marginTop: "20px" }}>
          <button type="submit">{isEdit ? "Update" : "Create"}</button>
          <button type="button" onClick={() => navigate("/operations/deliveries")}>Cancel</button>
        </div>

        <div style={{ marginTop: "20px", padding: "10px", border: "1px dashed #ccc" }}>
          <p><strong>Note:</strong> Check the validation & mark this for sale if product is out of stock. Status: Received or Rejected</p>
        </div>
      </form>
    </div>
  );
}

export default DeliveryForm;