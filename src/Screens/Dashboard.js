import React from "react";

import Footer from "../Components/Footer";
import NavHeader from "../Components/NavHeader";
import NavTab from "../Components/NavTab";

import HomeScreen from "./HomeScreen";

function Dashboard() {
  return (
    <>
      <NavHeader />
      {/* <Navbar/> */}
      <div
        style={{
          marginTop: 64,
        }}
      >
      <NavTab />
        <HomeScreen />
      </div>

        <Footer />
      
    </>
  );
}

export default Dashboard;
