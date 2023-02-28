import React from "react";
import { COLORS } from "../Constants/theme";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";

import { FaMegaport, FaFileContract,FaUsers,FaReceipt } from "react-icons/fa";
import { BsFillCartCheckFill, BsFillBagXFill,BsFillCartXFill,BsReceiptCutoff } from "react-icons/bs";
import { AiFillReconciliation } from "react-icons/ai";

const Footer = () => {
  return (
    <>
   <footer className="text-center text-white" style={{backgroundColor: '#f1f1f1'}}>
  {/* Grid container */}
  {/* <div className="container pt-4" >
    <section className="mb-0" style={{marginTop:'-30px'}}>
      <Link to="/pos">
        
      <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">                        <IconContext.Provider
                      value={{ color: "#0275d8" }}
                    >
                      {" "}
                      <BsFillCartCheckFill />
                    </IconContext.Provider>
</a>
      </Link >
  
      <Link to="/grs">

      <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">                  <IconContext.Provider
                      value={{ color: "#0275d8"}}
                    >
                      {" "}
                      <BsFillCartXFill />
                    </IconContext.Provider>
</a>
      </Link>
    
      <Link  to="/cntc">

      <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">    <IconContext.Provider
                      value={{ color: "#0275d8" }}
                    >
                      {" "}
                      <FaUsers />
                    </IconContext.Provider></a>
      </Link>
     
      <Link to="/mcs">

      <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">  <IconContext.Provider
                      value={{ color: "#0275d8"}}
                    >
                      {" "}
                      <FaFileContract />
                    </IconContext.Provider></a>
      </Link>
    
      <Link to="/res">

      <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">   <IconContext.Provider
                      value={{ color: "#0275d8" }}
                    >
                      <AiFillReconciliation />
                    </IconContext.Provider></a>
      </Link>
  
      <Link >

      <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">  <IconContext.Provider
                      value={{ color: "#0275d8" }}
                    >
                      <BsReceiptCutoff />
                    </IconContext.Provider></a>
      </Link>
    </section>
   
  </div> */}
  
  <div className="text-center text-dark p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
  <div className="row">
       <div className="col-md-6 text-left" >
       <b>Version</b> 1.0.1

       </div>
       <div className="col-md-6 text-right">

    <a className="samishti-footer" href="https://www.samishti.com/">Samishti Infotech Private Ltd.</a>
  </div>
  </div>
  </div>
 
</footer>

    </>
//     <div
//       style={{
//         backgroundColor: COLORS.gray10,
//       }}
//     >
//       <div className="container-fluid footer-bg-inactive ">
      
//         <footer className="py-5"  style={{marginTop:"70px"}}>
//           <div className="row" >
//           {/* <div className="col-md-1">
          
//           <Link to="/dashboard">

//           <a  className="nav-link p-0 text-muted" style={{fontSize: "15px"}}>
//           Home
//                   </a>
//           </Link>
//           </div> */}
//           <div className="col-md-2" style={{marginRight: "-3%"}}>
          
//           <Link to="/pos">

//           <a  className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
//           Purchase Order
//                   </a>
//           </Link>
//           </div>
//           <div className="col-md-1">
//           <Link to="/grs">
//           <a  className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
//           Goods Return
//                   </a>
//                   </Link>
//           </div>
//           <div className="col-md-1">
//           <Link to="/cntc">
//           <a href="#" className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
//           Contacts
//                   </a>
//                   </Link>
//           </div>
//           <div className="col-md-1">
//           <Link to="/mcs">
//           <a href="#" className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
//           My Contracts
//                   </a>
//                   </Link>
//           </div>
//           <div className="col-md-1">
//           <Link to="/res">
//           <a href="#" className="nav-link p-0 text-muted" style={{fontSize: "13px"}}>
//           Receiveables
//                   </a>
//                   </Link>
//           </div>
         
//           <div className="col-md-6">
//           <div className="float-right d-none d-sm-inline-block text-secondary">
//   <b>Version</b> 1.0.1<br></br>
// <small> <strong><a href="https://www.samishti.com/" target="_blank">Samishti Infotech Private Ltd.</a></strong></small>
// </div>
//           </div>
           
//           </div>
//         </footer>
//       </div>
//     </div>
  );
};

export default Footer;
