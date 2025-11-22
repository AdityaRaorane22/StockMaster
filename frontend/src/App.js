import { BrowserRouter, Routes, Route } from "react-router-dom";

// Stock
import StockList from "./pages/Stock/StockList";

// Settings
import WarehouseList from "./pages/Settings/WarehouseList";
import WarehouseForm from "./pages/Settings/WarehouseForm";
import LocationList from "./pages/Settings/LocationList";
import LocationForm from "./pages/Settings/LocationForm";

// Operations
import ReceiptList from "./pages/Operations/ReceiptList";
import ReceiptForm from "./pages/Operations/ReceiptForm";
import DeliveryList from "./pages/Operations/DeliveryList";
import DeliveryForm from "./pages/Operations/DeliveryForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Stock Routes */}
        <Route path="/stock" element={<StockList />} />

        {/* Settings Routes */}
        <Route path="/settings/warehouse" element={<WarehouseList />} />
        <Route path="/settings/warehouse/new" element={<WarehouseForm />} />
        <Route path="/settings/warehouse/edit/:id" element={<WarehouseForm />} />
        <Route path="/settings/location" element={<LocationList />} />
        <Route path="/settings/location/new" element={<LocationForm />} />
        <Route path="/settings/location/edit/:id" element={<LocationForm />} />

        {/* Operations - Receipts */}
        <Route path="/operations/receipts" element={<ReceiptList />} />
        <Route path="/operations/receipts/new" element={<ReceiptForm />} />
        <Route path="/operations/receipts/edit/:id" element={<ReceiptForm />} />

        {/* Operations - Deliveries */}
        <Route path="/operations/deliveries" element={<DeliveryList />} />
        <Route path="/operations/deliveries/new" element={<DeliveryForm />} />
        <Route path="/operations/deliveries/edit/:id" element={<DeliveryForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;