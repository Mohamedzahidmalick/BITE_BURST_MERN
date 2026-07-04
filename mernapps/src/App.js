import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';

import { CartProvider } from './components/ContextReducer';

import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <CartProvider>
      <Router>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
          <Route path="/myOrder" element={<MyOrder />} />
        </Routes>

      </Router>
    </CartProvider>
  );
}

export default App;