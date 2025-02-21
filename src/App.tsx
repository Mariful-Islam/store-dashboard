import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Customers, Home, Orders, Products, Retailers } from "./pages";
import GlobalProvider from "./contexts/GlobalContext";
import { RootLayout } from "./layouts";
import StoreSettings from "./pages/StoreSettings";
import QrCode from "./pages/QrCode";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/retailers" element={<Retailers />} />
            <Route path="/qr-code" element={<QrCode />} />

            <Route path="/store-settings" element={<StoreSettings/>} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
