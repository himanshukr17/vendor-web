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
import { AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';

function PurchaseOrders() {
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
  console.log("vendorIdvendorId", vendorId)
  const [tbody, setTBody] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
  const [emptyModalTable, setEmptyModalTable] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      axios.get(AxioxExpPort + "purchase_order/get?id=" + vendorId)
        .then((response) => {
          setTBody(response.data);
          // console.log("response.data",response.data);

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
                <div className="col-md-5">

                  <h4 className="form-check-label" htmlFor="inlineRadio2">
                    {/* {location.PROJECT} */}
                    {/* {location.state.name} */}
                    Purchase Orders
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
          <p class="text-right" style={{ marginTop: "-30px" }}>*Exc GST</p>
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
                <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Document Date</th>
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Items</th>
                <th onClick={() => sorting("NET_PRICE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Net Value*</th>
                <th onClick={() => sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((po, index) => {
                  let total = 0
                  po.purchase_order.map((price) => {
                    total = total + price.NET_PRICE * price.ORDER_QUANTITY
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
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        <a style={{
                          textDecoration: 'none',

                        }}
                          href="#"
                          onClick={(e) => {
                            togglePODetailsFlag();
                            setClickedPOsDataArr(po.purchase_order);
                            setEmptyModalTable(po.purchase_order);

                          }}
                        >
                          {po.PO_NO}
                        </a>
                        <br />
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {dateFormat(po.DOCUMENT_DATE, "ddd, mmm dS, yyyy")}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {po.purchase_order.length}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {'₹ ' + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(total)}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {po.STATUS == 'Open' &&
                          <span className="badge badge-success" >Open</span>
                        }
                        {po.STATUS == 'Close' &&
                          <span className="badge badge-danger" >Close</span>
                        }
                      </td>
                      <td
                        key={`col-5` + index}
                        className="text-center"
                        style={{ marginwidth: "5%", borderColor: COLORS.gray10 }}
                      >
                        <CSVLink className="btn" data={po.purchase_order} headers={headers}
                        // setClickedPOsDataArr(val.purchase_order)
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
                <FaDownload /> <FaFileCsv size={22} />

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
              <th>Material No</th>
              <th>Material Description</th>
              <th>Item Category</th>
              <th>Price/Unit</th>
              <th>Delevered Quantity</th>
              <th>Pending Quantity</th>
              <th>Order Quantity</th>

            </thead>
            <tbody>
                    { modalDataStatus ?(
                currentPosts.map((posData, index) => {
                  return (
                    <tr>
                      <td>
                        {(posData.MATERIAL).toString()}
                      </td>
                      <td>
                        {posData.MATERIAL_DESCRIPTION}
                      </td>
                      <td>
                        {posData.ITEM_CATEGORY}
                      </td>
                      <td>
                        {'₹ ' + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(posData.NET_PRICE)}
                      </td>
                      <td>
                        {posData.DELIVERED_QUANTITY}
                      </td>
                      <td>
                        {posData.PENDING_QUANTITY}
                      </td>
                      <td>
                        {posData.ORDER_QUANTITY}
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

export default PurchaseOrders;

