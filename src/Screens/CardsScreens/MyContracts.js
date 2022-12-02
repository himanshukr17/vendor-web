import React, { useState } from "react";
import NavHeader from "../../Components/NavHeader";

import { useLocation, useNavigate } from "react-router-dom";
import { MdScheduleSend } from "react-icons/md";

import { BsFillCalendarWeekFill, BsFillDoorOpenFill } from "react-icons/bs";
import { SiConstruct3, SiQuantconnect } from "react-icons/si";
import { TbBuildingFactory2 } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { GrValidate } from "react-icons/gr";
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

function MyContracts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsData, setClickedPOsData] = useState([]);

  const [thead, setTHead] = useState([
    "Agreement Date",
    "Contract Number",
    "Plant",
  ]);

  const [tbody, setTBody] = useState([
    {
      AGREEMENT_DATE: "2022/10/26",
      CONTRACT_NUMBER: "445209283876",
      PLANT_NAME: "abc",
      ITEM_NAME: "XYZ Pvt Ltd",
      MATERIAL_NUMBER: "27346234982347",
      DESCRIPTION: "Your material is delivered successfully",
      TARGET_QUANTITY: "5000",
      TARGET_VALUE: "5000",
      OPEN_QUANTITY:"98723",
      NET_VALUE: "7600",
      RECEIVING_PLANT: "10000000",
      VALIDITY_START: "2022/08/01",
      VALIDITY_END: "2023/01/01",
    },
    {
      AGREEMENT_DATE: "2022/10/26",
      CONTRACT_NUMBER: "445209283876",
      PLANT_NAME: "XYG",
      ITEM_NAME: "XYZ Pvt Ltd",
      MATERIAL_NUMBER: "27346234982347",
      DESCRIPTION: "Your material is delivered successfully",
      TARGET_QUANTITY: "5000",
      TARGET_VALUE: "5000",
      OPEN_QUANTITY:"98723",
      NET_VALUE: "7600",
      RECEIVING_PLANT: "10000000",
      VALIDITY_START: "2022/08/01",
      VALIDITY_END: "2023/01/01",
    },
   
  ]);

  const DownloadButton = (e, INVOICE_URL) => {
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
  };

  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);

  return (
    <>
      <NavHeader />
      <form>
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
              My Contracts
            </h4>
          </div>
          <div
            className="form-check form-check-inline"
            style={{
              float: "right",
            }}
          ></div>
        </div>
        <div classname="card-body">
        <div className="row" style={{margin:"10px"}}>
          <div className="col-md-6">
          <p className="text-left " style={{marginBottom:"-1px"}}>Pan Card:</p>
    <input className="form-control"  required type="file" id="formFile" />
          </div>
          <div className="col-md-6">
          <p className="text-left " style={{marginBottom:"-1px"}}>Aadhar Card:</p>
    <input className="form-control" required type="file" id="formFile" />
          </div>
        </div>
        <div className="row" style={{margin:"10px"}}>
          <div className="col-md-6">
          <p className="text-left " style={{marginBottom:"-1px"}}>GST registration certificate copy:</p>
    <input className="form-control" required type="file" id="formFile" />
          </div>
          <div className="col-md-6">
          <p className="text-left " style={{marginBottom:"-1px"}}>Address Proof:</p>
    <input className="form-control"  required type="file" id="formFile" />
          </div>
        </div>
        <div className="row" style={{margin:"10px"}}>
          <div className="col-md-6">
          <p className="text-left " style={{marginBottom:"-1px"}}>MSME Certificate:</p>
    <input className="form-control"  required type="file" id="formFile" />
          </div>
          <div className="col-md-6">
          <p className="text-left " style={{marginBottom:"-1px"}}>POR Declearation:</p>
    <input className="form-control"  required type="file" id="formFile" />
          </div>
        </div>
        <div className="row" style={{margin:"10px"}}>
          <div className="col-md-6">
          <p className="text-left " style={{marginBottom:"-1px"}}>Due Diligence Form:</p>
    <input className="form-control"  required type="file" id="formFile" />
          </div>
          <div className="col-md-6">
          {/* <p className="text-left " style={{marginBottom:"-1px"}}>Default file input example</p>
    <input className="form-control" type="file" id="formFile" /> */}
          </div>
        </div>
  
</div>
 <button
                 type="submit"//onClick={()=>{submitForm()}}
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      alignSelf: "center",
                      margin: "3%",
                    }}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
      </div>
</form>
    </>
  );
}

export default MyContracts;




// <Modal
// isOpen={showPODetailsFlag}
// toggle={togglePODetailsFlag}
// style={{
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "90vh",
// }}
// >
// <ModalBody
//   style={
//     {
//       // marginTop: 0,
//     }
//   }
// >
//   <div className="modal-header model-lg">
//     <h5 className="modal-title" id="exampleModalLabel">
//       Contract Details
//     </h5>

//     {/* <button
//       type="button"
//       className="btn"
//       style={{
//         backgroundColor: COLORS.gray10,
//         color: COLORS.black,
//         marginLeft: "30%",
//         float: "right",
//       }}
//       onClick={(e) => {
//         DownloadButton(e, ClickedPOsData.INVOICE_URL);
//       }}
//     >
//       Download Invoice
//     </button> */}
//     <button
//       type="button"
//       className="btn-close"
//       data-bs-dismiss="modal"
//       aria-label="Close"
//       onClick={() => {
//         togglePODetailsFlag();
//       }}
//     />
//   </div>
//   <div className="modal-body">
//     {/* body starting */}
//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//         <TbBuildingFactory2 />
//       </IconContext.Provider>

