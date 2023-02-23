import React, { useState, useEffect } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import {
  AiOutlineArrowLeft,AiOutlineArrowDown,AiOutlineArrowUp
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
import DateRangePicker from "rsuite/esm/DateRangePicker";
function Receiveables() {
  const navigate = useNavigate();
  const [clickRecData, setClickRecvData] = useState([]);
  const data = clickRecData;
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [modalDataStatus, setModalDataStatus] = useState(true);
  const [filterData, setFilterdata] = useState([])
  const [tbody, setTBody] = useState([]);
  const vendorId = localStorage.getItem('userId');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [sort, setSort] = useState("ASC");
  const [emptyModalTable, setEmptyModalTable] = useState([]);

  const currentPosts = clickRecData.slice(indexOfFirstPost, indexOfLastPost)
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" }
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
                <div className="col-md-7">

                  <h4 className="form-check-label" htmlFor="inlineRadio2">
                    {/* {location.PROJECT} */}
                    {/* {location.state.name} */}
                    Goods Receipt Notes/Number            </h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <DateRangePicker style={{ display: 'flex', width: "100%" }} onChange={(e) => { getTwodatesGRN(e) }} placeholder="Search Receiving Date Range" />
            </div>
            <div className="col-md-2">
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
            <div className="col-md-1">
              <button type="button" style={{ width: "50px", height: 35, borderRadius: 5 }} onClick={handelAll}>All</button>

            </div>


          </div>

        </div>

        <div className="card-body">
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
                <th onClick={() => sorting("GRN_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">GR Number</th>
                <th onClick={() => sorting("GRN_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Invoice Number</th>
                <th onClick={() => sorting("DOCUMENT_DATE")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Receiving Date{showArrow?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Company Code</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Plant</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Posting Date</th>
                <th  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Document Date</th>
                {/* <th onClick={()=>sorting("received_datas[0].GRN_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">GR Number</th> */}
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Total Count</th>
                {/* <th onClick={() => sorting("GRN_REF")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">GR Reference No</th> */}
                {/* <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th> */}

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
                        <Link
                          to=""
                          onClick={(e) => {
                            togglePODetailsFlag();
                            setClickRecvData(val.received_datas);
                            setEmptyModalTable(val.received_datas);

                          }}
                        >
                          {val.GRN_NO.toString()}
                        </Link>
                        <br />
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.GRN_REF}
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
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {dateFormat(val.received_datas[0].RECEIVING_DATE, "dd/mm/yyyy")}
                      </td><td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {dateFormat(val.received_datas[0].DOCUMENT_DATE, "dd/mm/yyyy")}
                      </td>
                     

                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "6%", borderColor: COLORS.gray10 }}
                      >
                        {val.received_datas.length}

                      </td>
                      {/* <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.GRN_REF}
                      </td> */}
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
                Goods Receipt Details
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
              <th>Material No</th>
              <th>Material Description</th>
              <th>GR Quantity</th>
              <th>Unit</th>
              {/* <th>PO Date</th>
              <th>Received Date</th> */}
              <th>Delivery Note Quantity</th>
              <th>Manufacturing Part No</th>
            </thead>
            <tbody>
              {modalDataStatus ? (
                currentPosts.map((grsData, index) => {
                  return (
                    <tr>
                      <td>{grsData.MATERIAL_NO}</td>
                      <td>{grsData.MATERIAL_DOCUMENT}</td>
                      <td>{grsData.GR_QTY}</td>
                      <td>{grsData.UNIT}</td>
                      {/* <td>{dateFormat(grsData.PO_DATE, "ddd, mmm dS, yyyy")}</td>
                      <td>{dateFormat(grsData.RECEIVING_DATE, "ddd, mmm dS, yyyy")}</td> */}
                      <td>{grsData.DELIVERY_QTY}</td>
                      <td>{grsData.MANUFACTURE_PART_NO}</td>
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
            <div className="col-md-1">
              <a
                className="h6"
                type="button"
                style={{
                  color: "#007bff",
                  float: "right",
                  padding: 5,
                  textDecoration: 'none',

                }}
                onClick={() => {
                  togglePODetailsFlag();
                }}
              >
                Close
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Receiveables;



