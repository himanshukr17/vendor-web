import React, { useState, useEffect } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import {AxioxExpPort} from "../AxioxExpPort"
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

  const [tbody, setTBody] = useState([]);

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
  const vendorId =localStorage.getItem('vendorId');

  useEffect(() => {
         axios.get(AxioxExpPort+"contract/getdata?id="+vendorId)
         .then((response) => {
           setTBody(response.data);
    
          console.log("response.data",response.data);
         })
         }, []);
  const [clickContractData,setClickContractData]=useState([]);
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
              Contacts
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
                        {val.AGREEMENT_DATE}
                      </td>
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        <Link
                          onClick={(e) => {
                            togglePODetailsFlag();
                            setClickedPOsData({
                              AGREEMENT_DATE: val.AGREEMENT_DATE,
                              CONTRACT_NUMBER: val.CONTRACT_NUMBER,
                              PLANT_NAME: val.PLANT_NAME,
                              ITEM_NAME: val.ITEM_NAME,
                              MATERIAL_NUMBER: val.MATERIAL_NUMBER,
                              DESCRIPTION: val.DESCRIPTION,
                              TARGET_QUANTITY: val.TARGET_QUANTITY,
                              TARGET_VALUE: val.TARGET_VALUE,
                              OPEN_QUANTITY: val.OPEN_QUANTITY,
                              NET_VALUE: val.NET_VALUE,
                              RECEIVING_PLANT: val.RECEIVING_PLANT,
                              VALIDITY_START: val.VALIDITY_START,
                              VALIDITY_END: val.VALIDITY_END,
                            });
                            setClickContractData(val.Contract_details)
                          }}
                        >
                          {val.CONTRACT_NO}
                        </Link>
                        <br />
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.PLANT_ID}
                      </td>
                      {/* <td
                        key={`col-5` + index}
                        className="text-center"
                        style={{ width: "5%", borderColor: COLORS.gray10 }}
                      >
                        <Link
                          to=""
                          onClick={(e) => {
                            DownloadButton(e, val.INVOICE_URL);
                          }}
                        >
                          <IconContext.Provider
                            value={{ color: "#000", size: "22px" }}
                          >
                            <AiOutlineDownload />
                          </IconContext.Provider>
                        </Link>
                      </td> */}
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

      <Modal
      size="lg"
        isOpen={showPODetailsFlag}
        toggle={togglePODetailsFlag}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
      
        <ModalBody
          style={
            {
              // marginTop: 0,
            }
          }
        >
         <div className="modal-header model-lg">
            <h5 className="modal-title" id="exampleModalLabel">
Contacts
            </h5>

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
        


            <table  className="table table-bordered table-striped">
          <thead>
             <th>Material</th>
             <th>Net Value</th>
             <th>Quantity</th>
             <th>Open Quantity</th>
             <th>Validity Start</th>
             <th>Validity End</th>
          </thead>
            <tbody>
              {
                clickContractData.map((contractsDtl, index) => {
                return (
                  <tr>
                    <td>
                      {contractsDtl.MATERIAL_NO}
                    </td>
                    <td>
                      {contractsDtl.NET_VALUE}
                    </td>
                    <td>
                      {contractsDtl.QUANTITY}
                    </td>
                    <td>
                      {contractsDtl.OPEN_QUANTITY}
                    </td>
                    <td>
                      {contractsDtl.VALIDITY_START}
                    </td>
                    <td>
                      {contractsDtl.VALIDITY_END}
                    </td>
                 
                  </tr>
                );
                })
            }
              
            </tbody>
          </table>
            {/* body ending */}
       
          <div className="modal-footer">
            <a
              className="navbar-brand"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
                // padding: 10,
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

export default MyContracts;
