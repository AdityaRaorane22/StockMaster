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
| **Inventory Managers** | Oversee stock levels, manage receipts & deliveries, generate reports, access all features |
| **Warehouse Staff** | Handle physical stock movements, transfers, counting, and shelving with limited access |

---

## ✨ Key Features

### 1. 📊 Real-Time Dashboard
Get an instant snapshot of your inventory health:
- **Total Stock Value** (₹) with real-time valuation
- **Total Products** in your catalog
- **Low Stock Items** requiring attention
- **Late Operations** that are overdue
- **Waiting Operations** blocked by stock availability
- **Active Operations** (pending receipts & deliveries)
- **Dynamic Stock Movement Graph** showing monthly trends for 2025
- **Recent Activity Feed** with last 5 stock movements

### 2. 📋 Kanban View for Operations
Visual workflow management for receipts and deliveries:
- **Drag-and-drop** style board with status columns (Draft, Ready, Waiting, Done)
- **Priority Indicators** (Late, Today, Upcoming) based on scheduled dates
- **Quick Actions** - Move operations to "Ready" or "Validate" directly from cards
- **Real-time Status** updates across the team

### 3. 📦 Product Management
Create and manage your product catalog:
- Product name and description
- **SKU/Code** for easy identification
- **Categories** for organization (Furniture, Raw Materials, etc.)
- **Unit of Measure** (kg, pieces, liters, etc.)
- **Per Unit Cost** for valuation
- **Initial Stock** setup when creating products
- Track stock across multiple warehouses and locations

### 4. 📥 Receipts (Incoming Stock)
When goods arrive from vendors:
```
Example: Receive 100 Chairs from Supplier ABC on 15/08/2025
→ Stock automatically increases by 100
→ Graph shows spike in August (uses scheduled date, not validation date)
```

**Two-Step Validation Workflow:**
1. **Draft** → Click "To DO" → **Ready**
2. **Ready** → Click "Validate" → **Done** (stock updated)

### 5. 📤 Deliveries (Outgoing Stock)
When shipping orders to customers:
```
Example: Ship 10 Chairs to Customer XYZ
→ Stock automatically decreases by 10
```

**Smart Stock Management:**
- **Automatic Stock Check** when clicking "To DO"
  - ✅ Sufficient stock → Moves to **Ready**
  - ⏳ Insufficient stock → Moves to **Waiting**
- **Waiting Status** with "Recheck Stock" button
  - Click to refresh stock levels
  - Automatically moves to **Ready** when stock becomes available
- **Stock Availability Display** shows available quantity for each product

### 6. 🔄 Internal Transfers
Move stock between locations without changing total inventory:
```
Example: Move 20 kg Steel from "Main Warehouse" → "Production Floor"
→ Total stock unchanged, but location updated
```

### 7. 📝 Stock Adjustments
Fix discrepancies between recorded and actual stock:
```
Example: Physical count shows 97 kg Steel, system shows 100 kg
→ Adjust for 3 kg damaged/lost → Stock corrected to 97 kg
```

### 8. 📜 Move History (Stock Ledger)
Complete audit trail of every stock movement:
- Who performed the action
- What product was moved
- When it happened (uses scheduled date for receipts/deliveries)
- Reference number for traceability
- Full movement details (from/to locations, quantities)

---

## 🏭 Multi-Warehouse Support

Manage inventory across multiple locations:
- **Warehouses** (Main Warehouse, Branch A, Branch B)
- **Locations within warehouses** (Rack A, Shelf B, Production Floor)
- **Stock Tracking** by product, warehouse, and location

---

## 🔐 Security & Access

- **Sign Up / Login** with email and password
- **JWT-based authentication** for secure sessions
- **OTP-based password reset** via email (Nodemailer)
- **Role-Based Access Control (RBAC)**:
  - **Inventory Manager**: Full access to all features
  - **Warehouse Staff**: Limited access (no settings, restricted operations)
- **Auto-fill Responsible Person** with logged-in user's name

---

## 🗺️ Application Structure

```
StockMaster/
│
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with role & OTP fields
│   │   ├── Stock.js         # Stock tracking by product & location
│   │   └── StockMove.js     # Movement history/ledger
│   │
│   ├── routes/
│   │   └── auth.js          # Authentication routes (login, signup, OTP)
│   │
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification & route protection
│   │
│   ├── server.js            # Main Express server with all routes
│   └── .env                 # Environment variables
│
└── frontend/
    └── src/
        ├── components/
        │   └── Layout.js    # Sidebar navigation with role-based access
        │
        ├── pages/
        │   ├── Auth/
        │   │   ├── Login.js
        │   │   ├── Signup.js
        │   │   ├── ForgotPassword.js
        │   │   └── ResetPassword.js
        │   │
        │   ├── Dashboard.js         # KPIs + Dynamic Graph
        │   │
        │   ├── Products/
        │   │   ├── ProductList.js
        │   │   └── ProductForm.js   # Create/Edit with initial stock
        │   │
        │   ├── Operations/
        │   │   ├── OperationsKanban.js  # NEW: Kanban board view
        │   │   ├── ReceiptList.js
        │   │   ├── ReceiptForm.js       # Two-step validation
        │   │   ├── DeliveryList.js
        │   │   ├── DeliveryForm.js      # Smart stock check + Recheck button
        │   │   ├── TransferList.js
        │   │   └── MoveHistory.js
        │   │
        │   ├── Inventory/
        │   │   └── StockList.js     # Stock valuation column
        │   │
        │   ├── Settings/
        │   │   ├── Profile.js       # User profile page
        │   │   ├── WarehouseList.js
        │   │   ├── WarehouseForm.js
        │   │   ├── LocationList.js
        │   │   └── LocationForm.js
        │   │
        │   └── App.js               # Route definitions
        │
        └── index.css                # Global styles
```

