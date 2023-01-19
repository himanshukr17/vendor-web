import React, { useState,  useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {AxioxExpPort} from "../AxioxExpPort"

import { AiFillAccountBook, AiOutlineArrowRight } from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaMegaport, FaFileContract,FaUsers,FaUserEdit } from "react-icons/fa";
import { BsFillCartCheckFill, BsFillBagXFill,BsReceiptCutoff } from "react-icons/bs";
import { AiFillReconciliation,AiOutlineBars } from "react-icons/ai";
import {
    AiOutlineArrowLeft,
    AiOutlineCloudDownload,
    AiOutlineDownload,
  } from "react-icons/ai";
import Footer from "../../Components/Footer";
import NavHeader from "../../Components/NavHeader";
function Profile() {
    const navigate = useNavigate();
    const [profileDetail, setProfileDetail] = useState([
        {
          AGREEMENT_DATE: "2022/10/26",
          CONTRACT_NUMBER: "445209283876",
          PLANT_NAME: "abc",
          ITEM_NAME: "XYZ Pvt Ltd",
          MATERIAL_NUMBER: "27346234982347",
          DESCRIPTION: "Your material is delivered successfully",
          TARGET_QUANTITY: "5000",
          TARGET_VALUE: "5000",
          OPEN_QUANTITY:"98723",
          NET_VALUE: "7600",
          RECEIVING_PLANT: "10000000",
          VALIDITY_START: "2022/08/01",
          VALIDITY_END: "2023/01/01",
        }
      ]);
      profileDetail.map((val)=>{

          console.log(val.TARGET_VALUE)
      })

      const [vendorDtl,setVendorDtl]= useState([]);
      const vendorId =localStorage.getItem('userId');

      useEffect(() => {
        axios.post(AxioxExpPort+"createcompany/details",{
          user: vendorId
        })
        .then((response) => {
          setVendorDtl(response.data);
   
        })
      }, []);
      const [company, setCompany]= useState("")
      console.log("response.data",vendorDtl);


  return (

    <div>
    <NavHeader />
    
      {/* <Navbar/> */}
      <div
        style={{
          marginTop: 45,
        }}
      >
      
        <div
          className="card-body"
          style={{
            display: "flex",
          }}
        >
          <div className="form-check form-check-inline">
            <button
              className="btn btn"
              style={{
                borderRadius: 50,
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <IconContext.Provider value={{ color: "white", size: "22px" }}>
                <AiOutlineArrowLeft />
              </IconContext.Provider>
            </button>
          </div>
          <div className="form-check form-check-inline">
            <h4 className="form-check-label" htmlFor="inlineRadio2" style={{color:"white"}}>
              {/* {location.PROJECT} */}
              {/* {location.state.name} */}
             Edit Profile
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
            <div className="icon"></div>

            <div className="inner">
            <div className="row">

              <h4 className="text-sm-left"
                style={{
                  color: "#0275d8",
                  fontSize: 20,
                  fontWeight: 700,
                  
                }}
              >
               Vendor ID:
              </h4>
              <p className="text-sm-left"    style={{
                  color: "#14CA96",
                  fontSize: 20,
                  fontWeight: 500,
                }}>{vendorDtl.VENDOR_ID}</p>


            </div>
              <h1 className="text-sm-left"
                style={{
                  color: "#0275d8",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
               Name:
              </h1>
              <p className="text-sm-left"    style={{
                  color: "#14CA96",
                  fontSize: 20,
                  fontWeight: 500,
                }}>{vendorDtl.VENDOR_NAME}</p>
              <h1 className="text-sm-left"
                style={{
                  color: "#0275d8",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
               Email:
              </h1>
              <p className="text-sm-left"    style={{
                  color: "#14CA96",
                  fontSize: 20,
                  fontWeight: 500,
                }}>{vendorDtl.EMAIL}</p>
               <h1 className="text-sm-left " 
                style={{
                  color: "#0275d8",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
               Phone:
              </h1>
              <p className="text-sm-left"    style={{
                  color: "#14CA96",
                  fontSize: 20,
                  fontWeight: 500,
                }}>{vendorDtl.TELEPHONE}</p> 
                <h1 className="text-sm-left " 
                style={{
                  color: "#0275d8",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
               Company(Legal) Name:

              </h1>
              <p className="text-sm-left"    style={{
                  color: "#14CA96",
                  fontSize: 20,
                  fontWeight: 500,
                }}>{vendorDtl.COMPANY_NAME}</p>
              {/* <p className="text-sm-left" >Name</p>
              <span className="text-success small pt-1 fw-bold text-sm-left">Vendor ID</span>{" "}
              <span className="text-muted small pt-2 ps-1">Name</span> */}
            </div>
            <div className="icon">
             
            <AiOutlineBars />
            </div>
            
          </div>
        </div> 
       
        <div className="col-lg-7 col-12">
          <div className="small-box bg-light">
            <div className="icon"></div>

            <div className="inner">
            <div className="row">

{/* 
            <h4 className="text-sm-left"
                style={{
                  color: "#0275d8",
                  fontSize: 20,
                  fontWeight: 700,
                  
                }}
              >
              Company(Legal) Name:
              </h4>
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" name="lname" onChange={(e)=>{setCompany(e.target.value)}}  value={vendorDtl.COMPANY_NAME}/></p>
             */}
            
           
<div className="row">
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
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" name="lname" value={vendorDtl.ADD1}/></p>
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" name="lname" value={vendorDtl.ADD2}/></p>
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" name="lname" value={vendorDtl.ADD3}/></p>
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
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" name="lname" value={vendorDtl.CITY}/></p>

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
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" value={vendorDtl.COUNTRY}/></p>
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
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" name="lname" value={vendorDtl.DESCRIPTION}/></p>
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
              <p className="text-sm-left"    style={{
                  color: "gray",
                  fontSize: 20,
                  fontWeight: 500,
                }}> <input type="text" className="form-control"
                    id="floatingInput" name="lname" value={vendorDtl.POSTAL_CODE}/></p>


              {/* <p className="text-sm-left" >Name</p>
              <span className="text-success small pt-1 fw-bold text-sm-left">Vendor ID</span>{" "}
              <span className="text-muted small pt-2 ps-1">Name</span> */}
            </div>
            <div className="icon">
              <FaUserEdit />
            </div>
            <div className="text-right">
                
            <button type="button" className="btn btn-secondary">Update</button>
            </div>
          </div>
        </div> 
        </div> 
      </div>
        {/* <Navbar/> */}
    
       
      
   
     
      </div>
      <div >

        <Footer    />
      </div>
   </div>
  );
}

export default Profile;
