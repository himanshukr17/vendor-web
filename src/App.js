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



function App() {
  return (
    <div className="App">
      {/* Routes To screens start  */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/signup" element={<SignUp />} exact />

          <Route path="/graph" element={<Graph />} exact />
          <Route path="/checkStatus" element={<CheckStatus/>} exact />
          <Route path="/pos" element={<PurchaseOrders/>} exact />
          <Route path="/grs" element={<GoodsReturn/>} exact />
          <Route path="/mcs" element={<MyContracts/>} exact />
          <Route path="/res" element={<Receiveables/>} exact />
        </Routes>
      </BrowserRouter>
      {/* Routes To end */}
    </div>
  );
}

export default App;
