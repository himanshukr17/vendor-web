import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { Link, useNavigate } from "react-router-dom";
import { FaFileCsv, FaDownload, FaFileInvoiceDollar, FaUserCheck } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiFillReconciliation, AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";

 const VendorDetails = () => {
    const navigate = useNavigate();
    const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
    const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
    const [sort, setSort] = useState("ASC");
    // const [query, setQuery]=useState("")
    const [filterData, setFilterdata] = useState([])

  
    const data = ClickedPOsDataArr;
    const vendorId = localStorage.getItem('userId');
    //console.log("vendorIdvendorId", vendorId)
    const [tbody, setTBody] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
    const [emptyModalTable, setEmptyModalTable] = useState([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        axios.get(AxioxExpPort + "mapping/get?buyer=" + vendorId)
          .then((response) => {
            setTBody(response.data);
            // //console.log("response.data",response.data);
  
            setFilterdata(response.data);
          })
  
      }
      fetchPosts()
    }, []);
  
  
    const sorting = (col) => {
      if (sort === "ASC") {
        const sorted = [...tbody].sort((a, b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setTBody(sorted);
        setSort("DSC")
        //console.log("response.data", tbody);
      }
      if (sort === "DSC") {
        const sorted = [...tbody].sort((a, b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setTBody(sorted);
        setSort("ASC")
      }
    }
    const handleSearch = (event) => {
      var searchElements = event.target.value;
      // setQuery(searchElements);
      var length = Number(searchElements.length)
      //console.log(searchElements.length);
      if (length > 0) {
        // setTBody('')
        const searchDatas = tbody.filter((item) => item.VENDOR_NAME.toLowerCase().includes(searchElements)|| (item.VENDOR_ID).toString().toLowerCase().includes(searchElements) );
        setTBody(searchDatas);
        // if()
        if (searchDatas.length == 0) {
          setIsPurchaseOrderEmpty(false)
        }
      } else {
        setIsPurchaseOrderEmpty(true)
        setTBody(filterData)
      }
  
    }
    
    const handelAllPO = () => {
      setIsPurchaseOrderEmpty(true);
      setTBody(filterData);
    }
    // const [query,setQuery]=useState("")
    //     const search=(datass)=>{
    //       return datass.filter(item=> item.DOCUMENT_DATE.toLowerCase.includes(query) )
    //       //console.log(datass)
    //     }
    const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
    const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
    const paginate = pageNumber => setCurrentPage(pageNumber)
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
  
          >
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-1">
                    <button
                      className="btn btn"
  
                      onClick={() => {
                        navigate("/home");
                      }}
                    >
                      <IconContext.Provider value={{ color: "#000", size: "22px" }}>
                        <AiOutlineArrowLeft />
                      </IconContext.Provider>
                    </button>
                  </div>
                  <div className="col-md-5">
  
                    <h4 className="form-check-label" htmlFor="inlineRadio2">
                      {/* {location.PROJECT} */}
                      {/* {location.state.name} */}
                     Vendor Details
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                {/* <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodates(e) }} placeholder="Search Date Range" /> */}
              </div>
  
  
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
  
                  placeholder="Vendor ID / Name"
                  style={{
                    width: "100%",
                    height: 35,
                  }}
                  onChange={(e) => {
                    handleSearch(e)
                  }}
                />
              </div>
  
              <div className="col-md-1">
                <button type="button" style={{ width: "50px", height: 35, borderRadius: 5 }} onClick={handelAllPO}>All</button>
  
              </div>
            </div>
  
  
          </div>
          <div className="card-body">
            <p className="text-right" style={{ fontFamily:"Serif",marginTop: "-35px",marginBottom: "1px", size:60 }}><IconContext.Provider
                      value={{ color: "#BD7FFE", size: "20px" }}
                    >
                      {" "}
                      <BsFillCartCheckFill />
                    </IconContext.Provider>Purchse Order, <IconContext.Provider
                      value={{ color: "#6495ED", size: "20px" }}
                    >
                      {" "}
                      <BsFillCartXFill />
                    </IconContext.Provider>Goods Return, <IconContext.Provider
                      value={{ color: "#9999FF", size: "20px" }}
                    >
                      {" "}
                      <AiFillReconciliation />
                    </IconContext.Provider> Goods Receipt, <IconContext.Provider
                      value={{ color: "#04D4F0", size: "20px" }}
                    >
                      {" "}
                      <FaUserCheck />
                    </IconContext.Provider> Uploaded Document</p>
            <table className="table table-light table-bordered table-hover">
              <thead className="table-light">
                <tr
                  className="text-center"
                  style={{
                    backgroundColor: COLORS.gray20,
                    borderColor: COLORS.gray10,
                  }}
                >
                  <th onClick={() => sorting("PO_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Vendor ID</th>
                   <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Vendor Name</th>
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Actions</th>
                   {/* <th onClick={() => sorting("NET_PRICE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Net Value*</th>
                  <th onClick={() => sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                  <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th> */}
                </tr>
              </thead>
  
              <tbody>
                {isPurchaseOrderEmpty ? (
                  tbody.map((vd, index) => {
                   
  
                      
                    return (
                      (vd.STATUS)==2 &&
                      
                      
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
                          <Link
                          to="/vp" 
                          title={vd.VENDOR_NAME}
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,

                          }}                         
                          >
                            
                            {vd.VENDOR_ID}
                          </Link>
                          <br />
                        </td>
                        <td
                          key={`col-2` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                         
                            {vd.VENDOR_NAME}
                        
                          <br />
                        </td>
                        <td
                          key={`col-3` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                         
                            <div className="col-md-12">
                          <div className="row">

                            
                            <div className="col-md-2">

                            </div>
                            <div className="col-md-2">
                          <Link 
                          to="/bpo" 
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,
                          }}                         
                          >
                <button type="button" title="Purchase Orde" style={{height: 35, backgroundColor:"#BD7FFE",fontFamily:"serif", borderRadius: 5, color:"white" }}><div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <IconContext.Provider
                      value={{ color: "WHITE", size: "30px" }}
                    >
                      {" "}
                      <BsFillCartCheckFill />
                    </IconContext.Provider>
                  </div></button>
                          </Link> 
                          </div>
                            <div className="col-md-2">
                            <Link 
                          to="/bgr" 
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,

                          }}                         
                          >
                <button type="button" title="Goods Return" style={{  height: 35, backgroundColor:"#6495ED",fontFamily:"serif", borderRadius: 5,color:"white" }} ><IconContext.Provider
                      value={{ color: "WHITE", size: "30px" }}
                    >
                      {" "}
                      <BsFillCartXFill />
                    </IconContext.Provider></button>
                          </Link>
                          </div>
                            <div className="col-md-2">
                            <Link 
                          to="/bgrn" 
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,

                          }}                         
                          >
                <button type="button" title="Goods Receipt"style={{  height: 35,backgroundColor:"#9999FF", fontFamily:"serif",borderRadius: 5 , color:"white"}}><IconContext.Provider
                      value={{ color: "WHITE", size: "30px" }}
                    >
                      {" "}
                      <AiFillReconciliation />
                    </IconContext.Provider></button>
                         </Link>
                          </div>
                            {/* <div className="col-md-2">
                            <Link 
                          to="/inv" 
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,

                          }}                         
                          >
                <button type="button" title="Invoice Details"style={{  height: 35,backgroundColor:"#059DC0", fontFamily:"serif",borderRadius: 5 , color:"white"}}><IconContext.Provider
                      value={{ color: "WHITE", size: "30px" }}
                    >
                      {" "}
                      <FaFileInvoiceDollar />
                    </IconContext.Provider></button>
                         </Link>
                          </div> */}
                            <div className="col-md-2">
                            <Link 
                          to="/bmc" 
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,

                          }}                         
                          >
                <button type="button" title="Uploaded Document"style={{  height: 35,backgroundColor:"#04D4F0", fontFamily:"serif",borderRadius: 5 , color:"white"}}><IconContext.Provider
                      value={{ color: "WHITE", size: "30px" }}
                    >
                      {" "}
                      <FaUserCheck />
                    </IconContext.Provider></button>
                         </Link>
                          </div>
                            
                       </div>
                   
                     
                       </div>
                         
                          <br />
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

      </>
    );
  }
export default VendorDetails;