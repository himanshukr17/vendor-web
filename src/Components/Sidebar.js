import { Link, NavLink } from "react-router-dom";
import { FaBars, FaDochub, FaFileInvoiceDollar, FaGoodreads, FaHome, FaInvision, FaJediOrder, FaLock, FaMoneyBill, FaServicestack, FaTruckMoving, FaUser, FaUserTie } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiFontFamily, BiMessage, BiSearch, BiLogOut, BiTransferAlt } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiFillPieChart, AiOutlineLeft, AiOutlineRight, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck, BsFillCalendar2EventFill, BsFillFileTextFill } from "react-icons/bs";
import { useState } from "react";

import { IconContext } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/ageing",
    name: "Ageing Data",
    icon: <AiFillPieChart />,
  },
  {
    path: "/ledger",
    name: "Ledger",
    icon: <BsFillFileTextFill />,
  },
  {
    path: "/invitedevents",
    name: "Invited Events",
    icon: <BsFillCalendar2EventFill />,
  },
  {
    path: "/shipment",
    name: "Advance Shipment",
    icon: <FaTruckMoving />,
  },
  // {
  //   path: "/#",
  //   name: "Master",
  //   icon: <AiTwotoneFileExclamation />,
  //   subRoutes: [
  //     {
  //       path: "//#",
  //       name: "Vendor ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "//#",
  //       name: "Material",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "//#",
  //       name: "Price Master",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },

  {
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
  const companyName = localStorage.getItem('userCompany');
  const [imageView, setImageView] = useState("")
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

          <div className="container-fluid">
            <a className="navbar-brand">
              <p className="text-center" style={{ fontSize: "20px" }}>
                {companyName}
              </p>
            </a>
            <div className="bars" style={{ marginLeft: "-60%" }}>
              {/* <FaBars color={'black'} onClick={toggle} /> */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <a
                style={{
                  fontSize: "25px",
                  position: "relative",
                  color: "#1F87D0",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Vendor
              </a>
              <a
                style={{
                  fontSize: "25px",
                  position: "relative",
                  color: "#14CA96",
                  marginLeft: "5px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Connect
              </a>
            </div>
          </div>


        </nav>
        <motion.div
          animate={{
            width: isOpen ? "230px" : "45px",
            // transition: {
            //   duration: 0.5,
            //   type: "spring",
            //   damping: 10,
            // },
          }}
          className={`sidebarSS `}
          style={{ position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 100 }}
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
                <Link to="/profile">
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {
                      imageView ?
                        <img height={'50%'} width={'50%'} style={{ borderRadius: '50%' }} src={''} />
                        : <img height={'50%'} width={'50%'} style={{ borderRadius: '50%' }} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" />
                    }
                  </div>
                </Link>
              )}
            </AnimatePresence>
          </div>
          <section className="routes">

            <div id="mobile-only" className="my-div" style={{ float: 'right', marginLeft: '7px', marginTop: '45px' }} onClick={toggle}>
              <span type="button" style={{ display: 'inline-block', borderRadius: '50%', width: '25px', height: '25px', border: '2px solid white', position: 'relative', overflow: 'hidden' }}>
                {isOpen ?
                  <AiOutlineLeft color={'#8FECFF '} size={20} />
                  :
                  <AiOutlineRight color={'#8FECFF '} size={20} />
                }
              </span>
            </div>

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
            {isOpen ?
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-left" style={{ marginTop: "60%", marginLeft: '10px', cursor: "pointer" }} onClick={() => {
                localStorage.clear()
                window.location.href = "/"
              }}>
                <IconContext.Provider value={{ color: "#fff", size: "25px" }}>
                  <BiLogOut />
                </IconContext.Provider>
                <div style={{ marginLeft: '5px', fontSize: 15 }}>Logout</div>
              </div>
              :
              <div style={{ marginLeft: '10px' }} >
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center" style={{ position: 'absolute', bottom: 20, marginleft: "50px", zIndex: 100, fontSize: 15, cursor: "pointer" }} onClick={() => {
                  localStorage.clear()

                  window.location.href = "/"
                }}>
                  <IconContext.Provider
                    value={{ color: "#fff", size: "25px" }}
                  >
                    {" "}
                    <BiLogOut />
                  </IconContext.Provider>
                </div>
              </div>
            }
          </section>
        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;