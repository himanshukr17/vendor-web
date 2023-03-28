import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import '../StyleSheets/Scrollbar.css'
import '../StyleSheets/Carousel.css'
import { AxioxExpPort } from "./AxioxExpPort"
import 'chartjs-plugin-datalabels';
import dateFormat from 'dateformat';
import { FaWpforms } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';

// import { Carousel as CarouselItem } from 'react-responsive-carousel';
function HomeScreen() {
  const [carouselKey, setCarouselKey] = useState(Math.random());

  const vendorId = localStorage.getItem('userId');
  const [lablesAll, setLablesAll] = useState("")
  const [podata, setPodata] = useState([])
  const [dashboardData, setDashboardData] = useState("")
  var now = new Date();
  var daysOfYear = [];
  let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });
  // console.log(new Date(props.po[60].DOCUMENT_DATE).getMonth())
  const [podetail, setPoDetail] = useState([])
  const [podetails, setPoDetails] = useState([])
  const [podetailss, setPoDetailss] = useState([])
  const [feedsData, setFeedsData] = useState([])
  const [feedDataShow, setFeedDataShow] = useState("")
  const [feedDataShowINV, setFeedDataShowINV] = useState("")
  const [feedDataINV, setFeedDataINV] = useState("")
  // const scrollableContent=[]
  const getmonth = new Set()
  const fetchActivityFeed = async () => {
    axios.get(AxioxExpPort + "purchase_order/last_week_po?id=" + vendorId)
      .then((response) => {
        setFeedsData(response.data[0].po_data);
        setFeedDataShow(response.data[0].po_data.length)
        setFeedDataINV(response.data[0].invoice_data.length)
        setFeedDataShowINV(response.data[0].invoice_data)
        console.log("response.dataresponse.data", response.data[0].po_data)
      })
  }
  const fetchPosts = async () => {
    axios.post(AxioxExpPort + "createcompany/po", {
      "user": vendorId
    })
      .then((response) => {
        setLablesAll(response.data.length);
        setPoDetail(response.data[0])
        //setPoDetails(response.data[0])
        let total = 0;
        let totalQty = 0;
        response.data[0].Details.map(price => {
          total = total + price.NET_PRICE * price.ORDER_QUANTITY
          totalQty = totalQty + price.ORDER_QUANTITY
        });
        setPoDetailss(response.data[0].Details[0])
        setPoDetails({
          "total": total,
          "totalQty": totalQty
        })
        setPodata(response.data.filter(items => {
          return new Date(items.DOCUMENT_DATE).getFullYear() == new Date().getFullYear() && (new Date(items.DOCUMENT_DATE).getMonth() == new Date().getMonth() - 1 || new Date(items.DOCUMENT_DATE).getMonth() == new Date().getMonth() || new Date(items.DOCUMENT_DATE).getMonth() == new Date().getMonth() - 2)
        }))
      })
  }

  useEffect(() => {

    fetchPosts();
    fetchActivityFeed();

  }, []);

  podata.map(item => {
    getmonth.add(new Date(item.DOCUMENT_DATE).getMonth() + 1)
    // console.log("new Date(item.DOCUMENT_DATE).getMonth() + 1",getmonth)
  })
  const arr = Array.from(getmonth);
  // arr.sort(function(a, b) {
  //     return a - b;
  //   });
