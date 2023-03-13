import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import DateRangePicker from 'rsuite/DateRangePicker'
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload,AiOutlineArrowDown ,AiOutlineArrowUp, AiFillFilePdf, AiOutlineHome} from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';

const BuyerPurchaseOrders =(props)=> {
  const locationID=useLocation();
  const vendorId = locationID.state.myVendorID;
  const vendorName = locationID.state.myVendorName;
  // console.log("locationID.state.",locationID.state)
  const navigate = useNavigate();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [modalDataStatus, setModalDataStatus] = useState(true);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
  const [sort, setSort] = useState("ASC");
  // const [query, setQuery]=useState("")
  const [filterData, setFilterdata] = useState([])
 
  const headers = [
    { label: "Material Description", key: "MATERIAL_DESCRIPTION" },
    { label: "Material No", key: "MATERIAL" },
    { label: "Manufacture Part No.", key: "MANUFACTURE_PART_NO" },
    { label: "Price/Unit", key: "UNIT" },
    { label: "Line Item", key: "ITEM_CATEGORY" },
    { label: "Pending Quantity", key: "PENDING_QUANTITY" },
    { label: "Delevered Quantity", key: "DELIVERED_QUANTITY" },
    { label: "Price/Unit", key: "NET_PRICE" },
    { label: "Order Quantity", key: "ORDER_QUANTITY" },
  ];

  const data = ClickedPOsDataArr;

  const [tbody, setTBody] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
  const [emptyModalTable, setEmptyModalTable] = useState([]);
 const[csvDownload,setCsvDownload]=useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      axios.post(AxioxExpPort + "createcompany/po",{
      "user":vendorId
      })
        .then((response) => {

          setTBody(response.data);
           console.log("response.data",response.data);
           
          setFilterdata(response.data);
        })

    }
    fetchPosts()
  }, []);

  const getTwodates = (e) => {
    if (e != null) {
      var s = e[0];
      var e = e[1];
      var arr = [];

      for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
        var dateElement = dateFormat((new Date(d)), "ddd, mmm dS,yyyy").toLowerCase()
        const searchDatasss = tbody.filter((item) => dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(dateElement));
        searchDatasss.map((itemss,index) => {
          arr.push(itemss)
        })
      } setTBody(arr);
      if (arr.length == 0) {
        setIsPurchaseOrderEmpty(false)
      }
    } else {
      setIsPurchaseOrderEmpty(true)
      setTBody(filterData)
    }
  }
 const[showArrow,setShowArrow]=useState(false)
  const sorting = (col) => {
    if (sort === "ASC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTBody(sorted);
      setSort("DSC")
      setShowArrow(!showArrow)
      console.log("response.data", tbody);
    }
    if (sort === "DSC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setShowArrow(!showArrow)
      setTBody(sorted);
      setSort("ASC")
    }
  }
  const handleSearch = (event) => {
    var searchElements = event.target.value;
    // setQuery(searchElements);
    var length = Number(searchElements.length)
    console.log(searchElements.length);
    if (length > 0) {
      // setTBody('')
      const searchDatas = tbody.filter((item) => item.STATUS.toLowerCase().includes(searchElements) || dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(searchElements) || (item.PO_NO).toString().toLowerCase().includes(searchElements) || (item.Details[0].PLANT_ID).toString().toLowerCase().includes(searchElements));
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
  const handleSearchModal = (event) => {
    var searchElements = event.target.value;
    // setQuery(searchElements);
    var length = Number(searchElements.length)
    console.log("lengthlength", emptyModalTable)
    if (length > 0) {
      // setTBody('')
      const searchDatas = ClickedPOsDataArr.filter((item) => item.MATERIAL_DESCRIPTION.toLowerCase().includes(searchElements) || item.MATERIAL.toLowerCase().includes(searchElements));
      console.log("searchElements.length", searchDatas);
      setClickedPOsDataArr(searchDatas);
      if(searchDatas.length ==0){
        setModalDataStatus(false)
      }
    } else {
      setModalDataStatus(true);
      setClickedPOsDataArr(emptyModalTable)
    }
  }
  // CSV download data
  var tempArray=[];
  tbody.map(csvItems=>{
    var tempDAte=dateFormat(csvItems.DOCUMENT_DATE, "dd/mm/yyyy");
    let total = 0
    csvItems.Details.map((price,idx) => {
      total = total + price.NET_PRICE * price.ORDER_QUANTITY
    });
    let totalsQty = 0
    csvItems.Details.map((price,idx) => {
      totalsQty = totalsQty + Number(price.ORDER_QUANTITY)
    });
    tempArray.push({
      "id":csvItems._id,
      "PO_NO":csvItems.PO_NO,
      "DOC_DATE":tempDAte,
      "TOTAL_QTY":totalsQty,
      "TOTAL_ITEM":csvItems.Details.length,
      "COMPANY_CODE":csvItems.Details[0].COMPANY_CODE,
      "PURCHASEING_GRP":csvItems.Details[0].PURCHASING_GROUP,
      "PURCHASING_ORG":csvItems.PURCHASE_ORG,
      "PAYMENT_TERM":csvItems.PAYMENT_KEY +"("+csvItems.PAY_DESC+")",
      "EXCHANGE_RATE":csvItems.Details[0].EXCHANGE_RATE,
      "INCO_ITEM_1":csvItems.INCO_1,
      "INCO_ITEM_2":csvItems.INCO_2,
      "TOTAL_VAL":total,
      "STATUS":csvItems.STATUS

    })
  })

  const headersTempArray=[
    { label: "PO Number", key: "PO_NO" },
    { label: "Date", key: "DOC_DATE" },
    { label: "Total Quanty", key: "TOTAL_QTY" },
    { label: "Total Item", key: "TOTAL_ITEM" },
    { label: "Company Code", key: "COMPANY_CODE" },
    { label: "Purchasing Grp", key: "PURCHASEING_GRP" },
    { label: "Purchasing Org", key: "PURCHASING_ORG" },
    { label: "Payment Term", key: "PAYMENT_TERM" },
    { label: "Exchange Rate", key: "EXCHANGE_RATE" },
    { label: "INCO ITEM 1", key: "INCO_ITEM_1" },
    { label: "INCO ITEM 2", key: "INCO_ITEM_2" },
    { label: "Total Net Value*", key: "TOTAL_VAL" },
    { label: "Status", key: "STATUS" },
  ]
  console.log("csvArray",tempArray)
  const handelAllPO = () => {
    setIsPurchaseOrderEmpty(true);
    setTBody(filterData);
  }
  // const [query,setQuery]=useState("")
  //     const search=(datass)=>{
  //       return datass.filter(item=> item.DOCUMENT_DATE.toLowerCase.includes(query) )
  //       console.log(datass)
  //     }
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  const paginate = pageNumber => setCurrentPage(pageNumber)
  const printData=()=>{
    window.print();
  }
  let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });

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
                    Purchase Orders of {" "+vendorName+"("+vendorId +")"}
                  </h4>
                </div>
                <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
                  
                    <IconContext.Provider value={{ color: "red",marginTop:-210, size: "20px" }}>
                      <AiOutlineHome type="button"   onClick={() => {
                      navigate("/home");
                    }} />
                    </IconContext.Provider>
                  
                    {" /"}
                  <Link to="/vdtls" style={{
                          textDecoration: 'none',
                          color:"#4F51C0"

                        }}>{" Supplier Details"}</Link>
                </div>
               
              </div>
            </div>
            <div className="card" style={{marginTop:10}}>
            <div className="card-body">
            <div className="row">
            <div className="col-md-2">
            <button type="button" style={{ width: "45%", height: 35, borderRadius: 5 }} onClick={handelAllPO}>Show All</button> {" "}
            </div>
            <div className="col-md-5 noPrint">

            </div>
            <div className="col-md-2 noPrint">
              <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodates(e) }} placeholder="Search Date Range" />
            </div>


            <div className="col-md-2 noPrint">
              <input
                type="text"
                className="form-control"

                placeholder="Search PO No"
                style={{
                  width: "100%",
                  height: 35,
                }}
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
            </div>
            <div className="col-md-1 noPrint">
            <CSVLink  filename={"ID:"+vendorId+".csv"}  data={tempArray}  headers={headersTempArray} ><button type="button" style={{ width: "47%", backgroundColor:"#4F51C0", height: 33, borderRadius: 5 }} ><FaFileCsv size={20} style={{color:"white"}}/></button></CSVLink>{" "}
        <button onClick={printData} type="button" style={{ width: "47%", height: 33,backgroundColor:"#4F51C0", borderRadius: 5 }} > <AiFillFilePdf style={{color:"white"}} size={20}/></button>{" "} 

            </div>

           
          </div>


        </div>
       
          <p className="text-right" style={{ marginTop: "-24px" , marginBottom: "1px" }}>*Exc GST</p>
          <table className="table table-light table-bordered table-hover">
            <thead className="table-light">
              <tr
                className="text-center"
                style={{
                  backgroundColor:"#4F51C0", color:"white",
                  borderColor: "COLORS.gray10",
                }}
              >
                <th onClick={() => sorting("PO_NO")} className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">PO Number</th>
                <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ backgroundColor:"#4F51C0", color:"white",width: "5%", borderColor: COLORS.gray10 }} scope="col">Date{showArrow?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Total Quantity</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Item Count</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Company Code</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Purchasing Group</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Purchasing Org</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Payment Term</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Exchange Rate</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">INCO Term 1</th>
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">INCO Term 2</th>
                <th onClick={() => sorting("NET_PRICE")} className="text-center" style={{backgroundColor:"#4F51C0", color:"white", width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Net Value*</th>
                 <th onClick={() => sorting("STATUS")} className="text-center" style={{backgroundColor:"#4F51C0", color:"white", width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th> 
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((po, index) => {
                  let total = 0
                  po.Details.map((price,idx) => {
                    total = total + price.NET_PRICE * price.ORDER_QUANTITY
                  });
                  let totalsQty = 0
                  po.Details.map((price,idx) => {

                    totalsQty = totalsQty + Number(price.ORDER_QUANTITY)
                  });

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
                        <a type="button" style={{
                          textDecoration: 'none',
                          color:"#4F51C0"

                        }}
                        
                          onClick={(e) => {
                            togglePODetailsFlag();
                            setClickedPOsDataArr(po.Details);
                            setEmptyModalTable(po.Details);

                          }}
                        >
                          {po.PO_NO}
                        </a>
                        <br />
                      </td>
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "4%", borderColor: COLORS.gray10 }}
                      >
                        {dateFormat(po.DOCUMENT_DATE, "dd/mm/yyyy")}
                      </td>
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "4%", borderColor: COLORS.gray10 }}
                      >
                        {totalsQty}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "4%", borderColor: COLORS.gray10 }}
                      >
                        {po.Details.length}
                      </td>
                      <td
                        key={`col-4` + index}
                        className="text-center"
                        style={{ width: "5%", borderColor: COLORS.gray10 }}
                      >
                        {po.Details[0].COMPANY_CODE}
                      </td>
                      <td
                        key={`col-5` + index}
                        className="text-center"
                        style={{ width: "5%", borderColor: COLORS.gray10 }}
                      >
                        {po.Details[0].PURCHASING_GROUP}
                      </td>
                      <td
                        key={`col-6` + index}
                        className="text-center"
                        style={{ width: "5%", borderColor: COLORS.gray10 }}
                      >
                        {po.PURCHASE_ORG}
                      </td>
                      <td
                        key={`col-7` + index}
                        className="text-center"
                        style={{ width: "15%", borderColor: COLORS.gray10 }}
                      >
                        {po.PAYMENT_KEY +"("+po.PAY_DESC+")"}
                      </td>
                      <td
                        key={`col-8` + index}
                        className="text-center"
                        style={{ width: "5%", borderColor: COLORS.gray10 }}
                      >
                        {num.format(Number(po.Details[0].EXCHANGE_RATE))}
                      </td>
                      <td
                        key={`col-9` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {po.INCO_1}
                      </td>
                      <td
                        key={`col-10` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {po.INCO_2}
                      </td>
                      <td
                        key={`col-11` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {num.format(Number(total))}
                      </td>
                      <td
                        key={`col-12` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {po.STATUS == 'Open' &&
                          <span className="badge badge-warning" >Open</span>
                        }
                        {po.STATUS == 'Close' &&
                          <span className="badge badge-success" >Close</span>
                        }
                      </td>
                      <td
                        key={`col-13` + index}
                        className="text-center"
                        style={{ marginwidth: "5%", borderColor: COLORS.gray10 }}
                      >
                        <CSVLink className="btn" data={po.Details} headers={headers}
                        // setClickedPOsDataArr(val.Details)
                        //  laery
                        >

                          <IconContext.Provider
                            value={{ color: "#FF7B25", size: "22px" }}
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
                  <td colSpan={16} className="text-center">
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
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"

                placeholder="Material No / Description"
                style={{
                  width: "100%",
                  height: 35,
                }}
                onChange={(e) => {
                  handleSearchModal(e)
                }}
              />
            </div>
            <div className="col-md-1">
              <CSVLink className="btn "
                onClick={() => {
                  togglePODetailsFlag();
                }}
                style={{
                  backgroundColor: COLORS.green,
                  color: COLORS.white,
                  padding: "6px",
                  height: 35,
                  marginBottom: 3
                }}
                data={data}
                headers={headers} >
                ⬇ <FaFileCsv size={22} />

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

          <table className="table table-bordered table-striped">
            <thead>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Material Description</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Material No</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Manufacture Part No.</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Unit</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Line Item</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Order Quantity</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Delevered Quantity</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Pending Quantity</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Price/Unit</th>

            </thead>
            <tbody>
                    { modalDataStatus ?(
                currentPosts.map((posData, index) => {
                  return (
                    <tr>
                      <td>
    
                        {posData.MATERIAL_DESCRIPTION}
                      </td>
                      <td>
                        {(posData.MATERIAL).toString()}
                      </td>
                      <td>
                        {posData.MANUFACTURE_PART_NO}
                      </td>
                      <td>
                        {posData.UNIT}
                      </td>
                      <td>
                        {posData.ITEM_CATEGORY}
                      </td>
                      <td>
                        {posData.ORDER_QUANTITY}
                      </td>
                     
                      <td>
                        {posData.DELIVERED_QUANTITY}
                      </td>
                      <td>
                        {posData.PENDING_QUANTITY}
                        </td>
                      <td>
                        {num.format(Number(posData.NET_PRICE))}
                      </td>
                     

                    </tr>
                  )})
                
              
              ):
              (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Data Found
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
          <Pagination postPerPage={postsPerPage} totalPosts={ClickedPOsDataArr.length} paginate={paginate} />
          <div className="modal-footer">
            <a
              className="navbar-brand"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
                padding: 1,
                height: '5px'
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

export default BuyerPurchaseOrders;

