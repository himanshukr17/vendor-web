import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileCsv, FaDownload } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
import DateRangePicker from "rsuite/esm/DateRangePicker";

const BuyerGoodsReturn=(props)=> {
  const navigate = useNavigate();
  const locationID=useLocation();
  const vendorId = locationID.state.myVendorID;
  const vendorName= locationID.state.myVendorName;

  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      axios.get(AxioxExpPort + "good_return/get?id=" + vendorId)
        .then((response) => {
          setTBody(response.data);
          setFilterData(response.data)
          console.log("response.data", response.data);
        }).catch((err) => { console.log("response.data.length",err.data);setIsPurchaseOrderEmpty(false)})
    }
    fetchData();
  }, []);
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
      const searchDatas = tbody.filter((item) => item.STATUS.toLowerCase().includes(searchElements) || dateFormat((item.DOCUMENT_DATE), "ddd, mmm dS,yyyy").toLowerCase().includes(searchElements) || (item.PO_NO).toString().toLowerCase().includes(searchElements));
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
  const handelAllGR =()=>{
    setIsPurchaseOrderEmpty(true)
    setTBody(filterData);
   }
  const data = clickGRData;
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
                      navigate("/mv");
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
                    Goods Return of {" "+ vendorName}
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

                placeholder="PO Number / Status"
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
            <button type="button" style={{ width: "50px", height: 35 ,borderRadius:5 }} onClick={handelAllGR}>All</button>

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
                <th onClick={() => sorting("PO_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">PO Number</th>
                <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Document Date</th>
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Net Value*</th>
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Items</th>
                <th onClick={() => sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((val, index) => {
                  let total = 0;
                  val.return_order.map((itemsPrice) =>
                    total = total + itemsPrice.PER_UNIT_PRICE * itemsPrice.PO_QTY
                  )

                  console.log("sdfjhjk", val)
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
                        <a
                         style={{
                          textDecoration: 'none',
                          color:"blue"
                        }}
                        type="button"
                          onClick={(e) => {
                            togglePODetailsFlag();

                            setClickGRData(val.return_order)
                            setEmptyModalTable(val.return_order)
                          }}
                        >
                          {(val.PO_NO)}
                        </a>
                        <br />
                      </td>
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {dateFormat(val.DOCUMENT_DATE, "ddd, mmm dS, yyyy")}
                      </td>

                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {'₹ ' + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(total)}
                      </td>
                      <td
                        key={`col-4` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.return_order.length}                      </td>
                      <td
                        key={`col-5` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.STATUS == 'Open' &&
                          <span className="badge badge-success" >Open</span>
                        }
                        {val.STATUS == 'Close' &&
                          <span className="badge badge-danger" >Close</span>
                        }
                      </td>
                      <td
                        key={`col-6` + index}
                        className="text-center"
                        style={{ width: "5%", borderColor: COLORS.gray10 }}
                      >
                        <CSVLink className="btn" data={val.return_order} headers={headers}>
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

      <Modal
        isOpen={showPODetailsFlag}
        toggle={togglePODetailsFlag}
        size="lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
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
                GR's Details
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

              <CSVLink className="btn float-right"
                onClick={() => {
                  togglePODetailsFlag();
                }}
                style={{
                  backgroundColor: COLORS.green,
                  color: COLORS.white,
                  padding:"6px",
                  height:35,
                  marginBottom:3,
                  marginLeft:"-15px"


                }} data={data} headers={headers} >
                ⬇ <FaFileCsv size={22} />

              </CSVLink>
            </div>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <th>Material Number</th>
              <th>Material Description</th>
              <th>GR Number</th>
              <th>Return Quantity</th>
              <th>Unit</th>
              <th>PO Quantity</th>
            </thead>
            <tbody>
              {modalDataStatus ? (
                currentPosts.map((grsData, index) => {
                  return (
                    <tr>
                      <td key={`row` + index}>
                        {grsData.MATERIAL_NO.toString()}
                      </td>

                      <td key={`col+1` + index}>
                        {grsData.MATERIAL_TEXT}
                      </td>
                      <td  key={`col+2` + index}>
                        {grsData.GRN_NO.toString()}
                      </td>
                      <td  key={`col+3` + index}>
                        {grsData.RETURN_QTY.toString()}
                      </td>
                      <td  key={`col+4` + index}>
                        {grsData.UNIT}
                      </td>
                      <td  key={`col+5` + index}>
                        {grsData.PO_QTY}
                      </td>
                    </tr>
                  );
                })
              )
              :(
                <tr>
                  <td colSpan={7} className="text-center">
                    No Data Found
                  </td>
                </tr>
              )
              }

            </tbody>
          </table>
          <Pagination postPerPage={postsPerPage} totalPosts={clickGRData.length} paginate={paginate} />
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
        </ModalBody>
      </Modal>
    </>
  );
}

export default BuyerGoodsReturn;
