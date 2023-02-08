import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import NavHeader from "../../Components/NavHeader";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";

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
      axios.get(AxioxExpPort + "mapping/get?buyer=123")
        .then((response) => {
let tempArr=[]
          response.data.map((val,index)=>{
tempArr.push({...val,IS_CHECKED:false})
          })
          console.log("DATA",tempArr);
          setTBodys(tempArr);
          console.log("response.data",response.data);

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
    console.log(searchElements.length);
    if (length > 0) {

      const searchDatasMV = tbody.filter((item) =>  (item.VENDOR_ID).toString().toLowerCase().includes(searchElements) || (item.BUYER_ID).toString().toLowerCase().includes(searchElements) );
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
  console.log("values",tbody);
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
            <div class="dropdown" style={{marginTop:"-1px"}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Action
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" onClick={handleActive}>Active Checked</a></li>
    <li><a class="dropdown-item" onClick={handleDeActive}>Deactive Checked</a></li>
    <li><a class="dropdown-item" style={{color:COLORS.success}} onClick={handleActiveAll}>Active All</a></li>
    <li><a class="dropdown-item" style={{color:COLORS.danger}} onClick={handleDeActiveAll}>Deactive All</a></li>
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
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">
                {/* <input
                    type="checkbox"
                    checked={checkAll}
                   onClick={(e)=>{setCheckAll(!checkAll); console.log("checkAll",checkAll)}}
                  /> */} Select Items
                  </th>
                {/* <th onClick={() => sorting("BUYER_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer ID</th>
                <th onClick={() => sorting("BUYER_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer Name</th> */}
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier ID</th>
                <th onClick={() => sorting("VENDOR_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Name</th>
                <th onClick={() => sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                {/* <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th> */}
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((po, index) => {

                  return (
                    <tr
                      key={`row` + index}
                      style={{
                        backgroundColor: "white",
                        borderColor: "#000",
                      }}
                      className="table-light"
                    >
                     <td    key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}>
                        <input
                    type="checkbox"
                    // checked={checkAll}
                    value={po.IS_CHECKED}
                    onClick={(e)=>{
                      po.IS_CHECKED=!po.IS_CHECKED;
                       //setCheckAll(e.target.value)
                       
                    }}
                  />
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
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {(po.VENDOR_ID).toString()}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {(po.VENDOR_ID).toString()}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {po.STATUS == '2' &&
                          <span className="badge badge-success" >Active</span>
                        }
                        {po.STATUS == '1' &&
                          <span className="badge badge-danger"  >Deactive</span>
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

