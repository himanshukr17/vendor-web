import React from "react";

import Footer from "../Components/Footer";
import NavHeaderSupplier from "../Components/NavHeaderSupplier";

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
        style={{ marginBottom: -70,
        }}
      >
        <Footer />
      </div>
    </>
  );
}

export default DashboardSupplier;
