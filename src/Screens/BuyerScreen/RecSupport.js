import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineEdit, AiOutlineHome, AiOutlineMessage } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from 'reactstrap'
import NavHeader from '../../Components/NavHeader'
import { COLORS } from '../../Constants/theme'
import { AxioxExpPort } from '../AxioxExpPort'

function RecSupport() {
  const locationID=useLocation();
  const vendorId = locationID.state.myVendorID;
  const vendorName = locationID.state.myVendorName;
        const navigate = useNavigate();
        const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
        const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
        const [tableDataLength,setTableDataLength]=useState("")
        const [tbody,setTBody]=useState("")
        const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
        const [imageSrc, setImageSrc] = useState(null);

        const fetchPosts = async () => {
          axios.get(AxioxExpPort + "feedback/get_data?id="+vendorId)
              .then((response) => {
              setTBody(response.data);
              setClickedPOsDataArr(response.data)
              setTableDataLength(response.data.length)
              console.log("response.data",response.data);
            })
        }
        useEffect(() => {
          fetchPosts()
        }, []);

  return (
    <div><NavHeader />
      
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
Receive Support of {" "+vendorName+"("+vendorId +")"}
</h4>
{/* <button  style={{
marginLeft: '10px',
padding: '7px 14px',
backgroundColor:"#4F51C0",
color: '#fff',
borderRadius: '5px',
border: 'none',
cursor: 'pointer'
}} onClick={() => { window.history.go(-1) }}>Go Back</button> */}
</div>
              </div>
              <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
                
                  <IconContext.Provider value={{ color: "#3a91e8", size: "22px" }}>
                    <AiOutlineHome type="button"   onClick={() => {
                    navigate("/home");
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
            <th  className="text-center" style={{ width: "6%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Subject Type</th>
             <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Document</th> 
            <th  className="text-center" style={{ width: "10%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Description</th>
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Status</th>
            <th  className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {tableDataLength>0?
          tbody.map((item,index)=>{
            return (
            <tr
                  key={`row`}
                  style={{
                    backgroundColor: "white",
                    borderColor: "#000",
                  }}
                  className="table-light"
                >
                  <td className="text-center" style={{  borderColor: COLORS.gray10 }}>
                  {item.TYPE == 1 &&
                          "Feedback"
                        }
                  {item.TYPE == 2 &&
                         "Complain"
                        }
                        {item.TYPE == 3 &&
                          "Document Upload"
                        }
                        <span className="badge badge-success" style={{marginLeft:5}} >{item.ID}</span>
                        </td>
                  <td className="text-center" style={{ borderColor: COLORS.gray10 }}>
                                        {(item.ATTACHMENT) ? 
                                        <>
                                          {item.ATTACHMENT_NAME} <IconContext.Provider
                                            value={{ color: "green", size: "20px" }}
                                        >
                                 <FaEye
                                 type="button"
                                 style={{
                                    marginLeft:"5px",
                                    marginTop:-5
                                 }}
                                 onClick={(e) => {togglePODetailsFlag();setImageSrc(item.ATTACHMENT)  }}
                                 />  </IconContext.Provider>
                                 </>
                                  :"--"}
                                      </td>
                  <td className="text-center" style={{ borderColor: COLORS.gray10 }}>{item.DESCRIPTION}</td>
                  <td className="text-center" style={{  borderColor: COLORS.gray10 }}>{"--"}</td>
                  <td
                        key={`col-12` + index}
                        className="text-center"
                        style={{borderColor: COLORS.gray10 }}
                      >
                <button type="button" title="Approve" style={{ height: 35, backgroundColor: "white", fontFamily: "serif", borderRadius: 5, color: "green" }}>Approve</button> <button type="button" title="Reject" style={{ height: 35, backgroundColor: "white", fontFamily: "serif", borderRadius: 5, color: "maroon" }}>Reject</button>
                
                      </td>                 
                </tr>
            )
          })
            : (
            <tr>
              <td colSpan={15} className="text-center">
                No Data Found
              </td>
            </tr>
          )} 
        </tbody>
      </table>
  </div>
  </div>
</div>
 <Modal 
   className="modal-dialog "
      size="md"
        isOpen={showPODetailsFlag}
        toggle={togglePODetailsFlag}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >

<div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">View uploaded file</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            togglePODetailsFlag();
          }}>×</span>
          </button>
        </div>
        </div>
        <div className="card" style={{marginTop:"-2%",marginBottom:"-0.3%"}}>
          <div className="card-body">
          <div className="row">
            <div className="col-md-7">
            </div>
          </div>
          <img className="col-md-12" src={AxioxExpPort + 'images/' +imageSrc} />
          </div>
          </div>
      </Modal>
</div>

  )
}

export default RecSupport