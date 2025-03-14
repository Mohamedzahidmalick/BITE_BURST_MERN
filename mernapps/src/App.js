import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// // Keep only one import here
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';

function App() {
  return (
    <CartProvider>

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

//import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'