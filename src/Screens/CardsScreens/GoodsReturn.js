import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHeader from "../../Components/NavHeader";
import { CSVLink } from "react-csv";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate } from "react-router-dom";
import { FaFileCsv } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { Modal, ModalBody } from "reactstrap";
import { AiOutlineArrowLeft, AiOutlineDownload } from "react-icons/ai";
import { IconContext } from "react-icons";
import { COLORS } from "../../Constants/theme";
import dateFormat from 'dateformat';
function GoodsReturn() {
  const navigate = useNavigate();
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [sort,setSort]=useState("ASC")
  const [clickGRData, setClickGRData] = useState([]);
  const headers = [
    { label: "Material", key: "MATERIAL" },
    { label: "Quantity", key: "QUANTITY" },
    { label: "Plant", key: "PLANT" },
    { label: "Remark", key: "REMARKS" }
  ];


  const [tbody, setTBody] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [filterData,setFilterData]=useState([])
  const currentPosts = clickGRData.slice(indexOfFirstPost, indexOfLastPost)


  const vendorId = localStorage.getItem('userId');
  // "https://localhost:3007/images/" + image name gotten from REST api response

  useEffect(() => {
    axios.get(AxioxExpPort + "good_return/get?id=" + vendorId)
      .then((response) => {
        setTBody(response.data);
        setFilterData(response.data)
        console.log("response.data", response.data);
      })
  }, []);
  const sorting=(col)=>{
    if(sort ==="ASC"){
      const sorted =[...tbody].sort((a,b)=>
      a[col].toLowerCase()> b[col].toLowerCase()? 1 : -1
      );
      setTBody(sorted);
      setSort("DSC")
      console.log("response.data",tbody);
    }
      if(sort ==="DSC"){
        const sorted =[...tbody].sort((a,b)=>
        a[col].toLowerCase()<b[col].toLowerCase()? 1 : -1
        );
        setTBody(sorted);
        setSort("ASC")
      }

    }
    const handleSearch =(event)=>
    {
      var searchElements=event.target.value;
      console.log(searchElements);
      if(searchElements.length > 0){
  // setTBody('')
  const searchDatas= tbody.filter((item)=>item.STATUS.toLowerCase().includes(searchElements) || dateFormat((item.DOCUMENT_DATE),"ddd, mmm dS,yyyy").toLowerCase().includes(searchElements)|| (item.PO_NO).toString().toLowerCase().includes(searchElements));
  setTBody(searchDatas)
  console.log(searchDatas)
}else{
  setTBody(filterData)
}

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
              Goods Return
            </h4>
              </div>
            </div>
            </div>
<div className="col-md-4">

</div>
<div className="col-md-2">
<input
          type="text"
          className="form-control"
         
          placeholder="Search"
          style={{
            width: "100%",
            height: 30,
          }}
          onChange={(e) => {
           handleSearch(e)
          }}
        />
</div>
            
            
          </div>
         
        
        </div>
        <div className="card-body">
          <table className="table table-light table-bordered table-hover">
            <thead className="table-light">
              <tr
                className="text-center"
                style={{
                  backgroundColor: COLORS.gray20,
                  borderColor: COLORS.gray10,
                }}
              >
                <th onClick={()=>sorting("DOCUMENT_DATE")}  className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Document Date</th>
                    <th onClick={()=>sorting("PO_NO")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">PO Number</th>
                    <th onClick={()=>sorting("STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                    <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th>
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
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                       {dateFormat( val.DOCUMENT_DATE, "ddd, mmm dS, yyyy")}
                      </td>
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        <Link
                          to=""
                          onClick={(e) => {
                            togglePODetailsFlag();

                            setClickGRData(val.return_order)
                          }}
                        >
                          {(val.PO_NO)}
                        </Link>
                        <br />
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.STATUS}
                      </td>
                      <td
                        key={`col-5` + index}
                        className="text-center"
                        style={{ width: "5%", borderColor: COLORS.gray10 }}
                      >
                        <CSVLink className="btn" data={val.return_order} headers={headers}>
                          <IconContext.Provider
                            value={{ color: "#000", size: "22px" }}
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
            <div className="col-md-4">

              <CSVLink className="btn float-right"
                onClick={() => {
                  togglePODetailsFlag();
                }}
                style={{
                  backgroundColor: COLORS.gray10,
                  color: COLORS.black,

                }} data={data} headers={headers} >
                Download <FaFileCsv />

              </CSVLink>
            </div>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <th>Plant</th>
              <th>Ref Doc No.</th>
              <th>Material</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>REMARKS</th>
            </thead>
            <tbody>
              {
                clickGRData.map((grsData, index) => {
                  return (
                    <tr>
                      <td>
                        {grsData.PLANT}
                      </td>
                      
                      <td>
                        {grsData.ref}
                      </td>
                      <td>
                        {grsData.MATERIAL}
                      </td>
                      <td>
                        {grsData.DESCRIPTION}
                      </td>
                      <td>
                        {grsData.QUANTITY}
                      </td>
                      <td>
                        {grsData.PLANT}
                      </td>
                    </tr>
                  );
                })
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
                height:'10px'
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

export default GoodsReturn;
