import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import NavHeader from "../../Components/NavHeader";
import { AxioxExpPort } from "../AxioxExpPort"
import { Link, useNavigate } from "react-router-dom";
import { AiFillReconciliation, AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";

function ManageVendors() {
  const navigate = useNavigate();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [modalDataStatus, setModalDataStatus] = useState(true);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
  const [sort, setSort] = useState("ASC");
  const [checkAll,setCheckAll]=useState(false)
  // const [query, setQuery]=useState("")
  const [filterData, setFilterdata] = useState([])
  const headers = [
    { label: "Material No", key: "MATERIAL" },
    { label: "Material Description", key: "MATERIAL_DESCRIPTION" },
    { label: "Item Category", key: "ITEM_CATEGORY" },
    { label: "Price/Unit", key: "NET_PRICE" },
    { label: "Delevered Quantity", key: "DELIVERED_QUANTITY" },
    { label: "Pending Quantity", key: "PENDING_QUANTITY" },
    { label: "Order Quantity", key: "ORDER_QUANTITY" },
  ];


  const data = ClickedPOsDataArr;
  const buyerID = localStorage.getItem('userId');
  console.log("buyerIDbuyerID", buyerID)
  const [tbody, setTBodys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
  const [singleCheck, setSingleCheck] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      let tempArr=[]
      axios.get(AxioxExpPort + "mapping/get?buyer="+buyerID)
        .then((response) => {
          response.data.map((val,index)=>{
            if(val.STATUS==1){
              tempArr.push({...val,STRING_STATUS:"Inactive",IS_CHECKED:false})
            }else{
  tempArr.push({...val,STRING_STATUS:"Active",IS_CHECKED:false})
}
          })
          console.log("DATA",tempArr);
          setTBodys(tempArr);
          console.log("response.datass",response.data);

          setFilterdata(tempArr);
        })
    }
    fetchPosts()
  }, []);

  const sorting = (col) => {
    if (sort === "ASC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTBodys(sorted);
      setSort("DSC")
      console.log("response.data", tbody);
    }
    if (sort === "DSC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTBodys(sorted);
      setSort("ASC")
    }
  }
  const handleSearchMV = (event) => {
    var searchElements = event.target.value;
    var length = Number(searchElements.length)
    if (length > 0) {
      
      const searchDatasMV = tbody.filter((item) =>(item.VENDOR_NAME).toString().toLowerCase().includes(searchElements) || (item.VENDOR_ID).toString().toLowerCase().includes(searchElements) || (item.STRING_STATUS).toLowerCase().includes(searchElements) );
      
      setTBodys(searchDatasMV);
      if (searchDatasMV.length == 0) {
        setIsPurchaseOrderEmpty(false)
      }
    } else {
      setIsPurchaseOrderEmpty(true)
      setTBodys(filterData)
    }

  }

  const handelAllMV = () => {
    setIsPurchaseOrderEmpty(true);
    setTBodys(filterData);
  }
const handleActive =()=>{
  var tempArr=[];
  tbody.map((values,index) => {
    // console.log("values",values);
    if(values.IS_CHECKED == true){
      tempArr.push(values.VENDOR_ID)
      
    }
  })
  try {
    axios.post(AxioxExpPort + 'mapping/update_status', {
      buyer_id: buyerID,
      supplier: tempArr
    }).then((res) => {
      navigate("/mv")
      console.log("Something Went Wrong",res);
    })

  } catch {

    console.log("Something Went Wrong");

  }
}
const handleDeActive =()=>{
  var tempArr=[];
  tbody.map((values,index) => {
    // console.log("values",values);
    if(values.IS_CHECKED == true){
      tempArr.push(values.VENDOR_ID)
      
    }
  })
  console.log("values",tempArr);
}
const handleDeActiveAll =()=>{
  var tempArr=[];
  tbody.map((values,index) => {
    // console.log("values",values);
    if(values.IS_CHECKED == true){
      tempArr.push(values.VENDOR_ID)
      
    }
  })
  console.log("values",tempArr);
}
const handleActiveAll =()=>{
  var tempArr=[];
  tbody.map((values,index) => {
    // console.log("values",values);
    if(values.IS_CHECKED == true){
      tempArr.push(values.VENDOR_ID)
      
    }
  })
  console.log("values",tempArr);
}

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
                    Manage Vendor
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-1">
            </div>
            <div className="col-md-1">
            </div>
            <div className="col-md-1">
            <div className="dropdown" style={{marginTop:"-1px"}}>
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Action
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item"  style={{color:COLORS.success}} onClick={handleActive}>Save</a></li>
    {/* <li><a className="dropdown-item" onClick={handleDeActive}>Inactive Checked</a></li>
    <li><a className="dropdown-item" style={{color:COLORS.success}} onClick={handleActiveAll}>Active All</a></li>
    <li><a className="dropdown-item" style={{color:COLORS.danger}} onClick={handleDeActiveAll}>Inactive All</a></li> */}
  </ul>