// Slider data
  const slides = [
    {
      title: 'Latest Purchase Order',
      totalQty: "12",
      date: "12/12/2022",
      PLANT_ID: "Plant1",
      PLANT_DESCRIPTION: "Plant1",
      UNIT: "unit",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/300x200/ff0000/ffffff'
    },
    {
      title: 'Latest Goods Receipt',
      totalQty: "12",
      date: "12/12/2022",
      PLANT_ID: "Plant2",
      PLANT_DESCRIPTION: "Plant1",
      UNIT: "unit",
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/300x200/00ff00/ffffff'
    },
    {
      title: 'Latest Invoice Approved',
      totalQty: "12",
      date: "12/12/2022",
      PLANT_ID: "Plant3",
      PLANT_DESCRIPTION: "Plant1",
      UNIT: "unit",
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200/0000ff/ffffff'
    },
    {
      title: 'Latest Invoice Pending',
      totalQty: "12",
      date: "12/12/2022",
      PLANT_ID: "Plant3",
      PLANT_DESCRIPTION: "Plant1",
      UNIT: "unit",
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200/0000ff/ffffff'
    }
    ,
    {
      title: 'Latest Goods Return',
      totalQty: "12",
      date: "12/12/2022",
      PLANT_ID: "Plant3",
      PLANT_DESCRIPTION: "Plant1",
      UNIT: "unit",
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200/0000ff/ffffff'
    }
  ];
  const labels = []
  let chartdatass = []
  arr.map(items => {
    labels.push(items == 1 ? "January" : items == 2 ? "February" : items == 3 ? "March" : items == 4 ? "April" : items == 5 ? "May" : items == 6 ? "June" : items == 7 ? "July" : items == 8 ? "August" : items == 9 ? "September" : items == 10 ? "October" : items == 11 ? "November" : items == 12 && "December")
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
    // chartdatass.push(Number(tot) / 100000)
    chartdatass.push(Number(tot))

  })

  // slider style part
  const myStyles = {
    backgroundImage: 'linear-gradient(-30deg,#D6B4E0 ,#C9DFF2)',
    padding:10,
    
  }
 
  
  // bar graph setup and data 
  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        fill: true,
        label: "Lakh(INR)",
        // backgroundColor: "#e6e6e6",
        // borderColor: "#4F51C0",
        borderColor: '#6A5ACD',
        backgroundColor: '#D8BFD8',
        data: chartdatass.reverse(),
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'white',
        formatter: (value, context) => '₹ ' + value,
        anchor: 'end',
        align: 'top'
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: (value, index, values) => '₹ ' + value.toLocaleString('en-IN')
          }
        }
      ]
    }
  };


  return (
    <div
      style={{ marginTop: 22 }}
    >
      <div
        className="row"
        style={{
          margin: 0,
          marginRight: "1%",
          
        }}
      >
        <div className="col-md-8">
          <div className="col-lg-12">
          <div style={{marginRight:"1.5%",marginLeft:"2%", marginTop:"1.5%"}}>

     
          <Carousel key={carouselKey} autoPlay={1000} showArrows={false} infiniteLoop={true} showStatus={false}>
              {slides.map((slide, index) => (
                <div
                  className="card "
                  style={myStyles}
                >
                  <h5
                    className="card-title text-center"
                    style={{
                      color: "#4F51C0",
                      marginTop: 5,
                      fontWeight: 'bold'

                    }}
                  >
                    {slide.title}
                  </h5>
                  <div className="row text-left" style={{
                    marginLeft: 15,
                    marginBottom: 3
                  }}>
                    <div className="col-md-8" style={{ marginTop: 1 }}>
                      <p style={{ color: "#800000" }}>PO Number:</p><br />
                      <p style={{
                        fontWeight: "bold"
                      }}>{slide.PO_NO}</p>
                    </div>
                    <div className="col-md-4" style={{ marginTop: 1 }}>
                      <a style={{ color: "#800000" }}>Date:</a><br />
                      <a
                        style={{
                          fontWeight: "bold"
                        }}
                      >{dateFormat((slide.date), "ddd, mmm dS,yyyy")}</a>
                    </div>
                    <div className="col-md-12" style={{ marginTop: 1 }}>
                      <a style={{ color: "#800000" }}>Plant: </a>
                      <a style={{
                        color: "#4B4B4B"
                      }}>{slide.PLANT_ID + "(" + slide.PLANT_DESCRIPTION + ")"}</a>
                    </div>
                    <div className="col-md-12" style={{ marginTop: 1 }}>
                      <a style={{ color: "#800000" }}>Unit: </a>
                      <a style={{
                        color: "#4B4B4B"
                      }}>{slide.UNIT}</a>
                    </div>
                    <div className="col-md-12" style={{ marginTop: 1 }}>
                      <a style={{ color: "#800000" }}>Total Quantity: </a>
                      <a style={{
                        color: "#4B4B4B"
                      }}>{slide.totalQty}</a>
                    </div>
                    <div className="col-md-12" style={{ marginTop: 1, marginBottom: 10 }}>
                      <a style={{ color: "#800000" }}>Total Net Value: </a>
                      <a style={{
                        color: "#4B4B4B"
                      }}>{Number(slide.total)}</a>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            </div>
       
            <div className="col-md-12" style={{ marginTop:"-3.5%"}}  >
              <div
                className="card info-card sales-card"
                style={
                  {
                    backgroundColor: "white",
                    marginLeft: "4%",
                    marginRight: "3%",
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
                  Purchase order of Last 3 months
                </h5>
                <Bar data={data} height={145} options={options} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4" >
          <div className="card" style={{ marginRight: "2.5%" }}>
            <p style={{ fontSize: "15px", marginTop: "2%", marginLeft: "2%" }} >Activity Feed</p>
            <p style={{ borderBottom: "1px solid #aaa", width: "100%" }}></p>
            <div className="card-body scrollable-content" style={{
              overflowY: "scroll",
              height: "585px",
              marginRight: "-20px",
            }}>
              <div className="row">
                {
                  feedDataShow > 0 ?
                    feedsData.map(itemsss => {
                      return (
                        <>
                          <div className="row" >
                            <div className="col-md-1">
                              <FaWpforms size={20} style={{ marginTop: 20, color: "#4F51C0 " }} />
                            </div>
                            <div className="col-md-10">
                              <a style={{ color: "green" }}>Order Received</a> <br />
                              <a style={{ color: "gray" }}> {dateFormat((itemsss.DOCUMENT_DATE), "ddd, mmm dS,yyyy")}</a><br />
                              <a style={{ color: "black " }}>{itemsss.PO_NO}</a><br />
                              <p style={{ marginBottom: 5, borderBottom: " 1px solid #aaa", width: "100%" }}></p>
                            </div>
                          </div>
                        </>
                      )
                    })
                    :
                    ""
                }
                    {/* <p className="text-center" style={{ color: "gray" }}> {"No Order data available"}</p> */}
                {
                  feedDataINV > 0 ?
                    feedDataShowINV.map(item => {
                      return (
                        <>
                          <div className="row" >
                            <div className="col-md-1">
                              <FaWpforms size={20} style={{ marginTop: 20, color: "#4F51C0 " }} />
                            </div>
                            <div className="col-md-10">
                              <a style={{ color: "green" }}>Invoice Created</a> <br />
                              <a style={{ color: "gray" }}> {dateFormat((item.BUYER_DATE), "ddd, mmm dS,yyyy")}</a><br />
                              <a style={{ color: "black " }}>{item.INVOICE_NO}</a><br />
                              <p style={{ marginBottom: 5, borderBottom: " 1px solid #aaa", width: "100%" }}></p>
                            </div>
                          </div>
                        </>
                      )
                    })
                    :
                    ""
                }
                    {/* <p className="text-center" style={{ color: "gray" }}> {"No Invoice data available"}</p> */}
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

  );
}

export default HomeScreen;
