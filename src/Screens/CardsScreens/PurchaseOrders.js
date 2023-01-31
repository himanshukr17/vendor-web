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
import dateFormat from 'dateformat';
function PurchaseOrders() {
  const navigate = useNavigate();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsData, setClickedPOsData] = useState([]);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
  const [sort,setSort]=useState("ASC");
  // const [query, setQuery]=useState("")
  const [filterData, setFilterdata]=useState([])
const headers = [
  { label: "Plant ID", key: "PLANT_ID" },
  { label: "Delevered ", key: "DELIVERED_QUANTITY" },
  { label: "Material No", key: "MATERIAL" },
  { label: "Description", key: "MATERIAL_DESCRIPTION" },
  { label: "Item Category", key: "ITEM_CATEGORY" },
  { label: "Net Price", key: "NET_PRICE" },
  { label: "Order Quantity", key: "ORDER_QUANTITY" },
  { label: "Pending Quantity", key: "PENDING_QUANTITY" },
];


const data = ClickedPOsDataArr;
  const vendorId =localStorage.getItem('userId');
console.log("vendorIdvendorId",vendorId)
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
        setFilterdata(response.data);
      })
    }
    fetchPosts();
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

    const handleSearch =(event)=>
    {
      var searchElements=event.target.value;
      // setQuery(searchElements);
      var length=Number(searchElements.length)
      console.log(searchElements.length);
      if(length > 0){
  // setTBody('')
  const searchDatas= tbody.filter((item)=>item.STATUS.toLowerCase().includes(searchElements) || dateFormat((item.DOCUMENT_DATE),"ddd, mmm dS,yyyy").toLowerCase().includes(searchElements)|| (item.PO_NO).toString().toLowerCase().includes(searchElements));
  setTBody(searchDatas)
  console.log(searchDatas)
}else{
  setTBody(filterData)
}

    }
// const [query,setQuery]=useState("")
//     const search=(datass)=>{
//       return datass.filter(item=> item.DOCUMENT_DATE.toLowerCase.includes(query) )
//       console.log(datass)
//     }
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
         
        >
          <div className="row">
            <div className="col-md-6">
            <div className="row">
              <div className="col-md-1">
              <button
              className="btn btn"
            
              onClick={() => {
                navigate("/dashboard");
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
              Purchase Orders
            </h4>
              </div>
            </div>
            </div>
<div className="col-md-4">

</div>
<div className="col-md-2">
<input
          type="text"
          className="form-control"
         
          placeholder="Search"
          style={{
            width: "100%",
            height: 30,
          }}
          onChange={(e) => {
           handleSearch(e)
          }}
        />
</div>
            
            
          </div>
         
        
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
                        {val.STATUS =='Open'&&
                        <span className="badge badge-success" >Open</span>
                        }
                        {val.STATUS =='Close'&&
                        <span className="badge badge-danger" >Close</span>
                        }
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
             <th>Plant ID</th>
             <th>Material No</th>
             <th>Description</th>
             <th>Delevered </th>
             <th>Item Category</th>
             <th>Net Price</th>
             <th>Order Quantity</th>
             <th>Pending Quantity</th>
             
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
                      {(posData.MATERIAL).toString()}
                    </td>
                    <td>
                      {posData.MATERIAL_DESCRIPTION}
                    </td>
                    <td>
                      {posData.DELIVERED_QUANTITY}
                    </td>
                    <td>
                      {posData.ITEM_CATEGORY}
                    </td>
                    <td>
                      {posData.NET_PRICE}
                    </td>
                    <td>
                      {posData.ORDER_QUANTITY}
                    </td>
                    <td>
                      {posData.PENDING_QUANTITY}
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

