import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMegaport, FaUserTie,FaUsers } from "react-icons/fa";
import { IconContext } from "react-icons";
import { COLORS } from "../Constants/theme";
const NavHeader = () => {
  const [navbar, setNabar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNabar(true);
    } else {
      setNabar(false);
    }
  };
  const navigate = useNavigate();
  const companyName=localStorage.getItem('userCompany');
  window.addEventListener("scroll", changeBackground);

  return (
    <div >
      <nav
        // style={{
        //   backgroundColor: "#fff",
        // }}
        className={
          navbar
            ? "navbar navbar-expand-lg navbar-light fixed-top bg-light"
            : "navbar navbar-expand-lg navbar-light fixed-top navbar-bg-active bg-light"
        }
      >

        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span style={{color:"#1F87D0",  fontSize:"25px"}}>Vendor</span>
            <span style={{color:"#14CA96", fontSize:"25px"}}> Connect</span>
          </a>
          <a>
        <a style={{fontSize:"17px"}}> Welcome, </a> <a style={{fontSize:"18px", color:COLORS.gray90}}>{companyName}</a></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          
          
          
             {/* <li className="nav-item">
              <Link to="/pos">
                <a className="nav-link active" aria-current="page" >
                Purchase Orders
                
                </a>
              </Link>
              </li>
              <li className="nav-item">
              <Link to="/pos">
                <a className="nav-link active" aria-current="page" >
                Goods Return

                
                </a>
              </Link>
              </li>

              <li className="nav-item">
              <Link to="/pos">
                <a className="nav-link active" aria-current="page" >
                Goods Return

                
                </a>
              </Link>
              </li> */}
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li> */}
                  {/* <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li> */}
                 
            
            
            {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
      
          
        </div>
        <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
    
           
               
          <div className="btn-group dropstart">
                
                <a
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 <div className="card-icon rounded-circle d-flex align-items-center text-right">
                    <IconContext.Provider
                      value={{ color: "#0275d8", size: "25px" }}
                    >
                      {" "}
                      <FaUserTie />
                    </IconContext.Provider>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  {/* Dropdown menu links */}
                  {/* <li>
                    <button
                      style={{
                        textAlign: "center",
                      }}
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#projectEditModal"
                      type="button"
                    >
                      Profile 
                    </button>
                  </li> */}

                
                  <li>{/* <hr className="dropdown-divider"></hr> */}</li>
                  
                    {/* <>
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          style={{
                            textAlign: "center",
                          }}
                          onClick={(e) => {
                           
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </> */}
                    <li>
                    <Link to="/profile">
                    <button
                      className="dropdown-item"
                      type="button"
                      // style={{
                      //   textAlign: "center",
                      // }}
                      onClick={(e) => {
                      
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h6 style={{}}>Profile</h6>
                        <div
                          style={{
                            marginLeft: "10%",
                            // display: "flex",
                          }}
                        >
                        </div>
                      </div>
                    </button>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>

                  <li>
                
                    <button
                      className="dropdown-item"
                      type="button"
                      // style={{
                      //   textAlign: "center",
                      // }}
                      onClick={() => {
                        localStorage.clear() 
                       
                        window.location.href="/"                 
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h6 style={{}}>Logout</h6>
                        <div
                          style={{
                            marginLeft: "10%",
                            // display: "flex",
                          }}
                        >
                        </div>
                      </div>
                    </button>
                   
                  </li>
                </ul>
              </div>

          </div>


          
      </nav>
    </div>
  );
};

export default NavHeader;
