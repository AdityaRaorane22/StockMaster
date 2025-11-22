# 📦 StockMaster - Inventory Management System

> A modern, centralized solution to replace manual registers, Excel sheets, and scattered tracking methods with real-time inventory control.

---

## 🎯 What Problem Does This Solve?

Many businesses still track inventory using:
- Paper registers
- Multiple Excel spreadsheets
- Scattered notes and WhatsApp messages

**This leads to:**
- Stock mismatches and losses
- Delayed order fulfillment
- No visibility into what's actually available
- Manual errors in counting and recording

**StockMaster fixes this** by providing a single source of truth for all your inventory operations.

---

## 👥 Who Is This For?

| Role | What They Do |
|------|--------------|
| **Inventory Managers** | Oversee stock levels, manage receipts & deliveries, generate reports |
| **Warehouse Staff** | Handle physical stock movements, transfers, counting, and shelving |

---

## ✨ Key Features

### 1. 📊 Real-Time Dashboard
Get an instant snapshot of your inventory health:
- **Total Products** in stock
- **Low Stock / Out of Stock** alerts
- **Pending Receipts** (goods expected from vendors)
- **Pending Deliveries** (orders to ship out)
- **Scheduled Transfers** (internal movements)

### 2. 📦 Product Management
Create and manage your product catalog:
- Product name and description
- SKU/Code for easy identification
- Categories for organization
- Unit of measure (kg, pieces, liters, etc.)
- Track stock across multiple locations

### 3. 📥 Receipts (Incoming Stock)
When goods arrive from vendors:
```
Example: Receive 50 Steel Rods from Supplier ABC
→ Stock automatically increases by 50
```

### 4. 📤 Deliveries (Outgoing Stock)
When shipping orders to customers:
```
Example: Ship 10 Chairs to Customer XYZ
→ Stock automatically decreases by 10
```

### 5. 🔄 Internal Transfers
Move stock between locations without changing total inventory:
```
Example: Move 20 kg Steel from "Main Warehouse" → "Production Floor"
→ Total stock unchanged, but location updated
```

### 6. 📝 Stock Adjustments
Fix discrepancies between recorded and actual stock:
```
Example: Physical count shows 97 kg Steel, system shows 100 kg
→ Adjust for 3 kg damaged/lost → Stock corrected to 97 kg
```

### 7. 📜 Move History (Stock Ledger)
Complete audit trail of every stock movement - who did what, when, and why.

---

## 🏭 Multi-Warehouse Support

Manage inventory across multiple locations:
- **Warehouses** (Main Store, Branch A, Branch B)
- **Locations within warehouses** (Rack A, Shelf B, Production Floor)

---

## 🔐 Security & Access

- **Sign Up / Login** with email and password
- **OTP-based password reset** for security
- Role-based access (coming soon)

---

## 🗺️ Application Structure

```
StockMaster/
│
├── 🔐 Authentication
│   ├── Login
│   ├── Sign Up
│   ├── Forgot Password
│   └── Reset Password (OTP)
│
├── 📊 Dashboard
│   └── KPIs + Quick Filters
│
├── 📦 Products
│   ├── View All Products
│   ├── Add New Product
│   └── Edit Product
│
├── ⚙️ Operations
│   ├── Receipts (Incoming)
│   │   ├── View All Receipts
│   │   ├── Create Receipt
│   │   └── Edit Receipt
│   │
│   ├── Deliveries (Outgoing)
│   │   ├── View All Deliveries
│   │   ├── Create Delivery
│   │   └── Edit Delivery
│   │
│   ├── Internal Transfers
│   │   └── Create Transfer
│   │
│   ├── Stock Adjustments
│   │   └── Create Adjustment
│   │
│   └── Move History
│       └── View All Movements
│
├── 🏢 Settings
│   ├── Warehouses
│   │   ├── View All
│   │   ├── Add New
│   │   └── Edit
│   │
│   └── Locations
│       ├── View All
│       ├── Add New
│       └── Edit
│
└── 👤 Profile
    ├── My Profile
    └── Logout
```

