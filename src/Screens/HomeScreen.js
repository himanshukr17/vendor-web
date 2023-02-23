import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import { AiFillAccountBook, AiOutlineArrowRight, AiOutlineRadiusSetting, AiOutlineWallet } from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaMegaport, FaFileContract, FaUsers, FaReceipt, FaFileInvoiceDollar, FaHackerNews } from "react-icons/fa";
import { BsFillCartCheckFill, BsFillBagXFill, BsFillCartXFill, BsReceiptCutoff } from "react-icons/bs";
import { AiFillReconciliation } from "react-icons/ai";
import { AxioxExpPort } from "./AxioxExpPort"
import { COLORS } from "../Constants/theme";
import CountUp from 'react-countup';


function HomeScreen() {



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
  const [lablesAll, setLablesAll] = useState("")
  const [dashboardData, setDashboardData] = useState("")
  useEffect(() => {
    const fetchPosts = async () => {
      axios.get(AxioxExpPort + "purchase_order/po_data?id=" + vendorId)
        .then((response) => {
          setLablesAll(response.data.length);
         
        })

    }
    const fetchHomeCount = async () => {
      axios.get(AxioxExpPort + "count/all?id=" + vendorId)
        .then((response) => {
          setDashboardData(response.data);
          console.log("response.data", response.data)

        })
    }
    fetchHomeCount();
    fetchPosts();

  }, []);
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "January",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [50, 10, 5, 2, 20, 30, 45],
      }
    ],
  };
  return (
    <div
      style={{
        marginBottom: 26

      }}
    >
      <div
        className="row"
        style={{
          margin: 10,
        }}
      >
        <div id="google_translate_element"></div>
        <div className="row">
          <div className="col-md-3">
            <div className="row">
              <Link to="/pos" style={{
                textDecoration: 'none',

              }}>


                <div className="card info-card sales-card col-md-12"
                  style={
                    {
                      // float: "left",
                      backgroundColor: "#EBEBFF"
                    }
                  }>
                  <div className="row">


                    <div className="col-md-1">
                      <div className="card-icon rounded-circle   justify-content-left">
                        <IconContext.Provider
                          value={{ color: "#0275d8", size: "22px" }}
                        >
                          <BsFillCartCheckFill style={{
                            marginTop: "10px"
                          }} />
                        </IconContext.Provider>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h5
                        className="card-title"
                        style={{
                          margin: 10,
                          color: "black",
                        }}
                      >

                        Purchase Order
                      </h5>
                    </div>
                    <div className="col-md-3">
   
                          <a className="card-title" style={{
                          marginTop: 10,
                          color: "#FF6347",
                          textDecoration: 'none',
                          float: "right",
                          fontFamily:"bold"
                        }}> <CountUp delay={5} end={ Number(dashboardData.OPEN_PO)+Number(dashboardData.CLOSE_PO)}/></a>
                  </div>
                    <div className="col-md-1">
                  <a className="card-title" style={{  textDecoration: 'none', fontSize: "12px", margin: 7, fontSize:20, float: "right" }}>{">"}</a>
                  </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="row">
              <Link to="/res" style={{
                textDecoration: 'none',

              }}>


                <div className="card info-card sales-card col-md-12"
                  style={
                    {
                      // float: "left",
                      backgroundColor: "#EBEBFF"
                    }
                  }>
                  <div className="row">


                    <div className="col-md-1">
                      <div className="card-icon rounded-circle   justify-content-left">
                        <IconContext.Provider
                          value={{ color: "#0275d8", size: "22px" }}
                        >

                          <AiFillReconciliation style={{
                            marginTop: "10px"
                          }} />
                        </IconContext.Provider>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h5
                        className="card-title"
                        style={{
                          margin: 10,
                          color: "black",
                        }}
                      >
                        Goods Receipt
                      </h5>
                    </div>
                    <div className="col-md-3">
   
   <a className="card-title" style={{
   marginTop: 10,
   color: "#FF6347",
   textDecoration: 'none',
   float: "right",
   fontFamily:"bold"
 }}> <CountUp delay={5} end={Number(dashboardData.RECEIVED_PO) }/></a>
</div>
<div className="col-md-1">
<a className="card-title" style={{  textDecoration: 'none', fontSize: "12px", margin: 7, fontSize:20, float: "right" }}>{">"}</a>
</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="row">
              <Link to="/grs" style={{
                textDecoration: 'none',

              }}>


                <div className="card info-card sales-card col-md-12"
                  style={
                    {
                      // float: "left",
                      backgroundColor: "#EBEBFF"
                    }
                  }>
                  <div className="row">


                    <div className="col-md-1">
                      <div className="card-icon rounded-circle   justify-content-left">
                        <IconContext.Provider
                          value={{ color: "#0275d8", size: "22px" }}
                        >

                          <BsFillCartXFill style={{
                            marginTop: "10px"
                          }} />
                        </IconContext.Provider>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h5
                        className="card-title"
                        style={{
                          margin: 10,
                          color: "black",
                        }}
                      >

                        Goods Return
                      </h5>
                    </div>
                    <div className="col-md-3">
   
   <a className="card-title" style={{
   marginTop: 10,
   color: "#FF6347",
   textDecoration: 'none',
   float: "right",
   fontFamily:"bold"
 }}><CountUp delay={5} end={ Number(dashboardData.RETURN_PO)}/></a>
</div>
<div className="col-md-1">
<a className="card-title" style={{  textDecoration: 'none', fontSize: "12px", margin: 7, fontSize:20, float: "right" }}>{">"}</a>
</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="row">
              <Link to="/ackn" style={{
                textDecoration: 'none',

              }}>


                <div className="card info-card sales-card col-md-12"
                  style={
                    {
                      // float: "left",
                      backgroundColor: "#EBEBFF"
                    }
                  }>
                  <div className="row">


                    <div className="col-md-1">
                      <div className="card-icon rounded-circle   justify-content-left">
                        <IconContext.Provider
                          value={{ color: "#0275d8", size: "22px" }}
                        >

                          <AiOutlineWallet style={{
                            marginTop: "10px"
                          }} />
                        </IconContext.Provider>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h5
                        className="card-title"
                        style={{
                          margin: 10,
                          color: "black",
                        }}
                      >
                       New Po's    </h5>
                    </div>
                    <div className="col-md-3">
   
                          <a className="card-title" style={{
                          marginTop: 10,
                          color: "#FF6347",
                          textDecoration: 'none',
                          float: "right",
                          fontFamily:"bold"
                        }}> <CountUp delay={5} end={ Number(lablesAll) }/></a>
                  </div>
                    <div className="col-md-1">
                  <a className="card-title" style={{  textDecoration: 'none', fontSize: "12px", margin: 7, fontSize:20, float: "right" }}>{">"}</a>
                  </div>
                  </div>
                </div>
              </Link>
            </div>
          
            <div className="row">
              <Link to="/inv" style={{
                textDecoration: 'none',

              }}>


                <div className="card info-card sales-card col-md-12"
                  style={
                    {
                      // float: "left",
                      backgroundColor: "#EBEBFF"
                    }
                  }>
                  <div className="row">


                    <div className="col-md-1">
                      <div className="card-icon rounded-circle   justify-content-left">
                        <IconContext.Provider
                          value={{ color: "#0275d8", size: "22px" }}
                        >

                          <FaFileInvoiceDollar style={{
                            marginTop: "10px"
                          }} />
                        </IconContext.Provider>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h5
                        className="card-title"
                        style={{
                          margin: 10,
                          color: "black",
                        }}
                      >
                        Invoice Details
                      </h5>
                    </div>
                    <div className="col-md-3">
   
                          <a className="card-title" style={{
                          marginTop: 10,
                          color: "#FF6347",
                          textDecoration: 'none',
                          float: "right",
                          fontFamily:"bold"
                        }}><CountUp delay={5} end={Number(dashboardData.INVOICE_COUNT)} /> </a>
                  </div>
                    <div className="col-md-1">
                  <a className="card-title" style={{  textDecoration: 'none', fontSize: "12px", margin: 7, fontSize:20, float: "right" }}>{">"}</a>
                  </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="row">
              <Link to="/mcs" style={{
                textDecoration: 'none',

              }}>


                <div className="card info-card sales-card col-md-12"
                  style={
                    {
                      // float: "left",
                      backgroundColor: "#EBEBFF"
                    }
                  }>
                  <div className="row">


                    <div className="col-md-1">
                      <div className="card-icon rounded-circle   justify-content-left">
                        <IconContext.Provider
                          value={{ color: "#0275d8", size: "22px" }}
                        >

                          <FaFileContract style={{
                            marginTop: "10px"
                          }} />
                        </IconContext.Provider>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h5
                        className="card-title"
                        style={{
                          margin: 10,
                          color: "black",
                        }}
                      >
                        My Contacts      </h5>
                    </div>
                    <div className="col-md-4">

                    </div>
                  </div>
                </div>
              </Link>
            </div>
          
          </div>

          <div className="col-md-5">
            <div className="col-lg-12" >

              <div
                className="card info-card sales-card"
                style={
                  {
                    backgroundColor: "white"
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
                  Last 6 months Purchase Order Details
                </h5>

                <Bar data={data} />



              </div>
            </div>
          </div>
          <div className="col-md-4">

            <div className="card">
              <p style={{ fontSize: "15px", marginTop: "2%", marginLeft: "2%" }} >Activity Feed</p>
              <p style={{ borderBottom: "1px solid #aaa", width: "100%" }}></p>
              <div className="card-body" style={{

                overflowY: "scroll",

                height: "450px",
                marginRight: "-20px"

              }}>




              </div>


            </div>

          </div>
        </div>



        {/* <div className="col-lg-3 col-6">
          <Link >
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
                Goods Receipts Acknowledgment 
              </h5>
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle=""></a>
              </div>
              <div className="card-body">
            
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <IconContext.Provider
                      value={{ color: "#0275d8", size: "90px" }}
                    >
                      <BsReceiptCutoff />
                    </IconContext.Provider>
                  </div>
                  <div className="col-md-8 text-right" >
                   <span    style={{
                        color: "#FF7F50",
                        fontWeight: 700,
                        fontSize: 30,
                      }} className="text-success small pt-1 fw-bold text-right">{dashboardData.GOODS_RECEIPT_ACKNOWLEDGE}</span>{" "}
                    <span   style={{
                      
                       
                      }}  className="text-muted small pt-2 ps-1 text-right"></span><br></br>
                       <span    style={{
                        fontWeight: 700,
                        fontSize: 30,
                        color: "#6495ED",
                      }} className="text-success small pt-1 fw-bold text-right"></span>{" "}
                    <span   style={{
                      
                       
                      }}  className="text-muted small pt-2 ps-1">Total Receipts</span><br></br>
                     
                  </div>
                </div>
              </div> 
            </div>
          </Link>
        </div>*/}

        {/* 
        <div
          style={{
            display: "flex",
          }}
       <div
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

export default HomeScreen;
