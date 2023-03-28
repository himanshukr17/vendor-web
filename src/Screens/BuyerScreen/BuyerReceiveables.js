import React, { useState, useEffect } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import { AxioxExpPort } from "../AxioxExpPort"
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import {
  AiOutlineArrowLeft,AiOutlineArrowDown,AiOutlineArrowUp, AiOutlineHome, AiOutlineDownload, AiFillFilePdf
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
import DateRangePicker from "rsuite/esm/DateRangePicker";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
const  BuyerReceiveables=(props)=> {
  const navigate = useNavigate();
  const locationID=useLocation();
  const vendorId = locationID.state.myVendorID;
  const vendorName= locationID.state.myVendorName;
  const [clickRecData, setClickRecvData] = useState([]);
  const data = clickRecData;
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [modalDataStatus, setModalDataStatus] = useState(true);
  const [filterData, setFilterdata] = useState([])
  const [tbody, setTBody] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [sort, setSort] = useState("ASC");
  const [emptyModalTable, setEmptyModalTable] = useState([]);
  const [recpNo,setRecpNo]=useState("")

  const currentPosts = clickRecData.slice(indexOfFirstPost, indexOfLastPost)
  const headers = [
    { label: "Material No", key: "MATERIAL_NO" },
    { label: "Material Description", key: "MATERIAL_DOCUMENT" },
    { label: "GR Quantity", key: "GR_QTY" },
    { label: "Unit", key: "UNIT" },
    { label: "Invoice Quantity", key: "DELIVERY_QTY" },
    { label: "Manufacturing Part No", key: "MANUFACTURE_PART_NO" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      axios.get(AxioxExpPort + "received/get?id=" + vendorId)
        .then((response) => {
          setTBody(response.data);
          setFilterdata(response.data)

          console.log("response.data.length", response.data);
        }).catch((err) => { console.log("response.data.length",err.data);setIsPurchaseOrderEmpty(false)})
    }
    fetchData()
  }, []);
  const[showArrow,setShowArrow]=useState(false)
  const[showArrowINVNO,setShowArrowINVNO]=useState(false)

  const sorting = (col) => {

    if (sort === "ASC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTBody(sorted);
      setSort("DSC");
      setShowArrow(!showArrow)
      console.log("response.data", tbody);
    }
    if (sort === "DSC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTBody(sorted);
      setSort("ASC");
      setShowArrow(!showArrow)

    }

  }
  const sortingINVNO = (col) => {

    if (sort === "ASC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTBody(sorted);
      setSort("DSC");
      setShowArrowINVNO(!showArrowINVNO)
      console.log("response.data", tbody);
    }
    if (sort === "DSC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTBody(sorted);
      setSort("ASC");
      setShowArrowINVNO(!showArrowINVNO)

    }

  }
  const getTwodatesGRN = (e) => {
    if (e != null) {
      var s = e[0];
      var e = e[1];
      var arr = [];

      for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
        var dateElement = dateFormat((new Date(d)), "ddd, mmm dS,yyyy").toLowerCase()
        const searchDatasss = tbody.filter((item) => dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(dateElement));
        searchDatasss.map((itemss) => {
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
  const handleSearchGRNModal = (event) => {
    var searchElements = event.target.value;
    // setQuery(searchElements);
    var length = Number(searchElements.length)
    console.log("lengthlength", emptyModalTable)
    if (length > 0) {
      // setTBody('')
      const searchDatassp = clickRecData.filter((item) => item.MATERIAL_DOCUMENT.toLowerCase().includes(searchElements) || item.MATERIAL_NO.toLowerCase().includes(searchElements));
      console.log("searchElements.length", searchDatassp);
      setClickRecvData(searchDatassp);
      if (searchDatassp.length == 0) {
        setModalDataStatus(false)

      }
    } else {
      setModalDataStatus(true)
      setClickRecvData(emptyModalTable)
    }
  }
  const handleSearchGRN = (event) => {
    var searchElements = event.target.value;
    // setQuery(searchElements);
    var length = Number(searchElements.length)
    if (length > 0) {
      // setTBody('')
      const searchDatas = tbody.filter((item) => dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(searchElements) || (item.GRN_NO).toString().toLowerCase().includes(searchElements));
      setTBody(searchDatas)
      if (searchDatas.length == 0) {
        setIsPurchaseOrderEmpty(false)
      }
    } else {
      setIsPurchaseOrderEmpty(true)
      setTBody(filterData)
    }

  }
  const handelAll = () => {
    setIsPurchaseOrderEmpty(true);
    setTBody(filterData)
  }



  const handelAllPO = () => {
    setIsPurchaseOrderEmpty(true);
    setTBody(filterData);
  }
  var tempArray=[];
  tbody.map(csvItems=>{
    var tempDAte=dateFormat(csvItems.DOCUMENT_DATE, "dd/mm/yyyy");
    let total = 0
    csvItems.received_datas.map((price,idx) => {
      total = total + price.NET_PRICE * price.ORDER_QUANTITY
    });
    let totalsQty = 0
    csvItems.received_datas.map((price,idx) => {
      totalsQty = totalsQty + Number(price.ORDER_QUANTITY)
    });
    tempArray.push({
      "id":csvItems._id,
      "GRN_NO":csvItems.GRN_NO,
      "GRN_REF":csvItems.GRN_REF,
      "INVOICE_DATE":csvItems.DOCUMENT_DATE,
      "COMPANY_CODE":csvItems.received_datas[0].COMPANY_CODE,
      "PLANT":csvItems.received_datas[0].PLANT_ID+"("+csvItems.received_datas[0].PLANT_NAME+")",
      "TOTAL_ITEM":csvItems.received_datas.length

    })
  })

  const headersTempArray=[
    { label: "GR Number", key: "GRN_NO" },
    { label: "Invoice Number", key: "GRN_REF" },
    { label: "Invoice Date", key: "INVOICE_DATE" },
    { label: "Posting Date", key: "RECEIVING_DATE" },
    { label: "Company Code", key: "COMPANY_CODE" },
    { label: "Plant", key: "PLANT" },
    { label: "Item Count", key: "TOTAL_ITEM" }
    
  ]
  console.log("csvArray",tempArray)
  const printData=()=>{
    window.print();
  }
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
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
               
                <div className="col-md-10">

                  <h4 className="form-check-label" >
                    {/* {location.PROJECT} */}
                    {/* {location.state.name} */}
                    Goods Receipt Notes/Number
                  </h4>
                </div>
                <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
                    <IconContext.Provider value={{ color: "red", size: "22px" }}>
                      <AiOutlineHome type="button"   onClick={() => {
                      navigate("/home");
                    }} />
                    </IconContext.Provider>
                  {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}
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
            <div className="row" >
            <div className="col-md-1">
              <button type="button" style={{ width: "100%", height: 35, borderRadius: 5 }} onClick={handelAll}>Show All</button>
            </div>
            <div className="col-md-5" >

            </div>
            <div className="col-md-3 noPrint" >
              <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodatesGRN(e) }} placeholder="Search Invoice Date Range" />
            </div>
            <div className="col-md-2 noPrint">
              <input
                type="text"
                className="form-control"
                placeholder="Search GR No"
                style={{
                  width: "100%",
                  height: 35,
                }}
                onChange={(e) => {
                  handleSearchGRN(e)
                }}
              />
            </div>
            <div className="col-md-1 noPrint">
            <CSVLink  filename={"ID:"+vendorId+".csv"}  data={tempArray}  headers={headersTempArray} ><button type="button" style={{ width: "47%", backgroundColor:"#4F51C0", height: 33, borderRadius: 5 }} ><FaFileCsv size={20} style={{color:"white"}}/></button></CSVLink>{" "}
        <button onClick={printData} type="button" style={{ width: "47%", height: 33,backgroundColor:"#4F51C0", borderRadius: 5 }} > <AiFillFilePdf style={{color:"white"}} size={20}/></button>{" "} 

            </div>



          </div>

        </div>

        <div >
          {/* <p className="text-right" style={{ marginTop: "-30px" }}>{" "}</p> */}
          <table className="table table-light table-bordered table-hover">
            <thead className="table-light">
              <tr
                className="text-center"
                style={{
                  backgroundColor: COLORS.gray20,
                  borderColor: COLORS.gray10,
                }}
              >
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">GR Number</th>
                <th onClick={() => sortingINVNO("GRN_REF")} className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Invoice Number{showArrowINVNO?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
                <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Invoice Date{showArrow?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
                <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Posting Date</th>
                <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Company Code</th>
                <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Plant</th>
                {/* <th onClick={()=>sorting("received_datas[0].GRN_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">GR Number</th> */}
                <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Item Count</th>
                {/* <th onClick={() => sorting("GRN_REF")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">GR Reference No</th> */}
               <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Action</th> 

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
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                         <a type="button" style={{
                          textDecoration: 'none',
                          color:"blue"
                        }}

                          onClick={(e) => {
                            togglePODetailsFlag();
                            setClickRecvData(val.received_datas);
                            setEmptyModalTable(val.received_datas);
                            setRecpNo(val.GRN_NO)

                          }}
                        >
                          {val.GRN_NO.toString()}
                        </a>
                        <br />
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.GRN_REF.toString()}
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {dateFormat(val.DOCUMENT_DATE, "dd/mm/yyyy")}
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {dateFormat(val.received_datas[0].RECEIVING_DATE, "dd/mm/yyyy")}
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.received_datas[0].COMPANY_CODE}
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.received_datas[0].PLANT_ID+"("+val.received_datas[0].PLANT_NAME+")"}
                      </td>
                     
                     
                      

                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "6%", borderColor: COLORS.gray10 }}
                      >
                        {val.received_datas.length}

                      </td>
                      <td
                        key={`col-13` + index}
                        className="text-center"
                        style={{ marginwidth: "5%", borderColor: COLORS.gray10 }}
                      >
                        <CSVLink className="btn" filename={"GR_No:"+val.GRN_NO+".csv"} data={val.received_datas} headers={headers}
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
                  <td colSpan={15} className="text-center">
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
  className="modal-dialog modal-xl"
        size="lg"
        isOpen={showPODetailsFlag}
        toggle={togglePODetailsFlag}
        style={{

          justifyContent: "center",
          alignItems: "center",

        }}
      >
         <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Goods Receipt Details</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            togglePODetailsFlag();
          }}>×</span>
          </button>
        </div>
        </div>
        <div className="card" style={{marginTop:"-2%",marginBottom:"-0.3%"}}>
          <div className="card-body">          <div className="row">
            <div className="col-md-8">
            <h5 className="modal-title " id="exampleModalLabel">
                <IconContext.Provider
      value={{ color: 'blue', size: '25px' }}
    >
       
        <a style={{color:"green"}}>GR No: {recpNo}</a>
    </IconContext.Provider>
              </h5>

            </div>

            <div className="col-md-1">

            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"

                placeholder="Material No / Description"
                style={{
                  width: "100%",
                  height: 35,
                  marginBottom: 3
                }}
                onChange={(e) => {
                  handleSearchGRNModal(e)
                }}
              />
            </div>

          </div>

          <table className="table table-bordered table-striped">
            <thead>
              <th style={{ width: "10%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Material No</th>
              <th style={{ width: "20%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Material Description</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>GR Quantity</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Unit</th>
              {/* style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} <th>PO Date</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Received Date</th> */}
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Invoice Quantity</th>
              <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Manufacturing Part No</th>
            </thead>
            <tbody>
              {modalDataStatus ? (
                currentPosts.map((grsData, index) => {
                  return (
                    <tr>
                      <td >{grsData.MATERIAL_NO}</td>
                      <td >{grsData.MATERIAL_DOCUMENT}</td>
                      <td >{grsData.GR_QTY}</td>
                      <td >{grsData.UNIT}</td>
                      {/*  <td>{dateFormat(grsData.PO_DATE, "ddd, mmm dS, yyyy")}</td>
                      <td >{dateFormat(grsData.RECEIVING_DATE, "ddd, mmm dS, yyyy")}</td> */}
                      <td >{grsData.DELIVERY_QTY}</td>
                      <td >{grsData.MANUFACTURE_PART_NO}</td>
                    </tr>
                  );
                })
              ) :
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
          <div className="row">
            <div className="col-md-11">
              <Pagination postPerPage={postsPerPage} totalPosts={clickRecData.length} paginate={paginate} />

            </div>
            <div className="modal-footer">
            <a
              className="navbar-brand"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
                padding: 1,
                height: '10px'
              }}
              onClick={() => {
                togglePODetailsFlag();
              }}
            >
              Close
            </a>
          </div>
          </div>
          </div>
          </div>
        
      </Modal>
    </>
  );
}

export default BuyerReceiveables;
