import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Customers, Home, Orders, Products, Retailers } from "./pages";
import GlobalProvider from "./contexts/GlobalContext";
import { RootLayout } from "./layouts";
import StoreSettings from "./pages/StoreSettings";
import QrCode from "./pages/QrCode";
import { ToastProvider } from "./contexts/Notification";
import {Provider} from "react-redux"
import store from "./store";


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
      <GlobalProvider>
        <ToastProvider>
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
        </ToastProvider>
      </GlobalProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
