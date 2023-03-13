import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { Link, useNavigate } from "react-router-dom";
import { FaFileCsv, FaDownload, FaFileInvoiceDollar, FaUserCheck, FaFileContract, FaUserAlt } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiFillReconciliation, AiOutlineArrowLeft, AiOutlineDownload, AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai";
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
    // const [lablesAll, setLablesAll] = useState("")
    const [dashboardData, setDashboardData] = useState("")
    const [vendorName,setVendorName]=useState("")
    const [vendorIDss,setVendorID]=useState("")
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
    console.log("dashboardData",vendorIDss)
    // console.log("dashboardData",vendorIDss)
    const coutAllDAta = async (e) => {
    
      axios.get(AxioxExpPort+"count/all?id="+e)
      .then((response) => {
        
        console.log("dashboardData",response.data)
        setDashboardData(response.data);
        toggleCheckFlages();
       // console.log("dashboardData",response.data)
      })
      }
  

    const [showCheckFlages, setShowCheckFlages] = useState(false);
    const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
 
    const paginate = pageNumber => setCurrentPage(pageNumber)
    return (
      <>
        <NavHeader />
        <div
        className="card-body"
        style={{
          marginTop: "4%",
        }}
      >
        <div
          
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row" style={{ marginBottom:10}}>
               
                <div className="col-lg-10">

                  <h4 className="form-check-label" >
                    {/* {location.PROJECT} */}
                    {/* {location.state.name} */}
                    Supplier Details
                  </h4>
                </div>
                <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
                  
                    <IconContext.Provider value={{ color: "red",marginTop:-210, size: "20px" }}>
                      <AiOutlineHome type="button"   onClick={() => {
                      navigate("/home");
                    }} />
                    </IconContext.Provider>
                  
                  
                  {" / Supplier Details"}
                </div>
               
              </div>
            </div>
            <div className="card" >
            <div className="card-body">
            <div className="row">
            <div className="col-md-5">
            </div>
            <div className="col-md-5 noPrint">

            </div>
           


            <div className="col-md-2 noPrint">
              <input
                type="text"
                className="form-control"

                placeholder="Supplier Code / Name "
                style={{
                  width: "100%",
                  height: 35,
                }}
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
            </div>
           

           
          </div>


        </div>
           <div className="card-body">
            <p className="text-right" style={{ fontFamily:"Serif",marginTop: "-35px",marginBottom: "1px", size:60 }}></p>
            <table className="table table-light table-bordered ">
              <thead className="table-light">
                <tr
                  className="text-center"
                  style={{
                    backgroundColor: COLORS.gray20,
                    borderColor: COLORS.gray10,
                  }}
                >
                  <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Code</th>
                   <th onClick={() => sorting("VENDOR_NAME")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Name</th>
                {/* <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Actions</th> */}
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
                          onClick={()=>{ setVendorName(vd.VENDOR_NAME); setVendorID(vd.VENDOR_ID); coutAllDAta(vd.VENDOR_ID)}}
                        >
                          {/* <Link
                          to="/vp" 
                          title={vd.VENDOR_NAME}
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,

                          }}                         
                          ></Link> */}
                            <a type="button" style={{color:"#4F51C0"}} >

                            {vd.VENDOR_ID}
                            </a>
                          
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
                        {/* <td
                          key={`col-3` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10, width:"20%" }}
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
                <button type="button" title="Purchase Orde" style={{height: 35, backgroundColor:"white",fontFamily:"serif", borderRadius: 5, color:"white" }}><div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <IconContext.Provider
                      value={{ color: "#6495ED", size: "35px" }}
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
                <button type="button" title="Goods Return" style={{  height: 35, backgroundColor:"white",fontFamily:"serif", borderRadius: 5,color:"white" }} ><IconContext.Provider
                      value={{ color: "#FFBF00", size: "35px" }}
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
                <button type="button" title="Goods Receipt"style={{  height: 35,backgroundColor:"white", fontFamily:"serif",borderRadius: 5 , color:"white"}}><IconContext.Provider
                      value={{ color: "#FF7F50", size: "35px" }}
                    >
                      {" "}
                      <AiFillReconciliation />
                    </IconContext.Provider></button>
                         </Link>
                          </div>
                           
                            <div className="col-md-2">
                            <Link 
                          to="/bmc" 
                          state={{
                            myVendorID: vd.VENDOR_ID,
                            myVendorName: vd.VENDOR_NAME,

                          }}                         
                          >
                <button type="button" title="Uploaded Document"style={{  height: 35,backgroundColor:"white", fontFamily:"serif",borderRadius: 5 , color:"white"}}><IconContext.Provider
                      value={{ color: "#DE3163", size: "35px" }}
                    >
                      {" "}
                      <FaUserCheck />
                    </IconContext.Provider></button>
                         </Link>
                          </div>
                            
                       </div>
                       </div>
                          <br />       
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
        </div>
        </div>
        </div>

        <Modal

        isOpen={showCheckFlages}
        toggle={toggleCheckFlages}
        size="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
         
          // height: "90vh",
          // width: "400px"
        }}
      >

        <ModalBody>
          <div className="col-md-12 text-center">

            <p style={{ color: "green", fontSize:20, marginBottom:15 }}>{vendorName+"("+vendorIDss+")"}</p>
            <div className="row text-center" >
            <div className=" col-6" >
          <Link  to="/bpo"   state={{
                            myVendorID: vendorIDss,
                            myVendorName:vendorName,
                          }}   style={{
            textDecoration: 'none',

          }}
          >
          
            <div
              className="card info-card sales-card"
              style={
                {
                  backgroundColor:"#EBEBFF"
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
                Purchase Order
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
               
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "90px" }}
                      >
                        {" "}
                        <BsFillCartCheckFill color={"#F07857"}  />
                      </IconContext.Provider>
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                  <br/>
                  <br/>    
<span style={{
  color: "#FF6347",
  fontWeight: 700,
  fontSize: 30,
}} className=" small pt-1 fw-bold">{(dashboardData.OPEN_PO+dashboardData.CLOSE_PO)?dashboardData.OPEN_PO+dashboardData.CLOSE_PO : 0}</span>{" "}
</div>
                </div>
              </div>
            </div>
          </Link>
        </div> 
        <div className=" col-6" >
          <Link   to="/bgrn"  state={{
                            myVendorID: vendorIDss,
                            myVendorName:vendorName,
                          }}   style={{
            textDecoration: 'none',

          }}
          >
            <div
              className="card info-card sales-card"
              style={
                {
                  backgroundColor:"#EBEBFF"
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
               Goods Receipt
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
               
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "90px" }}
                      >
                        {" "}
                        <AiFillReconciliation color={"#43A5BE"}  />
                      </IconContext.Provider>
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                  <br/>
                  <br/>    
<span style={{
  color: "#FF6347",
  fontWeight: 700,
  fontSize: 30,
}} className=" small pt-1 fw-bold">{dashboardData.RECEIVED_PO? dashboardData.RECEIVED_PO  :0}</span>{" "}
</div>
                </div>
              </div>
            </div>
          </Link>
        </div> 
        <div className=" col-6" >
          <Link  to="/bgr"  state={{
                            myVendorID: vendorIDss,
                            myVendorName:vendorName,
                          }}   style={{
            textDecoration: 'none',

          }}
          >
            <div
              className="card info-card sales-card"
              style={
                {
                  backgroundColor:"#EBEBFF"
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
                Goods Return
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
               
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "90px" }}
                      >
                        {" "}
                        <BsFillCartXFill     color={"#BE398D"}  />
                      </IconContext.Provider>
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                  <br/>
                  <br/>    
<span style={{
  color: "#FF6347",
  fontWeight: 700,
  fontSize: 30,
}} className=" small pt-1 fw-bold">{dashboardData.RETURN_PO ? dashboardData.RETURN_PO : 0}</span>{" "}
</div>

                </div>
              </div>
            </div>
          </Link>
        </div> 
        <div className=" col-6" >
          <Link        to="/bmc"   state={{
                            myVendorID: vendorIDss,
                            myVendorName:vendorName,
                          }}   style={{
            textDecoration: 'none',

          }}
          >
            <div
              className="card info-card sales-card"
              style={
                {
                  backgroundColor:"#EBEBFF"
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
                Supplier Details
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
               
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "90px" }}
                      >
                        {" "}
                        <FaUserAlt       />
                      </IconContext.Provider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div> 

            </div>

          </div>


        </ModalBody>
      </Modal>
      </>
    );
  }
export default VendorDetails;