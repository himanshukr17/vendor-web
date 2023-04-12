import { Link, NavLink } from "react-router-dom";
import { FaBars, FaDochub, FaFileInvoiceDollar, FaGoodreads, FaHome, FaInvision, FaJediOrder, FaLock, FaMoneyBill, FaServicestack, FaUser, FaUserTie } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiFontFamily, BiMessage, BiSearch, BiTransferAlt } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";

import { IconContext } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/#",
    name: "Master",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "//#",
        name: "Vendor ",
        icon: <FaUser />,
      },
      {
        path: "//#",
        name: "Material",
        icon: <FaLock />,
      },
      {
        path: "//#",
        name: "Price Master",
        icon: <FaMoneyBill />,
      },
    ],
  },{
    path: "/#",
    name: " Transaction Data",
    icon: <BiTransferAlt />,
    exact: true,
    subRoutes: [
      {
        path: "/pos",
        name: " Purchase Order  ",
        icon: <FaJediOrder />,
      },
      {
        path: "/res",
        name: "Goods Receipt",
        icon: <BsCartCheck />,
      },
      {
        path: "/ackn",
        name: "Order to confirm",
        icon: <FaMoneyBill />,
      },
      {
        path: "/inv",
        name: " Invoice Pending",
        icon: <FaFileInvoiceDollar />,
      },
      {
        path: "/grs",
        name: " Goods Return",
        icon: <FaGoodreads />,
      },
    ],
  },
  {
    path: "/#",
    name: " Document",
    icon: <FaDochub />,
    exact: true,
    subRoutes: [
      {
        path: "/mcs",
        name: " My Documents ",
        icon: <FaUser />,
      }
    ],
  },
  {
    path: "/#",
    name: "Online Services",
    icon: <FaServicestack />,
    exact: true,
    subRoutes: [
      {
        path: "/support",
        name: "Customer Support",
        icon: <BiMessage />,
      }
    ],
  }
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [navbar, setNabar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNabar(true);
    } else {
      setNabar(false);
    }
  };
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const companyName=localStorage.getItem('userCompany');
  const [imageView, setImageView]=useState("")
  return (
    <>
    
      <div className="main-container" >
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

        <div className="container-fluid" >
        
          <a className="navbar-brand" >
            <p className="text-center" style={{ fontSize:"20px"}}>{companyName}</p>
          </a>
          <div className="bars" style={{marginLeft:'-60%'}}>
              {/* <FaBars color={'black'} onClick={toggle} /> */}
            </div>
        <a style={{fontSize:"17px"}}>             <span style={{color:"#1F87D0",  fontSize:"25px"}}>Vendor</span>
            <span style={{color:"#14CA96", fontSize:"25px"}}> Connect</span></a>
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
        <motion.div
          animate={{
            width: isOpen ? "230px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebarSS `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {/* <span style={{color:"#1F87D0",  fontSize:"20px"}}>Vendor</span>
            <span style={{color:"#14CA96", fontSize:"20px"}}> Connect</span> */}
                </motion.h1>
              )}
            </AnimatePresence>

           
          </div>
           <div >
            
                {/* <p style={{marginLeft:10, marginTop:2, fontSize:15, fontFamily:"cursive", alignItems:"center", display:"flex", justifyContent:"center"}}> */}
            <AnimatePresence>
              {isOpen && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                {
                    imageView?
  <img height={'50%'} width={'50%'} style={{borderRadius:'50%'}} src=""/>
 : <img height={'50%'} width={'50%'} style={{borderRadius:'50%'}} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"/>
                }
</div>

              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <Link
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
        
      </div>
    </>
  );
};

export default SideBar;