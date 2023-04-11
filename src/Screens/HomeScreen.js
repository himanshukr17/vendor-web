import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import '../StyleSheets/Scrollbar.css'
import { AxioxExpPort } from "./AxioxExpPort"
import 'chartjs-plugin-datalabels';
import dateFormat from 'dateformat';
import { FaWpforms } from "react-icons/fa";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionList from "../Components/SectionList";
import Sidebar from "../Components/Sidebar";

function HomeScreen() {
  const [carouselKey] = useState(Math.random());
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

  const [poHomeDetails, setPoHomeDetails] = useState('')
  const [slides, setSlides] = useState([])
  const [returnHomeDetails, setReturnHomeDetails] = useState('')
  const [invHomeDetails, setInvHomeDetails] = useState('')
  // const scrollableContent=[]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000 // set the interval in milliseconds
  };
  const getmonth = new Set()
  const fetchActivityFeed = async () => {
    axios.get(AxioxExpPort + "purchase_order/last_week_po?id=" + vendorId)
      .then((response) => {
        setFeedsData(response.data[0].po_data);
        setFeedDataShow(response.data[0].po_data.length)
        setFeedDataINV(response.data[0].invoice_data.length)
        setFeedDataShowINV(response.data[0].invoice_data)
        // console.log("response.dataresponse.data", response.data[0].po_data)
      })
    axios.get(AxioxExpPort + "last_updated/data?id=" + vendorId)
      .then((response) => {
        setSlides(response.data);
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
  // poHomeDetails.details.map(item=>{
  //   console.log(item.P)
  // })
  const titleArr = [
    {
      title: 'Latest Purchase Order'
    },
    {
      title: 'Latest Goods Receipt'
    }
    ,
    {
      title: 'Latest Goods Return'
    },
    {
      title: 'Latest Invoice Data'
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
    backgroundImage: `url("https://media.istockphoto.com/id/1177802719/vector/abstract-financial-chart-with-up-arrow-graph-in-stock-market-in-blue-colour-background.jpg?s=612x612&w=0&k=20&c=dcP9q6pIcSBYUT-l_LKHdVAzlDhXGsDMg4_CKwMFaUA=")`,
    borderRadius: "10px"
  };



  // bar graph setup and data 
  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        fill: true,
        label: "Lakh(INR)",
        borderColor: '#4F51C0',
        backgroundColor: '#4F51C0',
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
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //         callback: (value, index, values) => '₹ ' + value.toLocaleString('en-IN')
    //       }
    //     }
    //   ]
    // }
  };
  const carouselRef = useRef(null);
  let resetTimeout;
  var ArrayTEmp = [];
  ArrayTEmp.push(slides)
  const handleHover = () => {
    // Start autoplay when the mouse hovers over the carousel
    carouselRef.current.startAutoplay();
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
        <div className="col-md-2">
        <div >
         <Sidebar/> 

         {/* <SectionList/> */}
        </div>
        </div>
        <div className="col-md-7" style={{marginTop:'2%'}}>
          <div className="col-lg-12">
            <div style={{ marginRight: "1.5%", borderRadius: "10px", marginLeft: "4%", marginTop: "1.5%" }}>
              <Slider {...settings} >
                {ArrayTEmp[0].map((slide, index) => {
                  console.log("slide", slide)
                  let total = 0
                  let totalsQty = 0
                  slide.Details.map(price => {
                    total = total + price.NET_PRICE * price.ORDER_QUANTITY
                    totalsQty = totalsQty + Number(price.ORDER_QUANTITY)
                  });
                  return (

                    <div
                      key={index}
                      className="card "

                    >
                      <div className="card-body" style={myStyles}>
                        <h5
                          style={{
                            color: "#fff",
                            fontWeight: "bold",
                            textAlign: "center" // added style
                          }}
                        >
                          {index == 0 && "Latest Purchase Order" || index == 1 && "Latest Goods Receipt" || index == 2 && "Latest Goods Return" || index == 3 && "Latest Invoice Data"}
                        </h5>
                        <div className="row text-left" style={{

                          marginBottom: -3
                        }} >
                          <div className="col-md-9" style={{ marginTop: 1 }}>
                            <a style={{ color: "#4F51C0" }}>PO Number:</a><br />
                            <p style={{
                              fontWeight: "bold",
                              color: "#fff"
                            }}>{slide.PO_NO ? slide.PO_NO: 'Will be update soon'}</p>

                          </div>

                          <div className="col-md-3" style={{ marginTop: 1 }}>
                            <a style={{ color: "#4F51C0" }}>Date:</a><br />
                            <a
                              style={{
                                fontWeight: "bold",
                                color: "#fff"

                              }}
                            >{dateFormat((slide.DOCUMENT_DATE), "ddd, mmm dS,yyyy")}</a>
                          </div>
                          <div className="col-md-12" style={{ marginTop: 3 }}>
                            <a style={{ color: "#4F51C0" }}>Plant: </a>
                            <a style={{
                              color: "#fff"
                            }}>{slide.Details[0].PLANT_ID + "(" + slide.Details[0].PLANT_DESCRIPTION + ")"}</a>
                          </div>
                          <div className="col-md-12" style={{ marginTop: 1 }}>
                            <a style={{ color: "#4F51C0" }}>Unit: </a>
                            <a style={{
                              color: "#fff"
                            }}>{slide.Details[0].UNIT ?slide.Details[0].UNIT :0}</a>
                          </div>
                          <div className="col-md-12" style={{ marginTop: 1 }}>
                            <a style={{ color: "#4F51C0" }}>Total Quantity: </a>
                            <a style={{
                              color: "#fff"
                            }}>{totalsQty?totalsQty:0}</a>
                          </div>
                          <div className="col-md-12" style={{ marginTop: 1, marginBottom: 10 }}>
                            <a style={{ color: "#4F51C0" }}>Total Net Value: </a>
                            <a style={{
                              color: "#fff"
                            }}>{Number(total)?Number(total):0}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>

            <div className="col-md-12" style={{ marginTop: "1%" }}  >
              <div
                className="card info-card sales-card"
                style={
                  {
                    backgroundColor: "white",
                    marginLeft: "3%",
                    marginRight: "0.5%",
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
                <Line data={data} height={145} options={options} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3" style={{marginTop:'2%'}} >
          <div className="card" style={{ marginTop: "3%"  }}>
            <p style={{ fontSize: "15px", marginTop: "2%", marginLeft: "2%" }} >Activity Feed</p>
            <p style={{ borderBottom: "1px solid #aaa", width: "100%" }}></p>
            <div className="card-body scrollable-content" style={{
              overflowY: "scroll",
              height: "540px",
              marginRight: "-20px",
            }}>
              <div className="row">
                {  feedDataShow > 0  &&  feedDataINV > 0 ?
                
                    (feedsData.map(itemsss => {
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
                    }))
                   
                
            
                   ( feedDataShowINV.map(item => {
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
                   )
                   :
                   <>
                    <img src='../Images/nodataavailable.gif' width={'90%'} height={'90%'}/>
                   </>
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
