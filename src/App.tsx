import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Customers, Home, Notification, Orders, Payment, Products, Profile, Retailers } from "./pages";
import GlobalProvider from "./contexts/GlobalContext";
import { RootLayout } from "./layouts";
import StoreSettings from "./pages/StoreSettings";
import QrCode from "./pages/QrCode";
import { ToastProvider } from "./contexts/Notification";
import {Provider} from "react-redux"
import store from "./store";
import 'flowbite';
import 'react-multi-carousel/lib/styles.css';


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

            <Route path="store-settings/*" element={<StoreSettings/>}>
              <Route path="profile" element={<Profile/>}/>
              <Route path="notification" element={<Notification/>} />
              <Route path="payment" element={<Payment/>} />

            </Route>

          </Route>
        </Routes>
        </ToastProvider>
      </GlobalProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
