import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AxioxExpPort } from "../AxioxExpPort"
import { FaUserEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
  AiOutlineArrowLeft,
} from "react-icons/ai";
import Footer from "../../Components/Footer";
import NavHeader from "../../Components/NavHeader";
const  VendorProfile=(props)=>{
  const locationID=useLocation();
  const vendorId = locationID.state.myVendorID;
  const vendorName = locationID.state.myVendorName;
  const navigate = useNavigate();
  const [profileDetail, setProfileDetail] = useState([]);
  profileDetail.map((val) => {

    console.log(val.TARGET_VALUE)
  })

  const [vendorDtl, setVendorDtl] = useState([]);

  useEffect(() => {
    axios.post(AxioxExpPort +"createcompany/details", {
      user: vendorId
    })
      .then((response) => {
        setVendorDtl(response.data);

      })
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

  console.log("imageimage", image);


  return (

    <div>
      <NavHeader />

      {/* <Navbar/> */}
      <div

      >
      
        <div
          className="card-body"
          style={{
            display: "flex",
            marginTop:"5%",
            marginBottom:"-2%"
          }}
        >
           <div className="form-check form-check-inline">
            <button
              className="btn btn"
             
              onClick={() => {
                navigate("/mv");
              }}
            >
              <IconContext.Provider value={{ color: "#000", size: "22px" }}>
                <AiOutlineArrowLeft />
              </IconContext.Provider>
            </button>
          </div>
          <div className="form-check form-check-inline">
            <h4 className="form-check-label" htmlFor="inlineRadio2" style={{ color: "#00001" }}>
              {/* {location.PROJECT} */}
              {/* {location.state.name} */}
              {vendorName}
            </h4>
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

                <img className="col-md-12" style={{ alignSelf: "center",alignItems:"center", display: 'flex', height: '230px', borderRadius:"50px", marginTop:5 }} src={"https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"} />
                <input
        style={{ display: "none" }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <div className="button" onClick={(e)=>onButtonClick(e)}>
        {/* <FaUserEdit size={20} style={{marginTop:"-40"}} /> */}
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
                  }}
                >
                  Name:<span  style={{
                  color: "#14CA96",}}> {vendorDtl.FIRST_NAME}{" "+vendorDtl.LAST_NAME}</span>
                </h1>
              
                <h1 className="text-sm-left"
                  style={{
                    color: "#0275d8",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Email:<span  style={{
                  color: "#14CA96",}}> {vendorDtl.EMAIL}</span>
                </h1>
                <h1 className="text-sm-left "
                  style={{
                    color: "#0275d8",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Phone: <span  style={{
                  color: "#14CA96",}}> {" "+vendorDtl.TELEPHONE}</span>
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
                  <div className="col-md-12">
                  <h1 className="text-sm-left"
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                        }}
                      >
                         Company(Legal) Name:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}> {vendorDtl.COMPANY_NAME}</p>
                  </div>
                    <div className="col-md-6">
                      <h1 className="text-sm-left"
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
                        }}
                      >
                        Address:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}> {vendorDtl.ADD1}</p>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
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
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h1 className="text-sm-left"
                        style={{
                          color: "#0275d8",
                          fontSize: 20,
                          fontWeight: 700,
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
                        }}
                      >
                        State:
                      </h1>
                      <p className="text-sm-left" style={{
                        color: "gray",
                        fontSize: 20,
                        fontWeight: 500,
                      }}>{vendorDtl.DESCRIPTION} </p>
                    </div>
                  </div>

                  <h1 className="text-sm-left "
                    style={{
                      color: "#0275d8",
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    PIN:
                  </h1>
                  <p className="text-sm-left" style={{
                    color: "gray",
                    fontSize: 20,
                    fontWeight: 500,
                  }}>{vendorDtl.POSTAL_CODE} </p>


                 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Navbar/> */}

      </div>
      <div >

      </div>
    </div>
  );
}

export default VendorProfile;
