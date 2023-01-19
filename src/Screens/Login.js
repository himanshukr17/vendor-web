import React, { useEffect, useState } from "react";
import cartoons from "../Images/cartoon.jpg";
import "../StyleSheets/LoginPage.css"
import { Link, redirect, useNavigate } from "react-router-dom";
// import firebase from "../Firebase/Firebase";
import {AxioxExpPort} from "./AxioxExpPort"
function Login() {
  const navigate = useNavigate();
  const [vendorLg,setVendorLg]=useState(true)
  const [supplierLg,setSupplierLg]=useState(false)
  const [btnVActive,setBtnVActive]=useState('tablinks active')
  const [btnSActive,setBtnSActive]=useState('')
  const [userTypeGet,setUserTypeGet]=useState(false)
  const vendorLogin=()=>{
    setVendorLg(true)
    setSupplierLg(false);

    // alert("shd")
    setBtnVActive('active')
    setBtnSActive('tablinks')
  }
  const supplierLogin=()=>{
    setSupplierLg(true);
    setVendorLg(false)
    setBtnVActive('tablinks')
    setBtnSActive('tablinks active')

  }
  const [userName, setUserName] = useState(0);
  const [userVerified, setUserVerified] = useState(false);
  // const [OTP, setOTP] = useState(0);

  const [password, setPassword] = useState(0);
  // const [dummy,setDummy]=useState(false)

  const [wrongDetail,setWrongDetail]=useState("")
  const axios = require('axios')
  const loginHandle=(e)=>{
    if(userTypeGet==false){
      e.preventDefault();
      axios.post(AxioxExpPort+'createcompany/login_mob', {
        user: userName,
        pass: password
      })
      .then((response)=> {
        // navigate('/dashboard');
        window.location.href="/dashboard"
        response.data.map((item)=>{console.log("soumen",item);localStorage.setItem('userType',(userTypeGet));localStorage.setItem('token',(item._id));localStorage.setItem('userId',(item.VENDOR_ID))})
      }).catch((err)=>{console.log(err); setWrongDetail("Please check Username or Password")})
    }else if(userTypeGet==true){

      e.preventDefault();
      axios.post(AxioxExpPort+'createcompany/login_mob', {
        user: userName,
        pass: password
      })
      .then((response)=> {
    
          //window.location.href="/dashboard"
          console.log("response",response);
           window.location.href ='/home'
          // navigate();
        response.data.map((item)=>{
          console.log("soumen",item);localStorage.setItem('userType',(userTypeGet));
          localStorage.setItem('token',(item._id));localStorage.setItem('userId',(item.VENDOR_ID))})
      }).catch((err)=>{console.log(err); setWrongDetail("Please check Username or Password")})
    }
    }
   

  return (
    <>



    <div
      className="box-form"
    >
    
      <div className="col-md-6 left ">
       
          {/* <h1>Hello World.</h1> */}
          <img src={cartoons} width={600} height={520} style={{marginBottom:"10px"}}  alt="Cartoons" />
     
     
     
      </div>
      <div className="col-md-6 right">
      <div className="tab">
  <button  className={btnVActive} type="button" onClick={()=>{vendorLogin();setUserTypeGet(false)}}>Vendor Login</button>
  <button  className={btnSActive} type="button" onClick={()=>{supplierLogin();setUserTypeGet(true)}}>Supplier Login	</button>
</div>
     { vendorLg &&
        <>
        <p
          style={{
            marginTop: 10,
          }}
        >
          Don't have an account? <Link to="/signup">Creat Your Account</Link> it
          takes less than a minute
        </p>

     
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
      
        <button className="loginBtn"
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
        </>
  }
  {
    supplierLg &&
  <>

 
       
        {/* <p
          style={{
            marginTop: 10,
          }}
        >
          Don't have an account? <Link to="/signup">Creat Your Account</Link> it
          takes less than a minute
        </p> */}
        <div id="sign-in-button"></div>
        <form onSubmit={loginHandle} style={{
          marginTop:"68px"
        }}>
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
        className="loginBtn"
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
  
        </>
  }
      </div>
    </div>
    </>
  );
}

export default Login;
