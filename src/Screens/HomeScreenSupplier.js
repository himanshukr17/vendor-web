import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
// import { AiFillAccountBook, AiOutlineArrowRight } from "react-icons/ai";
import { IconContext } from "react-icons";
import {  FaUsers } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillReconciliation } from "react-icons/ai";
import { AxioxExpPort } from "./AxioxExpPort"

function HomeScreenSupplier() {

  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "January",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [50, 10, 5, 2, 20, 30, 45],
      },
      {
        label: "Feb",
        backgroundColor: "rgb (255,160,122)",
        borderColor: "rgb(255, 99, 132)",
        data: [50, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const vendorId = localStorage.getItem('userId');

  const [thead, setTHead] = useState([
    "Client Name",
    "Location",
    "SPOC",
    "SPOC Email ID",
  ]);
  const [tbody, settbody] = useState([
    "Client Name",
    "Location",
    "SPOC",
    "SPOC Email ID",
  ]);

  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("superHeroName", superHero);
    dataArray.append("uploadFile", uploadFile);

    axios
      .post("api_url_here", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Posted");
      })
      .catch((error) => {
        alert("error");
      });
  };
  const [dashboardData, setDashboardData] = useState("")
  const [activeSupp,setActiveSupp]=useState("")
  const [inActiveSupp,setInActiveSupp]=useState("")
  useEffect(() => {
    const fetchPosts = async () => {
    axios.get(AxioxExpPort + "mapping/count?id="+vendorId)
      .then((response) => {
        setDashboardData(response.data);
        setActiveSupp(response.data.ACTIVE_SUPPLIER);
        setInActiveSupp(response.data.INACTIVE_SUPPLIER);

        console.log("response.data", response.data.ACTIVE_SUPPLIER);
      })
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <div
        className="row"
        style={{
          margin: 10,
        }}
      >
        <div id="google_translate_element"></div>
        <div className="col-lg-3 col-6">
          <Link to="/mv"
            style={{
              textDecoration: 'none',

            }}
          >
            <div
              className="card info-card sales-card"
              style={
                {
                  backgroundColor:"#EBEBFF"
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
                Manage Vendor
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
                {/* <h5 className="card-title">
                    Sales <span>| Today</span>
                  </h5> */}

                <div className="row">
                  <div className="col-md-4">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "60px" }}
                      >
                        {" "}
                        <FaUsers />
                      </IconContext.Provider>
                    </div>
                  </div>
                  <div className="col-md-8 text-right">

                    <span style={{
                      color: "#FF6347",
                      fontWeight: 700,
                      fontSize: 30,


                    }} className=" small pt-1 fw-bold">{activeSupp}</span>{" "}
                    <span style={{


                    }} className="text-muted small pt-2 ps-1">Active Vendor</span><br></br>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 30,
                      color: "#6495ED",
                    }} className="text-success small pt-1 fw-bold">{inActiveSupp}</span>{" "}
                    <span style={{


                    }} className="text-muted small pt-2 ps-1">Inactive Vendor</span>
                  </div>

                  {/* <div className="col-md-8 text-right">

                
<span   style={{
  
   
  }}  className="text-muted small pt-2 ps-1">Approval Pending 
</span><br></br>
   
<span   style={{
  
   
  }}  className="text-muted small pt-2 ps-1">Approved Vendors</span><br></br>
   
<span   style={{
  
   
  }}  className="text-muted small pt-2 ps-1">Create Vendors</span>
</div> */}

                </div>

              </div>
            </div>
          </Link>
        </div>

        <div className="col-lg-3 col-6">
          <Link to="/vdtls" style={{
            textDecoration: 'none',

          }}>
            <div
              className="card info-card sales-card"
              style={
                {
                  backgroundColor:"#EBEBFF"
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
                Vendor Details
              </h5>

              <div className="card-body">
                {/* <h5 className="card-title">
                    Sales <span>| Today</span>
                  </h5> */}
                <div className="row">
                  <div className="col-md-4">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "60px" }}
                      >
                        {" "}
                        <AiFillReconciliation />
                      </IconContext.Provider>
                    </div>
                  </div>
                  <div className="col-md-8 text-right" >
                    <span style={{
                      color: "#FF7F50",
                      fontWeight: 700,
                      fontSize: 30,
                    }} className=" small pt-1 fw-bold text-right">{dashboardData.RETURN_DATA}</span>{" "}
                    <span style={{


                    }} className="text-muted small pt-2 ps-1 text-right"></span><br></br>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 30,
                      color: "#6495ED",
                    }} className="text-success small pt-1 fw-bold text-right"> {inActiveSupp+activeSupp}</span>{" "}
                    <span style={{


                    }} className="text-muted small pt-2 ps-1">Total Vendors</span><br></br>

                  </div>

                </div>

              </div>
            </div>
          </Link>
        </div>


        {/* <div className="col-lg-3 col-6">
          <Link to="#" style={{
            textDecoration: 'none',

          }}
          >
            <div
              className="card info-card sales-card"
              style={
                {
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
                Invoice Display
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
               
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "90px" }}
                      >
                        {" "}
                        <FaFileContract />
                      </IconContext.Provider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div> */}

        <div className="col-lg-3 col-6">
          <Link to="/pordersuppli" style={{
            textDecoration: 'none',

          }}>

            <div
              className="card info-card sales-card"
              style={
                {
                  backgroundColor:"#EBEBFF"
                  // float: "left",
                }
              }
            >
              <h5
                className="card-title"
                style={{
                  margin: 10,
                  color: "black",
                }}
              >
                Purchase Order
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
                {/* <h5 className="card-title">
                    Sales <span>| Today</span>
                  </h5> */}

                <div className="row">
                  <div className="col-md-4">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <IconContext.Provider
                        value={{ color: "#0275d8", size: "85px" }}
                      >
                        {" "}
                        <BsFillCartCheckFill />
                      </IconContext.Provider>
                    </div>
                  </div>
                  <div className="col-md-8 text-right">


                    <span style={{


                    }} className="text-muted small pt-2 ps-1">Create
                    </span>
                    <br></br>
                    <span style={{


                    }} className="text-muted small pt-2 ps-1">Display</span>

                    <br></br>
                    <span style={{
                    }} className="text-muted small pt-2 ps-1">Change</span>

                    <br></br>
                  </div>

                </div>
              </div>
            </div>
          </Link>

        </div>




        {/* 
        <div
          style={{
            display: "flex",
          }}
        > */}
        {/* <div
          className="card"
          style={{
            height: 60,
            width: "50%",
            margin: 20,
          }}
        ></div> */}
        {/* <div
            className="card"
            style={{
              height: 350,
              width: "45%",
              margin: "1%",
            }}
          >
            <Bar data={data} />
          </div>
        </div> */}

        {/* <>
          <center>
            
            <h3
              style={{
                color: "white",
              }}
            >
              Click on below button to download PDF file
            </h3>
            <button onClick={onButtonClick}>Download PDF</button>
          </center>
        </>

        <form onSubmit={submitForm}>
          <input
            type="text"
            onChange={(e) => setSuperHero(e.target.value)}
            placeholder={"Superhero Name"}
          />
          <br />
          <input type="file" onChange={(e) => setUploadFile(e.target.files)} />
          <br />
          <input type="submit" />
        </form> */}
      </div>
    </div>
  );
}

export default HomeScreenSupplier;
