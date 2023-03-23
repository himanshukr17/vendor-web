import React, { useEffect, useState } from "react";
import cartoons from "../Images/cartoon.jpg";
import "../StyleSheets/LoginPage.css"
import { Link, redirect, useNavigate } from "react-router-dom";
// import firebase from "../Firebase/Firebase";
import { AxioxExpPort } from "./AxioxExpPort"
function Login() {
  const navigate = useNavigate();
  const userID = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  const [vendorLg, setVendorLg] = useState(true)
  const [supplierLg, setSupplierLg] = useState(false)
  const [btnVActive, setBtnVActive] = useState('tablinks active')
  const [btnVActiveColor, setBtnVActiveColor] = useState('white')
  const [btnVActiveLoginColor, setBtnVActiveLoginColor] = useState('black')
  const [btnSActive, setBtnSActive] = useState('')
  const [userTypeGet, setUserTypeGet] = useState(false)
  const [userName, setUserName] = useState(0);
  const [userVerified, setUserVerified] = useState(false);
  // const [OTP, setOTP] = useState(0);

  const [password, setPassword] = useState(0);
  // const [dummy,setDummy]=useState(false)

  const [wrongDetail, setWrongDetail] = useState("")
  const axios = require('axios')
  if (userType =="false") {
    window.location.href = '/dashboard'
  } else if (userType =="true") {
    window.location.href = '/home'
    
  }else
  {

    const vendorLogin = () => {
      setVendorLg(true)
      setSupplierLg(false);

      // alert("shd")
      setBtnVActiveColor('white')
      setBtnVActive('active')
      setBtnSActive('tablinks')
      setBtnVActiveLoginColor('black')
    }
    const supplierLogin = () => {
      setSupplierLg(true);
      setVendorLg(false)
      setBtnVActiveLoginColor('white')
      setBtnVActiveColor('black')
      setBtnVActive('tablinks')
      setBtnSActive('tablinks active')

    }


    const loginHandle = (e) => {
         e.preventDefault();
         if(userTypeGet==false){
         axios.post(AxioxExpPort + 'createcompany/login_mob', {
           user: userName,
           pass: password
         })
          .then((response) => {
            // console.log()
            // if(response.data[0].IS_ADMIN==0){
            //   console.log("dlskgfags")
            // }
            console.log()
             localStorage.setItem('userType', (userTypeGet)); 
             localStorage.setItem('token', (response.data[0]._id)); 
             localStorage.setItem('userId', (response.data[0].VENDOR_ID));
             localStorage.setItem('userCompany', (response.data[0].COMPANY_NAME));
             window.location.href = "/dashboard"
            console.log("ress",response)

            }).catch((err) => {
              if(err.response.status==400){
                setWrongDetail("You are able to login after approve your application")
              }else{ setWrongDetail("Please check Username or Password")}
               })
    }else{
      var bUser=(userName).toString()
      axios.get(AxioxExpPort+'buyer/buyer_login?buyer='+bUser+'&&password='+password)
        .then((res) => {
          localStorage.setItem('userType', (userTypeGet)); 
          localStorage.setItem('token', (res.data[0]._id)); 
          localStorage.setItem('userId', (res.data[0].BUYER_ID));
          localStorage.setItem('userCompany', (res.data[0].COMPANY_NAME));
          if(res.data[0].BUYER_ID == 1){
            window.location.href = "/adminManageVendor"
          }else{
            window.location.href = "/home"
          }
        }).catch((err) => {  setWrongDetail("Please check Username or Password") })
    }
  }
  const styles = {
    background: 'linear-gradient(to right, #a7bfe8 50%, #385094 50%)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const stylesWelcome = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontFamily: 'Arial',
      fontSize: '2.5rem',
      color: '#a7bfe8',
      textShadow: '2px 2px 4px #000',
      marginBottom: '0.8rem',
    },

  };
  
    return (
      <>

<div style={styles} >

        <div
          className="box-form"
        >

          <div className="col-md-6 left ">
          <div style={stylesWelcome.container}>
      <h1 style={stylesWelcome.heading}>Welcome Back</h1>
      </div>
            {/* <h1>Hello World.</h1> */}
            {/* <img src={"https://rupeekx.com/assets/images/slider/login.gif"} width={"110%"}  style={{marginTop:50, display:"block", marginLeft:"auto",marginRight:"auto"}} alt="Cartoons" /> */}
            {/* <img src={"https://i.pinimg.com/originals/7a/db/71/7adb71ffcc3085a7d85cd4f0d1fbf5cc.gif"} width={"100%"}  alt="Cartoons" /> */}
            <img src={"https://backdocket.com/wp-content/uploads/2020/01/FEATURESPAGE.gif"} style={{ display:"block", marginLeft:"auto",marginRight:"auto"}} width={"100%"}  alt="Cartoons" />



          </div>
          <div className="col-md-6 right">
            <div className="tab">
              <button className={btnVActive} style={{color:btnVActiveColor}} type="button"  onClick={() => { vendorLogin(); setUserTypeGet(false) }}>Supplier Login</button>
              <button className={btnSActive} style={{color:btnVActiveLoginColor}} type="button" onClick={() => { supplierLogin(); setUserTypeGet(true) }}>Buyer Login	</button>
            </div>
            {vendorLg &&
              <>
                <p
                  style={{
                    marginTop: 10,
                    color:"#0f1c2e"
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
                    class="form-control"
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Username"
                    />
                    
                    <input
                    class="form-control"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                    />
                  </div>
                  <p className="text-left" style={{ color: "red" }}>{wrongDetail}</p>
                  <br />
                  <br />
                  <div className="remember-me--forget-password">
                    {/* Angular */}
                    {/* <label>
                      <input type="checkbox" name="item" defaultChecked="" />
                      <span className="text-checkbox">Remember me</span>
                    </label> */}
                    <Link to="/forgot_password"><p style={{color:"#0f1c2e"}}>Forget password?</p></Link>
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
                    marginRight: "40%",
                    color:"#0f1c2e"
                  }}
                >
                  Already Applied? Check Status of application{" "}
                  <Link to="/checkStatus"> Here </Link>
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
                  marginTop: "50px"
                }}>
                  <div className="inputs">
                 

                    <input
                    class="form-control"
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Username"
                    />
                    <input
                    class="form-control"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                    />
                  </div>
                  <p className="text-left" style={{ color: "red" }}>{wrongDetail}</p>
                  <br />
                  <br />
                  <div className="remember-me--forget-password">
                    {/* Angular */}
                    {/* <label>
                      <input type="checkbox" name="item" defaultChecked="" />
                      <span className="text-checkbox">Remember me</span>
                    </label> */}
                    <Link to="/forgot_password"><p style={{color:"#0f1c2e"}}>Forget password?</p></Link>                  </div>
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
        </div>
      </>
    );

  }
}

export default Login;
