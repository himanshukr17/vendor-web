import axios from 'axios';
import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap';
import OTPInputBox from '../Components/OTPInputBox'
import { AxioxExpPort } from './AxioxExpPort';
function ForgotPassword() {
  const [otp, setOTP] = useState("");
  const [getEmail, setGetEmail] = useState("")
  const [getOTP, setGetOPT] = useState("")
  const [toaster, setToaster] = useState("")
  const [toasterColor, setToasterColor] = useState("")
  const [status, setStatus] = useState(true)
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [matchPassword, setMatchPassword] = useState("")
  // const handleOTPChange = (newOTP) => {
  //   setOTP(newOTP);
  // };
  // Sending OTP
  const sendForgotPswOTP = () => {
    if (getEmail != "") {
      axios.post(AxioxExpPort + "createcompany/forget_password", {
        "email": getEmail,
        "new_otp": 0
      })
        .then((res) => {
          setGetOPT(res.data.OTP)
          console.log("resss", res.data.OTP)
          togglePODetailsFlag()
        })
    } else {
      setStatus(true)

      setToaster("Please enter your email")
      var xz = document.getElementById("snackbar");
      setToasterColor("#FF0000")
      xz.className = "show";
      setTimeout(function () {
        xz.className = xz.className.replace("show", "");
      }, 3000)

    }

  }

  // Check OTP is verified or not
  const optCheck = () => {
    if (otp == getOTP) {
      setStatus(false)
      togglePODetailsFlag();
      setToaster("OTP is Verified, change your password")
      var xz = document.getElementById("snackbar");
      setToasterColor("#00D100")
      xz.className = "show";
      setTimeout(function () {
        xz.className = xz.className.replace("show", "");
      }, 3000)
    } else {
      setStatus(true)
      togglePODetailsFlag();
      setToaster("OTP is not matched, Please try again")
      var xz = document.getElementById("snackbar");
      setToasterColor("#FF0000")
      xz.className = "show";
      setTimeout(function () {
        xz.className = xz.className.replace("show", "");
      }, 3000)
    }
  }
  const [isValid, setIsValid] = useState(true);
  // check the formated password
  const handlePassword = (event) => {
    const newValue = event;
    setIsValid(true);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={};':",.<>?])[a-zA-Z\d!@#$%^&*()_+={};':",.<>?]{8,15}$/;
    if (!regex.test(newValue)) {
      setIsValid(false);
    }
  }
  // handeling the repeat password
  const handleRepeatPassword = (event) => {
    if (password != event) {
      setCheckPassword("Repeat password doesn't match Password. ")
      setMatchPassword(null)
    } else {
      setCheckPassword(null)
      setMatchPassword("Password is matching.")
    }
  }
// Submit the updated password
  const savePassword = () => {
    if (repeatPassword == password && isValid) {
      axios.post(AxioxExpPort + "createcompany/forget_password", {
        "email": getEmail,
        "new_otp": 0,
        "password": repeatPassword
      })
        .then((res) => {
          console.log("resss", res.data)
          setToaster("Your password is updated successfully")
          var xz = document.getElementById("snackbar");
          setToasterColor("#008000")
          xz.className = "show";
          setTimeout(function () {
            xz.className = xz.className.replace("show", "");
          }, 3000)
          window.location.href = "/";
        })
    } else {

      setToaster("Your password is not matched, Please check again")
      var xz = document.getElementById("snackbar");
      setToasterColor("#FF0000")
      xz.className = "show";
      setTimeout(function () {
        xz.className = xz.className.replace("show", "");
      }, 3000)

    }
  }
  // handeling the modAL 
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);

  return (
    <>
      <div id="snackbar" style={{ backgroundColor: toasterColor, borderRadius: "50px" }}>{toaster}</div>

      <div
        className="box-form"
        style={{ marginTop: 40, display: "block", marginLeft: "auto", marginRight: "auto" }} width={"20%"} height={300}
      >
        {
          status ?
            <>
              <img src="https://calendar.thehoneybunfoundation.com/lottie/anime1.gif" width={"50%"} style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} height={300} alt="Cartoons" />
              <h1 style={{ marginTop: -50, textAlign: "center", color: "#4F51C0" }} > Forgot Password</h1>
              <p style={{ textAlign: "center" }} > To Forgot your password, enter the email address you use to sign in to Vendor Potal.</p>
              <from>
                <div className="row" style={{ marginTop: 15, marginBottom: 35 }}>


                  <div className="col-md-1">

                  </div>
                  <div className="col-md-10">
                    <div
                      className="form-floating mb-3"

                    >
                      <input required
                        type="email"

                        className="form-control"

                        onChange={(e) => { setGetEmail(e.target.value) }}
                        placeholder="Email"
                      />
                      <label htmlFor="floatingInput">Email*</label>

                    </div>
                  </div>
                  <div className="col-md-1">


                  </div>
                  <div className="col-md-1">

                  </div>
                  <div className="col-md-10">
                    <button type="button" style={{ width: "100%", height: 40, color: "white", borderRadius: 5, backgroundColor: "#4F51C0" }} onClick={sendForgotPswOTP} >Send OTP to Your Email </button>{" "}

                  </div>
                  <div className="col-md-1">

                  </div>
                </div>
              </from>
            </>
            :
            <>
              <img src="https://calendar.thehoneybunfoundation.com/lottie/anime1.gif" width={"50%"} style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} height={300} alt="Cartoons" />
              <h1 style={{ marginTop: -50, textAlign: "center", color: "#4F51C0" }} > Change Password</h1>
              <from>
                <div className="row" style={{ marginTop: 15, marginBottom: 35 }}>


                  <div className="col-md-1">

                  </div>
                  <div className="col-md-10">
                    <input required
                      type="email"
                      value={getEmail}
                      readOnly
                      className="form-control"

                      onChange={(e) => { setGetEmail(e.target.value) }}
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-md-1">

                  </div>
                  <div className="col-md-1">

                  </div>
                  <div className="col-md-5" style={{ marginTop: 10 }}>
                    <div
                      className="form-floating mb-3"

                    >
                      <input required
                        type="Password"

                        className="form-control"

                        onChange={(e) => {
                          setPassword(e.target.value)
                          handlePassword(e.target.value)
                        }} placeholder="Password"
                      />
                      <label htmlFor="floatingInput">Password*</label>
                      {!isValid && <p style={{ fontSize: 8 }}>Please enter a valid input with minimum 8 character using [a-z],[A-Z],[0-9] and [ /[!@#$%^&*(),.?":{ }|<>]/</> ].</p>}
                    </div>
                  </div>
                  <div className="col-md-5" style={{ marginTop: 10 }}>
                    <div
                      className="form-floating mb-3"

                    >
                      <input required
                        type="Password"

                        className="form-control"

                        onChange={(e) => {
                          setRepeatPassword(e.target.value)
                          handleRepeatPassword(e.target.value)
                        }} placeholder="Password"
                      />
                      <label htmlFor="floatingInput">Confirm Password*</label>
                      <p className="text-left text-danger" style={{ fontSize: 8 }}>{checkPassword}</p>
                      <p className="text-left text-success" style={{ fontSize: 8, marginTop: "-5px" }}>{matchPassword}</p>

                    </div>
                  </div>
                  <div className="col-md-1">


                  </div>

                  <div className="col-md-1">

                  </div>
                  <div className="col-md-10">
                    <button type="button" style={{ width: "100%", height: 40, color: "white", borderRadius: 5, backgroundColor: "#4F51C0" }} onClick={savePassword} >Save </button>{" "}

                  </div>
                  <div className="col-md-1">

                  </div>
                </div>
              </from>
            </>
        }




      </div>
      <Modal size="sm"
        isOpen={showPODetailsFlag}
        toggle={togglePODetailsFlag}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100
        }}
      >
        <ModalBody
          style={{
            marginTop: 0,
          }}
        >
          <div className="col-md-2">

          </div>
          <div className="col-md-8" >
            <h6 className="modal-title " id="exampleModalLabel">
              Enter OTP send to your email
            </h6>
          </div>
          <div className="col-md-2">

          </div>

          <input required
            type="text"

            className="form-control"
            style={{ marginTop: 10 }}
            onChange={(e) => { setOTP(e.target.value) }}
            placeholder="OTP"
          />
          <div style={{ textAlign: 'center' }}>
            <button type="button" title="Click to active check" style={{ width: "50%", marginTop: 10, alignSelf: 'center', height: 35, borderWidth: 3, fontFamily: "serif", borderRadius: 5, color: "#4F51C0", borderColor: "#4F51C0" }} onClick={optCheck}>Submit</button>
          </div>
          {/* <div className="modal-footer">
            <a
              className="navbar-brand"
              type="button"
              style={{
                color: "#007bff",
                float: "right",
                padding: 1,
                height: '5px'
              }}
              onClick={() => {
                togglePODetailsFlag();
              }}
            >
              Close
            </a>
          </div> */}
        </ModalBody>
      </Modal>
    </>
  )
}

export default ForgotPassword