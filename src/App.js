import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";
import SignUp from "./Screens/SignUp";


import Login from "./Screens/Login";
import Graph from "./Components/Graph";
import Dashboard from "./Screens/Dashboard";
import PurchaseOrders from "./Screens/CardsScreens/PurchaseOrders";
import CheckStatus from "./Screens/CheckStatus";
import GoodsReturn from "./Screens/CardsScreens/GoodsReturn";
import MyContracts from "./Screens/CardsScreens/MyContracts";
import Receiveables from "./Screens/CardsScreens/Receiveables";
import Contacts from "./Screens/CardsScreens/Contacts";
import Protected from './Protected';
import ErrorPage from "./Screens/Error";
import Profile from "./Screens/CardsScreens/Profile"


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  return (
    <div className="App">
      {/* Routes To screens start  */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/notfound" element={<ErrorPage />} exact />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} exact />
          <Route path="/signup" element={<SignUp />} exact />

          <Route path="/graph" element={<Protected><Graph /></Protected>} exact />
          <Route path="/checkStatus" element={<CheckStatus/>} exact />
          <Route path="/pos" element={<Protected><PurchaseOrders/></Protected>} exact />
          <Route path="/grs" element={<Protected><GoodsReturn/></Protected>} exact />
          <Route path="/mcs" element={<Protected><MyContracts/></Protected>} exact />
          <Route path="/res" element={<Protected><Receiveables/></Protected>} exact />
          <Route path="/profile" element={<Protected><Profile/></Protected>} exact />
          <Route path="/cntc" element={<Protected><Contacts/></Protected>} exact />
        </Routes>
      </BrowserRouter>
      {/* Routes To end */}
    </div>
  );
}

export default App;
