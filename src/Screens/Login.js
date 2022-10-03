import React from 'react'
import "./style.css"
import cartoons from "../Images/cartoon.png";

import google from "../Images/googleIcon.svg"
import facebook from "../Images/facebookIcon.svg";

import { useNavigate } from "react-router-dom";

function Login() {
   const navigate = useNavigate();
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
      style={{
        marginTop: "10%",
      }}
    >
      <div className="left">
        <div className="overlay">
          {/* <h1>Hello World.</h1> */}
          <img src={cartoons} width={600} height={400} alt="Cartoons" />
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
            fontSize: 50,
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
          Don't have an account? <a href="/">Creat Your Account</a> it takes
          less than a minute
        </p>
        <div className="inputs">
          <input type="text" placeholder="Username" />
          <br />
          <a
            href="#"
            style={{
              float: "right",
              color: "blue",
            }}
          >
            Send OTP
          </a>

          <input type="text" placeholder="Enter OTP" />
        </div>
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
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login