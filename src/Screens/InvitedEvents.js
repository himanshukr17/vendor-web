import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMessageArrowDown } from "@fortawesome/free-solid-svg-icons";
// import {Ionicons} from 'react-ionicons';
// import { IonIcon } from "@ionic/react";
// import { arrowDownOutline } from "ionicons/icons";
import SidebarHeaderToggle from "../Components/SidebarHeaderToggle";
import axios from "axios";
import { AxioxExpPort } from "./AxioxExpPort";
import { Label, Modal } from "reactstrap";
import dateFormat from "dateformat";
import { CSVLink } from "react-csv";
import { FaFileCsv, FaDownload, FaUpload } from "react-icons/fa";

function InvitedEvents() {
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
  const [sort, setSort] = useState("ASC");
  // const [query, setQuery]=useState("")
  const [filterData, setFilterdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  let num = Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
  const [change, setChange] = useState(1);

  const data = ClickedPOsDataArr;
  const vendorId = localStorage.getItem("userId");
  //console.log("vendorIdvendorId", vendorId)
  const [modelData, setModelData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ClickedPOsDataArr.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const [toaster, setToaster] = useState("");
  const [toasterColor, setToasterColor] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [filteredDataz, setFilteredData] = useState([]);
  const [chooseFile, setChooseFile] = useState(null);

  const [allData, setAllData] = useState(null);
  const get_project = async () => {
    await axios
      .get(`${AxioxExpPort}projects/data?id=${vendorId}`)
      .then((res) => {
        setAllData(res.data);
      })
      .catch((err) => {
        console.log("err");
      });
  };
  useEffect(() => {
    get_project();
  }, []);

  useEffect(() => {
    const tempData = allData?.filter((val) => val.FLAG == change);
    setFilteredData(tempData);
  }, [change, allData]);

  const changeEvent = (e) => {
    setChange(parseInt(e)); // Convert the selected value to an integer before updating
  };

  const handleReject = (cardData) => {
    // Handle the reject button click event with the corresponding card data
    console.log("Reject clicked. Card Data:", cardData);
  };

  // const handelchange = (e)=>{
  //     const name = e.target.name;
  //     const value = e.target.value;
  //     setbidingInput((prev)=>{
  //       return{...prev,[name]: value}

  //     })
  // }

  const FileChoose = (event) => {
    const File = event.target.files[0];
    setChooseFile(File);
  };

  const handleApprove = (cardData) => {
    // Handle the approve button click event with the corresponding card data
    console.log("Approve clicked. Card Data:", cardData);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const projectDetails = (row) => {
    setModelData(row.PROJECT_DATA[0]);
    setModelOpen(!modelOpen);
  };

  const [projectDetailsBiding, setprojectDetailsBiding] = useState([]);
  const [allMaterial, setAllmeterial] = useState([]);
  const [filteredData, setfilteredData] = useState({});
  const [projectID, setProjectID] = useState("");
  const [material, setMaterial] = useState([]);

  const [bidingModal, setBidingModal] = useState(false);
  const projectDetailsForBiding = (row) => {
    setProjectID(row);
    const allMaterials = row.RFQ_DATA.map((item) => ({
      value: item.MATERIAL,
      label: item.MATERIAL,
    }));
    const Materialsdata = row.RFQ_DATA.map((item) => ({
      Material: item.MATERIAL,
      Quantity: item.QUANTITY,
    }));
    setMaterial(Materialsdata);
    setAllmeterial(allMaterials);
    setSelectedValue(material[0].Material); //materia[0].Material is use for auto select the 0 index of dropdown when modal is
    setBidingModal(!bidingModal);
  };
  const setvalue = (val) => {
    // console.log("cszhdbcmszdbc",val);
    const updatedata = [...material];
    const keys = Object.keys(val[0]);
    updatedata[val[1].Indexvalue][keys] = val[0][keys];
    setMaterial(updatedata);
  };

  
  const [selectedvalue, setSelectedValue] = useState();

  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    const filteredData = projectDetailsBiding.filter(
      (item) => item.MATERIAL === selectedMaterial
    );
    setfilteredData(filteredData[0]);
    setSelectedValue(selectedMaterial);
  };

  const Indexvalue = material.findIndex(
    (items) => items.Material === selectedvalue
  );

  console.log("material Value", material[Indexvalue]?.PRICE_PER_QUANTITY);
  console.log("Selected Value", selectedvalue);
  console.log("Index Match", Indexvalue);

  const handelRefresh = () => {
    window.location.reload();
  };

  const [bidingInput, setbidingInput] = useState({
    QUANTITY: "",
    PricePerQuantity: "",
    FreightperUnit: "",
    FreightPercentage: "",
    DiscountAmount: "",
    Discountpercentage: "",
    ExtendedPrice: "",
  });
  // console.log("inputttttttt", bidingInput);
  const uploadCsv = async () => {
    await axios
      .post(`${AxioxExpPort} Projects/Bidding`, {
        //  Shagundata: chooseFile,
      })
      .catch((err) => {
        console.log("err");
      });
  };

  const csvdataa = [
    ["QUANTITY"],
    ["PricePerQuantity"],
    ["FreightperUnit"],
    ["FreightPercentage"],
    ["DiscountAmount"],
    ["Discountpercentage"],
    ["ExtendedPrice"],
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const submitBiding = async () => {
    const materialID = document.getElementById("selectMaterialID").value;
    await axios
      .post(`${AxioxExpPort}projects/bidding`, {
        supplier: projectID?.SUPPLIER_ID,
        project: projectID?.PROJECT_ID,
        amount: bidingInput?.DiscountAmount,
        material: materialID,
        quantity: bidingInput?.QUANTITY,
        PRICE_PER_QUANTITY: bidingInput?.PricePerQuantity,
        EXTENDED_PRICE: bidingInput?.ExtendedPrice,
        DISCOUNT_PERCENTAGE: bidingInput?.Discountpercentage,
        DISCOUNT_AMOUNT: bidingInput?.DiscountAmount,
        FREIGHT_PERCENTAGE: bidingInput?.FreightPercentage,
        FREIGHT_PER_UNIT: bidingInput?.FreightperUnit,
      })
      .then((res) => {
        setBidingModal(!bidingModal);
        setToaster("Biding submitted successfully");
        var xz = document.getElementById("snackbar");
        setToasterColor("green");
        xz.className = "show";
        setTimeout(function () {
          xz.className = xz.className.replace("show", "");
          setCurrentStep(0);
        }, 2000);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  // console.log(projectDetailsBiding);

  return (
    <>
      <SidebarHeaderToggle />
      {loading && (
        <div className="loader-container">
          <div className="spinnerCircle"></div>
        </div>
      )}
      <div
        className="card-body"
        style={{
          marginTop: "2%",
        }}
      >
        <div
          id="snackbar"
          style={{ backgroundColor: toasterColor, borderRadius: "50px" }}
        >
          {toaster}
        </div>

        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="row" style={{ marginBottom: 10 }}>
                <div className="col-md-10">
                  <div 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "40px",
                    }}
                  >
                    <h4 className="form-check-label">Invted Events</h4>
                    <p
                      style={{
                        color: "#fff",
                        marginLeft: "5px",
                        borderBlockColor: "#000",
                      }}
                    >
                      {change == 1 && "Pending"}
                      {change == 2 && "Biding Stop"}
                      {change == 3 && "Approved by buyer"}
                      {change == 5 && "Reject by buyer"}
                    </p>
                  </div>
                </div>
                <div
                  className="col-md-2 text-end noPrint"
                  style={{ marginTop: 10 }}
                >
                  <IconContext.Provider
                    value={{ color: "#3a91e8", size: "22px" }}
                  >
                    <AiOutlineHome
                      type="button"
                      onClick={() => {
                        Navigate("/dashboard");
                      }}
                    />
                  </IconContext.Provider>
                </div>
              </div>

              <div>
                <div
                  className=""
                  style={{
                    marginTop: 10,
                    marginLeft: "2.2%",
                    height: "100%",
                    marginRight: "-1.4%",
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-2">
                        <select
                          className="form-control"
                          aria-label="Default select example"
                          type="text"
                          onChange={(e) => changeEvent(e.target.value)}
                        >
                          <option selected value={1}>
                            Pending
                          </option>
                          <option value={2}>Biding Stop</option>
                          <option value={3}>Approved</option>
                          <option value={5}>Reject</option>
                        </select>
                      </div>
                      <div className="col-md-2 noPrint">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Supplier Code / Name"
                          style={{ width: "100%", height: 35 }}
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-5 noPrint"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p
                      className="text-right"
                      style={{
                        fontFamily: "bold",
                        marginTop: "-35px",
                        marginBottom: "1px",
                        size: 60,
                      }}
                    ></p>
                    <div className="row">
                      {filteredDataz?.map((item) => {
                        if (item.FLAG === 1) {
                          return (
                            <div className="col-md-2" key={item.PROJECT_ID}>
                              <div
                                className="card"
                                onClick={() => projectDetailsForBiding(item)}
                                style={{ cursor: "pointer" }}
                              >
                                <div style={{ margin: "10px" }}>
                                  <p style={{ color: "#D20000" }}>
                                    {item.PROJECT_ID}
                                  </p>
                                  <p>
                                    Event Type:{" "}
                                    {item.PROJECT_DATA[0].EVENT_TYPE}
                                  </p>
                                  <p>
                                    Start Date:{" "}
                                    {dateFormat(
                                      item.PROJECT_DATA[0].EVENT_START_DATE,
                                      "dd-mm-yyyy"
                                    )}
                                  </p>
                                  <p>
                                    End Date:{" "}
                                    {dateFormat(
                                      item.PROJECT_DATA[0].EVENT_END_DATE,
                                      "dd-mm-yyyy"
                                    )}
                                  </p>
                                  {/* <p>Participated: {item.PROJECT_ID}</p> */}
                                </div>
                              </div>
                            </div>
                          );
                        } else if (item.FLAG == 2) {
                          return (
                            <div className="col-md-2" key={item.PROJECT_ID}>
                              <div
                                className="card"
                                onClick={() => projectDetails(item)}
                                style={{ cursor: "pointer" }}
                              >
                                <div style={{ margin: "10px" }}>
                                  <p style={{ color: "#D20000" }}>
                                    {item.PROJECT_ID}
                                  </p>
                                  <p>
                                    Event Type:{" "}
                                    {item.PROJECT_DATA[0].EVENT_TYPE}
                                  </p>
                                  <p>
                                    Start Date:{" "}
                                    {dateFormat(
                                      item.PROJECT_DATA[0].EVENT_START_DATE,
                                      "dd-mm-yyyy"
                                    )}
                                  </p>
                                  <p>
                                    End Date:{" "}
                                    {dateFormat(
                                      item.PROJECT_DATA[0].EVENT_END_DATE,
                                      "dd-mm-yyyy"
                                    )}
                                  </p>
                                  {/* <p>Participated: {item.PROJECT_ID}</p> */}
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          <>
                            <div className="text-center">
                              <p>No data available</p>
                            </div>
                          </>; // Return null for other cases or add a specific condition for them
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal-dialog "
        size="lg"
        isOpen={modelOpen}
        toggle={modelOpen}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="card card-info">
          <div className="card-header" style={{}}>
            <h3 className="card-title">View Event Details</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span
                onClick={() => {
                  setModelOpen(!modelOpen);
                }}
              >
                ×
              </span>
            </button>
          </div>
        </div>
        <div
          className="card"
          style={{ marginTop: "-2%", marginBottom: "-0.3%" }}
        >
          <div className="card-body">
            <div
              style={{
                backgroundColor: "#f7f7f7",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <div className="row" style={{ marginLeft: "5%" }}>
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Project ID:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.PROJECT_ID}
                  </p>
                </div>
                <div className="col-md-1"></div>
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Project Name:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.PROJECT_NAME}
                  </p>
                </div>
              </div>
              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Start Date:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                  >
                    {dateFormat(modelData?.EVENT_START_DATE, "dd-mm-yyyy")}
                  </p>
                </div>
                <div className="col-md-1"></div>
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    End Date:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                  >
                    {dateFormat(modelData?.EVENT_END_DATE, "dd-mm-yyyy")}
                  </p>
                </div>
              </div>
              {/* <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Plant:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Last PO Date:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div> */}
              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Description:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.PROJECT_DESCRIPTION}
                  </p>
                </div>
                <div className="col-md-1"></div>
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Purchase Category:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.PURCHASE_CATEGORY}
                  </p>
                </div>
              </div>
              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Source:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.SOURCE}
                  </p>
                </div>
                <div className="col-md-1"></div>
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Division:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.DIVISION}
                  </p>
                </div>
              </div>
              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    RFQ No:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.RFQ_NO}
                  </p>
                </div>
                <div className="col-md-1"></div>
                <div
                  className="col-md-5"
                  style={{
                    borderBottom: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Test Project:
                  </p>
                  <p
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                  >
                    {modelData?.TEST_PROJECT}
                  </p>
                </div>
              </div>
              {/* <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Ship to:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>HSN Code:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div> */}
            </div>
            {/* <img className="col-md-12" src={AxioxExpPort + 'images/' + imageSrc} /> */}
          </div>
        </div>
      </Modal>
      <Modal
        className="modal-dialog "
        size="lg"
        isOpen={bidingModal}
        toggle={() => setBidingModal(!bidingModal)}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="card card-info">
          <div className="card-header" style={{}}>
            <h3 className="card-title">Edit Biding Details</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span
                onClick={() => {
                  setBidingModal(!bidingModal);
                }}
              >                
              </span>
            </button>
          </div>
        </div>
        <div
          className="card"
          style={{ marginTop: "-2%", marginBottom: "-0.3%" }}
        >
          <div className="card-body">
            <div
              style={{
                backgroundColor: "#f7f7f7",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <div className="row" style={{ marginLeft: "5%" }}>
                <div className="col-md-11" style={{ display: "flex" }}>
                  <input
                    className="form-control "
                    style={{ width: "60%" }}
                    type="file"
                    onChange={FileChoose}
                  />
                  {/* <CSVLink  filename={"ID:"+vendorId+".csv"} data={vendorId} ><button type="button" style={{width: "150%", backgroundColor:"#02a5ab", height: 33, borderRadius: 5,marginLeft:"80%" }} ><FaFileCsv size={20} style={{color:"white"}}/></button></CSVLink> */}
                  <button
                    onClick={uploadCsv}
                    type="button"
                    style={{
                      width: "17%",
                      backgroundColor: "#02a5ab",
                      height: 33,
                      borderRadius: 5,
                      marginLeft: "5%",
                      color: "white",
                     
                    }}
                  >
                    <FaUpload size={18} style={{ color: "white" }} /> Upload here
                   
                  </button>
                  <>
                    <CSVLink
                      filename={"ID:" + vendorId + ".csv"}
                      data={csvdataa}
                    >
                      <button
                        type="button"
                        style={{
                          width: "100%",
                          backgroundColor: "#02a5ab",
                          height: 33,
                          borderRadius: 5,
                          marginLeft: "10%",
                          color: "white",
                          padding: "5px",                          
                          // color:"white",
                        }}
                      >
                        <FaDownload size={18} style={{ color: "white" }} />
                        Download here
                      </button>
                    </CSVLink>
                  </>
                </div>
              </div>

              <div className="row" style={{ marginLeft: "5%" }}>
                <div className="col-md-11">
                  <p>Material*:</p>
                  <select
                    id="selectMaterialID"
                    className="form-select form-control"
                    value={projectDetailsBiding.material}
                    onChange={handleMaterialChange}
                  >
                    {allMaterial.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* selectedvalue && */}
              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div className="col-md-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Price Per Quantity:
                  </p>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                    value={
                      material[Indexvalue] != -1 &&
                      material[Indexvalue]?.PRICE_PER_QUANTITY != undefined
                        ? material[Indexvalue]?.PRICE_PER_QUANTITY
                        : ""
                    }
                    // value={bidingInput?.PricePerQuantity}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setvalue([
                        { PRICE_PER_QUANTITY: e.target.value },
                        { Indexvalue },
                      ]);
                      // setbidingInput([
                      //   {
                      //     ...bidingInput,
                      //     PricePerQuantity: e.target.value,
                      //   },
                      //   { Indexvalue },
                      // ]);
                    }}
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Quantity:
                  </p>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                    // value={Indexvalue != -1?.bidingInput?.QUANTITY}
                    value={
                      material[Indexvalue] != -1 &&
                      material[Indexvalue]?.Quantity != undefined
                        ? material[Indexvalue]?.Quantity
                        : ""
                    }
                    disabled
                    // onChange={(e) => {
                    //   console.log(e.target.value);
                    //   setbidingInput([
                    //     {
                    //       ...bidingInput,
                    //       QUANTITY: e.target.value,
                    //     },
                    //     { Indexvalue },
                    //   ]);
                    // }}
                  />
                </div>
              </div>

              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div className="col-md-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    ExtendedPrice Price:
                  </p>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                    // value={Indexvalue != -1 ?. bidingInput ?.ExtendedPrice}
                    value={
                      material[Indexvalue] != -1 &&
                      material[Indexvalue]?.EXTENDED_PRICE != undefined
                        ? material[Indexvalue]?.EXTENDED_PRICE
                        : ""
                    }
                    onChange={(e) => {
                      setvalue([
                        { EXTENDED_PRICE: e.target.value },
                        { Indexvalue },
                      ]);

                      // setbidingInput([
                      // ...bidingInput,
                      // { ExtendedPrice: e.target.value },
                      // { Indexvalue },
                      // ]);
                    }}
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Discount percentage:
                  </p>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                    // value={Indexvalue != -1 ?. bidingInput?. Discountpercentage }
                    value={
                      material[Indexvalue] != -1 &&
                      material[Indexvalue]?.DISCOUNT_PERCENTAGE != undefined
                        ? material[Indexvalue]?.DISCOUNT_PERCENTAGE
                        : ""
                    }
                    onChange={(e) => {
                      setvalue([
                        { DISCOUNT_PERCENTAGE: e.target.value },
                        { Indexvalue },
                      ]);
                      // setbidingInput([
                      //   {
                      //     ...bidingInput,
                      //     Discountpercentage: e.target.value,
                      //   },
                      //   { Indexvalue },
                      // ]);
                    }}
                  />
                </div>
              </div>
              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div className="col-md-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Discount Amount:
                  </p>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                    // value={Indexvalue != -1 ?. bidingInput?.DiscountAmount}
                    value={
                      material[Indexvalue] != -1 &&
                      material[Indexvalue]?.DISCOUNT_AMOUNT != undefined
                        ? material[Indexvalue]?.DISCOUNT_AMOUNT
                        : ""
                    }
                    onChange={(e) => {
                      setvalue([
                        { DISCOUNT_AMOUNT: e.target.value },
                        { Indexvalue },
                      ]);
                      // setbidingInput([
                      //   {
                      //     ...bidingInput,
                      //     DiscountAmount: e.target.value,
                      //   },
                      //   { Indexvalue },
                      // ]);
                    }}
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Freight Percentage:
                  </p>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                    }}
                    value={
                      material[Indexvalue] != -1 &&
                      material[Indexvalue]?.FREIGHT_PERCENTAGE != undefined
                        ? material[Indexvalue]?.FREIGHT_PERCENTAGE
                        : ""
                    }
                    onChange={(e) => {
                      setvalue([
                        { FREIGHT_PERCENTAGE: e.target.value },
                        { Indexvalue },
                      ]);
                      // setbidingInput([
                      //   {
                      //     ...bidingInput,
                      //     FreightPercentage: e.target.value,
                      //   },
                      //   { Indexvalue },
                      // ]);
                    }}
                  />
                </div>
              </div>
              <div
                className="row"
                style={{ marginLeft: "5%", marginTop: "1.5%" }}
              >
                <div className="col-md-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#333",
                      marginBottom: "3px",
                      marginRight: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    Freight per Unit:
                  </p>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      fontWeight: "normal",
                      display: "inline-block",
                      fontSize: "15px",
                      color: "#888",
                      marginBottom: "3px",
                    }}
                    value={
                      material[Indexvalue] != -1 &&
                      material[Indexvalue]?.FREIGHT_PER_UNIT != undefined
                        ? material[Indexvalue]?.FREIGHT_PER_UNIT
                        : ""
                    }
                    // value={bidingInput?.FreightperUnit}
                    onChange={(e) => {
                      setvalue([
                        { FREIGHT_PER_UNIT: e.target.value },
                        { Indexvalue },
                      ]);
                      // setbidingInput([
                      //   {
                      //     ...bidingInput,
                      //     FreightperUnit: e.target.value,
                      //   },
                      //   { Indexvalue },
                      // ]);
                    }}
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5 text-center">
                  <button
                    className="float-center"
                    type="button"
                    title="Submit and acknowledge"
                    style={{
                      width: "50%",
                      marginTop: 25,
                      height: 35,
                      borderWidth: 3,
                      fontFamily: "serif",
                      borderRadius: 5,
                      color: "green",
                      borderColor: "green",
                    }}
                    onClick={() => submitBiding()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* <img className="col-md-12" src={AxioxExpPort + 'images/' + imageSrc} /> */}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default InvitedEvents;
