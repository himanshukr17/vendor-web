import React, { useRef, useState, useEffect } from "react";

import { AxioxExpPort } from "./AxioxExpPort";
import { AiOutlineSend, AiOutlineCloudUpload } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { BsCheckLg, BsCloudCheckFill } from "react-icons/bs";

function SignUp() {
  const [toaster,setToaster]=useState("")
  const [toasterColor,setToasterColor]=useState("")
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const [showCheckFlag, setShowCheckFlag] = useState(false);

  const toggleCheckFlag = () => setShowCheckFlag(!showCheckFlag);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
  const [showPODetailsFlages, setShowPODetailsFlages] = useState(false);
  const [showCheckFlages, setShowCheckFlages] = useState(false);

  const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
  const togglePODetailsFlages = () => setShowPODetailsFlages(!showPODetailsFlages);

  const [companyLegalName, setCompanyLegalName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [language, setLanguage] = useState("");
  const [pannumber, setPannumber] = useState("");
  const [phone, setPhone] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [businessRole, setBusinessRole] = useState("");
  const [faxNo, setFaxNo] = useState("");
  const [termAndCondition, setTermAndCondition] = useState(false);
  const [chooseFile,setChooseFile]=useState("")

  const [countrys, setCountrys] = useState([])

  const navigate = useNavigate();
  const labelArray = ["Company", "Administrator Account Information"];
  const [age, setAge] = useState();
  console.log(companyLegalName);
  const [currentStep, updateCurrentStep] = useState(1);
  function updateStep(step) {
    //Updaing steps on Click
    updateCurrentStep(step);
  }



  const [panDiv, setPanDiv]=useState(true)
  const [wornignInput, setWorningInput] = useState(false)
  const [wornignOtp, setWorningOtp] = useState(false)
  const ref = useRef(null)
  const [termCheck, setTermCheck] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [matchPassword, setMatchPassword] = useState("")
  var theConfirmPassw;
  const handleRepeatPassword = (event) => {

    if (password != event) {

      setCheckPassword("Repeat password doesn't match Password. ")
      setMatchPassword(null)
    } else {
      setCheckPassword(null)
      setMatchPassword("Password is matching.")

    }
  }

  const [stateArr, setStateArr] = useState([])
  const [languageArr,setLanguageArr]=useState([])
  const [roleDesc,setRoleDesc]=useState([])

  useEffect(() => {
    axios.get(AxioxExpPort + "country/all")
      .then((response) => {
        setCountrys(response.data);

      })
      axios.get(AxioxExpPort + "language/all")
      .then((response) => {
        // (response.data).map((val,index)=>{
        //   setLanguageArr({vaval.})
        // })
        setLanguageArr(response.data);

      })
      axios.get(AxioxExpPort + "industry/all")
      .then((response) => {
        // (response.data).map((val,index)=>{
        //   setLanguageArr({vaval.})
        // })
        setRoleDesc(response.data);

      })
  }, []);
  const [checkPaUpload,setCheckPanupload]=useState(false)
  const stSt = (e) => {
    const countriess = countrys.find((user) => user.COUNTRY_KEY === e);
    //console.log("countriess",countriess.STATE)
    setStateArr(countriess.STATE);
  }
  console.log("response.datas", stateArr);
  //  password check
  const handlePassword = (event) => {

    if (repeatPassword != event) {

      setCheckPassword("Repeat password doesn't match Password. ")
      setMatchPassword(null)
    } else {
      setCheckPassword(null)
      setMatchPassword("Password is matching.")

    }
  }
  // OTP Send
  


  const [optConst, setOtpConst] = useState(null);
  const [worningMailVerify, setworningMailVerify] = useState(false)
  const [otpSendBtn,setOtpSendBtn]=useState(true)
  const sendOtp = () => {
    setShowOtp('');
    var email = document.getElementById('emailInputVerify').value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {

      setworningMailVerify(true)

    } else {
      setworningMailVerify(false)
      axios.post(AxioxExpPort + "createcompany/sendotp", {
        "email": email,
      })
        .then((res) => { setShowOtp(true); 
          console.log('resres',res);
          document.getElementById("emailInputVerify").disabled = true;
          setOtpSendBtn(false)
          setOtpConst(res.data.OTP) })
        .catch((err) => { console.log(err) });
    }


  }
  
  // const [checkOtpSym,setCheckOtpSym]=useEffect(false)
  const validateOtp = () => {
    
    //alert('validateOtp')
    setWorningOtp(false)
    if (optConst == otp) {
      document.getElementById("otpInput").className = "form-control is-valid"
      
      document.getElementById("emailInputVerify").disabled = true;
      document.getElementById("checkEmailBtn").style.visibility = "hidden";
      document.getElementById("checkEmailBtnS").style.visibility = "visible";
     
      setToaster("OTP is Verified")
      var xz = document.getElementById("snackbar");
      setToasterColor("#00D100")
      xz.className = "show";
      setTimeout(function(){
         xz.className = xz.className.replace("show", ""); }, 3000)
      setTimeout(function(){  document.getElementById("otpSendBtn").style.display = "none";}, 3000)

      setTimeout(function(){document.getElementById("otpInput").style.display = "none"}, 3000)
     
      // className="form-control is-invalid"
      // document.getElementById("otpInput").className.add('is-valid');
    } else {
      setWorningOtp(true)
      document.getElementById("otpInput").className = "form-control is-invalid"

    }

  }
  const[phonePan,setPhonePan]=useState("")

  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

  const handleInputChange = (event) => {
    console.log("event.target.value",event.target.value.length);
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
    console.log(event.target.files[0]);
  }
  const [errorUploadPan, setErrorUploadPan] = useState(false)
  const uploadPan = async()=>{
    const formData = new FormData(); 
    formData.append("image", userInfo.file);
    formData.append("pancard",pannumber);
    
if( phone.toString().length==0 || chooseFile.length == 0 || pannumber.length== 0){
  setErrorUploadPan(true)
  setToaster("Fill with Correct Input")
  var xz = document.getElementById("snackbar");
  setToasterColor("red")
  xz.className = "show";
  setTimeout(function(){
     xz.className = xz.className.replace("show", ""); }, 3000)
 
}
    else{
      try {

        const response = axios({
             method: "post",
            
             url: AxioxExpPort+"createcompany/file?phone_number="+phone,
             data:formData,
             headers: { "Content-Type": "multipart/form-data" },
           }).then((res)=>{
            
            
            console.log("res",res.status)
            if(res.status===200){
              setPanDiv(false)
              document.getElementById("phoneNumber").disabled = true;
              document.getElementById("PAN_Number").disabled = true;
              document.getElementById("upload_file").disabled = true;
              setToaster("PAN Card uploaded successful")
              var xz = document.getElementById("snackbar");
              setToasterColor("#00D100")
              xz.className = "show";
              setTimeout(function(){
                 xz.className = xz.className.replace("show", ""); }, 3000)
              
            }else{
              setToaster("Try again")
              var xz = document.getElementById("snackbar");
              setToasterColor("red")
              xz.className = "show";
              setTimeout(function(){
                 xz.className = xz.className.replace("show", ""); }, 3000)
            }
           
          });
        
           } catch(error) {
            setToaster("Try again")
              var xz = document.getElementById("snackbar");
              setToasterColor("red")
              xz.className = "show";
              setTimeout(function(){
                 xz.className = xz.className.replace("show", ""); }, 3000)
           }
    }

  }
  const [error, setErrorsss] = useState(false)
  
  const submitForm = (e) => {
    e.preventDefault();

    // toggleCheckFlages();
    if (firstName.length == 0 || lastName.length == 0 || email.length == 0 || companyLegalName.length == 0 || pinCode.length == 0 || city.length == 0 || state.length == 0 || country.length == 0 || addressLine1.length == 0 || businessRole.length == 0 || password.length == 0 || repeatPassword.length == 0 || userName.length == 0 || chooseFile.length==0 ) {
      setErrorsss(true);
      setworningMailVerify(false)
      console.log("here ouside")
      // if (optConst  == otp ) {
      //   setWorningOtp(false)
      // } else {
      //   console.log("check terms and condition")
      //   setWorningOtp(true)
      // }

      // }else if(firstName.length!=0 && lastName.length !=0 && email.length !=0 && companyLegalName.length !=0 &&  pinCode.length !=0 &&  city.length !=0 &&  state.length !=0 &&  country.length !=0 &&  addressLine1.length !=0 &&  businessRole.length !=0 &&  password.length !=0 &&  repeatPassword.length !=0 &&  userName.length !=0  && termCheck==true ) 
    } else if (termCheck == true) {
      // if (optConst  == otp && checkPaUpload == true) {
      alert("sdhbhj")
       
        // console.log("here inside")
        axios.post(AxioxExpPort + "createcompany/", {
          "VENDOR_ID": pinCode,
          "FIRST_NAME": firstName,
          "LAST_NAME": lastName,
          "E_MAIL": email,
          "USERNAME": userName,
          "PASS": repeatPassword,
          "ROLE": businessRole,
          "COMPANY_NAME": companyLegalName,
          "ADD1": addressLine1,
          "ADD2": addressLine2,
          "ADD3": addressLine3,
          "COUNTRY": country,
          "STATAE": state,
          "CITY": city,
          "FAX_NO": faxNo,
          "lan":language,
          "PINCODE": pinCode,
          "STATUS":2

       
        })
          .then((res) => { toggleCheckFlages();  setToasterColor("#00D100"); 
        
          setToaster("Your Application is Successfully Submitted");
          var xy = document.getElementById("snackbar");
          xy.className = "show";  setTimeout(function(){     xy.className = xy.className.replace("show", ""); }, 3000) })
          .catch((err) => { console.log(err);setToasterColor("#f44336");   
          var xy = document.getElementById("snackbar");
          xy.className = "show";    
          setToaster("Something went wrong please try again"); setTimeout(function(){     xy.className = xy.className.replace("show", ""); }, 3000) } );
      // } else {
      //   // setWorningOtp(true)
      //   setToaster("Try again after some time")
      //   var xz = document.getElementById("snackbar");
      //   setToasterColor("red")
      //   xz.className = "show";
      //   setTimeout(function(){
      //      xz.className = xz.className.replace("show", ""); }, 3000)
      // }

    } else {
      console.log("check terms and condition")
      setWorningInput(true);
      setToaster("Check terms and condition")
      var xz = document.getElementById("snackbar");
      setToasterColor("red")
      xz.className = "show";
      setTimeout(function(){
         xz.className = xz.className.replace("show", ""); }, 3000)

    }


  }


  return (
    <>
<div id="snackbar" style={{backgroundColor:toasterColor, borderRadius:"50px"}}>{toaster}</div>
      <h2
        style={{
          color: "#fff",
        }}
      >
        SignUp
      </h2>

      <div
        className=""
        style={{
          width: "80%",
          marginLeft: "10%",
        }}
      >
        <div
          className="card"
          style={
            {
              // marginTop:"2%"
            }
          }
        >
          <>
            <p
              style={{
                marginTop: "2%",
                marginLeft: "2%",
                textAlign: "left",
              }}
            >
              Already have an account? <Link to="/">Login</Link>{" "}

            </p>
            <form>
              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                  marginTop: "2%",
                }}
              >
                <input required
                  type="text"
                  className="form-control"
                  
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First name *"
                />
                <label htmlFor="floatingInput">First Name*</label>
                {error && firstName.length <= 0 ?
                  <p className="text-left text-danger">First Name is required</p>
                  : ""}
              </div>

              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="text"
                  className="form-control"
                  
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Last Name*</label>
                {error && lastName.length <= 0 ?
                  <p className="text-left text-danger">Last Name is required</p>
                  : ""}
              </div>
              <div className="row">
              <div className="col-md-5"  style={{
                  marginLeft: "2%",
                 
                }}>
              <div
                className="form-floating mb-3"
               
              >
                <input required
                  type="text"
                  className="form-control"
                  
                  placeholder="Phone"
                  id="phoneNumber"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Phone*</label>
                {errorUploadPan || error &&  phone.length<=0 ?
                  <p className="text-left text-danger">Phone is required</p>
                  : ""}
                
              </div>
              </div>
                <div className="col-md-6">
                <div className="row">
                <div className="col-md-11">
                <div
                    className="form-floating mb-3"
                  
                  >
                    <input required
                      type="email"

                      className="form-control"
                      id="emailInputVerify"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Email*</label>
                    {error && email.length <= 0 ?
                      <p className="text-left text-danger">Email is required</p>
                      : ""}
                    {worningMailVerify ?
                      <p className="text-left text-danger">Please provide a valid email address</p>
                      : ""}
                    {wornignOtp ?
                      <p className="text-left text-danger">OTP dos't match,Please Verify your OTP again</p>
                      : ""}

                  </div> 
                </div>
                <div className="col-md-1">
                {
                      otpSendBtn ? 
                                  <AiOutlineSend  size={35} id="otpSendBtn" style={{  marginTop:"10px", color: "orange" }} type="button" onClick={sendOtp}/>
                 :                
                 
                 <a  >  <BsCheckLg size={30} id="checkEmailBtnS"  style={{width:"45px", visibility:"hidden",marginTop:"12px", color: "green"}}>Resend </BsCheckLg> <p onClick={sendOtp} type="button" className="text-left text-danger" id="checkEmailBtn"  style={{width:"45px", marginTop:"-7px",fontStyle: 'italic',textDecorationLine: 'underline', fontSize:"13px" }}>Resend </p> </a>
}
               
                </div>


               
                </div>     
                </div>     
              </div>


              {showOtp &&
              <div className="row">
                <div className="col-md-5">
                
                </div>
                <div className="col-md-6"
                 >
                <div className="row">
                  <div className="col-md-11">
                  <div
                  className="form-group"
                  style={{
                    marginLeft: "4.2%",
                    marginRight:"-20px",
                  }}
                >
                  <input required
                    type="text"
                    className="form-control"
                    id="otpInput"
                    // className="form-control is-valid"
                    // className="form-control is-invalid"
                    placeholder="Enter OTP send to your email"
                    onChange={(e) => {
                    
                      setOtp(e.target.value);
                    }}

                  />
                </div>

                  </div>
                  <div className="col-md-1">
                 
                    
                                  <AiOutlineSend  size={25} id="otpSendBtn"  onClick={() => {
                      validateOtp();
                     
                    }} style={{ marginLeft: "70%",marginTop:"5px",
                     color: "orange", fontStyle: 'italic', textDecorationLine: 'underline' }} type="button"/>
                    
                  </div>
                </div>
               
                </div>
              </div>
                
              }


              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="email"
                  className="form-control"
                  
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Username*</label>
                {error && userName.length <= 0 ?
                  <p className="text-left text-danger">Username is required</p>
                  : ""}
              </div>

              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="password"
                  className="form-control"
                  
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handlePassword(e.target.value)
                  }}
                  placeholder="Company(legal) Name"
                />
                <label htmlFor="floatingInput">Password*</label>
                {error && password.length <= 0 ?
                  <p className="text-left text-danger">Password is required</p>
                  : ""}
              </div>

              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="password"
                  className="form-control"
                  
                  placeholder="Repeat Password"
                  onChange={(e) => {
                    handleRepeatPassword(e.target.value)
                    setRepeatPassword(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Repeat Password*</label>
                <p>
                  {error && repeatPassword.length <= 0 ?
                    <p className="text-left text-danger">Repeat Password is required</p>
                    : ""}</p>
                <p className="text-left text-danger">{checkPassword}</p>
                <p className="text-left text-success" style={{ marginTop: "-5px" }}>{matchPassword}</p>

              </div>

       <p>{''}</p>

              <div
                className="form-floating mb-3"
                style={{
                 
                  marginLeft: "2%",
                  marginRight: "2%",
                  
                }}
              >

<select className="form-control" type="text" onChange={(e) => { setBusinessRole(e.target.value)}}
                    >
                      <option selected disabled>--Select Business Role--</option>
                       {roleDesc.map((val,index) => {
                        return (
                          <option key={index} value={val.INDUSTRY}>{val.DESCRIPTION}</option>
                        );
                      })} 

                    </select>
                {/* <input
                  type="text"
                  className="form-control"
                  
                  placeholder="Business Role"
                  onChange={(e) => {
                    setBusinessRole(e.target.value);
                  }}
                /> */}
                <label htmlFor="floatingInput">Business Role* </label>
                {error && businessRole.length <= 0 ?
                  <p className="text-left text-danger">Business Role is required</p>
                  : ""}
              </div>
              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="text"
                  className="form-control form-group"
                  
                  onChange={(e) => {
                    setFaxNo(e.target.value);
                  }}
                  placeholder="FAX No."
                />
                <label htmlFor="floatingInput">FAX No.*</label>
                {error && faxNo.length <= 0 ?
                  <p className="text-left text-danger"  style={{ marginTop: "-15px" }}>FAX No. is required</p>
                  : ""}
              </div>

              
                <div className="row" >
              <div className="col-md-5"   style={{
                  marginLeft: "2%",
                }}>
              <div
                className="form-floating mb-3"
              
              >
                <input required
                  type="text"
                  className="form-control"
                  
                  placeholder="PAN Number"
                  id="PAN_Number"
                  onChange={(e) => {
                    setPannumber(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">PAN Number*</label>
                { errorUploadPan || error && pannumber.length <= 0 ?
                  <p className="text-left text-danger">PAN Number required</p>
                  : ""}
                
              </div>
              </div>
              <div className="col-md-6">
              <div className="row">
                <div className="col-md-11">
                <div
                className="form-floating mb-1"
                
              >
                {/* <input required
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                /> */}
                {/* <input type="text" className="form-control" name="optionInputVal"   required placeholder="Select PAN Card*" onChange={(e)=>{}} /> */}
                <input type="file" className="form-control" id="upload_file" name="upload_file" onChange={(e) => {
                    setChooseFile(e.target.value);
                    handleInputChange(e)
                  }} />

                 <label  style={{marginTop:"-8px"}} htmlFor="floatingInput" >Choose PAN Card*</label> 
                {errorUploadPan || error && chooseFile.length <= 0 ?
                  <p className="text-left text-danger">Please Check correct Phone Number / PAN Number / PAN Card </p>
                  : ""}
               
              </div>
              </div>
              
                <div className="col-md-1">
                {panDiv? 
                <AiOutlineCloudUpload  size={35} style={{  marginTop:"10px", color: "orange", fontStyle: 'italic', textDecorationLine: 'underline' }} type="button" onClick={uploadPan}/>
                : 
                <BsCloudCheckFill  size={35} style={{  marginTop:"10px", color: "green", fontStyle: 'italic', textDecorationLine: 'underline' }} />

                }
                </div>
                </div>
              </div>
              </div>
             
              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="text"
                  className="form-control form-group"
                  
                  onChange={(e) => {
                    setCompanyLegalName(e.target.value);
                  }}
                  placeholder="Company(legal) Name"
                />
                <label htmlFor="floatingInput">Company(legal) Name*</label>
                {error && companyLegalName.length <= 0 ?
                  <p className="text-left text-danger"  style={{ marginTop: "-15px" }}>Company(legal) Name is required</p>
                  : ""}
              </div>
            


              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="text"
                  className="form-control"
                  
                  onChange={(e) => {
                    setAddressLine1(e.target.value);
                  }}
                  placeholder="Address line 1"
                />
                <label htmlFor="floatingInput">Address line 1* </label>
                {error && addressLine1.length <= 0 ?
                  <p className="text-left text-danger">Address is required</p>
                  : ""}
              </div>
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
                    setAddressLine2(e.target.value);
                  }}
                  placeholder="Address line 2 "
                />
                <label htmlFor="floatingInput">Address line 2 </label>
              </div>
              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input
                  type="text"
                  onChange={(e) => {
                    setAddressLine3(e.target.value);
                  }}
                  className="form-control"
                  
                  placeholder="Address line 3"
                />
                <label htmlFor="floatingInput">Address line 3 </label>
              </div>

              <div
                className="form-floating mb-3"
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="text"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  className="form-control"
                  
                  placeholder="City"
                />
                <label htmlFor="floatingInput">City*</label>
                {error && city.length <= 0 ?
                  <p className="text-left text-danger">City is required</p>
                  : ""}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div
                    className="form-floating mb-3"
                    style={{
                      marginLeft: "4%",

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
                    <select className="form-control" type="text" onChange={(e) => { setCountry(e.target.value); stSt(e.target.value) }}
                    >
                      <option selected disabled>--Select Country--</option>
                      {countrys.map((countries) => {
                        return (
                          <option key={countries.COUNTRY_KEY} value={countries.COUNTRY_KEY}>{countries.COUNTRY_NAME}</option>
                        );
                      })}

                    </select>
                    <label htmlFor="floatingInput">Country*</label>
                    {error && country.length <= 0 ?
                      <p className="text-left text-danger">Country is required</p>
                      : ""}
                  </div>

                </div>
                <div className="col-md-6">
                  <div
                    className="form-floating mb-3"
                    style={{

                      marginRight: "4%",
                    }}
                  >




                    <select className="form-control" type="text" onChange={(e) => {
                      setState(e.target.value);
                    }}
                    >
                      <option selected disabled>--Select State--</option>
                      {stateArr.map((val, index) => {
                        return (
                          <option key={index} value={val}>{val}</option>
                        );
                      })}

                    </select>
                    <label htmlFor="floatingInput">State*</label>
                    {error && state.length <= 0 ?
                      <p className="text-left text-danger">State is required</p>
                      : ""}

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                <div
                    className="form-floating mb-3"
                    style={{
                      marginLeft: "4%",

                    }}
                  >
                    <select className="form-control" type="text" onChange={(e) => { setLanguage(e.target.value); stSt(e.target.value) }}
                    >
                      <option selected disabled>--Select Language--</option>
                       {languageArr.map((val,index) => {
                        return (
                          <option key={index} value={val.LANGUAGE}>{val.DESCRIPTION}</option>
                        );
                      })} 

                    </select>
                    <label htmlFor="floatingInput">Language*</label>
                    {error && language.length <= 0 ?
                      <p className="text-left text-danger">Language is required</p>
                      : ""}
                  </div>
                </div>
                <div className="col-md-6">
                <div
                className="form-floating mb-3"
                style={{
                  // marginLeft: "2%",
                  marginRight: "2%",
                }}
              >
                <input required
                  type="text"
                  value={age}
                  onChange={(e) => {
                    setPinCode(e.target.value);

                    setAge(e.target.value.replace(/\D/g, ""));
                  }}
                  className="form-control"
                  
                  placeholder="Pin Code"
                />
                <label htmlFor="floatingInput">Pin Code*</label>
                {error && pinCode.length <= 0 ?
                  <p className="text-left text-danger">Pin Code is required</p>
                  : ""}

              </div>
                </div>                
              </div>                
                 

              <div className="">
                <input type="checkbox" checked={termCheck} onClick={() => { toggleCheckFlag() }} />
                <label
                  htmlFor="floatingInput"
                  style={{
                    marginLeft: "1%",
                  }}
                >
                  Terms and Conditions*
                </label>
                <p htmlFor="floatingInput"
                  style={{
                    marginLeft: "1%",
                  }} className="text-danger">

                  {wornignInput && termCheck == false ?
                    <p className="text-danger">Agree the terms and condition</p>
                    : ""}</p>
              </div>
              <button
                type="submit"

                onClick={submitForm}
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignSelf: "center",
                  margin: "3%",
                }}

                className="btn btn-primary"
              >

                Submit

              </button>

            </form>
          </>
        </div>
      </div>

      <Modal

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
              // marginTop: 0,
            }
          }
        >
          <div className="modal-header model-lg">
            <h5 className="modal-title text-center" id="exampleModalLabel">
              <p className="h6">A verification email has been sent to your register email <strong style={{ color: "#14CA96", }}>{email}</strong> </p>
            </h5>

          </div>
          <div className="col-md-12 text-center">

            {/* <img style={{ width: "80%" }} src={require('../Images/FloweryHandsome.gif')} /> */}
            <p className="h6">Please click on the link that just send you to your email account to verify your email and continue the registration process. <br></br><a type="button" style={{ color: "#1F87D0" }}  ></a></p>

          </div>
        </ModalBody>
      </Modal>

      <Modal

        isOpen={showCheckFlag}
        toggle={toggleCheckFlag}
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
              // marginTop: 0,
            }
          }
        >
          <div className="modal-header model-lg">
            <h5 className="modal-title text-center" id="exampleModalLabel">
              <p className="h4">Terms and Conditions</p>
            </h5>

          </div>
          <div className="col-md-12 text-center">

            {/* <img  style={{ width:"80%"}} src={require('../Images/FloweryHandsome.gif')} /> */}
            <p className="h6">A Terms and Conditions agreement acts as a legal contract between you (the company) and the user. It's where you maintain your rights to exclude users from your app in the event that they abuse your website/app, set out the rules for using your service and note other important details and disclaimers.

              Having a Terms and Conditions agreement is completely optional. No laws require you to have one. Not even the super-strict and wide-reaching General Data Protection Regulation (GDPR).

              Your Terms and Conditions agreement will be uniquely yours. While some clauses are standard and commonly seen in pretty much every Terms and Conditions agreement, it's up to you to set the rules and guidelines that the user must agree to.

              Terms and Conditions agreements are also known as Terms of Service or Terms of Use agreements. These terms are interchangeable, practically speaking.<br></br></p>
            <input type="checkbox" onClick={() => { setTermCheck(ref.current.checked); toggleCheckFlag() }} checked={termCheck} ref={ref} />
            <label
              htmlFor="floatingInput"
              style={{
                color: "#1F87D0",
                marginLeft: "1%",
              }}
            >
              Agree All the trms and conditions
            </label>

          </div>
        </ModalBody>
      </Modal>
      <Modal

        isOpen={showCheckFlages}
        toggle={toggleCheckFlages}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          width: "400px"
        }}
      >

        <ModalBody>
          <div className="col-md-12 text-center">

            <p style={{ color: "green" }}>Your account has been successfully created</p> <a type="button" href="/" style={{ color: "#1F87D0" }}  >Ok</a>

          </div>


        </ModalBody>
      </Modal>
      <div id="snackbar" style={{backgroundColor:toasterColor}}>{toaster}</div>

    </>
  );

}

export default SignUp;
