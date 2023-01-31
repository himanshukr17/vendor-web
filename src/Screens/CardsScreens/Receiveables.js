import React, { useState, useEffect } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import {AxioxExpPort} from "../AxioxExpPort"
import { useLocation, useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import Pagination from "../../Components/Pagination";
import {Modal, ModalBody } from "reactstrap";
import {
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
function Receiveables() {
  const navigate = useNavigate();
  const [clickRecData,setClickRecvData]=useState([]);
  const data = clickRecData;
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsData, setClickedPOsData] = useState([]);

  const [tbody, setTBody] = useState([]);
  const vendorId =localStorage.getItem('userId');
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage, setPostsPerPage]=useState(5);
  const indexOfLastPost= currentPage*postsPerPage;
  const indexOfFirstPost= indexOfLastPost -postsPerPage;
  const [sort,setSort]=useState("ASC")

  const currentPosts=clickRecData.slice(indexOfFirstPost, indexOfLastPost)
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
         const sorting=(col)=>{
          if(sort ==="ASC"){
            const sorted =[...tbody].sort((a,b)=>
            a[col].toLowerCase()> b[col].toLowerCase()? 1 : -1
            );
            setTBody(sorted);
            setSort("DSC")
            console.log("response.data",tbody);
          }
            if(sort ==="DSC"){
              const sorted =[...tbody].sort((a,b)=>
              a[col].toLowerCase()<b[col].toLowerCase()? 1 : -1
              );
              setTBody(sorted);
              setSort("ASC")
            }
      
          }
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
                  <th onClick={()=>sorting("DOCUMENT_DATE")}  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Document Date</th>
                    <th onClick={()=>sorting("PO_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">PO Number</th>
                    <th onClick={()=>sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                    <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th>
                  
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
                    {dateFormat( val.DOCUMENT_DATE, "ddd, mmm dS, yyyy")}
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
                        {val.STATUS}
                      </td>
                      
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{textAlign:"center", width: "10%", borderColor: COLORS.gray10 }}
                      >
                      {val.STATUS==="106" ||val.STATUS==="101"?
                        <span id="green" className="dot"></span>:<span id="red" className="dot"></span> 
                  }
               
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
              Receiveables Details
            </h5>
             
              </div>
              <div className="col-md-4">
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
          <th>GRN No</th>
             <th>GRN Quantity</th>
             <th>Material No</th>
             <th>Material Doc</th>
             <th>PO Date</th>
             <th>PO Quantity</th>
             <th>Receiving Date</th>
             
          </thead>
            <tbody>
            {
                
                currentPosts.map((grsData, index) => {
                return (
                  <tr>
                    <td>{grsData.GRN_NO}</td>
                    <td>{grsData.GR_QTY}</td>
                    <td>{grsData.MATERIAL_NO}</td>

                    <td>{grsData.MATERIAL_DOCUMENT}</td>
                    <td>{dateFormat(grsData.PO_DATE, "ddd, mmm dS, yyyy")}</td>
                    <td>{grsData.PO_QTY}</td>
                    <td>{dateFormat(grsData.RECEIVING_DATE, "ddd, mmm dS, yyyy")}</td>
                   
                   
                  </tr>
                );
                })
            }
            </tbody>
          
          </table>
          <Pagination  postPerPage={postsPerPage} totalPosts={clickRecData.length} paginate={paginate}/>
         
        </ModalBody>
      </Modal>
       
    </>
  );
}

export default Receiveables;
