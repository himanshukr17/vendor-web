import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHeader from "../../Components/NavHeader";

import {AxioxExpPort} from "../AxioxExpPort"
import { useLocation, useNavigate } from "react-router-dom";
import { MdScheduleSend } from "react-icons/md";

import { BsFillCalendarWeekFill } from "react-icons/bs";
import { SiConstruct3, SiQuantconnect } from "react-icons/si";
import { TbBuildingFactory2 } from "react-icons/tb";
import { MdOutlineCategory, MdDescription } from "react-icons/md";
import { BiRupee } from "react-icons/bi";

import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";

import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import {
  AiOutlineArrowLeft,
  AiOutlineCloudDownload,
  AiOutlineDownload,
} from "react-icons/ai";
import { IconContext } from "react-icons";

import { COLORS } from "../../Constants/theme";

function PurchaseOrders() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsData, setClickedPOsData] = useState([]);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);

  console.log("POS,", ClickedPOsDataArr);
  const [thead, setTHead] = useState([
    "Document Date",
    "PO Number",
    "Reference Number",
    "Action",
  ]);
  const vendorId =localStorage.getItem('vendorId');

  const [tbody, setTBody] = useState([]);

  useEffect(() => {
         axios.get(AxioxExpPort+"purchase_order/get?id="+vendorId)
         .then((response) => {
           setTBody(response.data);
    
          console.log("response.data",response.data);
         })
         }, []);
  const DownloadButton=(e,INVOICE_URL)=>{
    e.preventDefault();

       fetch(INVOICE_URL).then((response) => {
         response.blob().then((blob) => {
           // Creating new object of PDF file
           const fileURL = window.URL.createObjectURL(blob);
           // Setting various property values
           let alink = document.createElement("a");
           alink.href = fileURL;
           alink.download = "SamplePDF.pdf";
           alink.click();
         });
       });


  }

  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);

  return (
    <>
      <NavHeader />
      <div
        className="card"
        style={{
          marginTop: "5%",
        }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
          }}
        >
          <div className="form-check form-check-inline">
            <button
              className="btn btn"
              style={{
                borderRadius: 50,
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <IconContext.Provider value={{ color: "#000", size: "22px" }}>
                <AiOutlineArrowLeft />
              </IconContext.Provider>
            </button>
          </div>
          <div className="form-check form-check-inline">
            <h4 className="form-check-label" htmlFor="inlineRadio2">
              {/* {location.PROJECT} */}
              {/* {location.state.name} */}
              Purchase Orders
            </h4>
          </div>
          <div
            className="form-check form-check-inline"
            style={{
              float: "right",
            }}
          ></div>
        </div>
        <div className="card-body">
          <table className="table table-light table-bordered table-hover">
            <thead className="table-light">
              <tr
                className="text-center"
                style={{
                  backgroundColor: COLORS.gray20,
                  borderColor: COLORS.gray10,
                }}
              >
                {thead.map((thead, index) => {
                  return (
                    <th
                      key={index}
                      className="text-center"
                      style={{ width: "5%", borderColor: COLORS.gray10 }}
                      scope="col"
                    >
                      {thead}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((val, index) => {
                  return (
                    <tr
                      key={`row` + index}
                      style={{
                        backgroundColor: "white",
                        borderColor: "#000",
                      }}
                      className="table-light"
                    >
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.DOCUMENT_DATE}
                      </td>
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        <Link
                          to=""
                          onClick={(e) => {
                            togglePODetailsFlag();
                            setClickedPOsData({
                              DOCUMENT_DATE: val.DOCUMENT_DATE,
                              PO_NUMBER: val.PO_NUMBER,
                              REFERENCE_NUMBER: val.REFERENCE_NUMBER,
                              MANUFACTURING: val.MANUFACTURING,
                              ITEM_CATEGORY: val.ITEM_CATEGORY,
                              MATERIAL: val.MATERIAL,
                              DESCRIPTION: val.DESCRIPTION,
                              QUATITY: val.QUATITY,
                              PRICE: val.PRICE,
                              INVOICE_URL: "http://localhost:3007/pdf/testing.pdf",
                              // POS:val.POS
                            });
                            setClickedPOsDataArr(val.purchase_order)
                          }}
                        >
                          {val.PO_NO}
                        </Link>
                        <br />
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.QUOTATION_NO}
                      </td>
                      <td
                        key={`col-5` + index}
                        className="text-center"
                        style={{ marginwidth: "5%", borderColor: COLORS.gray10 }}
                      >
                        <Link
                          to=""
                          onClick={(e) => {
                            DownloadButton(e, "http://localhost:3007/pdf/testing.pdf");
                          }}
                        >
                          <IconContext.Provider
                            value={{ color: "#000", size: "22px" }}
                          >
                            <AiOutlineDownload />
                          </IconContext.Provider>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal size="lg"
        isOpen={showPODetailsFlag}
        toggle={togglePODetailsFlag}
        style={{
        
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        <ModalBody
          style={{
            marginTop: 0,
          }}
        >
          <div className="modal-header model-lg" >
            <h5 className="modal-title" id="exampleModalLabel">
              PO's Details
            </h5>

            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: COLORS.gray10,
                color: COLORS.black,
                marginLeft: "60%",
                float: "right",
              }}
              onClick={(e) => {
                DownloadButton(e, "http://localhost:3000/pdf/testing.pdf");
              }}
            >
              Download PO
            </button>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                togglePODetailsFlag();
              }}
            />
          </div>
          <div className="modal-body" >
            {/* body starting */}
            {/* <div
              style={
                {
                  // padding: "3%",
                }
              }
              className="form-group"
            >
              <IconContext.Provider value={{ color: "#000", size: "30px" }}>
                <TbBuildingFactory2 />
              </IconContext.Provider>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                {ClickedPOsData.MANUFACTURING}
              </label>
            </div>
            <div
              style={{
                height: 1,
                backgroundColor: COLORS.black,
                margin: "1%",
              }}
            ></div>
            <div
              style={
                {
                  // padding: "3%",
                }
              }
              className="form-group"
            >
              <IconContext.Provider value={{ color: "#000", size: "30px" }}>
                <BsFillCalendarWeekFill />
              </IconContext.Provider>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                {ClickedPOsData.DOCUMENT_DATE}
              </label>
            </div>
            <div
              style={{
                height: 1,
                backgroundColor: COLORS.black,
                margin: "1%",
              }}
            ></div>
            <div
              style={
                {
                  // padding: "3%",
                }
              }
              className="form-group"
            >
              <IconContext.Provider value={{ color: "#000", size: "30px" }}>
                <MdOutlineCategory />
              </IconContext.Provider>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                Item Catagory
              </label>

              <br></br>
              <span
                style={{
                  marginLeft: "9%",
                }}
              >
                {ClickedPOsData.ITEM_CATEGORY}
              </span>
            </div>

            <div
              style={{
                height: 1,
                backgroundColor: COLORS.black,
                margin: "1%",
              }}
            ></div>

            <div
              style={
                {
                  // padding: "3%",
                }
              }
              className="form-group"
            >
              <IconContext.Provider value={{ color: "#000", size: "30px" }}>
                <SiConstruct3 />
              </IconContext.Provider>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                Material
              </label>

              <br></br>
              <span
                style={{
                  marginLeft: "9%",
                }}
              >
                {ClickedPOsData.MATERIAL}
              </span>
            </div>
            <div
              style={{
                height: 1,
                backgroundColor: COLORS.black,
                margin: "1%",
              }}
            ></div>

            <div
              style={
                {
                  // padding: "3%",
                }
              }
              className="form-group"
            >
              <IconContext.Provider value={{ color: "#000", size: "30px" }}>
                <MdDescription />
              </IconContext.Provider>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                Description
              </label>

              <br></br>
              <span
                style={{
                  marginLeft: "9%",
                }}
              >
                {ClickedPOsData.DESCRIPTION}
              </span>
            </div>
            <div
              style={{
                height: 1,
                backgroundColor: COLORS.black,
                margin: "1%",
              }}
            ></div>

            <div
              style={
                {
                  // padding: "3%",
                }
              }
              className="form-group"
            >
              <IconContext.Provider value={{ color: "#000", size: "30px" }}>
                <SiQuantconnect />
              </IconContext.Provider>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                Quantity
              </label>

              <br></br>
              <span
                style={{
                  marginLeft: "9%",
                }}
              >
                {ClickedPOsData.QUATITY}
              </span>
            </div>
            <div
              style={{
                height: 1,
                backgroundColor: COLORS.black,
                margin: "1%",
              }}
            ></div>

            <div
              style={
                {
                  // padding: "3%",
                }
              }
              className="form-group"
            >
              <IconContext.Provider value={{ color: "#000", size: "30px" }}>
                <BiRupee />
              </IconContext.Provider>

              <label
                style={{
                  marginLeft: "2%",
                }}
              >
                {ClickedPOsData.PRICE}
              </label>

              <br></br>
            </div> */}

            {/* body ending */}
          </div>
          {/* <button type="button"onClick={()=> makeCsv(getTableDataForExport(data,columns), `$(filename).csv`)} ></button> */}
          {/* <table data={data} columns={columns} className="table table-bordered table-striped"> */}
          <table  className="table table-bordered table-striped">
          <thead>
             <th>PLANT ID</th>
             <th>DOCUMENT_DATE</th>
             <th>ITEM_CATEGORY</th>
             <th>ORDER_QUANTITY</th>
             <th>NET_PRICE</th>
             
          </thead>
            <tbody>
              {
            
           
                ClickedPOsDataArr.map((posData, index) => {
                return (
                  <tr>
                    <td>
                      {posData.PLANT_ID}
                    </td>
                    <td>
                      {posData.DOCUMENT_DATE}
                    </td>
                    <td>
                      {posData.ITEM_CATEGORY}
                    </td>
                    <td>
                      {posData.ORDER_QUANTITY}
                    </td>
                    <td>
                      {posData.NET_PRICE}
                    </td>
                    
                  </tr>
                );
                })
         
            }
              
            </tbody>
          </table>
          <div className="modal-footer">
            <a
              className="navbar-brand"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
                padding: 10,
              }}
              onClick={() => {
                togglePODetailsFlag();
              }}
            >
              Close
            </a>

            {/* <button
              type="button"
              onClick={() => {
                togglePODetailsFlag();
              }}
              className="btn btn"
              style={{
                backgroundColor: COLORS.danger,
                color: COLORS.white,
              }}
            >
              Reject
            </button> */}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default PurchaseOrders;



// import React, { useState, useEffect } from "react";
// import NavHeader from "../../Components/NavHeader";

// import { useLocation, useNavigate } from "react-router-dom";
// import { MdScheduleSend } from "react-icons/md";

// import { BsFillCalendarWeekFill } from "react-icons/bs";
// import { SiConstruct3, SiQuantconnect } from "react-icons/si";
// import { TbBuildingFactory2 } from "react-icons/tb";
// import { MdOutlineCategory, MdDescription } from "react-icons/md";
// import { BiRupee } from "react-icons/bi";

// import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";
// import axios from "axios";
// import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
// import {
//   AiOutlineArrowLeft,
//   AiOutlineCloudDownload,
//   AiOutlineDownload,
// } from "react-icons/ai";
// import { IconContext } from "react-icons";

// import { COLORS } from "../../Constants/theme";

// function PurchaseOrders() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
//   const [ClickedPOsData, setClickedPOsData] = useState([]);


//   console.log();

//   const [thead, setTHead] = useState([
//     "Document Date",
//     "PO Number",
//     "Reference Number",
//     "Action",
//   ]);

//   const [tbody, setTBody] = useState([
//     {
//       DOCUMENT_DATE: "2022/10/26",
//       PO_NUMBER: "445209283876",
//       REFERENCE_NUMBER: "89976383726410",
//       MANUFACTURING: "XYZ Pvt Ltd",
//       ITEM_CATEGORY: "Gold",
//       MATERIAL: "Gold Platted chain",
//       DESCRIPTION: "Your material is delivered successfully",
//       QUATITY: "5000",
//       PRICE: "10000000",
//       INVOICE_URL: "SamplePDF.pdf",
//     },
//     {
//       DOCUMENT_DATE: "2022/10/27",
//       PO_NUMBER: "286709283876",
//       REFERENCE_NUMBER: "97683726410",
//       MANUFACTURING: "ABC Pvt Ltd",
//       ITEM_CATEGORY: "SIlver",
//       MATERIAL: "Silver",
//       DESCRIPTION: "Your material not  delivered",
//       QUATITY: "1000",
//       PRICE: "400000",
//       INVOICE_URL: "www.abcajsdv.com",
//     },
//     {
//       DOCUMENT_DATE: "2022/10/28",
//       PO_NUMBER: "1209283876",
//       REFERENCE_NUMBER: "474787683726410",
//       MANUFACTURING: "PQR Pvt Ltd",
//       ITEM_CATEGORY: "Gold Silver",
//       MATERIAL: "Mixer",
//       DESCRIPTION: "Your material is delivered successfully with extra gold",
//       QUATITY: "400",
//       PRICE: "300000",
//       INVOICE_URL: "www.abc.com",
//     },
//   ]);


//   useEffect(() => {
//     axios.get("http://localhost:4000/purchase_order/get?id=1234")
//     .then((response) => {
//       setTBody(response.data);

//        // console.log(response.data);
//     })
//     }, []);
  

//   const DownloadButton=(e,INVOICE_URL)=>{
//     e.preventDefault();

//        fetch(INVOICE_URL).then((response) => {
//          response.blob().then((blob) => {
//            // Creating new object of PDF file
//            const fileURL = window.URL.createObjectURL(blob);
//            // Setting various property values
//            let alink = document.createElement("a");
//            alink.href = fileURL;
//            alink.download = "SamplePDF.pdf";
//            alink.click();
//          });
//        });


//   }

//   const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
//   const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);

//   return (
//     <>
//       <NavHeader />
//       <div
//         className="card"
//         style={{
//           marginTop: "5%",
//         }}
//       >
//         <div
//           className="card-body"
//           style={{
//             display: "flex",
//           }}
//         >
//           <div className="form-check form-check-inline">
//             <button
//               className="btn btn"
//               style={{
//                 borderRadius: 50,
//               }}
//               onClick={() => {
//                 navigate("/dashboard");
//               }}
//             >
//               <IconContext.Provider value={{ color: "#000", size: "22px" }}>
//                 <AiOutlineArrowLeft />
//               </IconContext.Provider>
//             </button>
//           </div>
//           <div className="form-check form-check-inline">
//             <h4 className="form-check-label" htmlFor="inlineRadio2">
//               {/* {location.PROJECT} */}
//               {/* {location.state.name} */}
//               Purchase Orders
//             </h4>
//           </div>
//           <div
//             className="form-check form-check-inline"
//             style={{
//               float: "right",
//             }}
//           ></div>
//         </div>
//         <div className="card-body">
//           <table className="table table-light table-bordered table-hover">
//             <thead className="table-light">
//               <tr
//                 className="text-center"
//                 style={{
//                   backgroundColor: COLORS.gray20,
//                   borderColor: COLORS.gray10,
//                 }}
//               >
//                 {thead.map((thead, index) => {
//                   return (
//                     <th
//                       key={index}
//                       className="text-center"
//                       style={{ width: "5%", borderColor: COLORS.gray10 }}
//                       scope="col"
//                     >
//                       {thead}
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>

//             <tbody>
//               {isPurchaseOrderEmpty ? (
//                 tbody.map((val, index) => {
//                   return (
//                     <tr
//                       key={`row` + index}
//                       style={{
//                         backgroundColor: "white",
//                         borderColor: "#000",
//                       }}
//                       className="table-light"
//                     >
//                       <td
//                         key={`col-1` + index}
//                         className="text-center"
//                         style={{ width: "10%", borderColor: COLORS.gray10 }}
//                       >
//                         {val.DOCUMENT_DATE}
//                       </td>
//                       <td
//                         key={`col-2` + index}
//                         className="text-center"
//                         style={{ width: "10%", borderColor: COLORS.gray10 }}
//                       >
//                         <Link
//                           to=""
//                           onClick={(e) => {
//                             togglePODetailsFlag();
//                             setClickedPOsData({
//                               DOCUMENT_DATE: val.PurchaseOrders,
//                               PO_NUMBER: val.PO_NO,
//                               REFERENCE_NUMBER: val.REFERENCE_NUMBER,
//                               MANUFACTURING: val.MANUFACTURING,
//                               ITEM_CATEGORY: val.ITEM_CATEGORY,
//                               MATERIAL: val.MATERIAL,
//                               DESCRIPTION: val.DESCRIPTION,
//                               QUATITY: val.QUATITY,
//                               PRICE: val.PRICE,
//                               INVOICE_URL: val.INVOICE_URL,
//                             });
//                           }}
//                         >
//                           {val.PO_NO}
                          
//                         </Link>
//                         <br />
//                       </td>
//                       <td
//                         key={`col-3` + index}
//                         className="text-center"
//                         style={{ width: "10%", borderColor: COLORS.gray10 }}
//                       >
//                         {val.QUOTATION_NO}
//                       </td>
//                       <td
//                         key={`col-5` + index}
//                         className="text-center"
//                         style={{ width: "5%", borderColor: COLORS.gray10 }}
//                       >
//                         <Link
//                           to=""
//                           onClick={(e) => {
//                             DownloadButton(e, val.INVOICE_URL);
//                           }}
//                         >
//                           <IconContext.Provider
//                             value={{ color: "#000", size: "22px" }}
//                           >
//                             <AiOutlineDownload />
//                           </IconContext.Provider>
//                         </Link>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="text-center">
//                     No Data Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal
//         isOpen={showPODetailsFlag}
//         toggle={togglePODetailsFlag}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "90vh",
//         }}
//       >
//         <ModalBody
//           style={{
//             marginTop: 0,
//           }}
//         >
//           <div className="modal-header model-lg">
//             <h5 className="modal-title" id="exampleModalLabel">
//               PO's Details
//             </h5>

//             <button
//               type="button"
//               className="btn"
//               style={{
//                 backgroundColor: COLORS.gray10,
//                 color: COLORS.black,
//                 marginLeft: "30%",
//                 float: "right",
//               }}
//               onClick={(e) => {
//                 DownloadButton(e, ClickedPOsData.INVOICE_URL);
//               }}
//             >
//               Download Invoice
//             </button>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//               onClick={() => {
//                 togglePODetailsFlag();
//               }}
//             />
//           </div>
//           <div className="modal-body">
//             {/* body starting */}
//             <div
//               style={
//                 {
//                   // padding: "3%",
//                 }
//               }
//               className="form-group"
//             >
//               <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//                 <TbBuildingFactory2 />
//               </IconContext.Provider>

//               <label
//                 style={{
//                   marginLeft: "2%",
//                 }}
//               >
//                 {ClickedPOsData.MANUFACTURING}
//               </label>
//             </div>
//             <div
//               style={{
//                 height: 1,
//                 backgroundColor: COLORS.black,
//                 margin: "1%",
//               }}
//             ></div>
//             <div
//               style={
//                 {
//                   // padding: "3%",
//                 }
//               }
//               className="form-group"
//             >
//               <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//                 <BsFillCalendarWeekFill />
//               </IconContext.Provider>

//               <label
//                 style={{
//                   marginLeft: "2%",
//                 }}
//               >
//                 {ClickedPOsData.DOCUMENT_DATE}
//               </label>
//             </div>
//             <div
//               style={{
//                 height: 1,
//                 backgroundColor: COLORS.black,
//                 margin: "1%",
//               }}
//             ></div>
//             <div
//               style={
//                 {
//                   // padding: "3%",
//                 }
//               }
//               className="form-group"
//             >
//               <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//                 <MdOutlineCategory />
//               </IconContext.Provider>

//               <label
//                 style={{
//                   marginLeft: "2%",
//                 }}
//               >
//                 Item Catagory
//               </label>

//               <br></br>
//               <span
//                 style={{
//                   marginLeft: "9%",
//                 }}
//               >
//                 {ClickedPOsData.ITEM_CATEGORY}
//               </span>
//             </div>

//             <div
//               style={{
//                 height: 1,
//                 backgroundColor: COLORS.black,
//                 margin: "1%",
//               }}
//             ></div>

//             <div
//               style={
//                 {
//                   // padding: "3%",
//                 }
//               }
//               className="form-group"
//             >
//               <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//                 <SiConstruct3 />
//               </IconContext.Provider>

//               <label
//                 style={{
//                   marginLeft: "2%",
//                 }}
//               >
//                 Material
//               </label>

//               <br></br>
//               <span
//                 style={{
//                   marginLeft: "9%",
//                 }}
//               >
//                 {ClickedPOsData.MATERIAL}
//               </span>
//             </div>
//             <div
//               style={{
//                 height: 1,
//                 backgroundColor: COLORS.black,
//                 margin: "1%",
//               }}
//             ></div>

//             <div
//               style={
//                 {
//                   // padding: "3%",
//                 }
//               }
//               className="form-group"
//             >
//               <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//                 <MdDescription />
//               </IconContext.Provider>

//               <label
//                 style={{
//                   marginLeft: "2%",
//                 }}
//               >
//                 Description
//               </label>

//               <br></br>
//               <span
//                 style={{
//                   marginLeft: "9%",
//                 }}
//               >
//                 {ClickedPOsData.DESCRIPTION}
//               </span>
//             </div>
//             <div
//               style={{
//                 height: 1,
//                 backgroundColor: COLORS.black,
//                 margin: "1%",
//               }}
//             ></div>

//             <div
//               style={
//                 {
//                   // padding: "3%",
//                 }
//               }
//               className="form-group"
//             >
//               <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//                 <SiQuantconnect />
//               </IconContext.Provider>

//               <label
//                 style={{
//                   marginLeft: "2%",
//                 }}
//               >
//                 Quantity
//               </label>

//               <br></br>
//               <span
//                 style={{
//                   marginLeft: "9%",
//                 }}
//               >
//                 {ClickedPOsData.QUATITY}
//               </span>
//             </div>
//             <div
//               style={{
//                 height: 1,
//                 backgroundColor: COLORS.black,
//                 margin: "1%",
//               }}
//             ></div>

//             <div
//               style={
//                 {
//                   // padding: "3%",
//                 }
//               }
//               className="form-group"
//             >
//               <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//                 <BiRupee />
//               </IconContext.Provider>

//               <label
//                 style={{
//                   marginLeft: "2%",
//                 }}
//               >
//                 {ClickedPOsData.PRICE}
//               </label>

//               <br></br>
//             </div>

//             {/* body ending */}
//           </div>
//           <div className="modal-footer">
//             <a
//               className="navbar-brand"
//               type="button"
//               style={{
//                 color: "#007bff",
//                 float: "right",
//                 padding: 10,
//               }}
//               onClick={() => {
//                 togglePODetailsFlag();
//               }}
//             >
//               Close
//             </a>

//             {/* <button
//               type="button"
//               onClick={() => {
//                 togglePODetailsFlag();
//               }}
//               className="btn btn"
//               style={{
//                 backgroundColor: COLORS.danger,
//                 color: COLORS.white,
//               }}
//             >
//               Reject
//             </button> */}
//           </div>
//         </ModalBody>
//       </Modal>
//     </>
//   );
// }

// export default PurchaseOrders;
