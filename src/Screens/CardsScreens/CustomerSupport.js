import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineEdit, AiOutlineHome, AiOutlineMessage } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalBody } from 'reactstrap'
import Pagination from "../../Components/Pagination";

import Footer from '../../Components/Footer'
import NavHeader from '../../Components/NavHeader'
import { COLORS } from '../../Constants/theme'
import { AxioxExpPort } from '../AxioxExpPort'

import "../../StyleSheets/CustomerSupport.css"
function CustomerSupport() {
  const navigate = useNavigate();
  const vendorId = localStorage.getItem('userId');
  //console.log("vendorIdvendorId", vendorId);
  const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
  const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);

  const [showCheckFlages, setShowCheckFlages] = useState(false);
  const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
  const [imageSrc, setImageSrc] = useState(null);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
  const [toaster, setToaster] = useState("")
  const [toasterColor, setToasterColor] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [showFile, setShowFile] = useState(false)
  const [feedbackType, setFeedbackType] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null);
  const [tbody, setTBody] = useState([])
  const [tableDataLength, setTableDataLength] = useState("")
  const [optionDoctype, setOptionDocType] = useState("")
  const data = tbody;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tbody.slice(indexOfFirstPost, indexOfLastPost);
  const [uploadOption, setUploadOption] = useState([
    { NAME: "--Select Uploder Card--", KEY_VALUE: "" },
    { NAME: "PAN Card", KEY_VALUE: "PANCARD" },
    { NAME: "Aadhar Card", KEY_VALUE: "ADHAR" },
    { NAME: "GST", KEY_VALUE: "GST" },
    { NAME: "Address Proof", KEY_VALUE: "ADDRESS" },
    { NAME: "MSME Certificate", KEY_VALUE: "MSME" },
    { NAME: "POR Declearation Certificate", KEY_VALUE: "POR" },
    { NAME: "Due Diligence Form", KEY_VALUE: "DILIGENCE" }
  ]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true)
    axios.get(AxioxExpPort + "feedback/get_data?id=" + vendorId)
      .then((response) => {
        setTBody(response.data);
        setTimeout(() => {
          setLoading(false);
        });
        setClickedPOsDataArr(response.data)
        setTableDataLength(response.data.length)
        console.log("response.data", response.data);
      })
  }
  useEffect(() => {
    fetchPosts()
  }, []);
  const setOptionVal = (e) => {
    e == 3 ?
      setShowForm(true)
      : setShowForm(false)


  }
  const setOptionDoc = (e) => {
    setOptionDocType(e)
    e.length > 0 ?
      setShowFile(true)
      : setShowFile(false)
  }

  const submitFeedback = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("attach", file);
    formData.append("TYPE", feedbackType);
    formData.append("DESCRIPTION", description);
    formData.append("SUPPLIER_ID", vendorId);
    formData.append("ATTACHMENT_NAME", optionDoctype);
    if (description.length > 0) {
      try {
        const response = await axios.post(
          AxioxExpPort + "feedback/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        fetchPosts();
        setToaster("Your request has been send")
        var xz = document.getElementById("snackbar");
        setToasterColor("green")
        xz.className = "show";
        setTimeout(function () {
          xz.className = xz.className.replace("show", "");
        }, 3000)
      } catch (error) {
        console.log(error);
        //alert("Response: " + formData);
      }
    } else {
      setToaster("Please fill the Message")
      var xz = document.getElementById("snackbar");
      setToasterColor("maroon")
      xz.className = "show";
      setTimeout(function () {
        xz.className = xz.className.replace("show", "");
      }, 3000)
    }

  };
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div>
      <NavHeader />
      {
      loading && 
      <div className="loader-container">
      	  <div className="spinnerCircle"></div>
        </div>
    }
      <div id="snackbar" style={{ backgroundColor: toasterColor, borderRadius: "50px" }}>{toaster}</div>

      <div
        className="card-body"
        style={{
          marginTop: "5%",
        }}
      >
        <div>
          <div className="row" style={{ marginBottom: 10 }}>
            <div className="col-md-12">
              <div className="row" >
                <div className="col-md-10">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 className="form-check-label">
                      Customer Support
                    </h4>
                    {/* <button style={{
                      marginLeft: '10px',
                      padding: '7px 14px',
                      backgroundColor: "#02a5ab",
                      color: '#fff',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer'
                    }} onClick={() => { window.history.go(-1) }}>Go Back</button> */}
                  </div>
                </div>
                <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>

                  <IconContext.Provider value={{ color: "#3a91e8", size: "22px" }}>
                    <AiOutlineHome type="button" onClick={() => {
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

        <div className='row '>
          <div className='col-md-7' >
            {/* <img src="../../../Images/41676.gif" width={"30%"} style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} height={150} alt="Cartoons" /> */}

            <div className="card">
              <div className="card-body">
                <p className="text-right " ></p>
                <table className="table table-light table-bordered table-hover">
                  <thead className="table-light">
                    <tr
                      className="text-center"
                      style={{
                        backgroundColor: COLORS.gray20,
                        borderColor: COLORS.gray10,
                      }}
                    >
                      <th className="text-center" style={{ width: "10%", backgroundColor: "#02a5ab", color: "white", borderColor: COLORS.gray10 }} scope="col">Subject Type</th>
                      <th className="text-center" style={{ width: "5%", backgroundColor: "#02a5ab", color: "white", borderColor: COLORS.gray10 }} scope="col">Document</th>
                      <th className="text-center" style={{ width: "10%", backgroundColor: "#02a5ab", color: "white", borderColor: COLORS.gray10 }} scope="col">Description</th>
                      <th className="text-center" style={{ width: "5%", backgroundColor: "#02a5ab", color: "white", borderColor: COLORS.gray10 }} scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableDataLength > 0 ?
                      currentPosts.map((item, index) => {
                        return (
                          <tr
                            key={`row`}
                            style={{
                              backgroundColor: "white",
                              borderColor: "#000",
                            }}
                            className="table-light"
                          >
                            <td className="text-center" style={{ width: "10%", borderColor: COLORS.gray10 }}>
                              {item.TYPE == 1 &&
                                "Feedback"
                              }
                              {item.TYPE == 2 &&
                                "Complain"
                              }
                              {item.TYPE == 3 &&
                                "Document Upload"
                              }
                              <span className="badge badge-success" style={{ marginLeft: 5 }} >{item.ID}</span>
                            </td>
                            <td className="text-center"
                              style={{ width: "10%", borderColor: COLORS.gray10 }}>  {(item.ATTACHMENT) ? 
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
                                 onClick={(e) => {toggleCheckFlages();setImageSrc(item.ATTACHMENT)  }}
                                 />  </IconContext.Provider>
                                 </>
                                  :"--"}</td>
                            <td className="text-center" style={{ width: "10%", borderColor: COLORS.gray10 }}>{item.DESCRIPTION}</td>
                            <td
                              key={`col-12` + index}
                              className="text-center"
                              style={{ width: "10%", borderColor: COLORS.gray10 }}
                            >
                              {item.FLAG == 1 &&
                                <span className="badge badge-warning" >Pending</span>
                              }
                              {item.FLAG == 2 &&
                                <span className="badge badge-success" >Completed</span>
                              }
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

                <Pagination postPerPage={postsPerPage} totalPosts={ClickedPOsDataArr.length} paginate={paginate} />
              </div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className="card">
              <div className="card-body">
                <label htmlFor="name">Select Your Subject:*</label>
                <select
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setOptionVal(e.target.value);
                    setFeedbackType(e.target.value);
                  }}
                >
                  <option selected disabled>
                    --Select Below Options--
                  </option>
                  <option value={1}>Feedback</option>
                  <option value={2}>Complained</option>
                  <option value={3}>Document Upload</option>
                </select>
                <br />
                {showForm && (
                  <>
                    <label htmlFor="name">Document Type:</label>

                    <select
                      className="form-control"
                      type="text"
                      onChange={(e) => {
                        setOptionDoc(e.target.value);
                      }}
                    >
                      {uploadOption.map((val, index) => {
                        return (
                          <option key={index} value={val.KEY_VALUE}>
                            {val.NAME}
                          </option>
                        );
                      })}
                    </select>
                    <br />
                  </>
                )}
                {showFile && (
                  <>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files[0])}
                      placeholder="file type pdf"
                    />
                    <br />
                  </>
                )}

                <label htmlFor="name">Message:*</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                <br />
                <button onClick={submitFeedback} className="btn btn-info float-right">
                  Save
                </button>
                {/* </form> */}
              </div>
            </div>
            <div class="geeks"></div>
          </div>
        </div>
      </div>

      {/* <button className="fab">
      <i className="material-icons"  onClick={() => {
            togglePODetailsFlag();
          }}><AiOutlineMessage size={40}/></i>
    </button>
  <Modal className="modal-dialog modal-xl"
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
  <div style={{position: 'fixed', bottom: 0, width:'100%'}}>

      <Footer />
  </div>
      <Modal
        className="modal-dialog "
        size="md"
        isOpen={showCheckFlages}
        toggle={toggleCheckFlages}
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
                toggleCheckFlages();
              }}>×</span>
            </button>
          </div>
        </div>
        <div className="card" style={{ marginTop: "-2%", marginBottom: "-0.3%" }}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-7">
              </div>
            </div>

            <img className="col-md-12" src={AxioxExpPort + 'images/' + imageSrc} />



          </div>
        </div>
      </Modal>
    </div>


  )
}

export default CustomerSupport