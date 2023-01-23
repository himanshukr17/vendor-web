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
function GoodsReturn() {
  const navigate = useNavigate();
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [thead, setTHead] = useState([
    "Document Date",
    "PO Number",
    "Reference Number",
    "Action",
  ]);
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
  const currentPosts = clickGRData.slice(indexOfFirstPost, indexOfLastPost)


  const vendorId = localStorage.getItem('userId');
  // "https://localhost:3007/images/" + image name gotten from REST api response

  useEffect(() => {
    axios.get(AxioxExpPort + "good_return/get?id=" + vendorId)
      .then((response) => {
        setTBody(response.data);

        console.log("response.data", response.data);
      })
  }, []);

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
          style={{
            display: "flex",
          }}
        >
          <div className="form-check form-check-inline">
            <button
              className="btn btn"
              style={{
                borderRadius: 50,
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <IconContext.Provider value={{ color: "#000", size: "22px" }}>
                <AiOutlineArrowLeft />
              </IconContext.Provider>
            </button>
          </div>
          <div className="form-check form-check-inline">
            <h4 className="form-check-label" htmlFor="inlineRadio2">
              Goods Return
            </h4>
          </div>
          <div
            className="form-check form-check-inline"
            style={{
              float: "right",
            }}
          ></div>
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
                {thead.map((thead, index) => {
                  return (
                    <th
                      key={index}
                      className="text-center"
                      style={{ width: "5%", borderColor: COLORS.gray10 }}
                      scope="col"
                    >
                      {thead}
                    </th>
                  );
                })}
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
                        {val.DOCUMENT_DATE}
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
                          {val.PO_NO}
                        </Link>
                        <br />
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {val.QUOTATION_NO}
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
              <th>Material</th>
              <th>Quantity</th>
              <th>PLANT</th>
              <th>REMARKS</th>
            </thead>
            <tbody>
              {
                clickGRData.map((grsData, index) => {
                  return (
                    <tr>
                      <td>
                        {grsData.MATERIAL}
                      </td>
                      <td>
                        {grsData.QUANTITY}
                      </td>
                      <td>
                        {grsData.PLANT}
                      </td>
                      <td>
                        {grsData.REMARKS}
                      </td>
                    </tr>
                  );
                })
              }

            </tbody>
            <Pagination postPerPage={postsPerPage} totalPosts={clickGRData.length} paginate={paginate} />

          </table>
          <div className="modal-footer">
            <a
              className="navbar-brand"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
                padding: 1,
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
