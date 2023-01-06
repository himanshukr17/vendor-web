import React, { useRef, useState, useEffect } from "react";
// import "../StyleSheets/CheckStatusStyle.css"
import { Chrono } from "react-chrono";

import { AxioxExpPort } from "./AxioxExpPort";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { FaUserEdit } from "react-icons/fa";

function CheckStatus() {
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  
  const [MobileNumber, setMobileNumber] = useState(0);
  const [showApplicationStatus, setShowApplicationStatus] = useState(false);

  const [ifsc, setIFSC]=useState("")
  const [acNumber, setAcNumber]=useState("")
  const [confirmAcNumber, setConfirmAcNumber]=useState("")
  const [countrys, setCountrys] = useState([])
  const [country, setCountry] = useState("");
  const [stateArr, setStateArr] = useState([])
  useEffect(() => {
    axios.get(AxioxExpPort + "country/all")
      .then((response) => {
        setCountrys(response.data);

      })
  }, []);


  const stSt = (e) => {
    const countriess = countrys.find((user) => user.COUNTRY_KEY === e);
    //console.log("countriess",countriess.STATE)
    setStateArr(countriess.STATE);
  }

  const items = [
    {
      title: "Wed Oct 26 2022",
      cardTitle: "Application Submiited",
      cardSubtitle: "Your application is submitted successfully.",
      media: {
        type: "IMAGE",
        source: {
          url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
        },
      },
    },
    {
      title: "May 1940",
      cardTitle: "Application Review",

      cardSubtitle: "Your application review is completed",

      media: {
        type: "IMAGE",
        source: {
          url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
        },
      },
    },
    {
      title: "May 1940",
      cardTitle: "Document Verification",
      status: "notdone",
      cardSubtitle: "Document verification is in process, Take 3-5 Working Days",

      media: {
        type: "IMAGE",
        source: {
          url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
        },
      },
    },
  ];

  const CheckApplicationStatus = (e) => {
    e.preventDefault();

    if (MobileNumber.toString().length == 10) {
      setShowApplicationStatus(true)
      items.map((val, index) => {
        if (val.cardTitle == "Document Verification" && val.status == "notdone") {
          setShowPODetailsFlag(true)

        } else {
          setShowPODetailsFlag(false)
        }
      })

    }
    else {
      setShowApplicationStatus(false)
    }

  }
  const lengthData = items.length - 1
  return (
    <>
      <div
        className="form-floating mb-3"
        style={{
          marginLeft: "2%",
          marginRight: "2%",
          margin: "2%",
          display: "flex",
        }}
      >
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="address"
          style={{
            width: "30%",
            height: 50,
          }}
          onChange={(e) => {
            setMobileNumber(e.target.value);
          }}
        />
        <label
          htmlFor="floatingInput"
          style={{
            fontWeight: 500,
          }}
        >
          Mobile Number{" "}
        </label>

        <button
          style={{
            width: "15%",
            justifyContent: "center",
            alignSelf: "center",
            color: "#fff",
            marginLeft: "1%",
            backgroundColor: "#ffdf00",
          }}
          className="btn"
          onClick={(e) => { CheckApplicationStatus(e) }}

        >
          Check Status
        </button>
      </div>
      {showApplicationStatus && (
        <div style={{ width: "100%" }}>
          <Chrono
            items={items}
            slideShow
            mode="VERTICAL_ALTERNATING"
            // allowDynamicUpdate={true}
            // // cardWidth="300"
            buttonTexts="SUBMIT"
            // disableClickOnCircle={true}
            activeItemIndex={lengthData}
            focusActiveItemOnLoad={true}
            hideControls={true}
          />
        </div>
      )}




      <Modal
        size="lg"
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
          style={
            {
              backgroundColor:"#DEE8FF"
              // marginTop: 0,
            }
          }
        >
          <div className="modal-header model-lg" style={{backgroundColor:"#7E7E7F"}} >
            <h5 className="modal-title text-center" id="exampleModalLabel">
              <p className="h6"  t  style={{ color:"white", size:"10"}}> <strong> Upload Your Bank Details </strong> </p>
            </h5>
          </div>
          <div className="col-md-12 text-center">
          <br/>
          <div className="row">
            
          </div>
            <div className="row">
            <div className="col-md-6">
                <div
                  className="form-floating mb-3"
                  style={{
                    marginLeft: "2%",

                  }}
                >

                  {/* 
                    <input required 
                     type="text"
                      className="form-control"
                      
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      placeholder="Country"
                    /> */}
                    <input
                    type="password"
                    className="form-control form-group"

                    onChange={(e) => {
                      setAcNumber(e.target.value);
                    }}
                    placeholder="Account Number*"
                  />
                  <label htmlFor="floatingInput">Account Number*</label>
                  {/* {error && country.length <= 0 ?
                      <p className="text-left text-danger">Country is required</p>
                      : ""} */}
                </div>

              </div>
              <div className="col-md-6">
                <div
                  className="form-floating mb-3"
                  style={{
                    marginLeft: "2%",
                    marginRight: "2%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control form-group"

                    onChange={(e) => {
                      setConfirmAcNumber(e.target.value);
                    }}
                    placeholder="Confirm Account Number"
                  />
                  <label htmlFor="floatingInput">Confirm Account Number*</label>
                </div>

              </div>
              <div className="col-md-6">
                <div
                  className="form-floating mb-3"
                  style={{
                    marginLeft: "2%",

                  }}
                >

                  {/* 
                    <input required 
                     type="text"
                      className="form-control"
                      
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      placeholder="Country"
                    /> */}

               
                  <input
                    type="text"
                    className="form-control form-group"

                    onChange={(e) => {
                      setIFSC(e.target.value);
                    }}
                    placeholder="IFSC Code"
                  />
                  <label htmlFor="floatingInput">IFSC Code*</label>
               
                 
                  {/* {error && country.length <= 0 ?
                      <p className="text-left text-danger">Country is required</p>
                      : ""} */}
                </div>

              </div>
              <div className="col-md-6">
                <div
                  className="form-floating mb-3"
                  style={{
                    marginLeft: "2%",
                    marginRight: "2%",
                  }}
                >
                <input type="file"  className="form-control form-group" id="upload_file" name="upload_file"  />

                 <label  style={{marginTop:"-8px"}} htmlFor="floatingInput" >Upload Cancel Check*</label> 
                </div>

              </div>
              <div className="col-md-6">
              <div
                  className="form-floating mb-3"
                  style={{
                    marginLeft: "2%",

                  }}
                >
              <select className="form-control" type="text" onChange={(e) => { setCountry(e.target.value); stSt(e.target.value) }}
                  >
                    <option>--Select Country--</option>
                    {countrys.map((countries) => {
                      return (
                        <option key={countries.COUNTRY_KEY} value={countries.COUNTRY_KEY}>{countries.COUNTRY_NAME}</option>
                      );
                    })}

                  </select>
                  <label htmlFor="floatingInput">Country*</label>
              </div>
              </div>
              <div className="col-md-6">
              <div
                  className="form-floating mb-3"
                  style={{
                    marginLeft: "2%",

                  }}
                >
                
            <div className="text-right"
             style={{
               marginRight: "10%",
                    marginTop:"7px"

                  }}
            >
                
            <button type="button" class="btn btn-secondary">Update</button>
            </div>
                </div>

                </div>

            </div>
          </div>
        </ModalBody>
      </Modal>
    </>

  );
}

export default CheckStatus