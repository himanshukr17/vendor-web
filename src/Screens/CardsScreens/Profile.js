import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxioxExpPort } from "../AxioxExpPort"
import { FaEye, FaUserEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
  AiOutlineArrowLeft, AiOutlineHome, AiOutlineMessage,
} from "react-icons/ai";
import Footer from "../../Components/Footer";
import NavHeader from "../../Components/NavHeader";
import { Modal, ModalBody } from "reactstrap";
function Profile() {
  const navigate = useNavigate();
  const [profileDetail, setProfileDetail] = useState([]);
  profileDetail.map((val) => {

    console.log(val.TARGET_VALUE)
  })
  const [uploadedData, setUploadedData] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [vendorDtl, setVendorDtl] = useState([]);
  const vendorId = localStorage.getItem('userId');
  const fetchData = async () => {
    axios.get(AxioxExpPort + "createcompany/contact?id=" + vendorId)
      .then((response) => {
        //  setTBody(response.data);
        setUploadedData(response.data);
        console.log("response.data", response.data);

      })
  }
  const fetchDataImg = async () => {
    axios.post(AxioxExpPort + "createcompany/details", {
      user: vendorId
    })
      .then((response) => {

        setVendorDtl(response.data);

      })
  }
  useEffect(() => {
    fetchData();
    fetchDataImg();
  }, []);
  const [image, setImage] = useState("");
  const inputFile = useRef(null);
  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setImage(files[0]);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };


  const [showCheckFlages, setShowCheckFlages] = useState(false);
  const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  return (

    <div>
      <NavHeader />

      {/* <Navbar/> */}
      <div

      >

        <div
          className="card-body"
          style={{
            marginTop: "5%",
          }}
        >
          <div

          >
            <div className="row">
              <div className="col-md-12">
                <div className="row" style={{ marginBottom: 10 }}>

                  <div className="col-md-10">


                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 className="form-check-label">
                        View Profile
                      </h4>
                      <button style={{
                        marginLeft: '10px',
                        padding: '7px 14px',
                        backgroundColor: "#4F51C0",
                        color: '#fff',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer'
                      }} onClick={() => { window.history.go(-1) }}>Go Back</button>
                    </div>
                  </div>
                  <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>

                    <IconContext.Provider value={{ color: "red", size: "22px" }}>
                      <AiOutlineHome type="button" onClick={() => {
                        navigate("/dashboard");
                      }} />
                    </IconContext.Provider>

                    {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}

                    {/* {" / "}
                    <a className="dropdown-toggle" style={{color:"maroon"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Transaction Data    
          </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row"
          style={{
            margin: 10,
          }}
        >
          <div className="col-lg-5 col-12">
            <div className="small-box bg-light card card-success card-outline">


              <div className="row">
                <div className="col-md-2">

                </div>
                <div className="col-md-8">

                  <img className="col-md-12" style={{ alignSelf: "center", alignItems: "center", display: 'flex', height: '180px', borderRadius: "50px", marginTop: 5 }} src={"https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"} />
                  <input
                    style={{ display: "none" }}
                    // accept=".zip,.rar"
                    ref={inputFile}
                    onChange={handleFileUpload}
                    type="file"
                  />
                  <div className="button" onClick={(e) => onButtonClick(e)}>
                    <FaUserEdit size={20} style={{ marginTop: "-40" }} />
                  </div>
                </div>
                <div className="col-md-2">

                </div>
              </div>
              <div className="col-md-12">


                <h1 className="text-sm-left"
                  style={{
                    color: "#0275d8",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: -20
                  }}
                >
                  Name:<span style={{
                    color: "#14CA96",
                  }}> {vendorDtl.FIRST_NAME}{" " + vendorDtl.LAST_NAME}</span>
                </h1>

                <h1 className="text-sm-left"
                  style={{
                    color: "#0275d8",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: -20
                  }}
                >
                  Email:<span style={{
                    color: "#14CA96",
                  }}> {vendorDtl.E_MAIL}</span>
                </h1>
                <h1 className="text-sm-left "
                  style={{
                    color: "#0275d8",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: -20
                  }}
                >
                  Phone: <span style={{
                    color: "#14CA96",
                  }}> {" " + vendorDtl.TELEPHONE}</span>
                </h1>
                <h1 className="text-sm-left "
                  style={{
                    color: "#0275d8",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: -20
                  }}
                >
                  Company(Legal) Name: <span style={{
                    color: "#14CA96",
                  }}> {" " + vendorDtl.COMPANY_NAME}</span>
                </h1>

              </div>


            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div className="small-box bg-light">
              <div className="icon"></div>
              <div className="inner">
                <div className="row">
                  <div className="row">

                    <div className="col-md-6">
                      <h1 className="text-sm-left"
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20
                        }}
                      >
                        Company Code:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}> {vendorDtl.COMPANY_CODE}</p>
                    </div>
                    <div className="col-md-6">
                      <h1 className="text-sm-left"
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20
                        }}
                      >
                        Address:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                        marginBottom: -10
                      }}> {vendorDtl.ADD1}</p>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                        marginBottom: -10
                      }}> {vendorDtl.ADD2} </p>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{vendorDtl.ADD3}{" "}  </p>
                    </div>
                    <div className="col-md-6">
                      <h1 className="text-sm-left "
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20
                        }}
                      >
                        City:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{vendorDtl.CITY} </p>

                    </div>
                    <div className="col-md-6">
                      <h1 className="text-sm-left "
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20
                        }}
                      >
                        State:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{vendorDtl.STATE} </p>
                    </div>


                    <div className="col-md-6">
                      <h1 className="text-sm-left"
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20
                        }}
                      >
                        Country/Region:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{vendorDtl.COUNTRY} </p>
                    </div>
                    <div className="col-md-6">
                      <h1 className="text-sm-left "
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20
                        }}
                      >
                        PIN:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{vendorDtl.PINCODE} </p>
                    </div>
                    <div className="col-md-6">
                      <h1 className="text-sm-left "
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20

                        }}
                      >
                        Aadhar No:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,

                      }}> {uploadedData.ADHAR ?
                        <IconContext.Provider
                          value={{ color: "green", size: "20px" }}
                        >{uploadedData.ADHAR}
                          <FaEye
                            type="button"
                            style={{
                              marginLeft: "20px",
                              marginTop: -5
                            }}
                            onClick={(e) => { toggleCheckFlages(); setImageSrc(uploadedData.ADHAR_IMAGE) }}
                          />
                        </IconContext.Provider>
                        : "Not Filled"}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <h1 className="text-sm-left "
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20

                        }}
                      >
                        PAN No:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{uploadedData.PANCARD ? <IconContext.Provider
                        value={{ color: "green", size: "20px" }}
                      >{uploadedData.PANCARD}
                        <FaEye
                          type="button"
                          style={{
                            marginLeft: "20px",
                            marginTop: -5
                          }}
                          onClick={(e) => { toggleCheckFlages(); setImageSrc(uploadedData.PANCARD_IMAGE) }}
                        />
                      </IconContext.Provider> : "Not Filled"}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <h1 className="text-sm-left "
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20

                        }}
                      >
                        GST Reg No:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{uploadedData.GST ?

                        <IconContext.Provider
                          value={{ color: "green", size: "20px" }}
                        > {uploadedData.GST}
                          <FaEye
                            type="button"
                            style={{
                              marginLeft: "20px",
                              marginTop: -5
                            }}
                            onClick={(e) => { toggleCheckFlages(); setImageSrc(uploadedData.GST_IMAGE) }}
                          />
                        </IconContext.Provider>

                        : "Not Filled"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h1 className="text-sm-left "
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: -20

                        }}
                      >
                        MSME Certificate No:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{uploadedData.MSME ?
                        <IconContext.Provider
                          value={{ color: "green", size: "20px" }}
                        >{uploadedData.MSME}
                          <FaEye
                            type="button"
                            style={{
                              marginLeft: "20px",
                              marginTop: -5
                            }}
                            onClick={(e) => { toggleCheckFlages(); setImageSrc(uploadedData.MSME_IMAGE) }}
                          />
                        </IconContext.Provider>
                        : "Not Filled"}
                      </p>
                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">

                    </div>
                  </div>





                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Navbar/> */}

      </div>
      <div >

        <Footer />
      </div>
      {/* <button className="fab">
      <i className="material-icons"  onClick={() => {
            togglePODetailsFlag();
          }}><AiOutlineMessage size={40}/></i>
    </button> */}
      <Modal
        size="md"
        isOpen={showCheckFlages}
        toggle={toggleCheckFlages}
        style={{
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <ModalBody

        >
          <div className="modal-header model-md"
            style={{ marginTop: '-10px' }}
          >
            <h5 className="modal-title text-center" id="exampleModalLabel">
              {/* <p className="h4">Details: <span style={{ color: 'green' }}>{detailVal}</span></p> */}
            </h5>
            <a href='#' className="text-right" onClick={toggleCheckFlages}>Close</a>
          </div>
          <img className="col-md-12" src={AxioxExpPort + 'images/' + imageSrc} />



        </ModalBody>
      </Modal>
      <Modal className="modal-dialog modal-xl"

        isOpen={showPODetailsFlag}
        toggle={togglePODetailsFlag}
        size="lg"
        style={{
          display: "flex",
        }}
      >
        <div className="card-header">
          <h3 className="card-title">Send Your Query</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
              togglePODetailsFlag();
            }}>×</span>
          </button>
        </div>
        <div
          className='row'
        >
          <div className='col-md-7'>

            <div className="container">
              <h1 className="form-check-label">
                Customer Support
              </h1>
              <p>
                Welcome to our customer support page. We're here to help you with any
                questions or issues you may have. Below you'll find some helpful
                information to get started.
              </p>
              <h2>Frequently Asked Questions</h2>
              <ul>
                <li>
                  <strong>How do I contact customer support?</strong>
                  <p>
                    You can contact customer support by emailing us at
                    support@samishti.com or by filling out the contact form on our
                    website.
                  </p>
                </li>
              </ul>
              <h2>Contact Us</h2>
              <p>
                If you have any further questions or issues, please feel free to contact
                us using the form below:
              </p>

            </div>

          </div>
          <div className='col-md-4'>
            <form>
              {/* <label htmlFor="name">Subject</label>
<input type="text" id="note" name="note" required /> */}

              <label htmlFor="name">About:</label>
              <select id="name" name="name" required className="my-select">
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required className="no-resize"></textarea>


              <button type="submit" className="btn btn-info float-right">Save</button>
            </form>
          </div>
        </div>

        <div className="card-footer">
          <a onClick={() => {
            togglePODetailsFlag();
          }} className="btn btn-default" >Cancel</a>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
