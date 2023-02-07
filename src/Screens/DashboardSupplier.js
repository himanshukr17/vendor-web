import React from "react";

import Footer from "../Components/Footer";
import NavHeaderSupplier from "../Components/NavHeader";

import HomeScreenSupplier from "./HomeScreenSupplier";

function DashboardSupplier() {
  return (
    <>
      <NavHeaderSupplier />
      {/* <Navbar/> */}
      <div
        style={{
          marginTop: 70,
        }}
      >
        <HomeScreenSupplier />
      </div>
      <div
        style={{ position:'absolute',
      bottom:0,
      display:'block',  
      width:'100%'
        }}
      >
        <Footer />
      </div>
    </>
  );
}

export default DashboardSupplier;
