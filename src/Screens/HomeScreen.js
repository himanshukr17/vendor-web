import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import { AiFillAccountBook, AiOutlineArrowRight, AiOutlineRadiusSetting, AiOutlineWallet } from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaMegaport, FaFileContract, FaUsers, FaReceipt, FaFileInvoiceDollar, FaHackerNews, FaWpforms } from "react-icons/fa";
import { BsFillCartCheckFill, BsFillBagXFill, BsFillCartXFill, BsReceiptCutoff } from "react-icons/bs";
import { AiFillReconciliation } from "react-icons/ai";
import { AxioxExpPort } from "./AxioxExpPort"
import { COLORS } from "../Constants/theme";
import CountUp from 'react-countup';
import 'chartjs-plugin-datalabels';
import dateFormat from 'dateformat';
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


  const [lablesAll, setLablesAll] = useState("")
  const [podata, setPodata] = useState([])
  const [dashboardData, setDashboardData] = useState("")
  var now = new Date();
var daysOfYear = [];
let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });
// console.log(new Date(props.po[60].DOCUMENT_DATE).getMonth())
const [podetail,setPoDetail]=useState([])
const [podetails,setPoDetails]=useState([])
const [podetailss,setPoDetailss]=useState([])
const [feedsData,setFeedsData]=useState([])
const getmonth = new Set()
useEffect(() => {
  const fetchPosts = async () => {
    axios.post(AxioxExpPort + "createcompany/po",{
      "user":vendorId
    })
    .then((response) => {
      setLablesAll(response.data.length);
      setPoDetail(response.data[0])
      //setPoDetails(response.data[0])
      let total = 0;
      let totalQty = 0;
          response.data[0].Details.map(price => {
            total = total + price.NET_PRICE * price.ORDER_QUANTITY
            totalQty= totalQty +price.ORDER_QUANTITY
          });
          setPoDetailss(response.data[0].Details[0])
          console.log("response.data",response.data[0].Details[0])
          setPoDetails({"total":total,
                        "totalQty":totalQty
                        })
          setPodata(response.data.filter(items => {
            return new Date(items.DOCUMENT_DATE).getFullYear() == new Date().getFullYear() && (new Date(items.DOCUMENT_DATE).getMonth() == new Date().getMonth() - 1 || new Date(items.DOCUMENT_DATE).getMonth() == new Date().getMonth() || new Date(items.DOCUMENT_DATE).getMonth() == new Date().getMonth() - 2)
          }))
        })
    }
    const fetchHomeCount = async () => {
      axios.get(AxioxExpPort + "count/all?id=" + vendorId)
        .then((response) => {
          setDashboardData(response.data);

        })
    }
    const fetchActivityFeed = async () => {
      axios.get(AxioxExpPort + "purchase_order/last_week_po?id=" + vendorId)
        .then((response) => {
          setFeedsData(response.data[0].po_data);
          

        })
    }
    fetchHomeCount();
    fetchPosts();
    fetchActivityFeed();

  }, []);

  podata.map(item => {
    getmonth.add(new Date(item.DOCUMENT_DATE).getMonth() + 1)
    console.log("new Date(item.DOCUMENT_DATE).getMonth() + 1",getmonth)
})
const arr = Array.from(getmonth);
// arr.sort(function(a, b) {
//     return a - b;
//   });

