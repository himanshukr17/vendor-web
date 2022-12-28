 import React, { useState } from "react";
 import NavHeader from "../../Components/NavHeader";
 import axios from "axios";
 import {AxioxExpPort} from "../AxioxExpPort"
 import { useLocation, useNavigate } from "react-router-dom";

// import { Viewer } from '@react-pdf-viewer/core'; // install this library
// // Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// // Worker
// import { Worker } from '@react-pdf-viewer/core'; // install this library
// import { MdScheduleSend } from "react-icons/md";

// import { BsFillCalendarWeekFill, BsFillDoorOpenFill,BsCloudUploadFill } from "react-icons/bs";
// import { SiConstruct3, SiQuantconnect } from "react-icons/si";
// import { TbBuildingFactory2 } from "react-icons/tb";
// import { GiReceiveMoney } from "react-icons/gi";
// import { GrValidate } from "react-icons/gr";
// import { MdOutlineCategory, MdDescription } from "react-icons/md";
// import { BiRupee } from "react-icons/bi";

// import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";

// import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
 import {
   AiOutlineArrowLeft,
   AiOutlineCloudDownload,
   AiOutlineDownload,
 } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Card } from "reactstrap";

// import { COLORS } from "../../Constants/theme";





function Receiveables() {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

   const [uploadOption,setUploadOption]=useState([
    {NAME:"--Select Uploder Card--", KEY_VALUE:"true"},
    {NAME:"PAN Card:", KEY_VALUE:"PANCARD"},
    {NAME:"Aadhar Card:", KEY_VALUE:"ADHAR"},
    {NAME:"GST:", KEY_VALUE:"GST"},
    {NAME:"ADDRESS Proof:", KEY_VALUE:"ADDRESS"},
    {NAME:"MSME Certificate:", KEY_VALUE:"MSME"},
    {NAME:"POR Declearation Certificate:", KEY_VALUE:"POR"},
    {NAME:"Due Diligence Form:", KEY_VALUE:"DILIGENCE"}
     ]);

      const [optionVal,setOptionVals]=useState("true");
      const [optionInput,setOptionInput]=useState("");
     const setOptionVal =(e)=>{
      const optionsDa= uploadOption.find((user) => user.KEY_VALUE === e);
      //console.log("countriess",countriess.STATE)
      if(e ==="true"){
        setBtnCtrl(false)
        
      }else{

        setBtnCtrl(true)
      }
     const splVal=optionsDa.NAME.split(' ')
      console.log()
      setImgPrevew(false)
      setOptionVals(optionsDa.KEY_VALUE);
      setOptionInput(splVal[0]+" Number")
    }
    
   

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });

    console.log(event.target.files[0]);

  }

  const [isSucces, setSuccess] = useState(null);
  const [imgPrv, setImgPrevew] = useState(false);
  const [btnCtrl, setBtnCtrl] = useState(false);
  const vendorId =localStorage.getItem('vendorId');
  const[hideFiles,setHideFiles]=useState(false); 

  const[panNmbr,setPanNmbr]=useState("")
  const[panImg,setPanImg]=useState("")
  const[aadharNmbr,aadharPanNmbr]=useState("")
  const[aadharImg, aadharPanImg]=useState("")
  const[gstNmbr,setGSTNmbr]=useState("")
  const[gstImg , setGSTImg]=useState("")
  const[addNmbr,setAddNmbr]=useState("")
  const[addImg ,setAddImg]=useState("")
  const[mseNmbr,setMseNmbr]=useState("")
  const[mseImg ,setMseImg]=useState("")
  const[dueNmbr,setDueNmbr]=useState("")
  const[dueImg ,setDueImg]=useState("")
  const[porNmbr,setPorNmbr]=useState("")
  const[porImg ,setPorImg]=useState()
  const submit = async () =>{
    
    const formData = new FormData(); 
    formData.append("image", userInfo.file);
    formData.append(optionVal, optionInput);
    
    try {
    const response = axios({
         method: "post",
         url: AxioxExpPort+"api/file/create?id="+vendorId,
         data:formData,
         headers: { "Content-Type": "multipart/form-data" },
       }).then((res)=>{
        setAddNmbr(res.data.ADDRESS);
        setAddImg(res.data.ADDRESS_IMAGE);
        aadharPanNmbr(res.data.ADHAR)
        aadharPanImg(res.data.ADHAR_IMAGE);
        setGSTImg(res.data.GST_IMAGE);
        setGSTNmbr(res.data.GST);
        setMseImg(res.data.MSME_IMAGE);
        setMseNmbr(res.data.MSME)
        setAddNmbr(res.data.MSME);
        setPanNmbr(res.data.PANCARD);
        setPanImg(res.data.PANCARD_IMAGE);
        setPorImg(res.data.POR_IMAGE);
        setPorNmbr(res.data.POR);
        setDueNmbr(res.data.DILIGENCE)
        setDueImg(res.data.DILIGENCE_IMAGE)
        
        console.log("res",res);setImgPrevew(true);setOptionInput("");setBtnCtrl(false)});
    
       } catch(error) {
       console.log(error)
       }
    // axios.post(AxioxExpPort+"received/get?id="+vendorId, formdata,{   
    //         headers: { "Content-Type": "multipart/form-data" } 
    // })
    // .then(res => { // then print response status
    //   console.warn(res);
    //   if(res.data.success === 1){
    //     setSuccess("Image upload successfully");
    //   }

    // })
  }

  return (
    <>
    <NavHeader />
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
               style={{
                 borderRadius: 50,
               }}
               onClick={() => {
                 navigate("/dashboard");
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
               My Contacts
             </h4>
           </div>
           <div
             className="form-check form-check-inline"
             style={{
               float: "right",
             }}
           ></div>
         </div>
        <div className="container" >
      

      <div className="formdesign"  >
      {isSucces !== null ? <h4> {isSucces} </h4> :null }
      <div className="row">
        <div className="col-md-3">
        <select  className="form-control"  type="text"  onChange={(e)=>{ setOptionVal(e.target.value)}}
                >
                {/* <option value={"true"}>--Select Uploder Card--</option> */}
          {uploadOption.map((uploadOptions) => {
                   return (
                     <option  key={uploadOptions.KEY_VALUE} value={uploadOptions.KEY_VALUE}>{uploadOptions.NAME}</option>
                   );
                 })} 

               </select> 
        </div>
        {optionVal!=="true"&&
        <div className="col-md-3">
  
<input type="text" className="form-control" name="optionInputVal"   required placeholder={optionInput} onChange={(e)=>{setOptionInput(e.target.value)}} />

        </div>
        }
    {btnCtrl&&
        <div className="col-md-5">
  
<input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />

        </div>
    }
        <div className="col-md-1">
       {btnCtrl &&
          <button type="submit" className="btn btn-dark" onClick={()=>submit()} > Save </button>
       }
      
        </div>
      </div>
      <br/>


      
  
       
      </div>
    
    </div>
    </div>
    <div className="card-body"   >
    <div className="row" >
   
    {imgPrv && 
        <img  className="col-md-4"    src={userInfo.filepreview} alt="UploadImage" />
    }
      
    <div className="col-md-8">
    <div className="row">
{panNmbr !=="" &&
              <div className="col-md-4" style={{ textAlign: "left" }}>

                <label className="text-green" style={{marginBottom:"-15px"}}>PAN Details</label>
                <tr className="text-white">Number: {panNmbr}</tr>
                <tr className="text-white">Image: {panImg}</tr>
              </div>

}
{aadharImg !=="" &&
              <div className="col-md-4" style={{ textAlign: "left" }}>
                <label className="text-green" style={{marginBottom:"-15px"}}>Aadhar Details</label>
                <tr className="text-white">Number: {aadharNmbr}</tr>
                <tr className="text-white">Image: {aadharImg} </tr>
              </div>
}
{gstImg !=="" &&
              <div className="col-md-4" style={{ textAlign: "left" }}>
                <label className="text-green" style={{marginBottom:"-15px"}}>GST Details</label>
                <tr className="text-white">Number: {gstNmbr} </tr>
                <tr className="text-white">Image: {gstImg} </tr>
              </div>
}

{addNmbr !=="" &&
              <div className="col-md-4" style={{marginTop:"10px", textAlign: "left" }}>
                <label className="text-green" style={{marginBottom:"-15px"}}>Address Details</label>
                <tr className="text-white">Number: {addNmbr} </tr>
                <tr className="text-white">Image: {addImg} </tr>
              </div>
}
{mseNmbr !=="" &&

              <div className="col-md-4" style={{marginTop:"10px", textAlign: "left" }}>
                <label className="text-green" style={{marginBottom:"-15px"}}>MSME Details</label>
                <tr className="text-white">Number: {mseNmbr} </tr>
                <tr className="text-white">Image: {mseImg} </tr>
              </div>
}
{porNmbr !=="" &&
              <div className="col-md-4" style={{ textAlign: "left" ,marginTop:"10px"}}>
                <label className="text-green" style={{marginBottom:"-15px"}}>POR Details</label>
                <tr className="text-white">Number: {porNmbr} </tr>
                <tr className="text-white">Image: {porImg} </tr>
              </div>
}
{dueNmbr !=="" &&
              <div className="col-md-4" style={{ textAlign: "left",marginTop:"10px"}}>
                <label className="text-green" style={{marginBottom:"-15px"}}>DUE Details</label>
                <tr className="text-white"> {dueNmbr} </tr>
                <tr className="text-white"> {dueImg} </tr>
              </div>
}

       
</div>
</div>
</div>
       
    </div>
    </>
  );
}

export default Receiveables;











// function MyContracts() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
//   const [ClickedPOsData, setClickedPOsData] = useState([]);
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   const [thead, setTHead] = useState([
//     "Agreement Date",
//     "Contract Number",
//     "Plant",
//   ]);

//   const [tbody, setTBody] = useState([
//     {
//       AGREEMENT_DATE: "2022/10/26",
//       CONTRACT_NUMBER: "445209283876",
//       PLANT_NAME: "abc",
//       ITEM_NAME: "XYZ Pvt Ltd",
//       MATERIAL_NUMBER: "27346234982347",
//       DESCRIPTION: "Your material is delivered successfully",
//       TARGET_QUANTITY: "5000",
//       TARGET_VALUE: "5000",
//       OPEN_QUANTITY:"98723",
//       NET_VALUE: "7600",
//       RECEIVING_PLANT: "10000000",
//       VALIDITY_START: "2022/08/01",
//       VALIDITY_END: "2023/01/01",
//     },
//     {
//       AGREEMENT_DATE: "2022/10/26",
//       CONTRACT_NUMBER: "445209283876",
//       PLANT_NAME: "XYG",
//       ITEM_NAME: "XYZ Pvt Ltd",
//       MATERIAL_NUMBER: "27346234982347",
//       DESCRIPTION: "Your material is delivered successfully",
//       TARGET_QUANTITY: "5000",
//       TARGET_VALUE: "5000",
//       OPEN_QUANTITY:"98723",
//       NET_VALUE: "7600",
//       RECEIVING_PLANT: "10000000",
//       VALIDITY_START: "2022/08/01",
//       VALIDITY_END: "2023/01/01",
//     },
   
//   ]);
//   const [pdfFile,setPdfFile]=useState(null);
//   const [pdfFileError,setPdfFileError]=useState('');
//   const [viewPdf,setViewPdf]=useState(null);
//   const [hiddenBnt,setHiddenBtn]=useState(false)
//   const [selectedFiless, setSelectedFiless] = React.useState(null);
//   //const fileType=['.jpg'];
//    const fileType=['application/pdf'];
//   const handlePdfChange=(e)=>{
//     let selectedFile=e.target.files[0];
//     if(selectedFile){
//       setSelectedFiless(e.target.files[0])
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (e) =>{
//           setPdfFile(e.target.result);
//           setPdfFileError('');
//           setHiddenBtn(true)
         
//             }
//       }
//       else{
//         setPdfFile(null);
//         setPdfFileError('Please select valid pdf file');
//         setHiddenBtn(false)
//       }
//     }
//     else{
//       console.log('select your file');
//     }
//   }

//   const [aadhaFile,setAadhaFile]=useState(null);
//   const [aadhaFileFileError,setAadhaFileFileError]=useState('');
//   const [viewAadhaFile,setViewAadhaFile]=useState(null);
//   const [aadhaFileBnt,setaadhaFileBtn]=useState(false)
//   // const [selectedFiless, setSelectedFiless] = React.useState(null);
//   const [selectedAadhar, setSelectedAadhar] = React.useState(null);

//   const handleAadharChange=(e)=>{
//     let selectedFile=e.target.files[0];
//     // let file=e.target.files[0]
//     // this.setState({file:file})
//     if(selectedFile){
//       setSelectedAadhar(e.target.files[0])
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (e) =>{
//           setAadhaFile(e.target.result);
//           setAadhaFileFileError('');
//           setaadhaFileBtn(true)
         
//             }
//       }
//       else{
//         setAadhaFile(null);
//         setAadhaFileFileError('Please select valid pdf file');
//         setaadhaFileBtn(false)
//       }
//     }
//     else{
//       console.log('select your file');
//     }
//   }

//   // form sumit
  

//   const uploadPANCard =(e)=>{
//     e.preventDefault();
//     if(pdfFile!==null){
//       // let file=this.state.file;
      
//      var tem=e.target[0].value;
      
//       //alert("formData")
//       const vendorId =localStorage.getItem('vendorId');
//       // alert(vendorId)
      
//       const formData = new FormData();
//       formData.append("image", selectedFiless);
//       formData.append("PANCARD", tem);
//       console.log(formData);
//  try {

//  const response = axios({
//    method: "post",
//    url: AxioxExpPort+"api/file/create?id="+vendorId,
//    data:formData,
//    headers: { "Content-Type": "multipart/form-data" },
//  }).then((res)=>{setViewPdf(pdfFile)});

//  } catch(error) {
//  console.log(error)
//  }
//  }
//  return true
//    }

// // axios.post(AxioxExpPort+"api/file/create?id="+vendorId,{
// // image: "pdfFile",
// // PANCARD:"e.target[0].value"
// // })
// // .then((res)=>{setViewPdf(pdfFile);console.log("here is the data",res)})
// //   .catch((err)=>{console.log(err)});
// //       setViewPdf(pdfFile);
// //     }
// //     else{
// //       setViewPdf(null);
// //     }
// //   }
//   const uploadAadharCard =(e)=>{
//    // alert(aadhaFile)
//     e.preventDefault();
//     if(aadhaFile!==null){

//      var tem=e.target[0].value;
      
//      //alert(tem)
//      const vendorId =localStorage.getItem('vendorId');
//      // alert(vendorId)
     
//      const formData = new FormData();
//      formData.append("image", selectedAadhar);
//      formData.append("ADHAR", tem);
//     // console.log(formData);
// try {
// const response = axios({
//   method: "post",
//   url: AxioxExpPort+"api/file/create?id="+vendorId,
//   data:formData,
//   headers: { "Content-Type": "multipart/form-data" },
// }).then((res)=>{console.log("reason",res);setViewAadhaFile(aadhaFile)});
// return true
// } catch(error) {
// console.log(error)
// }
      
//     }
//     else{
//       setViewAadhaFile(null);
//     }
//     return true
//   }


//   const [gstFile,setGstFile]=useState(null);
//   const [gstFileFileError,setGstFileFileError]=useState('');
//   const [viewGstFile,setViewGstFile]=useState(null);
//   const [gstFileBnt,setGstFileBtn]=useState(false);
//   const [selectedGST, setSelectedGST] = React.useState(null);

//   const handleGSTChange=(e)=>{
//     let selectedFile=e.target.files[0];
//     if(selectedFile){
//       setSelectedGST(e.target.files[0])
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (e) =>{
//           setGstFile(e.target.result);
//           setGstFileFileError('');
//           setGstFileBtn(true)
         
//             }
//       }
//       else{
//         setAadhaFile(null);
//         setGstFileFileError('Please select valid pdf file');
//         setGstFileBtn(false)
//       }
//     }
//     else{
//       console.log('select your file');
//     }

//   }
//   const uploadGST =(e)=>{
//       //alert("aadhaFile")
//     e.preventDefault();
//     if(gstFile!==null){
//      var tem=e.target[0].value;
      
//      //alert(tem)
//      const vendorId =localStorage.getItem('vendorId');
//      // alert(vendorId)
     
//      const formData = new FormData();
//      formData.append("image", selectedGST);
//      formData.append("GST", tem);
//     //  console.log(formData);
// try {
// const response = axios({
//   method: "post",
//   url: AxioxExpPort+"api/file/create?id="+vendorId,
//   data:formData,
//   headers: { "Content-Type": "multipart/form-data" },
// }).then((res)=>{console.log("reason",res);setViewGstFile(gstFile)});
// return true } catch(error) {
// // console.log(error)
// }
      
      
//     }
//     else{
//       setViewGstFile(null);
//     }
//     return true
//   }

//   const [addFile,setAddFile]=useState(null);
//   const [addFileFileError,setAddFileFileError]=useState('');
//   const [viewAddFile,setViewAddFile]=useState(null);
//   const [addFileBnt,setAddFileBtn]=useState(false)
//   const [selectedADD, setSelectedADD] = React.useState(null);

//   const handleAddressChange=(e)=>{
//     let selectedFile=e.target.files[0];
    
//     if(selectedFile){
//       setSelectedADD(e.target.files[0])
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (e) =>{
//           setAddFile(e.target.result);
//           setAddFileFileError('');
//           setAddFileBtn(true)
         
//             }
//       }
//       else{
//         setAddFile(null);
//         setAddFileFileError('Please select valid pdf file');
//         setAddFileBtn(false)
//       }
//     }
//     else{
//       console.log('select your file');
//     }
//   }

  
//   const uploadAddress =(e)=>{
//       //alert(aadhaFile)
//     e.preventDefault();
//     if(addFile!==null){


//       var tem=e.target[0].value;
      
//       //alert(tem)
//       const vendorId =localStorage.getItem('vendorId');
//       // alert(vendorId)
      
//       const formData = new FormData();
//       formData.append("image", selectedADD);
//       formData.append("ADDRESS", tem);
//      //  console.log(formData);
//  try {
//  const response = axios({
//    method: "post",
//    url: AxioxExpPort+"api/file/create?id="+vendorId,
//    data:formData,
//    headers: { "Content-Type": "multipart/form-data" },
//  }).then((res)=>{console.log("reason",res);setViewAddFile(addFile)});
//  return true 
// } catch(error) {
//  // console.log(error)
//  }

//     }
//     else{
//       setViewAddFile(null);
//     }
//   }

//   const [msmeFile,setMsmeFile]=useState(null);
//   const [msmeFileFileError,setMsmeFileFileError]=useState('');
//   const [viewMsmeFile,setViewMsmeFile]=useState(null);
//   const [msmeFileBnt,setMsmeFileBtn]=useState(false)

//   const [selectedMSME, setSelectedMSME]= React.useState(null);

//   const handleMsmeChange=(e)=>{
//     let selectedFile=e.target.files[0];
    
//     if(selectedFile){
//       setSelectedMSME(e.target.files[0])
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (e) =>{
//           setMsmeFile(e.target.result);
//           setMsmeFileFileError('');
//           setMsmeFileBtn(true)
         
//             }
//       }
//       else{
//         setMsmeFile(null);
//         setMsmeFileFileError('Please select valid pdf file');
//         setMsmeFileBtn(false)
//       }
//     }
//     else{
//       console.log('select your file');
//     }
//   }
//   const uploadMsme =(e)=>{
//       //alert(aadhaFile)
//     e.preventDefault();
//     if(msmeFile!==null){

      

//       var tem=e.target[0].value;
      
//       //alert(tem)
//       const vendorId =localStorage.getItem('vendorId');
//       // alert(vendorId)
      
//       const formData = new FormData();
//       formData.append("image", selectedMSME);
//       formData.append("MSME", tem);
//      //  console.log(formData);
//  try {
//  const response = axios({
//    method: "post",
//    url: AxioxExpPort+"api/file/create?id="+vendorId,
//    data:formData,
//    headers: { "Content-Type": "multipart/form-data" },
//  }).then((res)=>{console.log("reason",res);      setViewMsmeFile(msmeFile)});
//  } catch(error) {
//  // console.log(error)
//  }
//     }
//     else{
//       setViewMsmeFile(null);
//     }
//   }
//   const [porFile,setPorFile]=useState(null);
//   const [porFileFileError,setPorFileFileError]=useState('');
//   const [viewPorFile,setViewPorFile]=useState(null);
//   const [porFileBnt,setPorFileBtn]=useState(false)
//   const [selectedPOR, setSelectedPOR] = React.useState(null);

//   const handlePorChange=(e)=>{
//     let selectedFile=e.target.files[0];
    
//     if(selectedFile){
//       setSelectedPOR(e.target.files[0])
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (e) =>{
//           setPorFile(e.target.result);
//           setPorFileFileError('');
//           setPorFileBtn(true)
         
//             }
//       }
//       else{
//         setPorFile(null);
//         setPorFileFileError('Please select valid pdf file');
//         setPorFileBtn(false)
//       }
//     }
//     else{
//       console.log('select your file');
//     }
//   }
//   const uploadPor =(e)=>{
//       alert(aadhaFile)
//     e.preventDefault();
//     if(porFile!==null){

//       var tem=e.target[0].value;
      
//       //alert(tem)
//       const vendorId =localStorage.getItem('vendorId');
//       // alert(vendorId)
      
//       const formData = new FormData();
//       formData.append("image", selectedPOR);
//       formData.append("POR", tem);
//      //  console.log(formData);
//  try {
//  const response = axios({
//    method: "post",
//    url: AxioxExpPort+"api/file/create?id="+vendorId,
//    data:formData,
//    headers: { "Content-Type": "multipart/form-data" },
//  }).then((res)=>{console.log("reason",res);  setViewPorFile(porFile)});
//  return true;} catch(error) {
//  // console.log(error)
//  }

    
//     }
//     else{
//       setViewPorFile(null);
//     }
//     return true
//   }
//   const [dueFile,setDueFile]=useState(null);
//   const [dueFileFileError,setDueFileFileError]=useState('');
//   const [viewDueFile,setViewDueFile]=useState(null);
//   const [dueFileBnt,setDueFileBtn]=useState(false)
//   const [selectedDUE, setSelectedDUE] = React.useState(null);

//   const handleDueChange=(e)=>{
//     let selectedFile=e.target.files[0];
    
//     if(selectedFile){
//       setSelectedDUE(e.target.files[0]);
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend = (e) =>{
//           setDueFile(e.target.result);
//           setDueFileFileError('');
//           setDueFileBtn(true)
         
//             }
//       }
//       else{
//         setDueFile(null);
//         setDueFileFileError('Please select valid pdf file');
//         setDueFileBtn(false)
//       }
//     }
//     else{
//       console.log('select your file');
//     }
//   }
//   const uploadDue =(e)=>{
//       //alert(aadhaFile)
//     e.preventDefault();
//     if(dueFile!==null){


//       var tem=e.target[0].value;
      
//       //alert(tem)
//       const vendorId =localStorage.getItem('vendorId');
//       // alert(vendorId)
      
//       const formData = new FormData();
//       formData.append("image", selectedDUE);
//       formData.append("DILIGENCE", tem);
//      //  console.log(formData);
//  try {
//  const response = axios({
//    method: "post",
//    url: AxioxExpPort+"api/file/create?id="+vendorId,
//    data:formData,
//    headers: { "Content-Type": "multipart/form-data" },
//  }).then((res)=>{console.log("reason",res);setViewDueFile(dueFile)});
//  return true 
// } catch(error) {
//  // console.log(error)
//  }
//     }
//     else{
//       setViewDueFile(null);
//     }
//     return true;
//   }

//   const DownloadButton = (e, INVOICE_URL) => {
//     e.preventDefault();

//     fetch(INVOICE_URL).then((response) => {
//       response.blob().then((blob) => {
//         // Creating new object of PDF file
//         const fileURL = window.URL.createObjectURL(blob);
//         // Setting various property values
//         let alink = document.createElement("a");
//         alink.href = fileURL;
//         alink.download = "SamplePDF.pdf";
//         alink.click();
//       });
//     });
//   };

//   const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
//   const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);

//   return (
//     <>
//       <NavHeader />
  
//       <div
//         className="card"
//         style={{
//           marginTop: "5%",
//         }}
//       >
//         <div
//           className="card-body"
//           style={{
//             display: "flex",
//           }}
//         >
//           <div className="form-check form-check-inline">
//             <button
//               className="btn btn"
//               style={{
//                 borderRadius: 50,
//               }}
//               onClick={() => {
//                 navigate("/dashboard");
//               }}
//             >
//               <IconContext.Provider value={{ color: "#000", size: "22px" }}>
//                 <AiOutlineArrowLeft />
//               </IconContext.Provider>
//             </button>
//           </div>
//           <div className="form-check form-check-inline">
//             <h4 className="form-check-label" htmlFor="inlineRadio2">
//               {/* {location.PROJECT} */}
//               {/* {location.state.name} */}
//               My Contacts
//             </h4>
//           </div>
//           <div
//             className="form-check form-check-inline"
//             style={{
//               float: "right",
//             }}
//           ></div>
//         </div>
//         <div classname="card-body">
       
//         <div className="row" style={{margin:"10px"}}>
//        <form onSubmit={uploadPANCard}>
//         <div className="row">
//         <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>Pan Number:</p>
//     <input className="form-control"  required type="text" id="text" />
//           </div>
//           <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>Pan Card pdf:</p>
//           <div className="row">
//     <div className="col-md-10">
//     <input className="form-control" onChange={handlePdfChange} required type="file" />
//     {pdfFileError&&<div className="error-msg">{pdfFileError}</div>}
   
//           </div>
//     <div className="col-md-2">
//     {hiddenBnt?<button type="submit" id="PANBtn" class="btn btn-info"><BsCloudUploadFill/></button>:null}
    
//           </div>
//           </div>
//           </div>
//           <div className="col-md-4">
//           {hiddenBnt?  <div className='pdf-container' >
//  {/* show pdf conditionally (if we have one)  */}
//  {viewPdf&&<><Worker style={{colro:"green"}} workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewPdf}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewPdf&&<>Please Upload the File</>}
// </div>:null}
        
//           </div>
//           </div>
//           </form>
//         </div>


//         <div className="row" style={{margin:"10px"}}>
//        <form onSubmit={uploadAadharCard} >
//         <div className="row">
//         <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>Aadhar Number:</p>
//     <input className="form-control"  required type="text" id="text" />
//           </div>
//           <div className="col-md-4">
//           <p className="text-left "  style={{marginBottom:"-1px"}}>Aadhar Card pdf:</p>
//           <div className="row">
//     <div className="col-md-10">
//     <input className="form-control" onChange={handleAadharChange} required type="file"  />
//     {aadhaFileFileError&&<div className="error-msg">{aadhaFileFileError}</div>}

   
//           </div>
//     <div className="col-md-2">
//           {aadhaFileBnt?<button type="submit"  class="btn btn-info"><BsCloudUploadFill/></button>:null}
//           </div>
//           </div>
//           </div>
//           <div className="col-md-4">
//           {aadhaFileBnt?  <div className='pdf-container'>
//           {viewAadhaFile&&<><Worker  workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewAadhaFile}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewAadhaFile&&<>Please Upload the File</>}
// </div>:null}
//           </div>
//           </div>
//           </form>
//         </div>

//         <div className="row" style={{margin:"10px"}}>
//        <form onSubmit={uploadGST} >
//         <div className="row">
//         <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>GST registration certificate Number:</p>
//     <input className="form-control"  required type="text" id="text" />
//           </div>
//           <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>GST registration certificate copy:</p>
//           <div className="row">
//     <div className="col-md-10">
//     <input className="form-control"  onChange={handleGSTChange} required type="file" id="formFile" />
//     {gstFileFileError&&<div className="error-msg">{gstFileFileError}</div>}

//           </div>
//           <div className="col-md-2">
//           {gstFileBnt?<button type="submit" class="btn btn-info"><BsCloudUploadFill/></button>:null}
//           </div>
//           </div>
//           </div>
//           <div className="col-md-4">
//           {gstFileBnt?  <div className='pdf-container'>
//           {viewGstFile&&<><Worker  workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewGstFile}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewGstFile&&<>Please Upload the File</>}
// </div>:null}
//           </div>
//           </div>
//           </form>
//         </div>

//         <div className="row" style={{margin:"10px"}}>
//        <form onSubmit={uploadAddress}>
//         <div className="row">
//         <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>Address: </p>
//     <input className="form-control"  required type="text" id="text" />
//           </div>
//           <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>Address Proof:</p>
//           <div className="row">
//           <div className="col-md-10">
//     <input className="form-control"  onChange={handleAddressChange} required type="file" id="formFile" />
//     {addFileFileError&&<div className="error-msg">{addFileFileError}</div>}

//           </div>
//           <div className="col-md-2">
//           {addFileBnt?<button type="submit" class="btn btn-info"><BsCloudUploadFill/></button>:null}
//           </div>
//           </div>
//           </div>
//           <div className="col-md-4">
//           {addFileBnt?  <div className='pdf-container'>
//           {viewAddFile&&<><Worker  workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewAddFile}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewAddFile&&<>Please Upload the File</>}
// </div>:null}
//           </div>
//           </div>
//           </form>
//         </div>

//         <div className="row" style={{margin:"10px"}}>
//        <form onSubmit={uploadMsme}>
//         <div className="row">
//         <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>MSME Registration Number: </p>
//     <input className="form-control"  required type="text" id="text" />
//           </div>
//           <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>MSME Certificate:</p>
//           <div className="row">
//           <div className="col-md-10">
//     <input className="form-control"  onChange={handleMsmeChange} required type="file" id="formFile" />
//     {msmeFileFileError&&<div className="error-msg">{msmeFileFileError}</div>}

//           </div>
//           <div className="col-md-2">
//           {msmeFileBnt?<button type="submit" class="btn btn-info"><BsCloudUploadFill/></button>:null}
//           </div>
//           </div>
//           </div>
//           <div className="col-md-4">
//           {msmeFileBnt?  <div className='pdf-container'>
//           {viewMsmeFile&&<><Worker  workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewMsmeFile}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewMsmeFile&&<>Please Upload the File</>}
// </div>:null}
//           </div>
//           </div>
//           </form>
//         </div>

//         <div className="row" style={{margin:"10px"}}>
//        <form onSubmit={uploadPor}>
//         <div className="row">
//         <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>POR Declearation: </p>
//     <input className="form-control"  required type="text" id="text" />
//           </div>
//           <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>POR Declearation Certificate:</p>
//           <div className="row">
//           <div className="col-md-10">
//     <input className="form-control"  onChange={handlePorChange} required type="file" id="formFile" />
//     {porFileFileError&&<div className="error-msg">{porFileFileError}</div>}

//           </div>
//           <div className="col-md-2">
//           {porFileBnt?<button type="submit" class="btn btn-info"><BsCloudUploadFill/></button>:null}
//           </div>
//           </div>
//           </div>
//           <div className="col-md-4">
//           {porFileBnt?  <div className='pdf-container'>
//           {viewPorFile&&<><Worker  workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewPorFile}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewPorFile&&<>Please Upload the File</>}
// </div>:null}
//           </div>
//           </div>
//           </form>
//         </div>

//         <div className="row" style={{margin:"10px"}}>
//        <form onSubmit={uploadDue}>
//         <div className="row">
//         <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>Due Diligence:</p>
//     <input className="form-control"   required type="text" id="dueText" />
//           </div>
//           <div className="col-md-4">
//           <p className="text-left " style={{marginBottom:"-1px"}}>Due Diligence Form: </p>
//           <div className="row">
//           <div className="col-md-10">
//     <input className="form-control"  onChange={handleDueChange} required  type="file" name="formFiles" />
//     {dueFileFileError&&<div className="error-msg">{dueFileFileError}</div>}

//           </div>
//           <div className="col-md-2">
//           {dueFileBnt?<button type="submit" class="btn btn-info"><BsCloudUploadFill/></button>:null}
//           </div>
//           </div>
//           </div>
//           <div className="col-md-4">
//           {dueFileBnt?  <div className='pdf-container'>
//           {viewDueFile&&<><Worker  workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewDueFile}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewDueFile&&<>Please Upload the File</>}
// </div>:null}
//           </div>
//           </div>
//           </form>
//         </div>
       
//       </div>
//       </div>

//     </>
//   );
// }

// export default MyContracts;

