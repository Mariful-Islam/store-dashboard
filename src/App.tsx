import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Categories,
  Customers,
  Discount,
  Home,
  Notification,
  Orders,
  Payment,
  Products,
  Profile,
} from "./pages";
import GlobalProvider from "./contexts/GlobalContext";
import { RootLayout } from "./layouts";
import StoreSettings from "./pages/StoreSettings";
import QrCode from "./pages/QrCode";
import { ToastProvider } from "./contexts/Notification";
import { Provider } from "react-redux";
import store from "./store";
import "flowbite";
import "react-multi-carousel/lib/styles.css";
import ThemeProvider from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordChange from "./pages/PasswordChange";
import 'react-tooltip/dist/react-tooltip.css'



function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider >
          <GlobalProvider>
            <ToastProvider>
              <Routes>
                
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="password-change" element={<PasswordChange />}/>


                <Route element={<RootLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/categories" element={<Categories />} />
                  
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/qr-code" element={<QrCode />} />
                  <Route path="/discount" element={<Discount />} />


                  <Route path="store-settings/*" element={<StoreSettings />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="notification" element={<Notification />} />
                    <Route path="payment" element={<Payment />} />
                  </Route>
                </Route>
              </Routes>
            </ToastProvider>
          </GlobalProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
