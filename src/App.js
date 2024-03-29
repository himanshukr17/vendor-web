import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";
import SignUp from "./Screens/SignupOld";
import Login from "./Screens/Login";
import Graph from "./Components/Graph";
import Dashboard from "./Screens/Dashboard";
import PurchaseOrders from "./Screens/CardsScreens/PurchaseOrders";
import CheckStatus from "./Screens/CheckStatus";
import GoodsReturn from "./Screens/CardsScreens/GoodsReturn";
import MyContact from './Screens/CardsScreens/MyContacts';
import Contract from './Screens/CardsScreens/Contracts';
// import MyContracts from "./Screens/CardsScreens/MyContracts";
import Receiveables from "./Screens/CardsScreens/Receiveables";
// import Contacts from "./Screens/CardsScreens/Contacts";
import Protected from './Protected';
import ErrorPage from "./Screens/Error";
import Profile from "./Screens/CardsScreens/Profile"
// Supplier
import PurchaseOrderSupplier from './Screens/CardsScreens/PurchaseOrderSupplier';
import DashboardSupplier from './Screens/DashboardSupplier';
import NotFound404 from './Screens/CardsScreens/NotFoundPage';
import ManageVendors from './Screens/BuyerScreen/ManageVendors';
//Admin

import AdminManageVendor from './Screens/BuyerScreen/AdminManageVendor';
import VendorDetails from './Screens/BuyerScreen/VendorDetails';
import BuyerPurchaseOrders from './Screens/BuyerScreen/BuyerPurchaseOrders';
import BuyerReceiveables from './Screens/BuyerScreen/BuyerReceiveables';
import BuyerGoodsReturn from './Screens/BuyerScreen/BuyerGoodsReturn';
import VendorProfile from './Screens/BuyerScreen/VendorProfile';
import InvoiceDisplay from './Screens/CardsScreens/InvoiceDisplay';
import BuyerContracts from './Screens/BuyerScreen/BuyerContracts';
import BuyerMyContact from './Screens/BuyerScreen/BuyerMyContacts';
import NewSupplier from './Screens/BuyerScreen/NewSupplier';
import Acknowledgement from './Screens/CardsScreens/Acknowledgement';
import ForgotPassword from './Screens/ForgotPassword';
import ScreenAuth from './Screens/AdminScreen/ScreenAuth';
import RoleManagement from './Screens/AdminScreen/RoleManagement';
import CustomerSupport from './Screens/CardsScreens/CustomerSupport';
import RecSupport from './Screens/BuyerScreen/RecSupport';
import CreateScreen from './Screens/ScreenAuth/CreateScreen';
import CreateModule from './Screens/ScreenAuth/CreateModule';
import CreateAuthorization from './Screens/ScreenAuth/CreateAuthorization';
import AdminScreen from './Screens/BuyerScreen/AdminScreen';
import SignupNew from './Screens/SignupNew';
import NewLogin from './Screens/NewLogin';
import Ageing from './Screens/CardsScreens/Ageing';
import PricePartApproval from './Screens/BuyerScreen/PricePartApproval';
import Ledger from './Screens/CardsScreens/Ledger';
import PPASupplier from './Screens/CardsScreens/PPASupplier';
import EventApprove from './Screens/BuyerScreen/EventApprove';
import InvitedEvents from './Screens/InvitedEvents';
import AdvanceShipment from './Screens/CardsScreens/AdvanceShipment';
// import PendingInvoices from './Screens/PendingInvoices';
// import SignupNew from './Screens/Signup';
// import Signup from './Screens/Signup';
function App() {
  const userType = localStorage.getItem('userType');
  const userID = localStorage.getItem('userId');
  const [userTypeDef, setUserTypeDef] = useState(userType)
  const [isLoggedIn, setisLoggedIn] = useState(null);
  console.log('userTypeDef', userType)
  //localStorage.clear() 
  
  return (
<div className="App" >
      {
        userType === null &&
        (<Routes>
          {/* <Route path="/" element={<Login />} exact /> */}
          <Route path="/" element={<NewLogin />} exact />
          <Route path="/AdminManageVendor" element={<AdminManageVendor />} exact /> 
          <Route path="/ageing" element={<><Ageing /></>} exact />
          {/* <Route path="/signupnew" element={<SignupNew />} exact /> */}
          <Route path="/notfound" element={<ErrorPage />} exact />
          {/* <Route path="/PendingInvoices" element={<PendingInvoices />} exact /> */}
          <Route path="/createweb" element={<CreateScreen />} exact />
          <Route path="/createmobile" element={<CreateModule />} exact />
          <Route path="/admin" element={<AdminScreen />} exact />
          <Route path="/createauth" element={<CreateAuthorization/>} exact />
          <Route path="/checkStatus" element={<CheckStatus />} exact />
          <Route path="/signup" element={<SignupNew />} exact />
          <Route path="/forgot_password" element={<ForgotPassword />} exact />
          {/* <Route path="/pos" element={<PurchaseOrders />} exact /> */}
          <Route path="/PurchaseOrderSupplier" element={<PurchaseOrderSupplier />} exact />
          <Route path='*' exact={true} element={<ErrorPage />} />
        </Routes>)
      }
      {
        userType ==='supplier' &&

        (<Routes>
          {/* <Route path="/" element={<Login />} exact /> */}
          <Route path="/" element={<NewLogin />} exact />

          <Route path="/notfound" element={<ErrorPage />} exact />
          {/* <Route path="/PurchaseOrderSupplier" element={<Protected><PurchaseOrderSupplier /></Protected>} exact /> */}
          <Route path="/ageing" element={<Protected><Ageing /></Protected>} exact />
          <Route path="/Ackn" element={<Protected><Acknowledgement /></Protected>} exact />
           <Route path="/shipment" element={<Protected><AdvanceShipment /></Protected>} exact /> 
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} exact />
          <Route path="/invitedevents" element={<Protected><InvitedEvents /></Protected>} exact />
          <Route path="/graph" element={<Protected><Graph /></Protected>} exact />
         <Route path="/PPASupplier" element={<Protected><PPASupplier /></Protected>} exact />
          <Route path="/support" element={<Protected><CustomerSupport /></Protected>} exact />
          <Route path="/ledger" element={<Protected><Ledger /></Protected>} exact /> 
        <Route path="/pos" element={<Protected><PurchaseOrders /></Protected>} exact /> 
          <Route path="/grs" element={<Protected><GoodsReturn /></Protected>} exact />
          <Route path="/mcs" element={<Protected><MyContact /></Protected>} exact />
          <Route path="/inv" element={<Protected><InvoiceDisplay /></Protected>} exact />
          <Route path="/res" element={<Protected><Receiveables /></Protected>} exact />
          <Route path="/profile" element={<Protected><Profile /></Protected>} exact />
          <Route path="/cntc" element={<Protected><Contract /></Protected>} exact />
          <Route path='*' exact={true} element={<NotFound404 />} />
        </Routes>
        )}
      {userType ==='buyer' &&
      
        (<Routes>
          {/* <Route path="/" element={<Login />} exact /> */}
          <Route path="/" element={<NewLogin />} exact />

          <Route path="/home" element={<DashboardSupplier />} exact />
          {/* <Route path="/AdminManageVendor" element={<AdminManageVendor />} exact /> */}
          <Route path="/AdminManageVendor" element={<Protected><AdminManageVendor /></Protected>} exact /> 
          <Route path="/priceapproval" element={<Protected><PricePartApproval /></Protected>} exact /> 
          <Route path="/approveEvent" element={<Protected><EventApprove /></Protected>} exact /> 

          <Route path="/rscsupport" element={<Protected><RecSupport /></Protected>} exact />
          <Route path="/screen" element={<Protected><ScreenAuth /></Protected>} exact />
          {/* <Route path="/role" element={<Protected><RoleManagement /></Protected>} exact /> */}
          <Route path="/vp" element={<Protected><VendorProfile /></Protected>} exact />
          <Route path="/mv" element={<Protected><ManageVendors /></Protected>} exact />
          <Route path="/new" element={<Protected><NewSupplier /></Protected>} exact />
          <Route path="/bmc" element={<Protected><BuyerMyContact /></Protected>} exact />
          <Route path="/vdtls" element={<Protected><VendorDetails /></Protected>} exact />
          <Route path="/bpo" element={<Protected><BuyerPurchaseOrders /></Protected>} exact />
          <Route path="/bgr" element={<Protected><BuyerGoodsReturn /></Protected>} exact />
          <Route path="/bgrn" element={<Protected><BuyerReceiveables /></Protected>} exact />
          <Route path="/profile" element={<Protected><Profile /></Protected>} exact />
          <Route path='*' exact={true} element={<NotFound404 />} />
        </Routes>)
      }
    </div>
  );
}

export default App;
