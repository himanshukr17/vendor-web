import React, { useEffect, useState } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import { AxioxExpPort } from "../AxioxExpPort"
import {  useNavigate, Link } from "react-router-dom";
import { AiFillAccountBook, AiFillReconciliation, AiOutlineHome, AiOutlineWallet } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Modal, ModalBody } from "reactstrap";
function MyContact() {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [error, setErrorsss] = useState(false)

  const [isSucces, setSuccess] = useState(null);
  const [imgPrv, setImgPrevew] = useState(false);
  const vendorId = localStorage.getItem('userId');


  const [uploadOption, setUploadOption] = useState([
    { NAME: "--Select Uploder Card--", KEY_VALUE: "true" },
    { NAME: "PAN Card:", KEY_VALUE: "PANCARD" },
    { NAME: "Aadhar Card:", KEY_VALUE: "ADHAR" },
    { NAME: "GST:", KEY_VALUE: "GST" },
    { NAME: "Address Proof:", KEY_VALUE: "ADDRESS" },
    { NAME: "MSME Certificate:", KEY_VALUE: "MSME" },
    { NAME: "POR Declearation Certificate:", KEY_VALUE: "POR" },
    { NAME: "Due Diligence Form:", KEY_VALUE: "DILIGENCE" }
  ]);
  const [toaster, setToaster] = useState("")
  const [toasterColor, setToasterColor] = useState("")
  const [optionVal, setOptionVals] = useState("true");
  const [optionInput, setOptionInput] = useState("");
  const [inputValueput, setInputValue] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [uploadedData, setUploadedData] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [detailVal, setDetailVal] = useState(null);
  
  
  const [showCheckFlages, setShowCheckFlages] = useState(false);
  const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
  const fetchData = async () => {
    axios.get(AxioxExpPort + "createcompany/contact?id=" + vendorId)
      .then((response) => {
        //  setTBody(response.data);
        setUploadedData(response.data);
        console.log("response.data", response);

      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const setOptionVal = (e) => {
    const optionsDa = uploadOption.find((user) => user.KEY_VALUE === e);
    //console.log("countriess",countriess.STATE)
    if (e != true) {
      document.getElementById('upload_file').readOnly = false
      document.getElementById('optionInputVal').readOnly = false
    } else {
      document.getElementById('upload_file').readOnly = true
      document.getElementById('optionInputVal').readOnly = true
    }
    const splVal = optionsDa.NAME.split(' ')

    setImgPrevew(false)
    setOptionVals(optionsDa.KEY_VALUE);
    setOptionInput(splVal[0] + " Number")
  }
  // alert(optionVal)



  const handleInputChange = (event) => {
    console.log("event.target.value", event.target.value.length);
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });

    console.log(event.target.files[0]);

  }


  const submit = async () => {
    console.log('inputValueput', inputValueput);
    console.log('userInfo.file', userInfo.file)
    const formData = new FormData();
    formData.append("image", userInfo.file);
    formData.append(optionVal, inputValueput);
    if (inputValueput.length == 0 || inputFile.length == 0) {
      setErrorsss(true)
    } else {

      try {
        const response = axios({
          method: "post",
          url: AxioxExpPort + "api/file/create?id=" + vendorId,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {

          //navigate('/mcs');
          setToaster(optionVal + " is uploaded successful")
          var xz = document.getElementById("snackbar");
          setToasterColor("#00D100")
          xz.className = "show";
          setTimeout(function () {
            xz.className = xz.className.replace("show", "");
          }, 3000);
          window.location.reload();
          // fetchData();
          console.log("response.data", res); setImgPrevew(true); setOptionInput("");
        });

      } catch (error) {


      }

      console.log(error)
    }

  }

  return (
    <>
    <NavHeader />
      <div id="snackbar" style={{backgroundColor:toasterColor, borderRadius:"50px"}}>{toaster}</div>

      <div
        className="card-body"
        style={{
          marginTop: "4%",
        }}
      >
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="row" style={{ marginBottom: 10 }}>
                <div className="col-md-10">
               
                  <div style={{ display: 'flex', alignItems: 'center' }}>
  <h4 className="form-check-label">
  Acknowledgement
  </h4>
  <button  style={{
      marginLeft: '10px',
      padding: '7px 14px',
      backgroundColor:"#4F51C0",
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer'
    }} onClick={() => { window.history.go(-1) }}>Go Back</button>
</div>
                </div>
                <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>
                  <IconContext.Provider value={{ color: "red", size: "22px" }}>
                    <AiOutlineHome type="button" onClick={() => {
                      navigate("/dashboard");
                    }} />
                  </IconContext.Provider>
                  {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}
                  {" / "}
                    <a className="dropdown-toggle" style={{color:"maroon"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Transaction Data    
          </a>
          <ul className="dropdown-menu" style={{width:"95%"}}>
      <li className="row" ><Link style={{ }}  to="/pos"><BsFillCartCheckFill  color={"#F07857"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Purchase Order   </a></Link></li>
      <li className="row" ><Link style={{ }}  to="/res"><AiFillReconciliation color={"#43A5BE"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Goods Receipt    </a></Link></li>
      <li className="row" ><Link style={{ }}  to="/ackn"><AiOutlineWallet     color={"#F5C26B"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Order to confirm </a></Link></li> 
      {/* <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"#4FB06D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Invoice Booked   </a></Link></li>  */}
      <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"pink"}    size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Invoice Pending  </a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/grs"><BsFillCartXFill      color={"#53BDAS"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> Goods Return     </a></Link></li> 
      <li className="row" ><Link style={{ }}  to="/mcs"><FaFileContract       color={"#BE398D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#4F51C0"}}> My Documents     </a></Link></li> </ul>  </div>

              </div>
          
</div>
          </div>
        
          {/* <div
            className="form-check form-check-inline"
            style={{
              float: "right",
            }}
          ></div> */}
        </div>
        <div className="card">
        <div className="card-body">

        
        <div style={{marginTop:"1%"}} >


          <div className="formdesign"  >
            {isSucces !== null ? <h4> {isSucces} </h4> : null}


            <div className="row">
              <div className="col-md-3">
                <select className="form-control" type="text" onChange={(e) => { setOptionVal(e.target.value) }}
                >
                  <option selected disabled >--Select Uploder Card--</option>
                  {
                    (!uploadedData.PANCARD) &&
                    <option key={1} value='PANCARD'>PAN Card</option>
                  }
                  {
                    (!uploadedData.ADHAR) &&
                    <option key={2} value='ADHAR'>Aadhar Card</option>
                  }
                  {
                    (!uploadedData.GST) &&
                    <option key={3} value='GST'>GST</option>
                  }
                  {
                    (!uploadedData.ADDRESS) &&
                    <option key={4} value='ADDRESS'>Address Proof</option>
                  }
                  {
                    (!uploadedData.MSME) &&
                    <option key={5} value='MSME'>MSME Certificate</option>
                  }
                  {
                    (!uploadedData.POR) &&
                    <option key={6} value='POR'>POR Declearation Certificate</option>
                  }
                  {
                    (!uploadedData.DILIGENCE_IMAGE) &&
                    <option key={7} value='DILIGENCE'>Due Diligence Form</option>
                  }
                  {/* <option value={"true"}>--Select Uploder Card--</option> */}
                  {/* {uploadOption.map((uploadOptions) => {
                    return (
                      <option key={uploadOptions.KEY_VALUE} value={uploadOptions.KEY_VALUE}>{uploadOptions.NAME}</option>
                    );
                  })} */}
                </select>
              </div>
              <div className="col-md-3">
                <input type="text" className="form-control" name="optionInputVal" readOnly={true} id='optionInputVal' required placeholder={optionInput} onChange={(e) => { setInputValue(e.target.value) }} />
                {error && inputValueput.length <= 0 ?
                  <p className="text-left text-danger">Please fill with correct input</p>
                  : ""}        </div>

              <div className="col-md-5">

                <input type="file" className="form-control" readOnly={true} name="upload_file" id='upload_file' onChange={(e) => { setInputFile(e.target.value); handleInputChange(e) }} />

                {error && inputFile.length <= 0 ?
                  <p className="text-left text-danger">Choose a correct IMG/PNG file </p>
                  : ""}
              </div>
              <div className="col-md-1">

                <button type="submit" id="submitBtn" className="btn btn-dark" onClick={() => submit()} > Save </button>

              </div>
            </div>
            <br />
          </div>
        </div>
        </div>
      </div>
      </div>
     
      <div className="card-body"   >
        <div className="row" >
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>PAN Details</label>
            {
              (uploadedData.PANCARD) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}>PAN Number: {uploadedData.PANCARD}</tr>
                  <a href='#' onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.PANCARD); toggleCheckFlages() }}>
                    <img className="col-md-11" style={{ alignSelf: "center", display: 'flex', height: '130px' }} src={AxioxExpPort + 'images/' + uploadedData.PANCARD_IMAGE} />
                  </a>
                </>
                :
                <div>
                  <span className="badge badge-danger" >Pending</span>
                </div>
            }
          </div>
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>Aadhar Details</label>
            {
              (uploadedData.ADHAR) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}>Aadhar Number: {uploadedData.ADHAR}</tr>
                  <a href='#' onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.ADHAR); toggleCheckFlages() }}>
                    <img className="col-md-11" style={{ alignSelf: "center", display: 'flex', height: '130px' }} src={AxioxExpPort + 'images/' + uploadedData.ADHAR_IMAGE} />
                  </a>
                </>
                :
                <div>
                  <span className="badge badge-danger" >Pending</span>
                </div>
            }
          </div>
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>GST Details</label>
            {
              (uploadedData.GST) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}>GST Number: {uploadedData.GST}</tr>
                  <a href='#' onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.GST); toggleCheckFlages() }}>
                    <img className="col-md-11" style={{ alignSelf: "center", display: 'flex', height: '130px' }} src={AxioxExpPort + 'images/' + uploadedData.GST_IMAGE} />
                  </a>
                </>
                :
                <div>
                  <span className="badge badge-danger" >Pending</span>
                </div>
            }
          </div>
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>Address Details</label>
            {
              (uploadedData.ADDRESS) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}>Address: {uploadedData.ADDRESS}</tr>
                  <a href='#' onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.ADDRESS); toggleCheckFlages() }}>
                    <img className="col-md-11" style={{ alignSelf: "center", display: 'flex', height: '130px' }} src={AxioxExpPort + 'images/' + uploadedData.ADDRESS_IMAGE} />
                  </a>
                </>
                :
                <div>
                  <span className="badge badge-danger" >Pending</span>
                </div>
            }
          </div>
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>MSME Details</label>
            {
              (uploadedData.MSME) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}>Number: {uploadedData.MSME}</tr>
                  <a href='#' onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.MSME); toggleCheckFlages() }}>
                    <img className="col-md-11" style={{ alignSelf: "center", display: 'flex', height: '130px' }} src={AxioxExpPort + 'images/' + uploadedData.MSME_IMAGE} />
                  </a>
                </>
                :
                <div>
                  <span className="badge badge-danger" >Pending</span>
                </div>
            }
          </div>
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>POR Details</label>
            {
              (uploadedData.POR) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}>PRO Number: {uploadedData.POR}</tr>
                  <a href='#' onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.POR); toggleCheckFlages() }}>
                    <img className="col-md-11" style={{ alignSelf: "center", display: 'flex', height: '130px' }} src={AxioxExpPort + 'images/' + uploadedData.POR_IMAGE} />
                  </a>
                </>
                :
                <div>
                  <span className="badge badge-danger" >Pending</span>
                </div>
            }
          </div>
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>DILIGENCE Details</label>
            {
              (uploadedData.DILIGENCE_IMAGE) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}  >DUE Number: {uploadedData.DILIGENCE}</tr>
                  <a href='#' onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.DILIGENCE); toggleCheckFlages() }}>
                    <img className="col-md-11" style={{ alignSelf: "center", display: 'flex', height: '130px' }} src={AxioxExpPort + 'images/' + uploadedData.DILIGENCE_IMAGE} />
                  </a>
                </>
                :
                <div>
                  <span className="badge badge-danger" >Pending</span>
                </div>
            }
          </div>
         
          {/* <div className="col-md-3 " style={{ marginBottom: '20px' ,backgroundColor:"#2793FF", borderRadius:'90px' }}>
          <p className="text-center" style={{fontStyle: 'oblique',marginTop:'10px', fontSize:15, color:'white' }}>Want to change any document?</p>
                  <img className="col-md-11" style={{ alignSelf: "center",  height: '40px',width:'90' }} src={'https://media2.giphy.com/media/3FogJGpt7jfu5zlKdB/200w.gif?cid=6c09b952ttvhco2bpx64mkczfvf7yiy8qbgjwonjxnfzmhwe&rid=200w.gif&ct=s'} />
          <p className="text-center" style={{fontStyle: 'normal', fontSize:20, color:'white' }}>Please contact with your organization</p>
        </div> */}
        </div>
      </div>
    
      <Modal
        size="md"
        isOpen={showCheckFlages}
        toggle={toggleCheckFlages}
        style={{
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <ModalBody

        >
          <div className="modal-header model-md"
            style={{ marginTop: '-10px' }}
          >
            <h5 className="modal-title text-center" id="exampleModalLabel">
              <p className="h4">Details: <span style={{ color: 'green' }}>{detailVal}</span></p>
            </h5>
            <a href='#' className="text-right" onClick={toggleCheckFlages}>Close</a>
          </div>
          <img className="col-md-12" src={imageSrc} />



        </ModalBody>
      </Modal>
    </>
  );
}
export default MyContact;