import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import DateRangePicker from 'rsuite/DateRangePicker'
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate,Link } from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload, AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineEdit, AiFillFilePdf, AiOutlineHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';

import { AiFillAccountBook, AiFillReconciliation, AiOutlineWallet } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";
function Acknowledgement() {
  const navigate = useNavigate();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [modalDataStatus, setModalDataStatus] = useState(true);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
  const [sort, setSort] = useState("ASC");
  // const [query, setQuery]=useState("")
  const [filterData, setFilterdata] = useState([])
  const headers = [
    { label: "Material No", key: "MATERIAL" },
    { label: "Material Description", key: "MATERIAL_DESCRIPTION" },
    { label: "Item Category", key: "ITEM_CATEGORY" },
    { label: "Price/Unit", key: "PRICE_PER_UNIT" },
    { label: "Delevered Quantity", key: "DELIVERED_QUANTITY" },
    { label: "Pending Quantity", key: "PENDING_QUANTITY" },
    { label: "Order Quantity", key: "ORDER_QUANTITY" },
  ];
  const [toaster,setToaster]=useState("")
  const [toasterColor,setToasterColor]=useState("")
  const data = ClickedPOsDataArr;
  const vendorId = localStorage.getItem('userId');
  console.log("vendorIdvendorId", vendorId);
  const [showQuthInp, setShowQtyInp] = useState(false)
  const [tbody, setTBody] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
  const [emptyModalTable, setEmptyModalTable] = useState([]);
  const [aCKVALValue, setACKVALValue] = useState("")
  const [handleInputVals, setHandleInputVal] = useState("")
  const [handleInputValsss, setHandleInputValss] = useState("")
  const [checkRemark, setCheckRemark] = useState(false)
  const [remark, setRemark] = useState(false)
  const [showRemarks, setShowRemarks]=useState("") 
  const fetchData = async () => {
    axios.get(AxioxExpPort + "purchase_order/po_data?id=" + vendorId)
      .then((response) => {
        setTBody(response.data);
        setFilterdata(response.data);
        console.log("response.data", response.data);
      })
  }
  useEffect(() => {
    
    fetchData();
  }, []);
  const getTwodates = (e) => {
    if (e != null) {
      var s = e[0];
      var e = e[1];
      var arr = [];
      for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
        var dateElement = dateFormat((new Date(d)), "ddd, mmm dS,yyyy").toLowerCase()
        const searchDatasss = tbody.filter((item) => dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(dateElement));
        searchDatasss.map((itemss, index) => {
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
  const [showArrow, setShowArrow] = useState(false)
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
      const searchDatas = tbody.filter((item) => item.STATUS.toLowerCase().includes(searchElements) || dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(searchElements) || (item.PO_NO).toString().toLowerCase().includes(searchElements) || (item.purchase_order[0].PLANT_ID).toString().toLowerCase().includes(searchElements));
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
      if (searchDatas.length == 0) {
        setModalDataStatus(false)
      }
    } else {
      setModalDataStatus(true);
      setClickedPOsDataArr(emptyModalTable)
    }
  }
  const handelAllPO = () => {
    setIsPurchaseOrderEmpty(true);
    setTBody(filterData);
  }
  const [poValue, setPOValue] = useState("")
  const handleCheck = (id) => {
    const updatedData = currentPosts.map((row, index) => {
      if (index === id) {
        return { ...row, PREVIOUS_QTY: row.ORDER_QUANTITY, ORDER_QUANTITYss: row.ORDER_QUANTITY, IS_CHECKED: !row.IS_CHECKED };
      }
      return row;
    });
    console.log("updatedData", updatedData)

    setEmptyModalTable(updatedData);
    setClickedPOsDataArr(updatedData);
  };
  let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });
  var tolto = []
  var toltoACK = []
  console.log("totalValue", tolto)
  const saveCheck= () => {
    currentPosts.map(tempIt => {
      if (tempIt.IS_CHECKED) {
        togglePODetailsFlagACKRemark();
      }else{
        setToaster("You have not select any item")
        var xz = document.getElementById("snackbar");
        setToasterColor("red")
        xz.className = "show";
        setTimeout(function(){
           xz.className = xz.className.replace("show", ""); }, 3000)
      }
    })
   }
  const saveCheckRemark = () => {
// alert("dmb")
     var ITEM_CATEGORY = [];
     var MATERIAL = [];
     var MATERIALDES = [];
     var ORDER_QUANTITY = [];
     
     currentPosts.map(tempIt => {
       if (tempIt.IS_CHECKED) {
         ITEM_CATEGORY.push(tempIt.ITEM_CATEGORY);
         MATERIAL.push(tempIt.MATERIAL);
         MATERIALDES.push(tempIt.MATERIAL_DESCRIPTION);
         ORDER_QUANTITY.push(tempIt.ORDER_QUANTITYss);
        
       }
     })
     if (handleInputValsss.length > 0) {
       setCheckRemark(false)
       axios.post(AxioxExpPort + "acknowledge/insert", {
         "ITEM_CATEGORY": ITEM_CATEGORY,
         "PO_NO": poValue,
         "MATERIAL": MATERIAL,
         "MATERIAL_DESCRIPTION": MATERIALDES,
         "ORDER_QUANTITY": ORDER_QUANTITY,
         "remarks": handleInputValsss
       })
         .then((res) => {
          fetchData();togglePODetailsFlagACKRemark();
          togglePODetailsFlagACK();
          setToaster("Order is approved and acknowledge")
        var xz = document.getElementById("snackbar");
        setToasterColor("green")
        xz.className = "show";
        setTimeout(function(){
           xz.className = xz.className.replace("show", ""); }, 3000)
         })
         .catch((err) => { console.log(err) });
     } else {
      setRemark(true);
       setCheckRemark(true)
     }
  }
  const [ackData, setACKData] = useState([])
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  const [showPODetailsFlagACK, setShowPODetailsFlagACK] = useState(false);
  const togglePODetailsFlagACK = () => setShowPODetailsFlagACK(!showPODetailsFlagACK);
  const [showPODetailsFlagACKRemark, setshowPODetailsFlagACKRemark] = useState(false);
  const togglePODetailsFlagACKRemark = () => setshowPODetailsFlagACKRemark(!showPODetailsFlagACKRemark);
  const paginate = pageNumber => setCurrentPage(pageNumber)
  return (
    <>
      <NavHeader />
      <div id="snackbar" style={{backgroundColor:toasterColor, borderRadius:"50px"}}>{toaster}</div>

      <div
        className="card-body"
        style={{
          marginTop: "4%",
        }}
      >
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="row" style={{ marginBottom: 10 }}>
                <div className="col-md-10">
               
                  <div style={{ display: 'flex', alignItems: 'center' }}>
  <h4 className="form-check-label">
  Acknowledgement
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
                <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>
                  <IconContext.Provider value={{ color: "red", size: "22px" }}>
                    <AiOutlineHome type="button" onClick={() => {
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
      <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"#4FB06D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Invoice Booked   </a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"pink"}    size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Invoice Pending  </a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/grs"><BsFillCartXFill      color={"#53BDAS"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Goods Return     </a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/mcs"><FaFileContract       color={"#BE398D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> My Documents     </a></Link></li> </ul>  </div>

              </div>
            </div>
            <div className="card" style={{ marginTop: 10 }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-1">
                    <button type="button" style={{ width: "100%", height: 35, borderRadius: 5 }} onClick={handelAllPO}>Show All</button>
                  </div>
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-3">
                    <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodates(e) }} placeholder="Search Date Range" />
                  </div>
                  <div className="col-md-2">
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
                      <th onClick={() => sorting("PO_NO")} className="text-center" style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }} scope="col">PO Number</th>
                      <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }} scope="col">Date{showArrow ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}</th>
                      <th className="text-center" style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }} scope="col">Total Quantity</th>
                      <th className="text-center" style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }} scope="col">Item Count</th>
                      <th className="text-center" style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }} scope="col">Total Net Value*</th>
                      <th onClick={() => sorting("ACKNOWLEDGE")} className="text-center" style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }} scope="col">Status</th>
                      <th className="text-center" style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }} scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isPurchaseOrderEmpty ? (
                      tbody.map((po, index) => {
                        let total = 0
                        po.purchase_order.map((price, idx) => {
                          total = total + price.PRICE_PER_UNIT * price.ORDER_QUANTITY
                        });
                        let totalsQty = 0
                        po.purchase_order.map((price, idx) => {
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
                              style={{ width: "5%", borderColor: COLORS.gray10 }}
                            >
                              <a style={{
                                textDecoration: 'none',
                                fontWeight: "bold"
                              }}

                              >
                                {po.PO_NO}
                              </a>
                              <br />
                            </td>
                            <td
                              key={`col-2` + index}
                              className="text-center"
                              style={{ width: "5%", borderColor: COLORS.gray10 }}
                            >
                              {dateFormat(po.DOCUMENT_DATE, "dd/mm/yyyy")}
                            </td>
                            <td
                              key={`col-2` + index}
                              className="text-center"
                              style={{ width: "5%", borderColor: COLORS.gray10 }}
                            >
                              {totalsQty}
                            </td>
                            <td
                              key={`col-2` + index}
                              className="text-center"
                              style={{ width: "5%", borderColor: COLORS.gray10 }}
                            >
                              {po.purchase_order.length}
                            </td>
                            <td
                              key={`col-2` + index}
                              className="text-center"
                              style={{ width: "5%", borderColor: COLORS.gray10 }}
                            >
                              {num.format(Number(total))}
                            </td>
                            <td
                              key={`col-2` + index}
                              className="text-center"
                              style={{ width: "5%", borderColor: COLORS.gray10 }}
                            >
                              {po.ACKNOWLEDGE == 1 ?
                                <span className="badge badge-success" >Acknowledge</span>
                                :
                                <span className="badge badge-warning" >Not Acknowledge</span>
                              }
                            </td>
                            <td
                              key={`col-13` + index}
                              className="text-center"
                              style={{ marginwidth: "5%", borderColor: COLORS.gray10 }}
                            >
                              {/* <CSVLink className="btn" data={po.Details} headers={headers}
                        // setClickedPOsDataArr(val.Details)
                        //  laery
                        > */}
                              {po.ACKNOWLEDGE == 1 ?
                                <IconContext.Provider
                                  value={{ color: "green", size: "22px" }}
                                >
                                  <AiOutlineEdit
                                    type="button"
                                    onClick={(e) => {
                                      togglePODetailsFlagACK();
                                      setACKData(po.acknowledge_detail)
                                      setShowRemarks(po.REMARKS);

                                    }}
                                  />
                                </IconContext.Provider>
                                :
                                <IconContext.Provider
                                  value={{ color: "#FF7B25", size: "22px" }}
                                >
                                  <AiOutlineEdit
                                    type="button"
                                    onClick={(e) => {
                                      togglePODetailsFlag();
                                      setClickedPOsDataArr(po.purchase_order);
                                      setEmptyModalTable(po.purchase_order);
                                      setPOValue(po.PO_NO)
                                      setACKVALValue(po.ACKNOWLEDGE)

                                    }}
                                  />
                                </IconContext.Provider>
                              }


                              {/* </CSVLink> */}
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
            <div className="col-md-7">
              <h5 className="modal-title " id="exampleModalLabel">
                Order Details
              </h5>
            </div>
            <div className="col-md-2 text-end noPrint">
              <button type="button" title="Submit and acknowledge" onClick={saveCheck} style={{ width: "80%", height: 35, borderWidth: 3, fontFamily: "serif", borderRadius: 5, color: "#4F51C0", borderColor: "#4F51C0" }}>Acknowledge</button>
              {/* <>
           <button className="btn btn-secondary dropdown-toggle" type="button"  data-bs-toggle="dropdown" aria-expanded="false" style={{
              float: "right",
            height: 35,
            }}>
    Action
  </button>
  <ul class="dropdown-menu">
    <li><a type="button" class="dropdown-item" style={{color:"blue"}} onClick={saveCheck}>Save Check</a></li>
    <li><a type="button" class="dropdown-item" style={{color:"green"}} disabled >Approve All</a></li>
    <li><a type="button" class="dropdown-item" style={{color:"red"}} disabled>Reject All</a></li> 
  </ul></> */}
            </div>
            <div className="col-md-3 noPrint">
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
                  handleSearchModal(e)
                }}
              />
            </div>
          </div>
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", textAlign: "center", color: "white", borderColor: COLORS.gray10 }}>Select</th>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Material Description</th>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Material No</th>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Price/Unit</th>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Order Quantity</th>
                {/* <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Remark*</th> */}
              </tr>
            </thead>
            <tbody>
              {modalDataStatus ? (
                currentPosts.map((posData, index) => {

                  if (posData.IS_CHECKED == "false") {
                    posData.IS_CHECKED = false
                  }
                  var total = 0;
                  toltoACK.push(Number(posData.ORDER_QUANTITYss = posData.ORDER_QUANTITYss || 0) * posData.PRICE_PER_UNIT)
                  tolto.push(posData.ORDER_QUANTITY * posData.PRICE_PER_UNIT)
                  console.log("tolto", toltoACK)
                  {/* console.log("toltoACK",toltoACK)
                        Array.prototype.splice.apply(toltoACK, [0, tolto.length].concat(tolto)); */}
                  return (
                    <tr key={index}>
                      <td key={`col-21` + index} className="text-center" >
                        <input type="checkbox"
                          value="0"
                          checked={posData.IS_CHECKED}
                          onChange={() => { handleCheck(index); setShowQtyInp(true); setHandleInputVal(posData.ORDER_QUANTITY) }}
                        />
                      </td>

                      <td key={`col-22` + index}>
                        {posData.MATERIAL_DESCRIPTION}
                      </td>
                      <td key={`col-23` + index}>
                        {(posData.MATERIAL).toString()}
                      </td>
                      <td key={`col-24` + index}>
                        {num.format(Number(posData.PRICE_PER_UNIT))}
                      </td>
                      <td key={`col-25` + index}
                        style={{
                          width: "5%"
                        }}
                      >
                        {
                          posData.IS_CHECKED ?

                            <input
                              className="form-control"
                              type="number"
                              value={posData.ORDER_QUANTITYss}
                              readOnly={!posData.IS_CHECKED}
                              min={0}
                              placeholder={posData.ORDER_QUANTITY}
                              max={posData.PREVIOUS_QTY}
                              onChange={(e) => {
                                console.log("posData", posData)
                                const newValue = Number(e.target.value);
                                const updatedData = currentPosts.map((r, inx) => {
                                  if (inx === index) {
                                    return { ...r, PREVIOUS_QTY: posData.ORDER_QUANTITY, ORDER_QUANTITYss: newValue };
                                  }
                                  return r;
                                });
                                setEmptyModalTable(updatedData);
                                setClickedPOsDataArr(updatedData);
                              }}
                            /> :
                            posData.ORDER_QUANTITY
                        }
                      </td>
                      {/* {
                        posData.IS_CHECKED &&
                        <td>

                          <input className="form-control" placeholder="Remark " style={{ width: "100%" }} onChange={(e) => {
                            setHandleInputValss(e.target.value);
                            setCheckRemark(true)
                            const remark = e.target.value;
                            console.log("remark", remark)
                            const updatedData = currentPosts.map((r, inx) => {
                              if (inx === index) {
                                return { ...r, ACK_REMARK: remark };
                              }
                              return r;
                            });
                            setEmptyModalTable(updatedData);
                            setClickedPOsDataArr(updatedData);
                          }} />
                        </td>
                      } */}
                    </tr>
                  )
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
            
            <div className="col-md-6">
              <Pagination postPerPage={postsPerPage} totalPosts={ClickedPOsDataArr.length} paginate={paginate} />
            </div>
            <div className="col-md-2">
            </div>
            <div className="col-md-4">
              <a
                className="navbar-brand text-end"
                type="button"
                style={{
                  color: "#007bff",
                  float: "right",
                  fontSize: 15
                }}
              >
                <span style={{ color: COLORS.gray60 }}>Total Price*= </span>
                {
                  num.format(Number(tolto.reduce((partialSum, a) => partialSum + a, 0)))
                }
              </a>
              <a
                className="navbar-brand text-end"
                type="button"
                style={{
                  color: "#007bff",
                  float: "right",
                  fontSize: 15
                }}
              >
                <span style={{ color: COLORS.gray60 }}>Acknowledge Price*= </span>
                {
                  num.format(Number(toltoACK.reduce((partialSum, a) => partialSum + a, 0)))
                }
              </a>
            </div>
          </div>
          <div className="modal-footer noPrint">
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
      <Modal size="lg"
        isOpen={showPODetailsFlagACK}
        toggle={togglePODetailsFlagACK}
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
            <div className="col-md-7">
              <h5 className="modal-title " id="exampleModalLabel">
                Order Details
              </h5>
            </div>
            <div className="col-md-2 text-end noPrint">
            </div>
            <div className="col-md-3 noPrint">
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
                  handleSearchModal(e)
                }}
              />
            </div>
          </div>
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Material Description</th>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Material No</th>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Order Quantity</th>
                <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Acknowledge Quantity</th>
                {/* <th style={{ width: "5%", backgroundColor: "#4F51C0", color: "white", borderColor: COLORS.gray10 }}>Remark</th> */}
              </tr>
            </thead>
            <tbody>
              {ackData.map((posData, index) => {
                return (
                  <tr key={index}>
                    <td key={`col-22` + index}>
                      {posData.MATERIAL_DESCRIPTION}
                    </td>
                    <td key={`col-23` + index}>
                      {(posData.MATERIAL).toString()}
                    </td>
                    <td key={`col-25` + index}
                      style={{
                        width: "5%"
                      }}
                    >
                      {posData.ORDER_QUANTITY}
                    </td>
                    <td key={`col-25` + index}
                      style={{
                        width: "5%"
                      }}
                    >
                      {posData.ACKNOWLEDGE_QUANTITY}
                    </td>
                    {/* <td key={`col-25` + index}
                      style={{
                        width: "5%"
                      }}
                    >
                      {posData.REMARKS}
                    </td> */}
                  </tr>
                )
              })
              }
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-12">
              <Pagination postPerPage={postsPerPage} totalPosts={ClickedPOsDataArr.length} paginate={paginate} />
            </div>
            <div className="col-md-12">
              <a
                className="navbar-brand "
                type="button"
                style={{
                  color: "#007bff",
                  float: "right",
                }}

              >
              Remarks: 
              <p style={{color:COLORS.gray60, float:"right"}}>{" "+showRemarks}</p>
              </a>
            </div>
          </div>
          <div className="modal-footer noPrint">
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
                togglePODetailsFlagACK();
              }}
            >
              Close
            </a>
          </div>
        </ModalBody>
      </Modal>

      <Modal size="sm"
        isOpen={showPODetailsFlagACKRemark}
        toggle={togglePODetailsFlagACKRemark}
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <ModalBody
          style={{
            marginTop: 0,
          }}
        >
        <lavel> Please write your remarks</lavel><br/>
         <textarea className="form-control" placeholder="Remark* " style={{ width: "100%", marginTop:10 }} onChange={(e) => {
                            setHandleInputValss(e.target.value);
                           
                                                       
                          }} />
                          {
              checkRemark &&
              <a
               
                style={{
                 
                  fontSize: 10,
                 
                }}
              >
                <span style={{ color: "red" }}>*Please fill remark field</span>
              </a>
            }
          <div className="noPrint " style={{height:"50%"}}>
          
          <button className="float-right" type="button" title="Submit and acknowledge" onClick={saveCheckRemark} style={{ width: "50%", height: 35, borderWidth: 3,marginTop:10,marginBottom:-5, fontFamily: "serif", borderRadius: 5, color: "green", borderColor: "green" }}>Approve</button>

           
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default Acknowledgement