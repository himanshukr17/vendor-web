import React, { useState } from "react";
import StepNavigation from "../Components/stepNavigation";
import Login from "./Login";

import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";

import {
  useNavigate
} from "react-router-dom";



function SignUp() {
  const [companyLegalName, setCompanyLegalName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [businessRole, setBusinessRole] = useState("");
  const [termAndCondition, setTermAndCondition] = useState(false);
  
   const navigate = useNavigate();
   const labelArray = [
     "Company",
     "Administrator Account Information",
   
   
   ];


   console.log(companyLegalName);
   const [currentStep, updateCurrentStep] = useState(1);
   function updateStep(step) {
     //Updaing steps on Click
     updateCurrentStep(step);
   }
  // const [showCompanyInformation, setShowCompanyInformation] = useState(false);
  // const [
  //   showAdministratorAccountInformation,
  //   setshowAdministratorAccountInformation,
  // ] = useState(false);

  const CompanyInformation = () => {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <>
              <div className="form-floating mb-3">
                <input
                  type="email"
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
                  type="email"
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
                  type="email"
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
                  type="email"
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
                  type="email"
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
                  type="email"
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
  function AdministratorAccountInformation() {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First name"
                />
                <label htmlFor="floatingInput">First Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Last Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Company(legal) Name"
                />
                <label htmlFor="floatingInput">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Username</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Company(legal) Name"
                />
                <label htmlFor="floatingInput">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Repeat Password"
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Repeat Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Business Role"
                  onChange={(e) => {
                    setBusinessRole(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Business Role </label>
              </div>
            </>
            <div
              className="form-group"
              style={{
                // float: "left",
                marginTop: 30,
              }}
            >
              <input
                name="LOCATION"
                type="checkbox"
                id="inputEmail3"
                onChange={(e) => {
                  setTermAndCondition(!termAndCondition);
                  ;
                }}
                placeholder="Location"
              />
              <label
                htmlFor="inputEmail3"
                style={{
                  fontWeight: 700,
                  marginLeft: 10,
                }}
                className="control-label"
              >
                Terms and condition
              </label>
            </div>

            {currentStep != "1" && (
              <button
                className="primaryButton"
                disabled={currentStep === 1}
                onClick={() => updateStep(currentStep - 1)}
              >
                Previous
              </button>
            )}
            {currentStep == "2" && (
              <button
                className="primaryButton"
                // disabled={currentStep === labelArray.length}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

 
  return (
    <div>
      <StepNavigation
        labelArray={labelArray}
        currentStep={currentStep}
        updateStep={updateStep}
      ></StepNavigation>

      {/* swiping btw mupliple functions to create a mupliple steps form start  */}
      {currentStep == "1" && CompanyInformation()}
      {currentStep == "2" && AdministratorAccountInformation()}

      {/* swiping btw mupliple functions to create a mupliple steps form end  */}

     
      {/* {showCompanyInformation && CompanyInformation()}

      {showAdministratorAccountInformation && AdministratorAccountInformation()} */}
    </div>
  );
}

export default SignUp;