</div>
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"

                placeholder="Search"
                style={{
                  width: "100%",
                  height: 35,
                }}
                onChange={(e) => {
                  handleSearchMV(e)
                }}
              />
            </div>
            <div className="col-md-1">
              <button type="button" style={{ width: "50px", height: 35, borderRadius: 5 }} onClick={handelAllMV}>All</button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="text-right" style={{ marginTop: "-30px" }}></p>
          <table className="table table-light table-bordered table-hover">
            <thead className="table-light">
              <tr
                className="text-center"
                style={{
                  backgroundColor: COLORS.gray20,
                  borderColor: COLORS.gray10,
                }}
              >
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Check Supplier</th>
                {/* <th onClick={() => sorting("BUYER_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer ID</th>
                <th onClick={() => sorting("BUYER_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer Name</th> */}
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier ID</th>
                <th onClick={() => sorting("VENDOR_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Name</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Actions</th>
                <th onClick={() => sorting("STRING_STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                {/* <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th> */}
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((vd, index) => {

                  return (
                    <tr
                      key={`row` + index}
                      style={{
                        backgroundColor: "white",
                        borderColor: "#000",
                        marginBottom:-100
                      }}
                      className="table-light"
                    >
                     <td    key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}>
                        {vd.STATUS == '1' &&
                        <input
                    type="checkbox"
                    // checked={checkAll}
                    value={vd.IS_CHECKED}
                    onClick={(e)=>{
                      vd.IS_CHECKED=!vd.IS_CHECKED;
                       //setCheckAll(e.target.value)
                       
                    }}
                  />
                        }
                        {vd.STATUS == '2' &&
                        <input
                    type="checkbox"
                     checked="checked"
                    // value={po.IS_CHECKED}
                    onClick={(e)=>{
                      vd.IS_CHECKED=!vd.IS_CHECKED;
                       //setCheckAll(e.target.value)
                       
                    }}
                  />
                        }
                        
                         </td>
                      {/* <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                      
                          {(po.BUYER_ID).toString()}
                    
                        <br />
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {(po.BUYER_ID).toString()}
                      </td> */}
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10,fontSize:17 }}
                      >
                        {(vd.VENDOR_ID).toString()}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10, fontSize:17 }}
                      >
                        {(vd.VENDOR_NAME).toString()}
                      </td>
                         {vd.STATUS==2 ?
                      <td
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
                          :

                          <td
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
                <button type="button" disabled title="Purchase Orde" style={{height: 35, backgroundColor:"#e7d4fa",fontFamily:"serif", borderRadius: 5, color:"white" }}><div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
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
                <button type="button" disabled title="Goods Return" style={{  height: 35, backgroundColor:"#a1b9e3",fontFamily:"serif", borderRadius: 5,color:"white" }} ><IconContext.Provider
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
                <button type="button" disabled title="Goods Receipt"style={{  height: 35,backgroundColor:"#d4d4ff", fontFamily:"serif",borderRadius: 5 , color:"white"}}><IconContext.Provider
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
                <button type="button" disabled title="Uploaded Document"style={{  height: 35,backgroundColor:"#93dce6", fontFamily:"serif",borderRadius: 5 , color:"white"}}><IconContext.Provider
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
                          
                         }
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {vd.STRING_STATUS == 'Active' &&
                          <span className="badge badge-success" >Active</span>
                        }
                        {vd.STRING_STATUS == 'Inactive' &&
                          <span className="badge badge-danger"  >Inactive</span>
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

    </>
  );
}

export default ManageVendors;

