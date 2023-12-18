import React, { useState, useEffect } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import {AxioxExpPort} from "../AxioxExpPort"
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft} from "react-icons/ai";
import { IconContext } from "react-icons";
import Pagination from "../../Components/Pagination";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';

function Contract() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsData, setClickedPOsData] = useState([]);

  const [thead, setTHead] = useState([
    "Material No",
    "Description",
    "Contract Number",
    "Validity Start",
    "Validity End",
    "Plant",
  ]);
  const [clickContractData,setClickContractData]=useState([]);
  const [tbody, setTBody] = useState([]);
  const vendorId =localStorage.getItem('userId');
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage, setPostsPerPage]=useState(5);
  const indexOfLastPost= currentPage*postsPerPage;
  const indexOfFirstPost= indexOfLastPost -postsPerPage;
  const currentPosts=clickContractData.slice(indexOfFirstPost, indexOfLastPost)
  useEffect(() => {
         axios.get(AxioxExpPort+"contract/getdata?id="+vendorId)
         .then((response) => {
           setTBody(response.data);
    
          console.log("response.data",response.data);
         })
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
              Contract 
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
                        {val.MATERIAL_NO}
                      </td>
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {/* <Link
                          onClick={(e) => {
                            togglePODetailsFlag();
                            setClickContractData(val.Contract_details)
                          }}
                        > */}
                          {val.MATERIAL_DESCRIPTION}
                        {/* </Link> */}
                        <br />
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.CONTRACT_NO}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                                                                   {dateFormat( val.VALIDITY_START, "ddd, mmm dS, yyyy")}

                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                                             {dateFormat( val.VALIDITY_END, "ddd, mmm dS, yyyy")}
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
            Contract
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
            <Pagination  postPerPage={postsPerPage} totalPosts={clickContractData.length} paginate={paginate}/>

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
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Contract;
