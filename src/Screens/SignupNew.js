import React, { useState,useRef,useEffect } from 'react';
import '../StyleSheets/SignupNew.css'
import { BsCheck2Circle, BsCircle } from 'react-icons/bs';
import { AiOutlineArrowRight, AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AxioxExpPort } from './AxioxExpPort';
import axios from 'axios';
import { Modal,ModalBody } from 'reactstrap';

const SignupNew = () => {
    const myRef = useRef(null);
    const ref = useRef(null)
    const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
    const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
    const [showCheckFlag, setShowCheckFlag] = useState(false);
    const toggleCheckFlag = () => setShowCheckFlag(!showCheckFlag);
    const [wornignInput, setWorningInput] = useState(false)

    const [termCheck, setTermCheck] = useState(false)
    const [showCheckFlages, setShowCheckFlages] = useState(false);
    const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
    const [step, setStep] = useState(1);
    const [error, setErrorsss] = useState(false)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roleDesc, setRoleDesc] = useState([])
    const [companyLegalName, setCompanyLegalName] = useState("");

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [businessRole, setBusinessRole] = useState("");
    const [faxNo, setFaxNo] = useState("");
    const [pannumber, setPannumber] = useState("");

    const [optConst, setOtpConst] = useState(null);
    const [worningMailVerify, setworningMailVerify] = useState(false)
    const [otpSendBtn, setOtpSendBtn] = useState(true)
    const [showOtp, setShowOtp] = useState(false)
    const [otp, setOtp] = useState('');
    const [checkPassword, setCheckPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState("")
    const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [resOTP, setResOTP] = useState('')
    const [errorUploadPan, setErrorUploadPan] = useState(false)
    const [chooseFile, setChooseFile] = useState("")
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [addressLine3, setAddressLine3] = useState("");
    const [country, setCountry] = useState("");
    const [age, setAge] = useState();
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [language, setLanguage] = useState("");
    const handleOtpChange = (event, index) => {
        const { value } = event.target;
        const isBackspace = event.nativeEvent.inputType === "deleteContentBackward";

        setOtp((prevOtp) => {
            const newOtp = prevOtp.slice(0, index) + value + prevOtp.slice(index + 1);

            if (!value && isBackspace && index > 0) {
                otpInputRefs[index - 1].current.focus();
            } else if (index < 3 && value) {
                otpInputRefs[index + 1].current.focus();
            }

            return newOtp;
        });
    };

    

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };
    //Email Input verification 
    const handleNextStep = () => {
        //togglePODetailsFlag()
        if (firstName.length == 0 || lastName.length == 0 || phone.length < 10) {
            setErrorsss(true);
        } else if (password != repeatPassword) {
            setCheckPassword("Repeat password doesn't match Password. ")
            setMatchPassword(null)
        }
        else {
            var email = document.getElementById('emailInputVerify').value;
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {

                setworningMailVerify(true)

            } else {
                setworningMailVerify(false)
                axios.post(AxioxExpPort + "createcompany/sendotp", {
                    "email": email,
                })
                    .then((res) => {
                        setShowOtp(true);
                        console.log(res)
                        setResOTP(res.data.OTP)
                        togglePODetailsFlag()
                    })
                    .catch((err) => { console.log(err) });
            }
            // setStep(step + 1);
        }
    };

    // password verification
    const [isValid, setIsValid] = useState(true);
    const [countrys, setCountrys] = useState([])
    const [languageArr, setLanguageArr] = useState([])

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
    const handlePassword = (event) => {

        const newValue = event;
        setIsValid(true);

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={};':",.<>?])[a-zA-Z\d!@#$%^&*()_+={};':",.<>?]{8,15}$/;
        if (!regex.test(newValue)) {
            setIsValid(false);
            setMatchPassword(null)
            setCheckPassword(null)

            document.getElementById("repeatPasw").disabled = true;
        } else {
            document.getElementById("repeatPasw").disabled = false;

        }

        //   if (repeatPassword.length){ 
        // if (repeatPassword != event) {
        // setCheckPassword("Repeat password doesn't match Password. ")
        // setMatchPassword(null)
        //   } else {
        // setCheckPassword(null)
        // setMatchPassword("Password is matching.")
        //   }
        //   }

    }

    const handleRepeatPassword = (event) => {
        if (password != event) {
            setCheckPassword("Repeat password doesn't match Password. ")
            setMatchPassword(null)
        } else {
            setCheckPassword(null)
            setMatchPassword("Password is matching.")
        }
    }


    const otpVerification = () => {
        console.log(otp)
        console.log(resOTP)
        if (Number(otp) === Number(resOTP)) {
            setStep(step + 1);
            togglePODetailsFlag()
        } else {
            setStep(1)
        }
    }
    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const handleInputChange = (event) => {
        // console.log("event.target.value",event.target.value.length);
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });
        // console.log(event.target.files[0]);
    }
    const uploadPan = async () => {
        const formData = new FormData();
        formData.append("image", userInfo.file);
        formData.append("pancard", pannumber);
        if (phone.toString().length == 0 || chooseFile.length == 0 || pannumber.length == 0) {
            var xz = document.getElementById("snackbar");
            xz.className = "show";
            setTimeout(function () {
                xz.className = xz.className.replace("show", "");
            }, 3000)
        }
        else {
            try {
                const response = axios({
                    method: "post",
                    url: AxioxExpPort + "createcompany/file?phone_number=" + phone,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                }).then((res) => {
                     console.log("res",res)
                    if (res.status === 200) {
                        setStep(step + 1)
                    } else {
                        setStep(step -1 )
                    }
                });
            } catch (error) {
                setTimeout(function () {
                    xz.className = xz.className.replace("show", "");
                }, 3000)
            }
        }

    }
    const [stateArr, setStateArr] = useState([])


    const stSt = (e) => {
        const countriess = countrys.find((user) => user.COUNTRY_KEY === e);
        //console.log("countriess",countriess.STATE)
        setStateArr(countriess.STATE);
      }


      const submitForm = (e) => {
        e.preventDefault();
        // toggleCheckFlages();
    
        var phoneNumbr=Number(phone)
        if ( pinCode.length == 0 || city.length == 0 ||  country.length == 0 || addressLine1.length == 0  ) {
          setErrorsss(true);
          } else if (termCheck == true ) {
             try {
             axios.post(AxioxExpPort+"createcompany?phone_number="+phone, {
               "VENDOR_ID": Number(pinCode),
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
             .then((res) => { 
               console.log("resresres",res)
               setStep(step + 1)
         })}
           catch(error) { console.log("errerr",error);   
     }
    
        } else {
           console.log("check terms and condition")
           setWorningInput(true);

    
        }
      }

    return (
        <div
            className=""
            style={{
                width: "80%",
                marginLeft: "10%",
                color: 'black'
            }}
        >
            <div
                className="card"
                style={
                    {
                        margin: "2%",
                        borderRadius: 30
                    }
                }
            >
                <div style={{ marginLeft: 20, marginTop: 20 }}>
                    <h3 >Supplier Registration</h3>
                </div>
                <div className='card-body'>
                    <div className='row' style={{ alignItems: 'center' }}>
                        {step === 1 && (
                            <>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10, borderBottom: '2px solid green' }}><BsCircle style={{ marginTop: -4 }} />  Personal Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10 }}><BsCircle style={{ marginTop: -4 }} />  Business Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10 }}><BsCircle style={{ marginTop: -4 }} />  Address Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10 }}><BsCircle style={{ marginTop: -4 }} /> Confirmation</div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', color: 'green', padding: 10 }}><BsCheck2Circle style={{ marginTop: -4, color: 'green' }} /> Personal details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10, borderBottom: '2px solid green' }}><BsCircle style={{ marginTop: -4 }} />  Business Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10 }}><BsCircle style={{ marginTop: -4 }} />  Address Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10 }}><BsCircle style={{ marginTop: -4 }} /> Confirmation</div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', color: 'green', padding: 10 }}><BsCheck2Circle style={{ marginTop: -4, color: 'green' }} /> Personal details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', color: 'green', padding: 10 }}><BsCheck2Circle style={{ marginTop: -4, color: 'green' }} />   Business Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10, borderBottom: '2px solid green' }}><BsCircle style={{ marginTop: -4 }} />  Address Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10 }}><BsCircle style={{ marginTop: -4 }} /> Confirmation</div>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', color: 'green', padding: 10 }}><BsCheck2Circle style={{ marginTop: -4, color: 'green' }} /> Personal details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', color: 'green', padding: 10 }}><BsCheck2Circle style={{ marginTop: -4, color: 'green' }} />   Business Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10, color: 'green', }}><BsCheck2Circle style={{ marginTop: -4, color: 'green' }} />  Address Details</div>
                                <div className='col-md-3' style={{ border: '.01px solid #F3F3F3', padding: 10, color: 'green', borderBottom: '2px solid green' }}><BsCheck2Circle style={{ marginTop: -4, color: 'green' }} /> Confirmation</div>
                            </>
                        )}

                    </div>
                </div>
                {step === 1 && (
                <div style={{ marginLeft: 20 }}>
                    <h4>Personal Details</h4>

                </div>
                )}
                {step === 2 && (
                <div style={{ marginLeft: 20 }}>
                    <h4>Business Details</h4>

                </div>
                )}
                {step === 3 && (
                <div style={{ marginLeft: 20 }}>
                    <h4>Address Details</h4>

                </div>
                )}
               
                <div className='card-body'>
                    {step === 1 && (
                        <div >
                            <form className="form-horizontal">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label >First Name*</label>
                                        <input className="form-control" type="text" placeholder="First Name" value={firstName} onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }} />  {error && firstName.length <= 0 ?
                                            <p className="text-left text-danger">First Name is required</p>
                                            : ""}
                                    </div>
                                    <div className='col-md-6'>
                                        <label >Last Name*</label>
                                        <input className="form-control" type="text" placeholder="Last Name" value={lastName} onChange={(e) => {
                                            setLastName(e.target.value);
                                        }} />
                                        {error && lastName.length <= 0 ?
                                            <p className="text-left text-danger">Last Name is required</p>
                                            : ""}
                                    </div>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label >Phone*</label>
                                            <input
                                                className="form-control"
                                                type="number"
                                                inputMode="numeric"
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value);
                                                }}
                                                placeholder="Phone"
                                            />
                                            {error && phone.length <= 9 ?
                                                <p className="text-left text-danger">Phone is required</p>
                                                : ""}
                                        </div>
                                        <div className='col-md-6'>
                                            <label >Email*</label>
                                            <input className="form-control" id="emailInputVerify" value={email} onChange={(e) => {
                                                setEmail(e.target.value);
                                            }} type="text" placeholder="Email" />
                                            {error && email.length <= 0 ?
                                                <p className="text-left text-danger">Email is required</p>
                                                : ""}
                                            {worningMailVerify ?
                                                <p className="text-left text-danger">Please provide a valid email address</p>
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <div className='row'>

                                        <div className='col-md-6'>
                                            <label >Password*</label>
                                            <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => {
                                                setPassword(e.target.value);
                                                handlePassword(e.target.value)
                                            }} />
                                            {!isValid && <p style={{ fontSize: 10 }}>Please enter a valid input with min 8, max 14 character using [a-z],[A-Z],[0-9] and [ /[!@#$%^&*(),.?":{ }|<>]/</> ].</p>}
                                            {error && password.length <= 0 ?
                                                <p className="text-left text-danger">Password is required</p>
                                                : ""}
                                        </div>
                                        <div className='col-md-6'>
                                            <label >Confirm Password*</label>
                                            <input className="form-control" type="password" id='repeatPasw' value={repeatPassword} disabled placeholder="Confirm Password" onChange={(e) => {
                                                handleRepeatPassword(e.target.value)
                                                setRepeatPassword(e.target.value);
                                            }} />
                                            <p>
                                                {error && repeatPassword.length <= 0 ?
                                                    <p className="text-left text-danger">Repeat Password is required</p>
                                                    : ""}</p>
                                            <p className="text-left text-danger">{checkPassword}</p>
                                            <p className="text-left text-success" style={{ marginTop: "-5px" }}>{matchPassword}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='row' style={{ marginTop: 40 }}  >
                                    <div className='col-md-7'>
                                        Already have an account? <Link to="/">Login</Link>{" "}
                                    </div>
                                    <div className='col-md-5'>
                                        <button type="button" className="btn btn-outline-success float-right" style={{ margin: 15 }} onClick={handleNextStep}>Continue <AiOutlineArrowRight /></button>
                                        {/* <button type="button" className="btn btn-default float-right" style={{ margin: 15 }} onClick={handlePreviousStep}>Previous</button> */}
                                    </div>
                                </div>
                            </form>
                        </div>

                    )}

                    {step === 2 && (
                        <form className="form-horizontal">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label >Username*</label>
                                    <input className="form-control" type="text" placeholder="Username" value={userName} onChange={(e) => {
                                        setUserName(e.target.value);
                                    }} />  {error && userName.length <= 0 ?
                                        <p className="text-left text-danger">Username is required</p>
                                        : ""}
                                </div>
                                <div className='col-md-6'>
                                    <label >Business Role*</label>
                                    <select className="form-control" aria-label="Default select example" type="text"  onChange={(e) => { setBusinessRole(e.target.value) }}
                                    >
                                        <option selected disabled>--Select Business Role--</option>
                                        {roleDesc.map((val, index) => {
                                            return (
                                                <option key={index} value={val.INDUSTRY}>{val.DESCRIPTION}</option>
                                            );
                                        })}
                                    </select>
                                    {error && businessRole.length <= 0 ?
                                        <p className="text-left text-danger">Business Role is required</p>
                                        : ""}
                                </div>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label >Fax No*</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            inputMode="numeric"
                                            value={faxNo}
                                            onChange={(e) => {
                                                setFaxNo(e.target.value);
                                            }}
                                            placeholder="Fax NO"
                                        />
                                        {error && faxNo.length <= 0 ?
                                            <p className="text-left text-danger" >FAX No. is required</p>
                                            : ""}
                                    </div>
                                    <div className='col-md-6'>
                                        <label >Company Leagal Name*</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={companyLegalName}
                                             
                  onChange={(e) => {
                    setCompanyLegalName(e.target.value);
                  }}
                  placeholder="Company(legal) Name"
                                        />
                                         {error && companyLegalName.length <= 0 ?
                  <p className="text-left text-danger"  >Company(legal) Name is required</p>
                  : ""}
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label >PAN No*</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={pannumber}
                                            onChange={(e) => {
                                                setPannumber(e.target.value);
                                            }}
                                            placeholder="PAN Number"
                                        />
                                        {errorUploadPan || error && pannumber.length <= 0 ?
                                            <p className="text-left text-danger">PAN Number required</p>
                                            : ""}

                                    </div>
                                    <div className='col-md-6'>
                                        <label >Upload PAN Card*</label>
                                        <input type="file" className="form-control" id="upload_file"  name="upload_file" onChange={(e) => {
                    setChooseFile(e.target.value);
                    handleInputChange(e)
                  }} />
                                        {/* <input
                                            className="form-control"
                                            type="number"
                                            inputMode="numeric"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}
                                            placeholder="PAN Card image jpg/png/jepg"
                                        /> */}
                                        {errorUploadPan || error && chooseFile.length <= 0 ?
                  <p className="text-left text-danger">Please Check correct Phone Number / PAN Number / PAN Card </p>
                  : ""}
                                    </div>
                                </div>
                            </div>

                            <div className='row' style={{ marginTop: 40 }}  >
                                <div className='col-md-7'>
                                </div>
                                <div className='col-md-5'>
                                    <button type="button" className="btn btn-outline-success float-right" style={{ margin: 15 }}  onClick={uploadPan}>Continue <AiOutlineArrowRight /></button>
                                    <button type="button" className="btn btn-default float-right" style={{ margin: 15 }} onClick={handlePreviousStep}>Previous</button>
                                </div>
                            </div>
                        </form>
                    )}



                    {step === 3 && (
                        <form className="form-horizontal">
                            <div className='row'>
                                <div className='col-md-4'>
                                    <label >Address Line 1*</label>
                                    <input required
                  type="text"
                  className="form-control"
                  
                  onChange={(e) => {
                    setAddressLine1(e.target.value);
                  }}
                  placeholder="Address line 1"
                />
                {error && addressLine1.length <= 0 ?
                  <p className="text-left text-danger">Address is required</p>
                  : ""}
                                </div>
                                <div className='col-md-4'>
                                    <label >Address Line 2</label>
                                    <input
                  type="text"
                  className="form-control"
                  
                  onChange={(e) => {
                    setAddressLine2(e.target.value);
                  }}
                  placeholder="Address line 2 "
                />
                                </div>
                                <div className='col-md-4'>
                                    <label >Address Line 3</label>
                                    <input
                  type="text"
                  onChange={(e) => {
                    setAddressLine3(e.target.value);
                  }}
                  className="form-control"
                  
                  placeholder="Address line 3"
                />
                                </div>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                <div className='row'>
                                <div className='col-md-4'>
                <label >City*</label>
                                <input required
                  type="text"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  className="form-control"
                  
                  placeholder="City"
                />
                {error && city.length <= 0 ?
                  <p className="text-left text-danger">City is required</p>
                  : ""}
                                </div>

                                <div className='col-md-4'>
                    <label >Country*</label>
                                <select className="form-control" aria-label="Default select example" type="text" onChange={(e) => { setCountry(e.target.value); stSt(e.target.value) }}
                    >
                      <option selected disabled>--Select Country--</option>
                      {countrys.map((countries) => {
                        return (
                          <option key={countries.COUNTRY_KEY} value={countries.COUNTRY_KEY}>{countries.COUNTRY_NAME}</option>
                        );
                      })}

                    </select>
                    {error && country.length <= 0 ?
                      <p className="text-left text-danger">Country is required</p>
                      : ""}
                                </div>
                                <div className='col-md-4'>
                    <label >State*</label>
                                <select className="form-control"  aria-label="Default select example" type="text" onChange={(e) => {
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
                    {error && state.length <= 0 ?
                      <p className="text-left text-danger">State is required</p>
                      : ""}
                                </div>
                                <div style={{ marginTop: 10 }}>
                                <div className='row'>   
                                <div className='col-md-4'>
                    <label >Language*</label>
                                <select className="form-control"  aria-label="Default select example"type="text" onChange={(e) => { setLanguage(e.target.value); stSt(e.target.value) }}
                    >
                      <option selected disabled>--Select Language--</option>
                       {languageArr.map((val,index) => {
                        return (
                          <option key={index} value={val.LANGUAGE}>{val.DESCRIPTION}</option>
                        );
                      })} 

                    </select>
                    {error && language.length <= 0 ?
                      <p className="text-left text-danger">Language is required</p>
                      : ""}
                                </div>
                                <div className='col-md-4'>
                <label >Pin Code*</label>
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
                {error && pinCode.length <= 0 ?
                  <p className="text-left text-danger">Pin Code is required</p>
                  : ""}

                                </div>

                                <div className='col-md-4'>
                                <div style={{marginTop:'13%',marginLeft:'5%'}}>
                                <input type="checkbox" checked={termCheck} onClick={() => { toggleCheckFlag() }} />
                <label
                  htmlFor="floatingInput"
                 
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
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
                            

                            <div className='row' style={{ marginTop: 40 }}  >
                                <div className='col-md-7'>
                                </div>
                                <div className='col-md-5'>
                                    <button type="button" className="btn btn-outline-success float-right" style={{ margin: 15 }}  onClick={submitForm}>Submit </button>
                                    <button type="button" className="btn btn-default float-right" style={{ margin: 15 }} onClick={handlePreviousStep}>Previous</button>
                                </div>
                            </div>
                        </form>
                    )}

                    {step === 4 && (
                        <>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem',  }}>
  <AiOutlineCheckCircle size={50} color='green' />
  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}>CONGRATULATIONS!</p>
  <p style={{ fontSize: '1rem', margin: '0.5rem 0' }}>Your account has been created.</p>
  <p className="success-link">GO TO <Link to='/'>Login Page</Link></p>
</div>

                        </>
                    )}
                </div>

            </div>
            <Modal

                size="md"
                isOpen={showPODetailsFlag}
                toggle={togglePODetailsFlag}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >


                <div className="card ">
                    <div className="card-header">

                    </div>
                    <div style={{ marginLeft: 10, color: 'black' }}>
                        <h3 className="card-title ">  OTP Verification</h3>

                    </div>

                    <div ref={myRef} className="otp-input-container" style={{ margin: 20 }}>
                        <input
                            className="otp-input"
                            type="text"
                            maxLength="1"
                            value={otp[0]}
                            onChange={(event) => handleOtpChange(event, 0)}
                            ref={otpInputRefs[0]}
                        />
                        <input
                            className="otp-input"
                            type="text"
                            maxLength="1"
                            value={otp[1]}
                            onChange={(event) => handleOtpChange(event, 1)}
                            ref={otpInputRefs[1]}
                        />
                        <input
                            className="otp-input"
                            type="text"
                            maxLength="1"
                            value={otp[2]}
                            onChange={(event) => handleOtpChange(event, 2)}
                            ref={otpInputRefs[2]}
                        />
                        <input
                            className="otp-input"
                            type="text"
                            maxLength="1"
                            value={otp[3]}
                            onChange={(event) => handleOtpChange(event, 3)}
                            ref={otpInputRefs[3]}
                        />
                    </div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 13, padding: 10 }}> A four digit OTP has been sent to your register email id</p>
                    <div style={{ padding: 15 }} >
                        <button type="button" className="btn btn-success float-right" onClick={() => otpVerification()}>Submit</button>
                        <button type="button" className="btn btn-default " onClick={() => togglePODetailsFlag()}>Cancel</button>
                    </div>
                </div>

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
        </div>


        // <form className="signup-form" onSubmit={handleSubmit}>
        //   {step === 1 && (
        // <div className="form-step" id="step-1">
        //   <h2>Step 1: Personal Information</h2>
        //   <label htmlFor="name">Name:</label>
        //   <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        //   <button type="button" className="next-button" onClick={handleNextStep}>Next</button>
        // </div>
        //   )}
        //   {step === 2 && (
        // <div className="form-step" id="step-2">
        //   <h2>Step 2: Contact Information</h2>
        //   <label htmlFor="email">Email:</label>
        //   <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        //   <button type="button" className="prev-button" onClick={handlePreviousStep}>Previous</button>
        //   <button type="button" className="next-button" onClick={handleNextStep}>Next</button>
        // </div>
        //   )}
        //   {step === 3 && (
        // <div className="form-step" id="step-3">
        //   <h2>Step 3: Account Information</h2>
        //   <label htmlFor="password">Password:</label>
        //   <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        //   <button type="button" className="prev-button" onClick={handlePreviousStep}>Previous</button>
        //   <button type="submit" className="submit-button">Submit</button>
        // </div>
        //   )}
        // </form>

    );
};

export default SignupNew;

