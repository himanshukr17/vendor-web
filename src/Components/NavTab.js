import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillAccountBook, AiFillReconciliation, AiOutlineHome, AiOutlineWallet } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {AxioxExpPort} from "../../src/Screens/AxioxExpPort";
const NavTab = () => {
  const vendorId = localStorage.getItem('userId');
  const locationID=useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [dashboardData, setDashboardData] = useState("")

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const [lablesAll, setLablesAll] = useState("")

 
    const fetchPosts = async () => {
      axios.get(AxioxExpPort + "purchase_order/po_data?id=" + vendorId)
        .then((response) => {
          setLablesAll(response.data.length);
          console.log("response.data", response.data);
        })
    }
  const fetchHomeCount = async () => {
    axios.get(AxioxExpPort + "count/all?id=" + vendorId)
      .then((response) => {
        setDashboardData(response.data);
      })
  }
  useEffect(()=>{
    fetchHomeCount();
    fetchPosts();
  },[])
  

  return (
    <nav className="navtabnavtab "> 
      <ul className="navtabnavtab-list ">
        <li className="navtabnavtab-item activess"
          // className={activeTab === 1 ? "navtabnavtab-item active" : "navtabnavtab-item"}
          // onClick={() => handleTabClick(1)}
        >
          <a className="" style={{color:"white"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
          <AiOutlineHome/>
          </a>
          
        </li>
        <li
          className={activeTab === 2 ? "navtabnavtab-item active" : "navtabnavtab-item"}
          onClick={() => handleTabClick(2)}
        >
          <a className="dropdown-toggle" style={{color:"white"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Master
          </a>
          <ul className="dropdown-menu">
    <li><a type="button" className="dropdown-item" style={{color:"#4F51C0"}} >Vendor</a></li>
    <li><a type="button" className="dropdown-item" style={{color:"#4F51C0"}} disabled >Material</a></li>
    <li><a type="button" className="dropdown-item" style={{color:"#4F51C0"}} disabled>Price Master</a></li> 
    <li><a type="button" className="dropdown-item" style={{color:"#4F51C0"}} disabled>QM</a></li> 

  </ul>
        </li>
        <li
          className={activeTab === 3 ? "navtabnavtab-item active" : "navtabnavtab-item"}
          onClick={() => handleTabClick(3)}
        >
          <a className="dropdown-toggle" style={{color:"white"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Transaction Data
          </a>
          <ul className="dropdown-menu" style={{width:"17%"}}>
      <li style={{margin:6, textDecoration: 'none',}} className="row" ><Link style={{ textDecoration: 'none', }}  to="/pos"><BsFillCartCheckFill  color={"#F07857"} size={20} />  Purchase Order   <a style={{ float:"right",  fontWeight:"", color:"#28B463"}}>{Number(dashboardData.OPEN_PO)+Number(dashboardData.CLOSE_PO)}</a></Link></li>
      <li style={{margin:6, textDecoration: 'none',}} className="row" ><Link style={{ textDecoration: 'none', }}  to="/res"><AiFillReconciliation color={"#43A5BE"} size={20} />  Goods Receipt    <a style={{ float:"right",  fontWeight:"", color:"#28B463"}}>{Number(dashboardData.RECEIVED_PO)}</a></Link></li>
      <li style={{margin:6, textDecoration: 'none',}} className="row" ><Link style={{ textDecoration: 'none', }}  to="/ackn"><AiOutlineWallet     color={"#F5C26B"} size={20} />  Order to confirm <a style={{ float:"right",  fontWeight:"", color:"#28B463"}}>{Number(lablesAll) }</a></Link></li> 
      <li style={{margin:6, textDecoration: 'none',}} className="row" ><Link style={{ textDecoration: 'none', }}  to="/inv"><FaFileInvoiceDollar  color={"#4FB06D"} size={20} />  Invoice Booked   <a style={{ float:"right",  fontWeight:"", color:"#28B463"}}>{Number(dashboardData.INVOICE_COUNT)}</a></Link></li> 
      <li style={{margin:6, textDecoration: 'none',}} className="row" ><Link style={{ textDecoration: 'none', }}  to="/inv"><FaFileInvoiceDollar  color={"pink"}    size={20} />  Invoice Pending  <a style={{ float:"right",  fontWeight:"", color:"#28B463"}}>{Number(dashboardData.INVOICE_COUNT)}</a></Link></li> 
      <li style={{margin:6, textDecoration: 'none',}} className="row" ><Link style={{ textDecoration: 'none', }}  to="/grs"><BsFillCartXFill      color={"#53BDAS"} size={20} />  Goods Return     <a style={{ float:"right",  fontWeight:"", color:"#28B463"}}>{Number(dashboardData.RETURN_PO)}</a></Link></li> 
      <li style={{margin:6, textDecoration: 'none',}} className="row" ><Link style={{ textDecoration: 'none', }}  to="/mcs"><FaFileContract       color={"#BE398D"} size={20} />  My Documents     <a style={{ float:"right",   color:"#28B463"}}></a></Link></li> 
  </ul>
        </li>
        <li
          className={activeTab === 4 ? "navtabnavtab-item active" : "navtabnavtab-item"}
          onClick={() => handleTabClick(4)}
        >
           <a className="dropdown-toggle" style={{color:"white"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Supplier Service
          </a>
        </li>
        <li
          className={activeTab === 5 ? "navtabnavtab-item active" : "navtabnavtab-item"}
          onClick={() => handleTabClick(5)}
        >
           <a className="dropdown-toggle" style={{color:"white"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
Custom Development
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
