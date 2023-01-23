import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import {AxioxExpPort} from "../AxioxExpPort"
import { useNavigate } from "react-router-dom";
import { FaFileCsv } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import {Link} from "react-router-dom";

import { Modal,ModalBody } from "reactstrap";
import {AiOutlineArrowLeft, AiOutlineDownload} from "react-icons/ai";
import { IconContext } from "react-icons";

import { COLORS } from "../../Constants/theme";

function PurchaseOrders() {
  const navigate = useNavigate();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsData, setClickedPOsData] = useState([]);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);

  // console.log("POS,", ClickedPOsDataArr);
  const [thead, setTHead] = useState([
    "Document Date",
    "PO Number",
    "Reference Number",
    "Action",
  ]);

  
const headers = [
  { label: "Plant ID", key: "PLANT_ID" },
  { label: "Document Date", key: "DOCUMENT_DATE" },
  { label: "Item Category", key: "ITEM_CATEGORY" },
  { label: "Order Quantity", key: "ORDER_QUANTITY" },
  { label: "Net Price", key: "NET_PRICE" }
];


const data = ClickedPOsDataArr;
  const vendorId =localStorage.getItem('vendorId');

  const [tbody, setTBody] = useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage, setPostsPerPage]=useState(5);
  const indexOfLastPost= currentPage*postsPerPage;
  const indexOfFirstPost= indexOfLastPost -postsPerPage;
  const currentPosts=ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost)

  useEffect(() => {
    const fetchPosts= async()=>{

      axios.get(AxioxExpPort+"purchase_order/get?id="+vendorId)
      .then((response) => {
        setTBody(response.data);
       console.log("response.data",response.data);
      })
    }
    fetchPosts();
         }, []);

  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  const paginate = pageNumber =>setCurrentPage(pageNumber)
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
                          <CSVLink   className="btn"  data={val.purchase_order} headers={headers}
             // setClickedPOsDataArr(val.purchase_order)
            //  laery
              >

             <IconContext.Provider
                            value={{ color: "#000", size: "22px" }}
                          >
                            <AiOutlineDownload />
                          </IconContext.Provider>
            </CSVLink>
                         
                       
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
      
          <div className="row">
              <div className="col-md-8">
       
              <h5 className="modal-title " id="exampleModalLabel">
              PO's Details
            </h5>
             
              </div>
              <div className="col-md-4">

              <CSVLink   className="btn float-right" 
                onClick={() => {
                togglePODetailsFlag();
              }}
              style={{
                backgroundColor: COLORS.gray10,
                color: COLORS.black,
              
              }} data={data} headers={headers} >
            Download <FaFileCsv />
            
            </CSVLink>
           
            {/* <button
              type="button"
              className="btn-close float-right"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                togglePODetailsFlag();
              }}
            /> */}
            </div>
            </div>
         
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
                currentPosts.map((posData, index) => {
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
            <Pagination  postPerPage={postsPerPage} totalPosts={ClickedPOsDataArr.length} paginate={paginate}/>
          <div className="modal-footer">
            <a
              className="navbar-brand"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
                padding: 1,
                height:'5px'
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

export default PurchaseOrders;