const labels=[]
let chartdatass = []
arr.map(items => {
    labels.push(items == 1 ?"Jan" : items == 2 ? "Feb" : items == 3 ? "Mar" : items == 4 ? "Apr" : items == 5 ? "May" : items == 6 ? "Jun" : items == 7 ? "Jul" : items == 8 ? "Aug" : items == 9 ? "Sep" : items == 10 ? "Oct" : items == 11 ? "Nov" : items == 12 && "Dec")
})
arr.map(items => {
    let tot = 0
    podata.map(mon => {
      
        if (new Date(mon.DOCUMENT_DATE).getMonth() + 1 == items) {
            mon.Details.map(sum => {
                tot = tot + (sum.ORDER_QUANTITY * sum.NET_PRICE)
            })
        }
    })
    chartdatass.push(Number(tot) / 100000)

  })
  const arrsPoNet=[];


  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Lakh(INR)",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: chartdatass.reverse(),
      },
      
      

    ],
  };
  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        formatter: Math.round,
        anchor: "end",
        offset: -20,
        align: "start"
      }
    },
  
  };
  return (
    <div
      style={{marginTop:76}}
    >
      <div
        className="row"
        style={{
          margin: 0
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
                  <div className="row" >


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
                          fontFamily:"bold",fontWeight: "bold"
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
   fontFamily:"bold",fontWeight: "bold"
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
   fontFamily:"bold",fontWeight: "bold"
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
                          fontSize:16
                        }}
                      >
                       Orders to confirm    </h5>
                    </div>
                    <div className="col-md-3">
   
                          <a className="card-title" style={{
                          marginTop: 10,
                          color: "#FF6347",
                          textDecoration: 'none',
                          float: "right",
                          fontFamily:"bold",fontWeight: "bold"
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
                          fontFamily:"bold",fontWeight: "bold"
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
                  className="card-title text-center"
                  style={{
                      color: "black",
                      marginTop:5
                   
                  }}
                >
                   Latest Purchase Orders
                </h5>
                <div className="row" style={{
                  marginLeft:2,
                  marginBottom:3
                }}>
                  <div className="col-md-8" style={{ marginTop:1}}>
                    <a>PO Number:</a><br/>
                    <a style={{
                      fontWeight:"bold"
                    }}>{podetail.PO_NO}</a>
                  </div>
                  <div className="col-md-4" style={{ marginTop:1}}>
                    <a>Date:</a><br/>
                    <a
                    style={{
                      fontWeight:"bold"
                    }}
                    >{dateFormat((podetail.DOCUMENT_DATE), "ddd, mmm dS,yyyy")}</a>
                  </div>
                  <div className="col-md-12" style={{ marginTop:1}}>
                    <a>Plant: </a>
                    <a style={{
                      color:"#4B4B4B"
                    }}>{podetailss.PLANT_ID+"("+podetailss.PLANT_DESCRIPTION+")"}</a>
                  </div>
                  <div className="col-md-12" style={{ marginTop:1}}>
                    <a>Unit: </a>
                    <a style={{
                      color:"#4B4B4B"
                    }}>{podetailss.UNIT}</a>
                  </div>
                  <div className="col-md-12" style={{ marginTop:1}}>
                    <a>Total Quantity: </a>
                    <a style={{
                      color:"#4B4B4B"
                    }}>{podetails.totalQty}</a>
                  </div>
                  <div className="col-md-12" style={{marginTop:1, marginBottom:10}}>
                    <a>Total Net Value: </a>
                    <a style={{
                      color:"#4B4B4B"
                    }}>{num.format(Number(podetails.total))}</a>
                  </div>
                </div>
              </div>
              </div>
              <div className="col-lg-12"  >

<div
  className="card info-card sales-card"
  style={
    {
      backgroundColor: "white",
     
    }
  }
>
  <h5
    className="card-title"
    style={{
      marginLeft: 10,
      marginTop: 4,
      color: "black",
    }}
  >
     Purchase order of Last 3 months of 2023
  </h5>

  <Line data={data}  options={options} />
</div>

            </div>
            
          </div>
          <div className="col-md-4">

            <div className="card">
              <p style={{ fontSize: "15px", marginTop: "2%", marginLeft: "2%" }} >Activity Feed</p>
              <p style={{ borderBottom: "1px solid #aaa", width: "100%" }}></p>
              <div className="card-body" style={{

                overflowY: "scroll",

                height: "419px",
                marginRight: "-20px",
                

              }}>
              <div className="row">
                 {feedsData.map((itemsss, indexs)=>{
                 return(
                  <>
                <div className="row" >
                <div className="col-md-1">
                  <FaWpforms size={20} style={{marginTop:20, color:"#FF7800 "}}/>
                </div>
                <div className="col-md-10">
                 <a style={{color:"green"}}>Order received</a> <br/>
                 <a style={{color:"gray"}}> {dateFormat((itemsss.DOCUMENT_DATE), "ddd, mmm dS,yyyy")}</a><br/>
                 <a style={{color:"black "}}>{itemsss.PO_NO}</a><br/>
                 <p style={{marginBottom:5, borderBottom: " 1px solid #aaa", width: "100%" }}></p>
              </div>
                </div>
                </>
                
                 )
                })
                } 
              </div>



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
