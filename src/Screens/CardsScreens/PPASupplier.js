import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";


import DateRangePicker from 'rsuite/DateRangePicker'
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate ,Link} from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload,AiOutlineArrowDown ,AiOutlineArrowUp, AiFillFilePdf, AiOutlineHome} from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
import { AiFillReconciliation, AiOutlineWallet } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";       
import SidebarHeaderToggle from "../../Components/SidebarHeaderToggle";
function PPASupplier() {
  const Navigate = useNavigate();
  const vendorId = localStorage.getItem('userId');


  // const [query,setQuery]=useState("")
  //     const search=(datass)=>{
  //       return datass.filter(item=> item.DOCUMENT_DATE.toLowerCase.includes(query) )
  //       console.log(datass)
  //     }
  const [loading, setLoading] = useState(false);

  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  return (
    <>

     
      {
      loading && 
      <div className="loader-container">
      	  <div className="spinnerCircle"></div>
        </div>
    }
          <SidebarHeaderToggle  />
    <div
      className="card-body"
      style={{
        marginTop: "2%",
      }}
    >
      <div

      >
              <div className="row">
          <div className="col-md-12">
            <div className="row" style={{ marginBottom:10}}>

              <div className="col-md-10">
                <div style={{ display: 'flex', alignItems: 'center',marginLeft:'40px' }}>
<h4 className="form-check-label">
Ledger Details
</h4>
</div>
              </div>
              <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>

                  <IconContext.Provider value={{ color: "#3a91e8", size: "22px" }}>
                    <AiOutlineHome  type="button"  onClick={() => {
                    Navigate("/dashboard");
                  }} />
                  </IconContext.Provider>

                {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}

                {" / "}
                  <a className="dropdown-toggle" style={{color:"maroon"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
          Transaction Data
        </a>
        <ul className="dropdown-menu" style={{width:"95%"}}>
    <li className="row" ><Link style={{ }}  to="/pos"><BsFillCartCheckFill  color={"#F07857"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Purchase Order   </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/res"><AiFillReconciliation color={"#43A5BE"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Goods Receipt    </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/ackn"><AiOutlineWallet     color={"#F5C26B"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Order to confirm </a></Link></li>
    {/* <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"#4FB06D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Invoice Booked   </a></Link></li>  */}
    <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"pink"}    size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Invoice Pending  </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/grs"><BsFillCartXFill      color={"#53BDAS"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Goods Return     </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/mcs"><FaFileContract       color={"#BE398D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> My Documents     </a></Link></li> </ul>  </div>


            </div>
          </div>
          </div>
        
          
        
        
        <div className="row">
          <div className="col-md-12">
          <div className="card" style={{marginTop:10,marginLeft:'2.2%', marginRight:'-1.4%'}}>
          <div className="card-body" >
          
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default PPASupplier;
