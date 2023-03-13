import React, { useEffect, useState } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import { AxioxExpPort } from "../AxioxExpPort"
import {  useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { Modal, ModalBody } from "reactstrap";
const BuyerMyContact=(props)=> {
  const locationID=useLocation();
  const vendorId = locationID.state.myVendorID;
  const vendorName = locationID.state.myVendorName;
  // console.log("locationID.state.",locationID.state)
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [error, setErrorsss] = useState(false)

  const [isSucces, setSuccess] = useState(null);
  const [imgPrv, setImgPrevew] = useState(false);


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
  const [showCheckFlages, setShowCheckFlages] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [detailVal, setDetailVal] = useState(null);


  const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
  useEffect(() => {
    const fetchData = async () => {
      axios.get(AxioxExpPort + "createcompany/contact?id=" + vendorId)
        .then((response) => {
          //  setTBody(response.data);
          setUploadedData(response.data);
          console.log("response.data", response);

        })
    }
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
      <div id="snackbar" style={{ backgroundColor: toasterColor, borderRadius: "50px" }}>{toaster}</div>

      <div
        className="card"
        style={{
          marginTop: "5%",

        }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
          }}
        >

          <div className="form-check form-check-inline">
            <button
              className="btn btn"

              onClick={() => {
                navigate("/mv");
              }}
            >
              <IconContext.Provider value={{ color: "#000", size: "22px" }}>
                <AiOutlineArrowLeft />
              </IconContext.Provider>
            </button>
          </div>
          <div className="form-check form-check-inline">
            <h4 className="form-check-label" htmlFor="inlineRadio2">
              {/* {location.PROJECT} */}
              {/* {location.state.name} */}
              Uploded Document Of {" "+vendorName+"("+vendorId +")"}
            </h4>
          </div>
          <div
            className="form-check form-check-inline"
            style={{
              float: "right",
            }}
          ></div>
        </div>
     
        
      <div className="card-body"   >
        <div className="row" >
          <div className="col-md-3" style={{ marginBottom: '20px' }}>
            <label className="text-black" style={{ marginBottom: "-15px", textDecorationLine: 'underline' }}>PAN Details</label>
            {
              (uploadedData.PANCARD) ?
                <>
                  <tr className="text-black" style={{ textAlign: "left" }}>PAN Number: {uploadedData.PANCARD}</tr>
                  <a type="button" onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.PANCARD); toggleCheckFlages() }}>
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
                  <a type="button" onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.ADHAR); toggleCheckFlages() }}>
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
                  <a type="button" onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.GST); toggleCheckFlages() }}>
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
                  <a type="button" onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.ADDRESS); toggleCheckFlages() }}>
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
                  <a type="button" onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.MSME); toggleCheckFlages() }}>
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
                  <a type="button" onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.POR); toggleCheckFlages() }}>
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
                  <a type="button" onClick={(e) => { setImageSrc(e.target.src); setDetailVal(uploadedData.DILIGENCE); toggleCheckFlages() }}>
                    <img className="col-md-11" src={AxioxExpPort + 'images/' + uploadedData.DILIGENCE_IMAGE} />
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
      </div>
      <Modal
        size="lg"
        isOpen={showCheckFlages}
        toggle={toggleCheckFlages}
        style={{
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <ModalBody

        >
          <div className="modal-header model-lg"
            style={{ marginTop: '-10px' }}
          >
            <h5 className="modal-title text-center" id="exampleModalLabel">
              <p className="h4">Details: <span style={{ color: 'green' }}>{detailVal}</span></p>
            </h5>
            <a type="button" className="text-right" onClick={toggleCheckFlages}>Close</a>
          </div>
          <img className="col-md-12" src={imageSrc} />



        </ModalBody>
      </Modal>
    </>
  );
}
export default BuyerMyContact;