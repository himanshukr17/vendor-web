import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";
import SignUp from './Screens/SignUp';

import Dashboard from './Screens/Dashboard/Dashboard';
import Login from './Screens/Login';
function App() {
  return (
    <div className="App">
      {/* Routes To screens start  */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/login" element={<Login />} exact />
        </Routes>
      </BrowserRouter>
      {/* Routes To end */}
    </div>
  );
}

export default App;
