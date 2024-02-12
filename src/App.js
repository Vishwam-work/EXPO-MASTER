import Home from "./pages/home/Home-sceen";
import Performa from "./pages/performa/Performa";
import Performa_form from "./components/forms/Performa_form";
import Port from "./pages/MasterSetting/Port";
import Document from './pages/MasterSetting/Document'
import Material from "./pages/MasterSetting/Material";
import Consignee from "./pages/MasterSetting/Consignee";
import Buyer from "./pages/MasterSetting/Buyer";
import Notify from "./pages/MasterSetting/Notify";
import PaymentTerm from "./pages/MasterSetting/PaymentTerm";
import ShipmentTerm from "./pages/MasterSetting/ShipmentTerm";
import Settings from "@mui/icons-material/Settings";
import PurchaseOrder from "./pages/PurchaseOrder/PurchaseOrder";
import PurchaseOrder_form from "./components/forms/PurchaseOrder_form";

import Invoice from "./pages/Invoice/Invoice";
import Bldraft from "./pages/Bldraft/Bldraft";

import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import NewPorforma from "./components/forms/NewPorforma";
import Invoiceform from "./components/forms/Invoiceform";
import Blform from "./components/forms/Blform";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="performa" element={<Performa />} />
            <Route path="performaDocs" element={<NewPorforma />} />
            <Route path="purchaseorder" element={<PurchaseOrder />} />
            <Route path="purchaseorder/purchaseform" element={<PurchaseOrder_form />} />

            <Route path="invoice" element={<Invoice />} />
            <Route path="invoice/invoiceform" element={<Invoiceform />} />

            <Route path="bldraft" element={<Bldraft/>} />
            <Route path="bldraft/blform" element={<Blform/>} />
            




            
            <Route path="setting" element={<Settings/>}/>
            <Route path="setting/port" element={<Port/>}/>
            <Route path="setting/documents" element={<Document/>}/>
            <Route path="setting/material" element={<Material/>}/>
            <Route path="setting/consignee" element={<Consignee/>}/>
            <Route path="setting/buyers" element={<Buyer/>}/>
            <Route path="setting/notify" element={<Notify/>}/>
            <Route path="setting/paymentterms" element={<PaymentTerm/>}/>
            <Route path="setting/shipmentterm" element={<ShipmentTerm/>}/>
            
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
