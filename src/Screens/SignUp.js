import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [companyLegalName, setCompanyLegalName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [businessRole, setBusinessRole] = useState("");
  const [termAndCondition, setTermAndCondition] = useState(false);

  const navigate = useNavigate();
  const labelArray = ["Company", "Administrator Account Information"];

  console.log(companyLegalName);
  const [currentStep, updateCurrentStep] = useState(1);
  function updateStep(step) {
    //Updaing steps on Click
    updateCurrentStep(step);
  }
 const [wornignInput, setWorningInput]=useState("")
  const ref=useRef(null)
  const [checkPassword,setCheckPassword]=useState("")
  const [matchPassword,setMatchPassword]=useState("")
  var theConfirmPassw;
 const handleRepeatPassword = (event) => {

  if (password!= event) {
 

    setCheckPassword("Repeat password doesn't match Password. ")
    setMatchPassword(null)
  }else{
    setCheckPassword(null)
    setMatchPassword("Password is matching.")

  }
}
  const submitForm = () =>{
    if(companyLegalName!="" && pinCode!="" && city!="" && state!="" && country!="" && addressLine1!="" && businessRole!="" && password!="" && repeatPassword!="" && userName!="" && email!="" && lastName!="" && firstName!="")
   {
    if(repeatPassword== password){

   
    if (ref.current.checked) {
      
      axios.post("main_api/role_master/role_master_update",{
        "firstName":firstName,
        "lastName":lastName,
        "email":email,
        "userName":userName,
        "repeatPassword":repeatPassword,
        "businessRole":businessRole,
        "companyLegalName":companyLegalName,
        "addressLine1":addressLine1,  
        "addressLine2":addressLine2,  
        "addressLine3":addressLine3,  
        "country":country,  
        "state":state,  
        "city":city,  
        "pinCode":pinCode
       

      })
      .then((res)=>{alert("submited")})
        .catch((err)=>{console.log(err)});
        // alert("lkjh")
        // window.location.href="/"
        
      } else {
        setWorningInput('Agree to Terms and Conditions');
      }
    }else{
      setCheckPassword("Repeat password doesn't match Password. ")
    }
    }else{
      setWorningInput("Please fill out all required '*' fields.")
    }   
   

  }

  const CompanyInformation = () => {
    return (
      <>
        <div className="card"
        style={{
            justifyContent:"center",
            alignContent:"center",
            display:"flex"
        }}
        >
          <div className="card-body">
            <>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-group"
                  id="floatingInput"
                  onChange={(e) => {
                    setCompanyLegalName(e.target.value);
                  }}
                  placeholder="Company(legal) Name"
                />
                <label htmlFor="floatingInput">Company(legal) Name</label>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control form-group"
                    id="floatingInput"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Country</label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => {
                    setAddressLine1(e.target.value);
                  }}
                  placeholder="address"
                />
                <label htmlFor="floatingInput">Address line 1 </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-group"
                  id="floatingInput"
                  onChange={(e) => {
                    setAddressLine2(e.target.value);
                  }}
                  placeholder="Company(legal) Name"
                />
                <label htmlFor="floatingInput">Address line 2 </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  onChange={(e) => {
                    setAddressLine3(e.target.value);
                  }}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Company(legal) Name"
                />
                <label htmlFor="floatingInput">Address line 3 </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">City</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  className="form-control"
                  id="floatingInput"
                  placeholder="state"
                />
                <label htmlFor="floatingInput">State</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  onChange={(e) => {
                    setPinCode(e.target.value);
                  }}
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Pin Code</label>
              </div>

              <button
                className="primaryButton"
                disabled={currentStep === labelArray.length}
                onClick={() => updateStep(currentStep + 1)}
              >
                Next
              </button>
            </>
          </div>
        </div>
      </>
    );
  };
  
      return (
        <>
        <form>
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
                    id="floatingInput"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder="First name *"
                  />
                  <label htmlFor="floatingInput">First Name*</label>
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
                    id="floatingInput"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Last Name*</label>
                </div>
  
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
                    id="floatingInput"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Company(legal) Name"
                  />
                  <label htmlFor="floatingInput">Email*</label>
                </div>
  
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
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Username*</label>
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
                    id="floatingInput"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Company(legal) Name"
                  />
                  <label htmlFor="floatingInput">Password*</label>
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
                    id="floatingInput"
                    placeholder="Repeat Password"
                    onChange={(e) => {
                      handleRepeatPassword(e.target.value)
                      setRepeatPassword(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Repeat Password*</label>
                  <p className="text-left text-danger">{checkPassword}</p>
                  <p className="text-left text-success" style={{  marginTop: "-15px", marginBottom: "-5px",}}>{matchPassword}</p>

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
                    className="form-control"
                    id="floatingInput"
                    placeholder="Business Role"
                    onChange={(e) => {
                      setBusinessRole(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Business Role* </label>
                </div>
              </>
  
              <>
                <>
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
                      id="floatingInput"
                      onChange={(e) => {
                        setCompanyLegalName(e.target.value);
                      }}
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Company(legal) Name*</label>
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
                      id="floatingInput"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Country*</label>
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
                      id="floatingInput"
                      onChange={(e) => {
                        setAddressLine1(e.target.value);
                      }}
                      placeholder="address"
                    />
                    <label htmlFor="floatingInput">Address line 1* </label>
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
                      id="floatingInput"
                      onChange={(e) => {
                        setAddressLine2(e.target.value);
                      }}
                      placeholder="Company(legal) Name"
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
                      id="floatingInput"
                      placeholder="Company(legal) Name"
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
                      id="floatingInput"
                
                    />
                    <label htmlFor="floatingInput">City*</label>
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
                        setState(e.target.value);
                      }}
                      className="form-control"
                      id="floatingInput"
                      placeholder="state"
                    />
                    <label htmlFor="floatingInput">State*</label>
                  </div>
                  <div
                    className="form-floating mb-3"
                    style={{
                      marginLeft: "2%",
                      marginRight: "2%",
                    }}
                  >
                    <input required
                      type="number"
                      onChange={(e) => {
                        setPinCode(e.target.value);
                      }}
                      className="form-control"
                      id="floatingInput"
                   
                    />
                    <label htmlFor="floatingInput">Pin Code*</label>
                   <p  className="text-left text-danger">{wornignInput}</p>
                  </div>
                  <div className="">
                    <input type="checkbox"  ref={ref}/>
                    <label
                      htmlFor="floatingInput"
                      style={{
                        marginLeft: "1%",
                      }}
                    >
                      Terms and Conditions*
                    </label>
                  </div>
                  <button
                  //type="submit"
                  onClick={()=>{submitForm()}}
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
                </>
              </>
            </div>
          </div>
          </form>
        </>
      );
  
}

export default SignUp;