---

## 📖 A Day in the Life: Example Workflow

### Morning: Goods Arrive
1. Vendor delivers 100 Chairs scheduled for 15/08/2025
2. Warehouse staff creates a **Receipt** (Draft status)
3. Click **"To DO"** → Status changes to **Ready**
4. Click **"Validate"** → ✅ Stock increases: `0 → 100 Chairs`
5. Graph shows spike in **August** (not current month)

### Midday: Customer Order (Insufficient Stock)
1. Sales order for 150 Chairs (only 100 available)
2. Staff creates a **Delivery** (Draft status)
3. Click **"To DO"** → System checks stock
4. ⏳ Status changes to **Waiting** (insufficient stock)
5. "Recheck Stock" button appears in header

### Afternoon: More Stock Arrives
1. Another receipt of 100 Chairs validated
2. Return to waiting delivery
3. Click **"🔄 Recheck Stock"** button
4. ✅ System detects sufficient stock → Moves to **Ready**
5. Click **"Validate"** → Delivery completes

### Evening: Check Kanban Board
1. Navigate to **Operations > Kanban View**
2. See all receipts and deliveries organized by status
3. **Late** operations highlighted in red
4. **Today's** operations in orange
5. Quick actions available on each card

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js 18 with React Router v6 |
| **Styling** | Custom CSS with CSS Variables (Dark Mode Ready) |
| **Charts** | Recharts for dynamic graphs |
| **Icons** | React Icons (Font Awesome) |
| **Backend** | Node.js / Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT + Bcrypt for password hashing |
| **Email** | Nodemailer for OTP delivery |
| **State Management** | React Hooks (useState, useEffect) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/AdityaRaorane22/StockMaster.git

# Navigate to project
cd StockMaster

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/stockmaster
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stockmaster

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Server
PORT=5001
NODE_ENV=development
```

### Running the Application

```bash
# Terminal 1: Start Backend Server
cd backend
node server.js
# Server runs on http://localhost:5001

# Terminal 2: Start Frontend
cd frontend
npm start
# App opens at http://localhost:3000
```

### Default User Roles

When signing up:
- New users default to **"Warehouse Staff"** role
- Change to **"Inventory Manager"** in signup form for full access

---

## 📱 Route Reference

| Path | Purpose |
|------|---------|
| `/` | Redirects to login |
| `/login` | User login |
| `/signup` | New user registration with role selection |
| `/forgot-password` | Request password reset OTP |
| `/reset-password` | Enter OTP and new password |
| `/dashboard` | Main dashboard with KPIs & dynamic graph |
| `/products` | View all products |
| `/products/new` | Add new product with initial stock |
| `/products/edit/:id` | Edit existing product |
| `/inventory/stocks` | View stock levels with valuation |
| `/operations/kanban` | **NEW:** Kanban board for receipts & deliveries |
| `/operations/receipts` | View all receipts |
| `/operations/receipts/new` | Create new receipt |
| `/operations/receipts/edit/:id` | Edit receipt (two-step validation) |
| `/operations/deliveries` | View all deliveries |
| `/operations/deliveries/new` | Create new delivery |
| `/operations/deliveries/edit/:id` | Edit delivery (smart stock check) |
| `/operations/transfers` | View internal transfers |
| `/operations/moves` | View complete move history |
| `/settings/warehouses` | Manage warehouses |
| `/settings/warehouses/new` | Add new warehouse |
| `/settings/warehouses/edit/:id` | Edit warehouse |
| `/settings/locations` | Manage locations |
| `/settings/locations/new` | Add new location |
| `/settings/locations/edit/:id` | Edit location |
| `/settings/profile` | View user profile |

---

## 🎨 UI/UX Highlights

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Intuitive Navigation** - Sidebar with grouped menu items
- **Visual Feedback** - Status badges, priority indicators, loading states
- **Smart Forms** - Auto-fill, validation, real-time stock checks
- **Dynamic Charts** - Interactive graphs with tooltips
- **Role-Based UI** - Menu items show/hide based on user role

---

## 🔮 Recent Enhancements

- [x] **Kanban View** for visual operations management
- [x] **Waiting Status Logic** for deliveries with insufficient stock
- [x] **Recheck Stock Button** to refresh availability
- [x] **Dynamic Dashboard Graph** showing 2025 monthly data
- [x] **Stock Movement Date Fix** - Uses scheduled date instead of validation date
- [x] **Two-Step Validation** workflow (Draft → Ready → Done)
- [x] **Role-Based Access Control** (Inventory Manager vs Warehouse Staff)
- [x] **User Profile Page** with JWT-protected route
- [x] **Auto-fill Responsible Person** from logged-in user

---

## 🔮 Future Enhancements

- [ ] Barcode/QR code scanning for products
- [ ] Automated reorder alerts when stock falls below threshold
- [ ] Supplier management module
- [ ] Advanced reports and analytics dashboard
- [ ] Mobile app (iOS/Android)
- [ ] Export data to Excel/PDF
- [ ] Integration with accounting software
- [ ] Multi-currency support
- [ ] Batch/Lot tracking
- [ ] Expiry date management

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
