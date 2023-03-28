import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineEdit, AiOutlineHome, AiOutlineMessage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'reactstrap'
import NavHeader from '../../Components/NavHeader'
import { COLORS } from '../../Constants/theme'

// import "../../StyleSheets/CustomerSupport.css"
function CustomerSupport() {
    const navigate = useNavigate();
    const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
    const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
    const [showForm, setShowForm]=useState(false)
    const [showFile, setShowFile]=useState(false)
    const [uploadOption, setUploadOption] = useState([
      { NAME: "--Select Uploder Card--", KEY_VALUE: "false" },
      { NAME: "PAN Card:", KEY_VALUE: "PANCARD" },
      { NAME: "Aadhar Card:", KEY_VALUE: "ADHAR" },
      { NAME: "GST:", KEY_VALUE: "GST" },
      { NAME: "Address Proof:", KEY_VALUE: "ADDRESS" },
      { NAME: "MSME Certificate:", KEY_VALUE: "MSME" },
      { NAME: "POR Declearation Certificate:", KEY_VALUE: "POR" },
      { NAME: "Due Diligence Form:", KEY_VALUE: "DILIGENCE" }
    ]);
    const setOptionVal = (e) => {
      e ==="request"?
      setShowForm(true)
      :setShowForm(false)


    }
    const setOptionDoc = (e) => {
      e.length>0?
      setShowFile(true)
      :setShowFile(false)


    }
  return (
    <div> 
     <NavHeader />
      
      <div
        className="card-body"
        style={{
          marginTop: "5%",
        }}
      >
        <div
          
        >
          <div className="row" style={{ marginBottom:10}}>
            <div className="col-md-12">
              <div className="row" >
               
                <div className="col-md-10">

               
                <div style={{ display: 'flex', alignItems: 'center' }}>
<h4 className="form-check-label">
Customer Support
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
                <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
                  
                    <IconContext.Provider value={{ color: "red", size: "22px" }}>
                      <AiOutlineHome type="button"   onClick={() => {
                      navigate("/dashboard");
                    }} />
                    </IconContext.Provider>
                  
                  {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}
              
                  {/* {" / "}
                    <a className="dropdown-toggle" style={{color:"maroon"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
            Transaction Data    
          </a> */}
          </div>
          </div>
          </div>
          </div>
          </div>
     
<div className='row'>
  <div className='col-md-7' >
  <img src="../../../Images/41676.gif" width={"50%"} style={{ display:"block", marginLeft: "auto", marginRight: "auto" }} height={300} alt="Cartoons" />

  <div className="card">
<div className="card-body">
    <p className="text-right" ></p>
      <table className="table table-light table-bordered table-hover">
        <thead className="table-light">
          <tr
            className="text-center"
            style={{
              backgroundColor: COLORS.gray20,
              borderColor: COLORS.gray10,
            }}
          >
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Ticket ID</th>
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">About</th>
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Description</th>
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* {isPurchaseOrderEmpty ? (
            tbody.map((val, index) => {
              let total = 0;
              val.return_order.map((itemsPrice) =>
                total = total + itemsPrice.PER_UNIT_PRICE * itemsPrice.RETURN_QTY
              )
              let totalQtuy = 0;
              val.return_order.map((itemsPrices) =>
              totalQtuy = totalQtuy + itemsPrices.RETURN_QTY
              )
              return ( */}
                <tr
                  key={`row`}
                  style={{
                    backgroundColor: "white",
                    borderColor: "#000",
                  }}
                  className="table-light"
                >
                  <td className="text-center">HEllo</td>
                  <td className="text-center">HEllo</td>
                  <td className="text-center">Description</td>
                  <td className="text-center">Pending/Approved</td>
                 
                </tr>
              {/* );
            })
          ) : (
            <tr>
              <td colSpan={15} className="text-center">
                No Data Found
              </td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
    </div>
  </div>
  <div className='col-md-5'>
  <div className="card">
<div className="card-body">
  <form >
    {/* <label htmlFor="name">Subject</label>
  <input type="text" id="note" name="note" required /> */}

    <label htmlFor="name">Select Your Subject:</label>
    <select className="form-control" type="text" onChange={(e) => { setOptionVal(e.target.value) }}
                    >
                      <option selected disabled>--Select Below Options--</option>
                          <option  value={"feedback"}>Feedback/Complained</option>
                          <option  value={"request"}>Document Change</option>
                    </select>
         <br/>           
         {
          showForm &&
          <>
          <label htmlFor="name">Document Type:</label>

<select className="form-control" type="text" onChange={(e) => { setOptionDoc(e.target.value) }}>
                    {uploadOption.map((val,index) => {
                      return (
                        <option key={index} value={val.KEY_VALUE}>{val.NAME}</option>
                      );
                    })} 
                  </select>
                    <br/>
                    </>
         }
 {
  showFile &&
      <input type="file" className="form-control" name="upload_file" id='upload_file' placeholder='file type pdf' />
 }
<br/>
     
      <label htmlFor="name">Message:</label>
      <textarea className="form-control" id="message" name="message" required ></textarea>
      <br/>
      <button type="submit" className="btn btn-info float-right">Save</button>
    </form>
  </div>
</div>
</div>
</div>
</div>

  {/* <button className="fab">
      <i className="material-icons"  onClick={() => {
            togglePODetailsFlag();
          }}><AiOutlineMessage size={40}/></i>
    </button>
  <Modal      className="modal-dialog modal-xl"

    isOpen={showPODetailsFlag}
    toggle={togglePODetailsFlag}
    size="lg"
     style={{
       display: "flex",  
     }}
  >
        <div className="card-header">
          <h3 className="card-title">Send Your Query</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            togglePODetailsFlag();
          }}>×</span>
          </button>
        </div>
        <div
      className='row'
      >
      <div className='col-md-7'>

     <div className="container">
     <h1 className="form-check-label">
  Customer Support
  </h1>
    <p>
      Welcome to our customer support page. We're here to help you with any
      questions or issues you may have. Below you'll find some helpful
      information to get started.
    </p>
    <h2>Frequently Asked Questions</h2>
    <ul>
      <li>
        <strong>How do I contact customer support?</strong>
        <p>
          You can contact customer support by emailing us at
          support@samishti.com or by filling out the contact form on our
          website.
        </p>
      </li>
    </ul>
    <h2>Contact Us</h2>
    <p>
      If you have any further questions or issues, please feel free to contact
      us using the form beside:
    </p>
 
  </div>

  </div>
  <div className='col-md-4'>
  <form style={{  marginTop: "40px"}}>
   
    <label htmlFor="name">About:</label>
  <select id="name" name="name" required className="my-select">
    <option value="">Choose an option</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" required className="no-resize"></textarea>
      <button type="submit" className="btn btn-info float-right">Save</button>
    </form>
  </div>
</div>

          <div className="card-footer">
            <a onClick={() => {
            togglePODetailsFlag();
          }} className="btn btn-default" >Cancel</a>
          </div>
  </Modal>
  */}
  </div>

  )
}

export default CustomerSupport