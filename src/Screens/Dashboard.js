import React from "react";

import Footer from "../Components/Footer";
import NavHeader from "../Components/NavHeader";

import HomeScreen from "./HomeScreen";

function Dashboard() {
  return (
    <>
      <NavHeader />
      {/* <Navbar/> */}
      <div
        style={{
          marginTop: 70,
        }}
      >
        <HomeScreen />
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

export default Dashboard;
