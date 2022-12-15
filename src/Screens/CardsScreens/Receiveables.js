import React, { useState, useEffect } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import {AxioxExpPort} from "../AxioxExpPort"
import { useLocation, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
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

function Receiveables() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsData, setClickedPOsData] = useState([]);

  const [thead, setTHead] = useState([
    "Document Date",
    "PO Number",
    "Reference Number",
    
  ]);

  const [tbody, setTBody] = useState([
    {
      DOCUMENT_DATE: "2022/10/26",
      PO_NUMBER: "445209283876",
      REFERENCE_NUMBER: "89976383726410",
      MANUFACTURING: "XYZ Pvt Ltd",
      ITEM_CATEGORY: "Gold",
      MATERIAL: "Gold Platted chain",
      DESCRIPTION: "Your material is delivered successfully",
      QUATITY: "5000",
      PRICE: "10000000",
      INVOICE_URL: "SamplePDF.pdf",
    },
    {
      DOCUMENT_DATE: "2022/10/27",
      PO_NUMBER: "286709283876",
      REFERENCE_NUMBER: "97683726410",
      MANUFACTURING: "ABC Pvt Ltd",
      ITEM_CATEGORY: "SIlver",
      MATERIAL: "Silver",
      DESCRIPTION: "Your material not  delivered",
      QUATITY: "1000",
      PRICE: "400000",
      INVOICE_URL: "www.abcajsdv.com",
    },
    {
      DOCUMENT_DATE: "2022/10/28",
      PO_NUMBER: "1209283876",
      REFERENCE_NUMBER: "474787683726410",
      MANUFACTURING: "PQR Pvt Ltd",
      ITEM_CATEGORY: "Gold Silver",
      MATERIAL: "Mixer",
      DESCRIPTION: "Your material is delivered successfully with extra gold",
      QUATITY: "400",
      PRICE: "300000",
      INVOICE_URL: "www.abc.com",
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

  const vendorId =localStorage.getItem('vendorId');

   const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" }
  ];

  useEffect(() => {
         axios.get(AxioxExpPort+"received/get?id="+vendorId)
         .then((response) => {
           setTBody(response.data);
      

          console.log("response.data",response.data);
         })
         }, []);
  const [clickRecData,setClickRecvData]=useState([]);
  const data = clickRecData;
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
              Receiveables
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
                              INVOICE_URL: val.INVOICE_URL,
                            });
                      setClickRecvData(val.received_datas)
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
                        {val.REFERENCE_DOCUMENT_NO}
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
          style={{
            marginTop: 0,
          }}
        >
          <div className="modal-header model-lg">
            <h5 className="modal-title" id="exampleModalLabel">
            Receiveables Details
            </h5>
            {/* <CSVLink data={data} headers={headers}>
  Download me
</CSVLink>; */}

            {/* <button
              type="button"
              className="btn"
              style={{
                backgroundColor: COLORS.gray10,
                color: COLORS.black,
                marginLeft: "30%",
                float: "right",
              }}
              onClick={(e) => {
                DownloadButton(e, ClickedPOsData.INVOICE_URL);
              }}
            >
              Download Invoice
            </button> */}
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
          <div className="modal-body">
          


          <table  className="table table-bordered table-striped">
          <thead>
             <th>Plant/ Receiving area</th>
             <th>Material</th>
             <th>Receiving Date</th>
             
          </thead>
            <tbody>
              {
                
                clickRecData.map((grsData, index) => {
                return (
                  <tr>
                    <td>
                      {grsData.MATERIAL}
                    </td>
                    <td>
                      {grsData.QUANTITY}
                    </td>
                    <td>
                      {grsData.PLANT}
                    </td>
                   
                  </tr>
                );
                })
            }
              
            </tbody>
          </table>
     </div>
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
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Receiveables;
