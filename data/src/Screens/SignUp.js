import React, { useState } from "react";
import StepNavigation from "../Components/stepNavigation";
import Login from "./Login";

import {
  useNavigate
} from "react-router-dom";



function SignUp() {
  
   const navigate = useNavigate();
   const labelArray = [
     "Company",
     "Administrator Account Information",
   
   
   ];
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
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Company(legal) Name</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Country</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Address line 1 </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">State</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Address line 2 </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">City</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Address line 3 </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Pin Code</label>
                  </div>
                </div>
              </div>
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
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="First name"
                    />
                    <label htmlFor="floatingInput">First Name</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Last Name"
                    />
                    <label htmlFor="floatingInput">Last Name</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Company(legal) Name"
                    />
                    <label htmlFor="floatingInput">Password</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Repeat Password"
                    />
                    <label htmlFor="floatingInput">Repeat Password</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Business Role"
                    />
                    <label htmlFor="floatingInput">Business Role </label>
                  </div>
                </div>
                <div className="col-6"></div>
              </div>
            </>
            <div
              className="form-group"
              style={{
                float: "left",
              }}
            >
              <input
                name="LOCATION"
                type="checkbox"
                id="inputEmail3"
                placeholder="Location"
              />
              <label
                htmlFor="inputEmail3"
                style={{
                  fontWeight: 700,
                }}
                className="control-label"
              >
                Terms and condition
              </label>
            </div>
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
      {currentStep == "3" && <Login />}

      {/* swiping btw mupliple functions to create a mupliple steps form end  */}

      {currentStep != "1" && (
        <button
          className="primaryButton"
          disabled={currentStep === 1}
          onClick={() => updateStep(currentStep - 1)}
        >
          Previous
        </button>
      )}
      {currentStep == "2" ? (
        <button
          className="primaryButton"
          // disabled={currentStep === labelArray.length}
          onClick={() => {
            navigate("/login");
          }}
        >
          Submit
        </button>
      ) : (
        <button
          className="primaryButton"
          disabled={currentStep === labelArray.length}
          onClick={() => updateStep(currentStep + 1)}
        >
          Next
        </button>
      )}
      {/* {showCompanyInformation && CompanyInformation()}

      {showAdministratorAccountInformation && AdministratorAccountInformation()} */}
    </div>
  );
}

export default SignUp;
