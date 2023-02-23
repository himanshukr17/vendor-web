import React, { useState, useEffect } from "react";
// import "../StyleSheets/CheckStatusStyle.css"
import { Chrono } from "react-chrono";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AxioxExpPort } from "./AxioxExpPort";
import axios from "axios";
import { Button, Modal, ModalBody } from "reactstrap";
// import { FaUserEdit } from "react-icons/fa";

function CheckStatus() {

  const [toaster, setToaster] = useState("")
  const [toasterColor, setToasterColor] = useState("")
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);

  const [MobileNumber, setMobileNumber] = useState(0);
  const [showApplicationStatus, setShowApplicationStatus] = useState(false);

  const [ifsc, setIFSC] = useState("")
  const [acNumber, setAcNumber] = useState("")
  const [confirmAcNumber, setConfirmAcNumber] = useState("")
  const [countrys, setCountrys] = useState([])
  const [country, setCountry] = useState("");
  const [acHoldel, setAcHolder] = useState("")

  const [uploadBtn, setUploadBtn] = useState(false)
  useEffect(() => {
    axios.get(AxioxExpPort + "country/all")
      .then((response) => {
        setCountrys(response.data);

      })
  }, []);
  const handleUpload = () => {
    setShowPODetailsFlag(true)
  }

  // const stSt = (e) => {
  //   const countriess = countrys.find((user) => user.COUNTRY_KEY === e);
  //   //console.log("countriess",countriess.STATE)
  //   setStateArr(countriess.STATE);
  // }

  const items = [
  ];
  const [itensData, setItemsData] = useState('')

  const CheckApplicationStatus = (e) => {
    e.preventDefault();
    if (MobileNumber.toString().length == 10) {
      setShowApplicationStatus(true)
      axios.get(AxioxExpPort + "status/details?phone_number=" + MobileNumber)
        .then((response) => {
          setItemsData(response.data[0].STATUS);
        })
      items.map((val, index) => {
        if (val.cardTitle == "Document Verification" && val.status == "notdone") {
          // setShowPODetailsFlag(true)
          setUploadBtn(true)
        } else {
          // setShowPODetailsFlag(false)
          setUploadBtn(false)
        }
      })
    }
    else {
      setShowApplicationStatus(false)
    }
  }
  const lengthData = items.length - 1
  const [alertOfConfirm, setalertOfConfirm] = useState(false)
  const confirmAc = (event) => {
    if (acNumber !== event) {
      document.getElementById("uploadDoc").disabled = true;
      setalertOfConfirm("Account Number don't match")
    } else {
      setalertOfConfirm('')
      document.getElementById("uploadDoc").disabled = false;
    }
  }
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
    console.log(event.target.files[0]);
  }
  const vendorId = localStorage.getItem('userId');
  const submitForm = async () => {
    const formData = new FormData();
    formData.append("image", userInfo.file);
    //  formData.append("id", vendorId);
    formData.append("account", confirmAcNumber);
    formData.append("country", country);
    formData.append("key", ifsc);
    formData.append("type", ifsc);
    formData.append("acc_holder", acHoldel);
    var xz = document.getElementById("snackbar");
    xz.className = "show";
    // image,  id,  country.  key,  account,  type,  acc_holder
    if (confirmAcNumber.length >= 0 && country.length >= 0 && ifsc.length !== 0 && acHoldel.length !== 0) {
      // alert("done")
      setShowPODetailsFlag(false)
      try {
        const response = axios({
          method: "post",
          url: AxioxExpPort + "bank_details/data?phone_number=" + MobileNumber,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          // setPanDiv(false)
          console.log("resres", res)
          // setShowPODetailsFlag(false)
          setToaster("Document is successfully updated");
          setToasterColor("#00D100");
          document.getElementById("handleUploadBtn").style.display = "none";
          setTimeout(function () {
            xz.className = xz.className.replace("show", "");
          }, 3000)
        }).catch((err) => {
          setToaster("Form is not submited, please try again ")
          setToasterColor("#f44336")
          //  document.getElementById("handleUploadBtn").style.display = "none";
          setTimeout(function () {
            xz.className = xz.className.replace("show", "");
          }, 3000)
        })
      } catch (error) {

        setToaster("Form is not submited, please try again ")
        setToasterColor("#f44336")
        //  document.getElementById("handleUploadBtn").style.display = "none";
        setTimeout(function () {
          xz.className = xz.className.replace("show", "");
        }, 3000)
      }
    }
    else {
      setToaster("Please fill the from")
      setToasterColor("#f44336")
      //  document.getElementById("handleUploadBtn").style.display = "none";
      setTimeout(function () {
        xz.className = xz.className.replace("show", "");
      }, 3000)
    }
  }

  return (
    <>
      <div className="statusBG" style={{
      }}>


        <div
          className="form-floating mb-3 statusBG"
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


        <div style={{ width: "100%" }}>
          {itensData == 1 &&
            <Chrono
              theme={{
                // primary: 'red',
                // secondary: 'blue',
                cardBgColor: '#D4D4FF',
                // cardForeColor: 'violet',
                titleColor: 'black',
                // titleColorActive: 'red',
              }}
              items={[
                {
                  cardTitle: "Application Submiited",
                  cardSubtitle: "Your application is submitted successfully.",
                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }
              ]}
              slideShow
              mode="VERTICAL_ALTERNATING"
              // allowDynamicUpdate={true}
              // // cardWidth="300"
              buttonTexts="SUBMIT"

              // disableClickOnCircle={true}
              activeItemIndex={Number(itensData) - 1}
              focusActiveItemOnLoad={true}
              hideControls={true}
            />
          }
          {itensData == 2 &&
            <Chrono
              theme={{
                // primary: 'red',
                // secondary: 'blue',
                cardBgColor: '#D4D4FF',
                // cardForeColor: 'violet',
                titleColor: 'black',
                // titleColorActive: 'red',
              }}
              items={[
                {

                  cardTitle: "Application Submiited",
                  cardSubtitle: "Your application is submitted successfully.",
                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }, {

                  cardTitle: "Application Review",

                  cardSubtitle: "Your application review is completed",

                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }, {
                  cardTitle: "Document Upload",
                  status: "notdone",
                  cardSubtitle: "Please Upload your Document, Verification will take 3-5 Working Days",

                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }

              ]}
              slideShow
              mode="VERTICAL_ALTERNATING"
              // allowDynamicUpdate={true}
              // // cardWidth="300"
              buttonTexts="SUBMIT"

              // disableClickOnCircle={true}
              activeItemIndex={Number(itensData)}
              focusActiveItemOnLoad={true}
              hideControls={true}
            />
          }
          {itensData == 3 &&
            <Chrono
              theme={{
                // primary: 'red',
                // secondary: 'blue',
                cardBgColor: '#D4D4FF',
                // cardForeColor: 'violet',
                titleColor: 'black',
                // titleColorActive: 'red',
              }}
              items={[
                {
                  cardTitle: "Application Submiited",
                  cardSubtitle: "Your application is submitted successfully.",
                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }, {

                  cardTitle: "Application Review",

                  cardSubtitle: "Your application review is completed",

                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }, {
                  cardTitle: "Document Verification",
                  status: "notdone",
                  cardSubtitle: "Document verification is in process, Take 3-5 Working Days",

                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }

              ]}
              slideShow
              mode="VERTICAL_ALTERNATING"
              // allowDynamicUpdate={true}
              // // cardWidth="300"
              buttonTexts="SUBMIT"

              // disableClickOnCircle={true}
              activeItemIndex={Number(itensData) - 1}
              focusActiveItemOnLoad={true}
              hideControls={true}
            />
          }
          {itensData == 4 &&
            <Chrono
              theme={{
                // primary: 'red',
                // secondary: 'blue',
                cardBgColor: '#D4D4FF',
                // cardForeColor: 'violet',
                titleColor: 'black',
                // titleColorActive: 'red',
              }}
              items={[
                {

                  cardTitle: "Application Submiited",
                  cardSubtitle: "Your application is submitted successfully.",
                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }, {
                  cardTitle: "Application Review",

                  cardSubtitle: "Your application review is completed",

                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }, {

                  cardTitle: "Document Verification",
                  cardSubtitle: "Document verification is in process, Take 3-5 Working Days",

                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                },
                {
                  cardTitle: "User Created Successfully",
                  cardSubtitle: "User Created Successfully now you can able to login",
                  media: {
                    type: "IMAGE",
                    source: {
                      url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
                    },
                  },
                }

              ]}
              slideShow
              mode="VERTICAL_ALTERNATING"
              // allowDynamicUpdate={true}
              // // cardWidth="300"
              buttonTexts="SUBMIT"

              // disableClickOnCircle={true}
              activeItemIndex={Number(itensData) - 1}
              focusActiveItemOnLoad={true}
              hideControls={true}
            />
          }

        </div>
        {itensData == 2 &&

          <div className="movable-button" style={{
            marginTop: "-28px"
          }}>
            <div className="row" >
              <Button
                onClick={handleUpload}
                id="handleUploadBtn"
                style={{
                  width: "100%",
                  justifyContent: "rigt",
                  alignSelf: "right",
                  color: "#fff",
                  backgroundColor: "#228B22",
                }} >
                <AiOutlineCloudUpload size={16} style={{ color: "white", fontStyle: 'italic' }} type="button" />Document</Button>
            </div>
          </div>
        }

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
                backgroundColor: "#DEE8FF"
                // marginTop: 0,
              }
            }
          >
            <div className="modal-header model-lg" style={{ marginBottom: "-15px", backgroundColor: "#061AD2" }} >
              <h5 className="modal-title text-center" id="exampleModalLabel">
                <p className="h6" t style={{ color: "white", size: "10", }}> <strong> Upload Your Bank Details </strong> </p>
              </h5>
            </div>
            <form>
              <div className="col-md-12 text-center">
                <br />
                <div className="row">

                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="form-floating mb-3"

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

                    >
                      <input
                        type="text"
                        className="form-control form-group"

                        onChange={(e) => {
                          setConfirmAcNumber(e.target.value);
                          confirmAc(e.target.value)
                        }}
                        placeholder="Confirm Account Number"
                      />
                      <label htmlFor="floatingInput">Confirm Account Number*</label>
                      <p style={{ marginTop: "-20px", marginBottom: "-20px" }} className="text-left text-danger">{alertOfConfirm}</p>

                    </div>

                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating mb-3"

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
                          setAcHolder(e.target.value);
                        }}
                        placeholder="Account Holder Name"
                      />
                      <label htmlFor="floatingInput">Account Holder Name*</label>


                      {/* {error && country.length <= 0 ?
                      <p className="text-left text-danger">Country is required</p>
                      : ""} */}
                    </div>

                  </div> <div className="col-md-6">
                    <div
                      className="form-floating mb-3"

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

                  </div> <div className="col-md-6">
                    <div
                      className="form-floating mb-3"

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

                        // onChange={(e) => {
                        //   setIFSC(e.target.value);
                        // }}
                        placeholder="Type"
                      />
                      <label htmlFor="floatingInput">Type*</label>


                      {/* {error && country.length <= 0 ?
                      <p className="text-left text-danger">Country is required</p>
                      : ""} */}
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating mb-3"

                    >
                      <input type="file" className="form-control form-group" id="upload_file" name="upload_file" onChange={handleInputChange} />

                      <label style={{ marginTop: "-8px" }} htmlFor="floatingInput" >Upload Cancel Check*</label>
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating mb-3"

                    >
                      <select className="form-control" type="text" onChange={(e) => { setCountry(e.target.value) }}
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

                    >

                      <div className="text-right"
                        style={{
                          marginRight: "10%",
                          marginTop: "9px"

                        }}
                      >

                        <button onClick={submitForm} type="button" id="uploadDoc" className="btn btn-secondary">Upload</button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
        <div id="snackbar" style={{ backgroundColor: toasterColor }}>{toaster}</div>
      </div>

    </>

  );
}

export default CheckStatus
