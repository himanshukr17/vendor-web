import React from "react";
import { COLORS } from "../Constants/theme";
import { Link, useNavigate } from "react-router-dom";


const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: COLORS.gray10,
      }}
    >
      <div className="container-fluid footer-bg-inactive ">
      
        <footer className="py-5"  style={{marginTop:"70px"}}>
          <div className="row" >
          {/* <div className="col-md-1">
          
          <Link to="/dashboard">

          <a  className="nav-link p-0 text-muted" style={{fontSize: "15px"}}>
          Home
                  </a>
          </Link>
          </div> */}
          <div className="col-md-2" style={{marginRight: "-3%"}}>
          
          <Link to="/pos">

          <a  className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
          Purchase Order
                  </a>
          </Link>
          </div>
          <div className="col-md-1">
          <Link to="/grs">
          <a  className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
          Goods Return
                  </a>
                  </Link>
          </div>
          <div className="col-md-1">
          <Link to="/cntc">
          <a href="#" className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
          Contacts
                  </a>
                  </Link>
          </div>
          <div className="col-md-1">
          <Link to="/mcs">
          <a href="#" className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
          My Contracts
                  </a>
                  </Link>
          </div>
          <div className="col-md-1">
          <Link to="/res">
          <a href="#" className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
          Receiveables
                  </a>
                  </Link>
          </div>
         
          <div className="col-md-6">
          <div className="float-right d-none d-sm-inline-block text-secondary">
  <b>Version</b> 1.0.1<br></br>
<small> <strong><a href="https://www.samishti.com/" target="_blank">Samishti Infotech Private Ltd.</a></strong></small>
</div>
          </div>
           
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