---

## 📖 A Day in the Life: Example Workflow

### Morning: Goods Arrive
1. Vendor delivers 100 kg of Steel
2. Warehouse staff creates a **Receipt**
3. ✅ Stock increases: `0 → 100 kg`

### Midday: Production Needs Material
1. Production floor requests 30 kg Steel
2. Staff creates an **Internal Transfer**
3. ✅ Stock moved: `Main Store (70 kg) → Production (30 kg)`

### Afternoon: Customer Order Ships
1. Sales order for 20 kg Steel
2. Staff creates a **Delivery Order**
3. ✅ Stock decreases: `100 → 80 kg`

### Evening: Stock Count Reveals Damage
1. Physical count shows only 77 kg (3 kg damaged)
2. Staff creates a **Stock Adjustment**
3. ✅ Stock corrected: `80 → 77 kg`

### Anytime: Check the Ledger
- Every action above is logged in **Move History**
- Full traceability for audits and analysis

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js with React Router |
| **Styling** | Tailwind CSS |
| **State Management** | React Context API |
| **Backend** | Node.js / Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT + OTP for password reset |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/stockmaster.git

# Navigate to project
cd stockmaster

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and API keys

# Run the development server
npm run dev
```

### Environment Variables

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# OTP Service
OTP_SERVICE_API_KEY=your_otp_service_key

# Server
PORT=5000
NODE_ENV=development
```

---

## 📱 Route Reference

| Path | Purpose |
|------|---------|
| `/login` | User login |
| `/signup` | New user registration |
| `/forgot-password` | Request password reset |
| `/reset-password` | Enter OTP and new password |
| `/dashboard` | Main dashboard with KPIs |
| `/kanban` | Kanban board view |
| `/products` | View all products |
| `/products/new` | Add a new product |
| `/products/edit/:id` | Edit existing product |
| `/operations/receipts` | View all receipts |
| `/operations/receipts/new` | Create new receipt |
| `/operations/receipts/edit/:id` | Edit existing receipt |
| `/operations/deliveries` | View all deliveries |
| `/operations/deliveries/new` | Create new delivery |
| `/operations/deliveries/edit/:id` | Edit existing delivery |
| `/operations/transfers/new` | Create internal transfer |
| `/operations/adjustments/new` | Create stock adjustment |
| `/operations/moves` | View complete move history |
| `/settings/warehouse` | Manage warehouses |
| `/settings/warehouse/new` | Add new warehouse |
| `/settings/warehouse/edit/:id` | Edit warehouse |
| `/settings/location` | Manage locations |
| `/settings/location/new` | Add new location |
| `/settings/location/edit/:id` | Edit location |

---

## 🔮 Future Enhancements

- [ ] Barcode/QR code scanning
- [ ] Automated reorder alerts
- [ ] Supplier management module
- [ ] Reports and analytics dashboard
- [ ] Mobile app (iOS/Android)
- [ ] Role-based access control
- [ ] Integration with accounting software

---

## 👨‍💻 Contributors

<table>
  <tr>
    <td align="center">
      <b>Aditya Raorane</b><br>
      <sub>VESIT, Mumbai</sub>
    </td>
    <td align="center">
      <b>Bhushan Kor</b><br>
      <sub>VESIT, Mumbai</sub>
    </td>
    <td align="center">
      <b>Sairam Konar</b><br>
      <sub>VESIT, Mumbai</sub>
    </td>
    <td align="center">
      <b>Krushikesh Shelar</b><br>
      <sub>VESIT, Mumbai</sub>
    </td>
  </tr>
</table>

---

## 🏫 About

This project was developed as part of academic coursework at **Vivekanand Education Society's Institute of Technology (VESIT), Mumbai**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by Team StockMaster | VESIT, Mumbai**

</div>
