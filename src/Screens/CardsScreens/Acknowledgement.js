import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import DateRangePicker from 'rsuite/DateRangePicker'
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate } from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload,AiOutlineArrowDown ,AiOutlineArrowUp, AiOutlineEdit, AiFillFilePdf} from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';

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
      { label: "Price/Unit", key: "NET_PRICE" },
      { label: "Delevered Quantity", key: "DELIVERED_QUANTITY" },
      { label: "Pending Quantity", key: "PENDING_QUANTITY" },
      { label: "Order Quantity", key: "ORDER_QUANTITY" },
    ];
  
  
    const data = ClickedPOsDataArr;
    const vendorId = localStorage.getItem('userId');
    console.log("vendorIdvendorId", vendorId);
    const [tbody, setTBody] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
    const [emptyModalTable, setEmptyModalTable] = useState([]);
    const [aCKVALValue,setACKVALValue]=useState("")
    useEffect(() => {
        const fetchData = async () => {
          axios.get(AxioxExpPort + "purchase_order/po_data?id=" + vendorId)
            .then((response) => {
              setTBody(response.data);
              setFilterdata(response.data);
              console.log("response.data", response.data);
            })
        }
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
        if(searchDatas.length ==0){
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

    const[poValue,setPOValue]=useState("")
    const handleCheck = (id) => {
      const updatedData = currentPosts.map((row,index) => {
        if (index === id) {
          return { ...row, IS_CHECKED:!row.IS_CHECKED };
        }
        return row;
      });
      console.log("updatedData",updatedData)
      
      setEmptyModalTable(updatedData);
      setClickedPOsDataArr(updatedData);
    };
    let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });

    var tolto=[]
    console.log("totalValue",tolto)
    const saveCheck=()=>{
      console.log("smk",currentPosts);
      var ITEM_CATEGORY=[];
      var MATERIAL=[];
      var MATERIALDES=[];
      var ORDER_QUANTITY=[];
      currentPosts.map(tempIt=>{
        if(tempIt.IS_CHECKED){
          ITEM_CATEGORY.push(tempIt.ITEM_CATEGORY);
          MATERIAL.push(tempIt.MATERIAL);
          MATERIALDES.push(tempIt.MATERIAL_DESCRIPTION);
          ORDER_QUANTITY.push(tempIt.ORDER_QUANTITY);
        }
      })
      axios.post(AxioxExpPort + "acknowledge/insert", {
         "ITEM_CATEGORY":ITEM_CATEGORY,
        "PO_NO":poValue,
        "MATERIAL":MATERIAL,
        "MATERIAL_DESCRIPTION":MATERIALDES,
         "ORDER_QUANTITY":ORDER_QUANTITY
      })
        .then((res) => {
          window.location.reload();
          console.log('resres',res);
        })
        .catch((err) => { console.log(err) });
    }
    const [ackData,setACKData]=useState([])
    const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
    const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
    const paginate = pageNumber => setCurrentPage(pageNumber)
  return (
    <>
    <NavHeader />  <NavHeader />
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
                   Acknowledgement
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

            <div className="col-md-1">
              <button type="button" style={{ width: "50px", height: 35, borderRadius: 5 }} onClick={handelAllPO}>All</button>

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
                <th onClick={() => sorting("PO_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">PO Number</th>
                <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Date{showArrow?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Quantity</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Item</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Net Value*</th>
                <th onClick={() => sorting("ACKNOWLEDGE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>

                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((po, index) => {
                  let total = 0
                  po.purchase_order.map((price,idx) => {
                    total = total + price.NET_PRICE * price.ORDER_QUANTITY
                  });
                  let totalsQty = 0
                  po.purchase_order.map((price,idx) => {

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
                          fontWeight:"bold"
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
                        {po.ACKNOWLEDGE == 1?
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
                            setACKData(po.acknowledge_detail)

                          }}
                            />
                          </IconContext.Provider>
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
           {aCKVALValue==1?
null:
           <>
           <button className="btn btn-secondary dropdown-toggle" type="button"  data-bs-toggle="dropdown" aria-expanded="false" style={{
              float: "right",
            height: 35,
            }}>
    Action
  </button>
  <ul class="dropdown-menu">
    <li><a type="button" class="dropdown-item" style={{color:"blue"}} onClick={saveCheck}>Save Check</a></li>
    {/* <li><a type="button" class="dropdown-item" style={{color:"green"}} disabled >Approve All</a></li>
    <li><a type="button" class="dropdown-item" style={{color:"red"}} disabled>Reject All</a></li> */}
  </ul></>
           }
            
           
            </div>

            <div className="col-md-3 noPrint">
              <input
                type="text"
                className="form-control"

                placeholder="Material No / Description"
                style={{
                  width: "100%",
                  height: 35,
                  marginBottom:3
                }}
                onChange={(e) => {
                  handleSearchModal(e)
                }}
              />
            </div>
            {/* <div className="col-md-1">
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

              
            </div> */}
          </div>

          <table className="table table-bordered ">
            {aCKVALValue==1?
              <>
            <thead>
           
          
              <th>Material Description</th>
              <th>Material No</th>
              <th>Item Category</th>
              <th>Order Quantity</th>

            </thead>
            <tbody>
                    { modalDataStatus ?(

                      ackData.map((posData, index) => {
                
                        
                  return (
                    <tr key={index}>
                      <td key={`col-22` + index}>
                        {posData.MATERIAL_DESCRIPTION}
                      </td>
                      <td key={`col-23` + index}>
                        {(posData.MATERIAL).toString()}
                      </td>
                     
                      <td key={`col-24` + index}>
                        {posData.ITEM_CATEGORY}
                      </td>
                      <td key={`col-25` + index}
                      style={{
                        width:"10%"
                      }}
                      >
                      {aCKVALValue==1?
                     posData.ORDER_QUANTITY:
                      <input
            type="number"
            value={posData.ORDER_QUANTITY}
            readOnly={!posData.IS_CHECKED}
            min={0}  
            onChange={(e) => {
              
              const newValue = Number(e.target.value);
              const updatedData = currentPosts.map((r,inx) => {
                if (inx === index) {
                  return { ...r, ORDER_QUANTITY: newValue };
                }
                return r;
              });
              
              setEmptyModalTable(updatedData);
              setClickedPOsDataArr(updatedData);
            }}
          />

                      }
                      
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
            </>:
            <>
            <thead>
            <th style={{ width: "5%"}}>Select</th>
          
              <th>Material Description</th>
              <th>Material No</th>
              <th>Price/Unit</th>
              <th>Order Quantity</th>

            </thead>
            <tbody>
                    { modalDataStatus ?(

                currentPosts.map((posData, index) => {
                
                        if(posData.IS_CHECKED=="false"){
                         posData.IS_CHECKED=false
                        }
                        var total=0;
    
                        tolto.push(posData.ORDER_QUANTITY * posData.NET_PRICE)
       
       
                       

                        
                  return (
                    <tr key={index}>
                 {aCKVALValue==1?

       null
               :
              
               <td key={`col-21` + index} className="text-center" >
               <input type="checkbox"
value="0"
checked={posData.IS_CHECKED}
 onChange={() => handleCheck(index)}
/>
</td>
                 }
                      
                      <td key={`col-22` + index}>
                        {posData.MATERIAL_DESCRIPTION}
                      </td>
                      <td key={`col-23` + index}>
                        {(posData.MATERIAL).toString()}
                      </td>
                     
                      <td key={`col-24` + index}>
                        {num.format(Number(posData.NET_PRICE))}
                      </td>
                      <td key={`col-25` + index}
                      style={{
                        width:"10%"
                      }}
                      >
                      {aCKVALValue==1?
                     posData.ORDER_QUANTITY:
                      <input
            type="number"
            value={posData.ORDER_QUANTITY}
            readOnly={!posData.IS_CHECKED}
            min={0}  
            onChange={(e) => {
              
              const newValue = Number(e.target.value);
              const updatedData = currentPosts.map((r,inx) => {
                if (inx === index) {
                  return { ...r, ORDER_QUANTITY: newValue };
                }
                return r;
              });
              
              setEmptyModalTable(updatedData);
              setClickedPOsDataArr(updatedData);
            }}
          />

                      }
                      
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
            </>
            }
          </table>
          <div className="row">
            <div className="col-md-6">

          <Pagination postPerPage={postsPerPage} totalPosts={ClickedPOsDataArr.length} paginate={paginate} />
            </div>
            <div className="col-md-6">
            {aCKVALValue==1?null:
            <a
              className="navbar-brand text-end"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
              }}
             
            >
             <span style={{color:COLORS.gray60}}>Total Price*= </span>{
              num.format(Number(tolto.reduce((partialSum, a) => partialSum + a, 0)))
            }
            </a>
            }
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
      
    
    </>
  )
}

export default Acknowledgement