//       <label
//         style={{
//           marginLeft: "2%",
//         }}
//       >
//         {ClickedPOsData.ITEM_NAME}
//       </label>
//     </div>
//     <div
//       style={{
//         height: 1,
//         backgroundColor: COLORS.black,
//         margin: "1%",
//       }}
//     ></div>
//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//         <BsFillCalendarWeekFill />
//       </IconContext.Provider>

//       <label
//         style={{
//           marginLeft: "2%",
//         }}
//       >
//         {ClickedPOsData.MATERIAL_NUMBER}
//       </label>
//     </div>

//     <div
//       style={{
//         height: 1,
//         backgroundColor: COLORS.black,
//         margin: "1%",
//       }}
//     ></div>

//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//         <MdDescription />
//       </IconContext.Provider>

//       <label
//         style={{
//           marginLeft: "2%",
//         }}
//       >
//         Short Description
//       </label>

//       <br></br>
//       <span
//         style={{
//           marginLeft: "9%",
//         }}
//       >
//         {ClickedPOsData.DESCRIPTION}
//       </span>
//     </div>
//     <div
//       style={{
//         height: 1,
//         backgroundColor: COLORS.black,
//         margin: "1%",
//       }}
//     ></div>
//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//         <MdOutlineCategory />
//       </IconContext.Provider>

//       <label
//         style={{
//           marginLeft: "2%",
//         }}
//       >
//         Net Value
//       </label>

//       <br></br>
//       <span
//         style={{
//           marginLeft: "9%",
//         }}
//       >
//         {ClickedPOsData.NET_VALUE}
//       </span>
//     </div>

//     <div
//       style={{
//         height: 1,
//         backgroundColor: COLORS.black,
//         margin: "1%",
//       }}
//     ></div>

//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//         <SiConstruct3 />
//       </IconContext.Provider>

//       <label
//         style={{
//           marginLeft: "2%",
//         }}
//       >
//         Target Quantity
//       </label>

//       <br></br>
//       <span
//         style={{
//           marginLeft: "9%",
//         }}
//       >
//         {ClickedPOsData.TARGET_QUANTITY}
//       </span>
//     </div>

//     <div
//       style={{
//         height: 1,
//         backgroundColor: COLORS.black,
//         margin: "1%",
//       }}
//     ></div>

//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//         <BsFillDoorOpenFill />
//       </IconContext.Provider>

//       <label
//         style={{
//           marginLeft: "2%",
//         }}
//       >
//         Open Quantity
//       </label>

//       <br></br>
//       <span
//         style={{
//           marginLeft: "9%",
//         }}
//       >
//         {ClickedPOsData.OPEN_QUANTITY}
//       </span>
//     </div>
//     <div
//       style={{
//         height: 1,
//         backgroundColor: COLORS.black,
//         margin: "1%",
//       }}
//     ></div>

//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//         <GiReceiveMoney />
//       </IconContext.Provider>

//       <label
//         style={{
//           marginLeft: "2%",
//         }}
//       >
//         Receiving Plant
//       </label>

//       <br></br>
//       <span
//         style={{
//           marginLeft: "9%",
//         }}
//       >
//         {ClickedPOsData.PLANT_NAME}
//       </span>
//     </div>
//     <div
//       style={{
//         height: 1,
//         backgroundColor: COLORS.black,
//         margin: "1%",
//       }}
//     ></div>

//     <div
//       style={
//         {
//           // padding: "3%",
//         }
//       }
//       className="form-group"
//     >
//       <div
//         style={{
//           display: "flex",
//         }}
//       >
//         <IconContext.Provider value={{ color: "#000", size: "30px" }}>
//           <GrValidate />
//         </IconContext.Provider>
//         <label
//           style={{
//             marginLeft: "2%",
//           }}
//         >
//           Validity Start
//         </label>
//         <label
//           style={{
//             marginLeft: "30%",
//           }}
//         >
//           Validity End
//         </label>

//         <br></br>
//       </div>
//       <div
//         style={{
//           display: "flex",
//         }}
//       >
//         <span
//           style={{
//             marginLeft: "9%",
//           }}
//         >
//           {ClickedPOsData.VALIDITY_START}
//         </span>
//         <span
//           style={{
//             marginLeft: "35%",
//           }}
//         >
//           {ClickedPOsData.VALIDITY_END}
//         </span>
//       </div>
//     </div>

//     {/* body ending */}
//   </div>
//   <div className="modal-footer">
//     <a
//       className="navbar-brand"
//       type="button"
//       style={{
//         color: "#007bff",
//         float: "right",
//         // padding: 10,
//       }}
//       onClick={() => {
//         togglePODetailsFlag();
//       }}
//     >
//       Close
//     </a>

//     {/* <button
//       type="button"
//       onClick={() => {
//         togglePODetailsFlag();
//       }}
//       className="btn btn"
//       style={{
//         backgroundColor: COLORS.danger,
//         color: COLORS.white,
//       }}
//     >
//       Reject
//     </button> */}
//   </div>
// </ModalBody>
// </Modal>
