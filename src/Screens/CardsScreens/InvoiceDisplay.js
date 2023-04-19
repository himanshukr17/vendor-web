import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import DateRangePicker from 'rsuite/DateRangePicker'
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useLocation, useNavigate,Link } from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
// // import Pagination from "../../Components/Pagination";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiFillFilePdf, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowUp, AiOutlineDownload, AiOutlineHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
import { AiFillAccountBook, AiFillReconciliation, AiOutlineWallet } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";
import SidebarHeaderToggle from "../../Components/SidebarHeaderToggle";
function InvoiceDisplay () {
    const vendorId = localStorage.getItem('userId');
    // console.log("locationID.state.",locationID.state)
    const navigate = useNavigate();
    const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
    const [modalDataStatus, setModalDataStatus] = useState(true);
    const [ClickedInvoiceDataArr, setClickedInvoiceDataArr] = useState([]);
    const [sort, setSort] = useState("ASC");
    const [invoiceNumber,setInvoiceNumber]=useState("")
    // const [query, setQuery]=useState("")
    const [filterData, setFilterdata] = useState([])
    const headers = [
        { label: "Plant ID", key: "PLANT_ID" },
        { label: "PO Number", key: "PO_NO" },
        { label: "GRN No", key: "GRN_NO" },
        { label: "GRN Year", key: "GRN_YEAR" },
        { label: "GRN Ref", key: "GRN_REF" },
        { label: "Amount", key: "AMOUNT" }
    ];
    
    const prettyLink  = {
        backgroundColor: '#8dc63f',
        fontSize: 14,
        fontWeight: 500,
        height: 52,
        padding: '0 48px',
        borderRadius: 5,
        color: '#fff'
      };
    const data = ClickedInvoiceDataArr;
   
    const [tbody, setTBody] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ClickedInvoiceDataArr.slice(indexOfFirstPost, indexOfLastPost);
    const [emptyModalTable, setEmptyModalTable] = useState([]);
    const [showThree,setShowThree]=useState(false)
    const[showArrowDOC,setShowArrowDOC]=useState(false)
    const[showArrowINV,setShowArrowINV]=useState(false)
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
      setLoading(true)
      axios.get(AxioxExpPort +"invoice/all?id="+vendorId)
        .then((response) => {
          setTBody(response.data);
          // console.log("response.data",response.data);
          // console.log("response.data.length",response.data)
          console.log("response.data.length",response.data)
          setFilterdata(response.data);
          setTimeout(() => {
        setLoading(false);
      });
        }).catch((err) => {setIsPurchaseOrderEmpty(false)})

    }
    useEffect(() => {
      fetchPosts()
    }, []);
  
    const getTwodates = (e) => {
      if (e != null) {
        var s = e[0];
        var e = e[1];
        var arr = [];
  
        for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
          var dateElement = dateFormat((new Date(d)), "ddd, mmm dS,yyyy").toLowerCase()
          const searchDatasss = tbody.filter((item) => dateFormat((item.SUPPLIER_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(dateElement));
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
  
    const sorting = (col) => {
      
      if (sort === "ASC") {
        const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setShowArrowDOC(!showArrowDOC);

        setTBody(sorted);
        setSort("DSC")

      }
      if (sort === "DSC") {
        const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setShowArrowDOC(!showArrowDOC);

        setTBody(sorted);
        setSort("ASC")
      }
    }
    const sortingINV = (col) => {
      if (sort === "ASC") {
        const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setShowArrowINV(!showArrowINV);

        setTBody(sorted);
        setSort("DSC")

      }
      if (sort === "DSC") {
        const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setShowArrowINV(!showArrowINV);
        setTBody(sorted);
        setSort("ASC")
      }
    }
    // console.log("response.dataresponse.data", tbody);
    const handleSearch = (event) => {
      var searchElements = event.target.value;
      // setQuery(searchElements);
      var length = Number(searchElements.length)
      console.log(searchElements.length);
      if (length > 0) {
        // setTBody('')
        const searchDatas = tbody.filter((item) => item.COMPANY_CODE.toLowerCase().includes(searchElements) ||item.MIRO_NO.toString().toLowerCase().includes(searchElements) || dateFormat((item.SUPPLIER_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(searchElements) || (item.INVOICE_NUMBER).toString().toLowerCase().includes(searchElements) );
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
        const searchDatas = ClickedInvoiceDataArr.filter((item) => item.GRN_NO.toString().toLowerCase().includes(searchElements) || item.GRN_REF.toString().toLowerCase().includes(searchElements));
        console.log("searchElements.length", searchDatas);
        setClickedInvoiceDataArr(searchDatas);
        if(searchDatas.length ==0){
          setModalDataStatus(false)
        }
      } else {
        setModalDataStatus(true);
        setClickedInvoiceDataArr(emptyModalTable)
      }
    }

    var tempArray=[];
    tbody.map(csvItems=>{
      var tempDAte=dateFormat(csvItems.DOCUMENT_DATE, "dd/mm/yyyy");
      console.log("csvItems",csvItems)
      var POSTDAte=dateFormat(csvItems.POSTING_DATE, "dd/mm/yyyy");
      let total = 0;
      csvItems.invoice_details.map((itemsPrice) =>
      total = total + itemsPrice.PER_UNIT_PRICE * itemsPrice.RETURN_QTY )
      
      tempArray.push({
        "id":csvItems._id,
        "INVOICE_NUMBER":csvItems.INVOICE_NUMBER,
        "MIRO_NO":csvItems.MIRO_NO,
        "COMPANY_CODE":csvItems.COMPANY_CODE,
        "PLANT":csvItems.invoice_details[0].PLANT_ID+"("+csvItems.invoice_details[0].PLANT_DESCRIPTION+")",
        "YEAR":csvItems.YEAR,
        "POST_DATE":POSTDAte,
        "DOC_DATE":tempDAte,
        "TOTAL_ITEM":csvItems.invoice_details.length,
        "TOTAL_VAL":csvItems.TOTAL_PO_VALUE
  
      })
    })
    
    const headersTempArray=[
      { label: "Invoice Number", key: "INVOICE_NUMBER" },
      { label: "Miro Number", key: "MIRO_NO" },
      { label: "Company Code", key: "COMPANY_CODE" },
      { label: "Plant", key: "PLANT" },
      { label: "Fiscal Year", key: "YEAR" },
      { label: "Posting Date", key: "POST_DATE" },
      { label: "Document Date", key: "DOC_DATE" },
      { label: "Total Item", key: "TOTAL_ITEM" },
      { label: "Total Net Value*", key: "TOTAL_VAL" }
    ]
  const printPage=()=>{
    window.print()
  }
    const handelAllPO = () => {
      setIsPurchaseOrderEmpty(true);
      setTBody(filterData);
    }
    // const [query,setQuery]=useState("")
    //     const search=(datass)=>{
    //       return datass.filter(item=> item.DOCUMENT_DATE.toLowerCase.includes(query) )
    //       console.log(datass)
    //     }
    let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });

    const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
    const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
    const paginate = pageNumber => setCurrentPage(pageNumber)
    return (
      <>
        <SidebarHeaderToggle />
        {
      loading && 
      <div className="loader-container">
      	  <div className="spinnerCircle"></div>
        </div>
    }
        <div
        className="card-body"
        style={{
          marginTop: "2%",
        }}
      >
        <div
          
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row" style={{ marginBottom:10}}>
               
                <div className="col-md-10">

               
                  <div style={{ display: 'flex', alignItems: 'center' , marginLeft:'40px' }}>
  <h4 className="form-check-label">
  Invoice Details
  </h4>
  <button  style={{
      marginLeft: '10px',
      padding: '7px 14px',
      backgroundColor:"#4F51C0",
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer'
    }} onClick={() => { window.history.go(-1) }}>Go Back</button>
</div>
                </div>
                <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
                  
                    <IconContext.Provider value={{ color: "red", size: "22px" }}>
                      <AiOutlineHome type="button"   onClick={() => {
                      navigate("/dashboard");
                    }} />
                    </IconContext.Provider>
                  
                  {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}
              
                  {" / "}
                    <a className="dropdown-toggle" style={{color:"maroon"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Transaction Data    
          </a>
          <ul className="dropdown-menu" style={{width:"95%"}}>
      <li className="row" ><Link style={{ }}  to="/pos"><BsFillCartCheckFill  color={"#F07857"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Purchase Order   </a></Link></li>
      <li className="row" ><Link style={{ }}  to="/res"><AiFillReconciliation color={"#43A5BE"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Goods Receipt    </a></Link></li>
      <li className="row" ><Link style={{ }}  to="/ackn"><AiOutlineWallet     color={"#F5C26B"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Order to confirm </a></Link></li> 
      {/* <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"#4FB06D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Invoice Booked   </a></Link></li>  */}
      <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"pink"}    size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Invoice Pending  </a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/grs"><BsFillCartXFill      color={"#53BDAS"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Goods Return     </a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/mcs"><FaFileContract       color={"#BE398D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> My Documents     </a></Link></li> </ul>  </div>
               
              </div>
            </div>
            <div className="card" >
            <div className="card-body" style={{marginLeft:'30px'}}>
            <div className="row">
              <div className="col-md-2 noPrint" >
              <button type="button" style={{ width: "45%", height: 35, borderRadius: 5 }} onClick={handelAllPO}>Show All</button>{" "}

              </div>
              
              <div className="col-md-5 noPrint" >

              </div>
              <div className="col-md-2 noPrint" >
                <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodates(e) }} placeholder="Search Date Range" />
              </div>
  
  
              <div className="col-md-2 noPrint">
                <input
                  type="text"
                  className="form-control"
  
                  placeholder="Search Invoice/MIRO No "
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
                <button onClick={printPage} type="button" style={{ backgroundColor:"#4F51C0", width: "45%", height: 35, borderRadius: 5 }} > <AiFillFilePdf size={20} style={{color:"white"}}/></button>{" "}
              <CSVLink  filename={"INV:"+vendorId+".csv"}  data={tempArray}  headers={headersTempArray} ><button type="button" style={{backgroundColor:"#4F51C0", width: "45%", fontFamily:"bold", height: 35, borderRadius: 5 }} ><FaFileCsv size={20} style={{color:"white"}}/></button></CSVLink>{" "}
              </div>
            </div>
  
  
          </div>
<div style={{marginLeft:'30px'}}>   
            <p className="text-right" style={{ marginTop: "-20px" }}>*Exc GST</p>
            <table className="table table-light table-bordered table-hover" >
              <thead className="table-light" style={{ position: "sticky", top: 50, backgroundColor: "#fff", zIndex: 1 }}>
                <tr
                  className="text-center"
                  style={{
                    backgroundColor: COLORS.gray20,
                    borderColor: COLORS.gray10,
                  }}
                >
                  <th className="text-center" onClick={() => sortingINV("INVOICE_NUMBER")} style={{ width: "11%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Invoice Number{showArrowINV?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
                  <th  className="text-center"   style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Miro No</th>
                  <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Company Code</th>
                  <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Plant</th>
                  <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Fiscal Year</th>
                  <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Posting Date</th>
                  <th onClick={() => sorting("SUPPLIER_DATE")} className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Invoice Date{showArrowDOC?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
                  <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Total Invoice Value*</th>
                  <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Item Count</th>
                  <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Action</th>
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
                        <td
                          key={`row`+ index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          <a style={{
                            textDecoration: 'none',
                            color:"blue"
                          }}
                          type="button"
                            onClick={(e) => {
                              togglePODetailsFlag();
                              setClickedInvoiceDataArr(po.invoice_details);
                              setEmptyModalTable(po.invoice_details);
                              setInvoiceNumber(po.INVOICE_NUMBER);
  
                            }}
                          >
                            {po.INVOICE_NUMBER.toString()}
                          </a>
                          <br />
                        </td>
                        <td
                          key={`col-4` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {po.MIRO_NO}
                        </td>
                        <td
                          key={`col-1`+ index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                        
                            {po.COMPANY_CODE}
                        </td>
                        <td
                          key={`col-1`+ index}
                          className="text-center"
                          style={{ width: "13%", borderColor: COLORS.gray10 }}
                        >
                            {po.invoice_details[0].PLANT_ID+"("+po.invoice_details[0].PLANT_DESCRIPTION+")"}                         
                        </td>
                        
                        <td
                          key={`col-1`+ index}
                          className="text-center"
                          style={{ width: "5%", borderColor: COLORS.gray10 }}
                        >
                        
                            {po.YEAR}
                       
                         
                        </td>
                        
                        <td
                          key={`col-2` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {dateFormat(po.BUYER_DATE, "dd/mm/yyyy")}
                        </td>
                        <td
                          key={`col-3` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {dateFormat(po.SUPPLIER_DATE, "dd/mm/yyyy")}
                        </td>
                       
                      
                       
                        <td
                          key={`col-5` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {num.format(Number(po.TOTAL_PO_VALUE))}
                        </td>
                        <td
                          key={`col-6` + index}
                          className="text-center"
                          style={{ width: "5%", borderColor: COLORS.gray10 }}
                        >
                          {po.invoice_details.length}
                        </td>
                        <td
                          key={`col-7` + index}
                          className="text-center"
                          style={{ marginwidth: "5%", borderColor: COLORS.gray10 }}
                        >
                          <CSVLink className="btn" filename={"INV"+po.INVOICE_NUMBER+".csv"} data={po.invoice_details} headers={headers}
                          // setClickedInvoiceDataArr(val.purchase_order)
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
  <div className="card card-info" >
        <div className="card-header">
          <h3 className="card-title"> Invoice Details</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            togglePODetailsFlag();
          }}>×</span>
          </button>
        </div>
        </div>
        <div className="card" style={{marginTop:"-2%",marginBottom:"-0.3%"}}>
          <div className="card-body">    
            <div className="row">
              <div className="col-md-8">
              <h5 className="modal-title " id="exampleModalLabel">
                <IconContext.Provider
      value={{ color: 'blue', size: '25px' }}
    >
       
        <a style={{color:"green"}}>Invoice No: {invoiceNumber}</a>
    </IconContext.Provider>
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
                  filename={"Invoice.csv"}
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
  
            <table className="table table-bordered ">
              <thead>
                {/* <th>Line</th> */}
                <th style={{ width: "10%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Material Number</th>
                <th style={{ width: "20%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Material Description</th>
                <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Tax Amount</th>
                <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Currency</th>
                <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Line Item</th>
                <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Invoice Reduction Category</th>
                <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Supplier Invoice Amount</th>
                <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Supplier Invoice Quantity</th>
                <th style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }}>Remark</th>
            
  
              </thead>
              <tbody>
                      { modalDataStatus ?(
                  currentPosts.map((posData, index) => {
                   
                    return (
                      <tr>
                        
                        <td  key={`col-2` + index}>
                          {posData.MATERIAL.toString()}
                        </td>
                       
                        <td  key={`col-4` + index}>
                          {posData.MATERIAL_DESCRIPTION.toString()}
                        </td>
                        <td  key={`col-5` + index}>
                          {num.format(Number(posData.TAX_AMOUNT))}
                        </td>
                        <td  key={`col-6` + index}>
                          {posData.CURRENCY}
                        </td>
                        <td  key={`col-7` + index}>
                          {posData.LINE}
                        </td>
                        
                       

                          {posData.REDUCE_AMT ==2 ?
                            
                            <>
                          <td  key={`col-8` + index}>
                          {posData.REDUCE_AMT.toString()}
                        </td>
                        <td  key={`col-9` + index}>
                          {posData.TOTAL_AMT.toString()}
                        </td>
                        <td  key={`col-10` + index}>
                          {posData.TOTAL_QTY.toString()}
                        </td>
                        </>:
                            <>
                          <td  key={`col-8` + index}>
                          {""}
                        </td>
                        <td  key={`col-9` + index}>
                          {""}
                        </td>
                        <td  key={`col-10` + index}>
                          {""}
                        </td>
                        </>
                          
                          }
                          <td  key={`col-6` + index}>
                          {posData.REMARKS}
                       
                        </td>
                       

                        
                      </tr>
                    )})
                  
                
                ):
                (
                  <tr>
                    <td colSpan={15} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
            <Pagination postPerPage={postsPerPage} totalPosts={ClickedInvoiceDataArr.length} paginate={paginate} />
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
        </Modal>
      </>
    );
  }

export default InvoiceDisplay