import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate,Link } from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload,AiOutlineArrowDown,AiOutlineArrowUp, AiFillFilePdf, AiOutlineHome, AiOutlineEdit } from "react-icons/ai";
import { IconContext } from "react-icons";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
import DateRangePicker from "rsuite/esm/DateRangePicker";
import { BsHash } from "react-icons/bs";
import { AiFillAccountBook, AiFillReconciliation, AiOutlineWallet } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";
const RoleManagement = () => {
    const navigate = useNavigate();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [sort, setSort] = useState("ASC");
  const [modalDataStatus, setModalDataStatus] = useState(true);
  const [clickGRData, setClickGRData] = useState([]);
  const headers = [
    { label: "Material Number", key: "MATERIAL_NO" },
    { label: "Material Description", key: "MATERIAL_TEXT" },
    { label: "GRN Number", key: "GRN_NO" },
    { label: "Return Quantity", key: "RETURN_QTY" },
    { label: "Unit", key: "UNIT" },
    { label: "PO Quantity", key: "PO_QTY" },
  ];
  const [tbody, setTBody] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [filterData, setFilterData] = useState([])
  const currentPosts = clickGRData.slice(indexOfFirstPost, indexOfLastPost)
  const [emptyModalTable, setEmptyModalTable] = useState([]);
  const vendorId = localStorage.getItem('userId');
  const [poNumber,setPoNumber]=useState("")
  const [businessRole, setBusinessRole] = useState("");
  const [roleDesc,setRoleDesc]=useState([])

  const fetchData = async () => {
    axios.get(AxioxExpPort + "good_return/get?id=" + vendorId)
      .then((response) => {
        setTBody(response.data);
        setFilterData(response.data)
        console.log("response.data", response.data);
      })
      axios.get(AxioxExpPort + "industry/all")
      .then((response) => {
        setRoleDesc(response.data);

      })
  }
  useEffect(() => {
    fetchData();
  }, []);
  const[showArrow,setShowArrow]=useState(false)
  const[showArrowDOC,setShowArrowDOC]=useState(false)

  const sorting = (col) => {
    if (sort === "ASC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTBody(sorted);
      setSort("DSC");
      setShowArrow(!showArrow);
      console.log("response.data", tbody);
    }
    if (sort === "DSC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setShowArrow(!showArrow);
      setTBody(sorted);
      setSort("ASC")
    }

  }
  const sortingDOC = (col) => {
    if (sort === "ASC") {
      const sorted = [...tbody].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTBody(sorted);
      setSort("DSC");
      setShowArrowDOC(!showArrowDOC);
      console.log("response.data", tbody);
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
  // const getTwodates = (e) => {
  //   if (e != null) {
  //     var s = e[0];
  //     var e = e[1];
  //     var arr = [];
  //     for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
  //       var dateElement = dateFormat((new Date(d)), "ddd, mmm dS,yyyy").toLowerCase()
  //       const searchDatasss = tbody.filter((item) => dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(dateElement));
  //       searchDatasss.map((itemss) => {
  //         arr.push(itemss)
  //       })
  //     } setTBody(arr);
  //     if (arr.length == 0) {
  //       setIsPurchaseOrderEmpty(false)
  //     }
  //   } else {
  //     setIsPurchaseOrderEmpty(true)
  //     setTBody(filterData)
  //   }
  // }
  const handleSearchModal = (event) => {
    var searchElements = event.target.value;
    // setQuery(searchElements);
    var length = Number(searchElements.length)
    console.log("lengthlength", emptyModalTable)
    if (length > 0) {
      // setTBody('')
      const searchDatas = clickGRData.filter((item) => item.MATERIAL_TEXT.toLowerCase().includes(searchElements) || item.MATERIAL_NO.toLowerCase().includes(searchElements));
      console.log("searchElements.length", searchDatas);
      setClickGRData(searchDatas);
      if(searchDatas.length ==0){
        setModalDataStatus(false)
      }
    } else {
      setModalDataStatus(true)
      setClickGRData(emptyModalTable)
    }
  }
  const handleSearch = (event) => {
    var searchElements = event.target.value;
    console.log(searchElements);
    if (searchElements.length > 0) {
      const searchDatas = tbody.filter((item) => (item.GRN_NO).toString().includes(searchElements));
      setTBody(searchDatas)
      console.log(searchDatas)
      if (searchDatas.length == 0) {
        setIsPurchaseOrderEmpty(false)
      }
    } else {
      setIsPurchaseOrderEmpty(true)
      setTBody(filterData)
    }

  }


  var tempArray=[];
  tbody.map(csvItems=>{
    var tempDAte=dateFormat(csvItems.DOCUMENT_DATE, "dd/mm/yyyy");
    var POSTDAte=dateFormat(csvItems.POSTING_DATE, "dd/mm/yyyy");
    let total = 0;
    csvItems.return_order.map((itemsPrice) =>
                    total = total + itemsPrice.PER_UNIT_PRICE * itemsPrice.RETURN_QTY )
    let totalsQty = 0
    csvItems.return_order.map((price) => {
      totalsQty = totalsQty + Number(price.RETURN_QTY)
    });
    tempArray.push({
      "id":csvItems._id,
      "GR_NO":csvItems.GRN_NO,
      "PO_NO":csvItems.return_order[0].PO_NO,
      "COMPANY_CODE":csvItems.COMPANY_CODE,
      "POST_DATE":POSTDAte,
      "DOC_DATE":tempDAte,
      "PLANT":csvItems.PLANT_ID+"("+csvItems.PLANT_DESCRIPTION+")",
      "RETURN_QTY":totalsQty,
      "TOTAL_ITEM":csvItems.return_order.length,
      "TOTAL_VAL":total

    })
  })

  const headersTempArray=[
    { label: "GR Number", key: "GR_NO" },
    { label: "PO Number", key: "PO_NO" },
    { label: "Company Code", key: "COMPANY_CODE" },
    { label: "Posting Date", key: "POST_DATE" },
    { label: "Document Date", key: "DOC_DATE" },
    { label: "Plant", key: "PLANT" },
    { label: "Return Quanty", key: "RETURN_QTY" },
    { label: "Total Item", key: "TOTAL_ITEM" },
    { label: "Total Net Value*", key: "TOTAL_VAL" }
  ]
  console.log("csvArray",tempArray);
  const printData=()=>{
    window.print()
  }
  const handelAllGR =()=>{
    setIsPurchaseOrderEmpty(true)
    setTBody(filterData);
   }
  const data = clickGRData;
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  const [showPODetailsFlagAssign, setShowPODetailsFlagAssign] = useState(false);
  const togglePODetailsFlagAssign = () => setShowPODetailsFlagAssign(!showPODetailsFlagAssign);
  const paginate = pageNumber => setCurrentPage(pageNumber)
  let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });

  return (
    <div>
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

              
              <div style={{ display: 'flex', alignItems: 'center' }}>
<h4 className="form-check-label">
Buyer Supplier Management
</h4>
{/* <button  style={{
  marginLeft: '10px',
  padding: '7px 14px',
  backgroundColor:"#4F51C0",
  color: '#fff',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
}} onClick={() => { window.history.go(-1) }}>Go Back</button> */}
</div>
            </div>
            <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
              
                <IconContext.Provider value={{ color: "#3a91e8", size: "22px" }}>
                  <AiOutlineHome  type="button"  onClick={() => {
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
        <div className="card" style={{marginTop:10}}>
        <div className="card-body">
        <div className="row">

        <div className="col-md-2 noPrint">
        <button type="button" style={{ width: "45%", height: 35 ,borderRadius:5 }} onClick={handelAllGR}>Show All</button>{" "}
        <button className="btn-info"  style={{ width: "45%", height: 35 ,borderRadius:5 }} onClick={(e) => {togglePODetailsFlagAssign()}}>Assign +</button>{" "}

        </div>
        <div className="col-md-5 noPrint">

        </div>
        <div className="col-md-2 noPrint">
          {/* <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodates(e) }} placeholder="Search Document Date Range" /> */}


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
              handleSearch(e)
            }}
          />
        </div>
        <div className="col-md-1 noPrint">
        <CSVLink  filename={"GR:"+vendorId+".csv"}  data={tempArray}  headers={headersTempArray} ><button type="button" style={{ width: "47%", backgroundColor:"#4F51C0", height: 33, borderRadius: 5 }} ><FaFileCsv size={20} style={{color:"white"}}/></button></CSVLink>{" "}
    <button onClick={printData} type="button" style={{ width: "47%", height: 33,backgroundColor:"#4F51C0", borderRadius: 5 }} > <AiFillFilePdf style={{color:"white"}} size={20}/></button>{" "} 

        </div>

      
      </div>


   
    <p className="text-right" >*Exc GST</p>
      <table className="table table-light table-bordered table-hover">
        <thead className="table-light">
          <tr
            className="text-center"
            style={{
              backgroundColor: COLORS.gray20,
              borderColor: COLORS.gray10,
            }}
          >
            <th onClick={() => sorting("GRN_NO")} className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Buyer</th>
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Supplier</th>
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* {isPurchaseOrderEmpty ? (
            tbody.map((val, index) => {
              let total = 0;
              val.return_order.map((itemsPrice) =>
                total = total + itemsPrice.PER_UNIT_PRICE * itemsPrice.RETURN_QTY
              )
              let totalQtuy = 0;
              val.return_order.map((itemsPrices) =>
              totalQtuy = totalQtuy + itemsPrices.RETURN_QTY
              )
              return ( */}
                <tr
                  key={`row`}
                  style={{
                    backgroundColor: "white",
                    borderColor: "#000",
                  }}
                  className="table-light"
                >
                  {/* <td
                    key={`col-1` + index}
                    className="text-center"
                    style={{ width: "10%", borderColor: COLORS.gray10 }}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        togglePODetailsFlag();
                        setPoNumber(val.GRN_NO)
                        setClickGRData(val.return_order)
                        setEmptyModalTable(val.return_order)
                      }}
                    >
                      {(val.GRN_NO)}
                    </a>
                    <br />
                  </td> */}
                  <td className="text-center">HEllo</td>
                  <td className="text-center">HEllo</td>
                  <td className="text-center">
                  <IconContext.Provider
                                  value={{ color: "#FF7B25", size: "22px" }}
                                >
                                  <AiOutlineEdit
                                    type="button"
                                    onClick={(e) => {
                                      togglePODetailsFlag();
                                    }}
                                  />
                                </IconContext.Provider>
                  </td>
                 
                </tr>
              {/* );
            })
          ) : (
            <tr>
              <td colSpan={15} className="text-center">
                No Data Found
              </td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  </div>
  </div>

  <Modal className="modal-dialog modal-content  card-info"
    isOpen={showPODetailsFlag}
    toggle={togglePODetailsFlag}
    size="md"
     style={{
       display: "flex",
       
     
     }}
  >

        <div className="card-header">
          <h3 className="card-title">Mapping Buyer Supplier</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            togglePODetailsFlag();
          }}>×</span>
          </button>
        </div>
       
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Buyer Name</label>
              <div className="col-sm-8">
                <input className="form-control" placeholder="Buyer Name" required />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Select Supplier</label>
              <div className="col-sm-8">
                <input className="form-control" name="role_description" placeholder="Role Description" required />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-info float-right">Create</button>
            <a onClick={() => {
            togglePODetailsFlag();
          }} className="btn btn-info" >Cancel</a>
          </div>
  </Modal>
  <Modal className="modal-dialog modal-content"
    isOpen={showPODetailsFlagAssign}
    toggle={togglePODetailsFlagAssign}
    size="md"
     style={{
       display: "flex",  
     }}
  >
        <div className="card-header">
          <h3 className="card-title">Assign new Supplier to Buyer</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            togglePODetailsFlagAssign();
          }}>×</span>
          </button>
        </div>
       
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Role</label>
              <div className="col-sm-8">
              <select className="form-control form-select" multiple={true} size={3} onChange={(e) => { setBusinessRole(Array.from(e.target.selectedOptions, option => option.value))}}>
                  <option disabled>--Select Business Roles--</option>
                  {roleDesc.map((val,index) => {
                    return (
                      <option key={index} value={val.INDUSTRY}>{val.DESCRIPTION}</option>
                    );
                  })}
              </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Buyer</label>
              <div className="col-sm-8">
                <input className="form-control" placeholder="Select Buyer" required />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Supplier</label>
              <div className="col-sm-8">
                <input className="form-control" name="role_description" placeholder="Select Suppliers" required />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-info float-right">Create</button>
            <a onClick={() => {
            togglePODetailsFlagAssign();
          }} className="btn btn-info" >Cancel</a>
          </div>
  </Modal>
</></div>
  )
}

export default RoleManagement