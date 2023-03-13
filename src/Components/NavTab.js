import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillAccountBook, AiFillReconciliation, AiOutlineWallet } from "react-icons/ai";
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

  useEffect(()=>{
    const fetchPosts = async () => {
      axios.post(AxioxExpPort + "createcompany/po",{
        "user":vendorId
      })
      .then((response) => {
        setLablesAll(response.data.length);
           
          })
      }
    const fetchHomeCount = async () => {
      axios.get(AxioxExpPort + "count/all?id=" + vendorId)
        .then((response) => {
          setDashboardData(response.data);
        })
    }
    fetchHomeCount();
    fetchPosts();
  },[])
  

  return (
    <nav className="navtabnavtab "> 
      <ul className="navtabnavtab-list ">
        <li
          className={activeTab === 1 ? "navtabnavtab-item active" : "navtabnavtab-item"}
          onClick={() => handleTabClick(1)}
        >
          <a className="" style={{color:"white"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Home
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
          <ul className="dropdown-menu">
      <li className="row" ><Link style={{ }}  to="/pos"><BsFillCartCheckFill  color={"#F07857"} size={20}/>    <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Purchase Order   </a><a style={{ float:"right", fontWeight:"", color:"#28B463"}}>{Number(dashboardData.OPEN_PO)+Number(dashboardData.CLOSE_PO)}</a></Link></li>
      <li className="row" ><Link style={{ }}  to="/res"><AiFillReconciliation color={"#43A5BE"} size={20} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Goods Receipt    </a><a style={{ float:"right", fontWeight:"", color:"#28B463"}}>{Number(dashboardData.RECEIVED_PO)}</a></Link></li>
      <li className="row" ><Link style={{ }}  to="/grs"><BsFillCartXFill      color={"#53BDAS"} size={20} />       <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Goods Return     </a><a style={{ float:"right", fontWeight:"", color:"#28B463"}}>{Number(dashboardData.RETURN_PO)}</a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/ackn"><AiOutlineWallet     color={"#F5C26B"} size={20}     />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Order to confirm </a><a style={{ float:"right", fontWeight:"", color:"#28B463"}}>{Number(lablesAll) }</a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"#4FB06D"} size={20}  />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Invoice Details  </a><a style={{ float:"right", fontWeight:"", color:"#28B463"}}>{Number(dashboardData.INVOICE_COUNT)}</a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/mcs"><FaFileContract       color={"#BE398D"} size={20}     />    <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> My Contacts      </a><a style={{ float:"right",  color:"#28B463"}}></a></Link></li> 
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
