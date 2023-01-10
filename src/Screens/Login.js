import React, { useState } from "react";

import cartoons from "../Images/cartoon.jpg";
import "../StyleSheets/LoginPage.css"
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import firebase from "../Firebase/Firebase";
import {AxioxExpPort} from "./AxioxExpPort"
function Login() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState(0);
  const [userVerified, setUserVerified] = useState(false);
  // const [OTP, setOTP] = useState(0);
  const [password, setPassword] = useState(0);

  const [wrongDetail,setWrongDetail]=useState("")
  const axios = require('axios')
  const loginHandle=(e)=>{
   e.preventDefault();
    axios.post(AxioxExpPort+'createcompany/login_mob', {
      user: userName,
      pass: password
    })
    .then((response)=> {
  
        //window.location.href="/dashboard"
        console.log("response",response);
        navigate('/dashboard');
      response.data.map((item)=>{localStorage.setItem('token',(item._id));localStorage.setItem('vendorId',(item.VENDOR_ID))})
    }).catch((err)=>{console.log(err); setWrongDetail("Please check Username or Password")})
  }

  return (
    // <div className="card">
    //   <div className="crd-body">

    //     <div className="row ">
    //       <div className="col-3"></div>

    //       <div className="col-6">

    //         <label style={{
    //             fontWeight:700,
    //             fontSize:22
    //         }}>Account Verification</label>
    //         <div className="form-floating mb-3">
    //           <input
    //             type="email"
    //             className="form-control"
    //             id="floatingInput"
    //             placeholder="Business Role"
    //           />
    //           <label htmlFor="floatingInput">Business Role </label>
    //         </div>
    //       </div>
    //       <div className="col-3"></div>
    //     </div>
    //   </div>
    // </div>

    <div
      className="box-form"
      style={
        {
          // marginTop: "10%",
        }
      }
    >
      <div className="left">
        <div className="overlay">
          {/* <h1>Hello World.</h1> */}
          <img src={cartoons} width={600} height={510} alt="Cartoons" />
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            et est sed felis aliquet sollicitudin
          </p> */}
          <span>
            {/* <a href="#">
              <i className="fa fa-facebook" aria-hidden="true" /> Login with
              Facebook
            </a> */}
            {/* <button
              style={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 50,
                borderColor: "black",
              }}
              className="btn"
            >
              <img
                src={google}
                style={{
                  marginRight: 10,
                }}
                width={20}
                height={20}
                alt="google"
              />
              Login with
            </button> */}

            {/* <button
              style={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 50,
                borderColor: "black",
                marginLeft: 20,
              }}
              className="btn"
            >
              <img
                src={facebook}
                style={{
                  marginRight: 10,
                }}
                width={20}
                height={20}
                alt="google"
              />
              Login with
            </button> */}
          </span>
        </div>
      </div>
      <div className="right">
        <h5
          style={{
            fontWeight: 700,
            fontSize: 40,
            marginTop: 20,
          }}
        >
          Login
        </h5>
        <p
          style={{
            marginTop: 50,
          }}
        >
          Don't have an account? <Link to="/signup">Creat Your Account</Link> it
          takes less than a minute
        </p>

        <div id="sign-in-button"></div>
        <form onSubmit={loginHandle}>
        <div className="inputs">
          {/* <input
            type="text"
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
          />
          <br />
          <a
            type="button"
            onClick={(e) => onSignInSubmit(e)}
            style={{
              float: "right",
              color: "blue",
            }}
          >
            Send OTP
          </a> */}
          
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
          <br />
          {/* <a
            type="button"
            onClick={(e) => onSignInSubmit(e)}
            style={{
              float: "right",
              color: "blue",
            }}
          >
            Send OTP
          </a> */}

          {/* <input
            type="text"
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            placeholder="Enter OTP"
          /> */}
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <p className="text-left" style={{color:"red"}}>{wrongDetail}</p>
        <br />
        <br />
        <div className="remember-me--forget-password">
          {/* Angular */}
          <label>
            <input type="checkbox" name="item" defaultChecked="" />
            <span className="text-checkbox">Remember me</span>
          </label>
          <p>forget password?</p>
        </div>
        <br />
      
        <button
         type="submit"
        // onClick={()=>{loginHandle()}}
          // onClick={(e) => {
          //   {
          //     userVerified ? navigate("/dashboard") : console.log("");
          //   }

          //   onSubmitOTP(e);
          // }}
         
        >
          Login
        </button>
        </form>
        {/* <p
          style={
            {
              // marginTop: 50,
            }
          }
        >
          Check Status of application<a href="/signup"> Here</a>
        </p> */}

        <p
          style={{
            // marginTop: "20%",
            marginRight: "50%",
          }}
        >
          Already Applied? Check Status of application{" "}
          <Link  to="/checkStatus"> Here </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
