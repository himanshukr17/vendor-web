import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import DateRangePicker from 'rsuite/DateRangePicker'
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
// // import Pagination from "../../Components/Pagination";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';

function InvoiceDisplay () {
    const vendorId = localStorage.getItem('userId');
    // console.log("locationID.state.",locationID.state)
    const navigate = useNavigate();
    const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
    const [modalDataStatus, setModalDataStatus] = useState(true);
    const [ClickedInvoiceDataArr, setClickedInvoiceDataArr] = useState([]);
    const [sort, setSort] = useState("ASC");
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
    const [postsPerPage, setPostsPerPage] = useState(8);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ClickedInvoiceDataArr.slice(indexOfFirstPost, indexOfLastPost);
    const [emptyModalTable, setEmptyModalTable] = useState([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        axios.get(AxioxExpPort + "invoice/all?id=" + vendorId)
          .then((response) => {
            setTBody(response.data);
            // console.log("response.data",response.data);
            // console.log("response.data.length",response.data)
            console.log("response.data.length",response.data)
            setFilterdata(response.data);
            
          }).catch((err) => { console.log("response.data.length",err.data);setIsPurchaseOrderEmpty(false)})
  
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
        setTBody(sorted);
        setSort("DSC")
        console.log("response.data", tbody);
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
      console.log(searchElements.length);
      if (length > 0) {
        // setTBody('')
        const searchDatas = tbody.filter((item) => item.COMPANY_CODE.toLowerCase().includes(searchElements) || dateFormat((item.SUPPLIER_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(searchElements) || (item.INVOICE_NUMBER).toString().toLowerCase().includes(searchElements) );
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
                  <div className="col-md-9">
  
                    <h4 className="form-check-label" htmlFor="inlineRadio2">
                      {/* {location.PROJECT} */}
                      {/* {location.state.name} */}
                      Invoice Details
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodates(e) }} placeholder="Search Date Range" />
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
            <p className="text-right" style={{ marginTop: "-30px" }}>*Exc GST</p>
            <table className="table table-light table-bordered table-hover">
              <thead className="table-light">
                <tr
                  className="text-center"
                  style={{
                    backgroundColor: COLORS.gray20,
                    borderColor: COLORS.gray10,
                  }}
                >
                  <th onClick={() => sorting("PO_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Invoice Number</th>
                  <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Company Code</th>
                  <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer Date</th>
                  <th onClick={() => sorting("NET_PRICE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Date</th>
                  <th onClick={() => sorting("NET_PRICE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Miro No</th>
                  <th onClick={() => sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Net PO Value*</th>
                  <th onClick={() => sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Count</th>
                  <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th>
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
  
                            }}
                          >
                            {po.INVOICE_NUMBER}
                          </a>
                          <br />
                        </td>
  
                        <td
                          key={`col-1`+ index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                        
                            {po.COMPANY_CODE}
                       
                         
                        </td>
                        
                        <td
                          key={`col-2` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {dateFormat(po.BUYER_DATE, "ddd, mmm dS, yyyy")}
                        </td>
                        <td
                          key={`col-3` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {dateFormat(po.SUPPLIER_DATE, "ddd, mmm dS, yyyy")}
                        </td>
                       
                      
                        <td
                          key={`col-4` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {po.MIRO_NO}
                        </td>
                        <td
                          key={`col-5` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
                        >
                          {'₹ ' + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(po.TOTAL_PO_VALUE)}
                        </td>
                        <td
                          key={`col-6` + index}
                          className="text-center"
                          style={{ width: "10%", borderColor: COLORS.gray10 }}
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
                    <td colSpan={8} className="text-center">
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
                  Invoice Details
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
  
            <table className="table table-bordered table-striped">
              <thead>
                {/* <th>Line</th> */}
                <th>Plant ID</th>
                <th>PO Number</th>
                <th>Amount</th>
                <th>GRN Number</th>
                <th>GRN Year</th>
                <th>GRN Ref Number</th>
  
              </thead>
              <tbody>
                      { modalDataStatus ?(
                  currentPosts.map((posData, index) => {
                    return (
                      <tr>
                        {/* <td>
                          {(posData.LINE).toString()}
                        </td> */}
                        <td  key={`col-1` + index}>
                          {posData.PLANT_ID}
                        </td>
                        <td  key={`col-2` + index}>
                          {posData.PO_NO.toString()}
                        </td>
                        <td  key={`col-3` + index}>
                          {'₹ ' + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(posData.AMOUNT)}
                        </td>
                        <td  key={`col-4` + index}>
                          {posData.GRN_NO.toString()}
                        </td>
                        <td  key={`col-5` + index}>
                          {posData.GRN_YEAR}
                        </td>
                        <td  key={`col-6` + index}>
                          {posData.GRN_REF.toString()}
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
            <Pagination postPerPage={postsPerPage} totalPosts={ClickedInvoiceDataArr.length} paginate={paginate} />
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

export default InvoiceDisplay