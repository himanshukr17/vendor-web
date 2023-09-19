import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import NavHeader from "../../Components/NavHeader";
import { AxioxExpPort } from "../AxioxExpPort"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { AiFillBank, AiFillReconciliation, AiOutlineArrowLeft, AiOutlineCheck, AiOutlineClose, AiOutlineDownload, AiOutlineHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import { BsBank2, BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaEye, FaUser, FaUserAlt, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { CSVLink } from "react-csv";


const NewSupplier = () => {
    //     }
    const buyerID = localStorage.getItem('userId');
    const [showPODetailsFlag, setShowPODetailsFlag] = useState(false);
    const togglePODetailsFlag = () => setShowPODetailsFlag(!showPODetailsFlag);
    const navigate = useNavigate();
    const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
    const [modalDataStatus, setModalDataStatus] = useState(true);
    const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
    const [sort, setSort] = useState("ASC");
    const [supplierAlldetail, setSupplierAlldetail] = useState([])
    const [supplierAllBank, setSupplierAllBank] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const [detailVal, setDetailVal] = useState(null);
    const [detailValBank, setDetailValBank] = useState(null);
    const [toasterColor, setToasterColor] = useState("")
    const [toaster, setToaster] = useState("")
    // const [query, setQuery]=useState("")
    const [filterData, setFilterdata] = useState([])
    const [showCheckFlages, setShowCheckFlages] = useState(false);
    const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
    const [showCheckFlagesBank, setShowCheckFlagesBank] = useState(false);
    const toggleCheckFlagesBank = () => setShowCheckFlagesBank(!showCheckFlagesBank);
    const [showCheckFlagesBankCheck, setShowCheckFlagesBankCheck] = useState(false);
    const toggleCheckFlagesBankCheck = () => setShowCheckFlagesBankCheck(!showCheckFlagesBankCheck);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageSrcBank, setImageSrcBank] = useState(null);

    const [tbody, setTBodys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
    const [singleCheck, setSingleCheck] = useState(false);
    const fetchPosts = async () => {
        let tempArr = []
        axios.get(AxioxExpPort + "buyer/supplier_data?id=" + buyerID)
            .then((response) => {
                console.log("response.datass", response.data);
                response.data.map((val, index) => {
                    tempArr.push({
                        vendor_id: val.TELEPHONE,
                        approveStatus: val.STATUS,
                        first_name: val.FIRST_NAME,
                        last_name: val.LAST_NAME,
                        vendor_details: val,
                    })
                })
                console.log("DATA", tempArr);
                setTBodys(tempArr);
                setFilterdata(tempArr);
            })
    }
    useEffect(() => {

        fetchPosts()
    }, []);

    const sorting = (col) => {
        if (sort === "ASC") {
            const sorted = [...tbody].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setTBodys(sorted);
            setSort("DSC")
            console.log("response.data", tbody);
        }
        if (sort === "DSC") {
            const sorted = [...tbody].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setTBodys(sorted);
            setSort("ASC")
        }
    }
    const handleSearchMV = (event) => {
        var searchElements = event.target.value;
        var length = Number(searchElements.length)
        if (length > 0) {

            const searchDatasMV = tbody.filter((item) => (item.vendor_id).toString().toLowerCase().includes(searchElements) || (item.first_name).toString().toLowerCase().includes(searchElements));

            setTBodys(searchDatasMV);
            if (searchDatasMV.length == 0) {
                setIsPurchaseOrderEmpty(false)
            }
        } else {
            setIsPurchaseOrderEmpty(true)
            setTBodys(filterData)
        }

    }
    const handelAllMV = () => {
        setIsPurchaseOrderEmpty(true);
        setTBodys(filterData);
    }
    const [supplierSendID, setSupplierSendID] = useState("")
    const approveSupplier = (e) => {
        console.log("supplierSendID", e)
        var supID = e;
        axios.post(AxioxExpPort + "createcompany/approve_supplier?status=2", {
            "approved_by": buyerID,
            "supplier": [supID]
        })
            .then((res) => {
                fetchPosts();
                togglePODetailsFlag();
                console.log('resres', res);
                //   document.getElementById("emailInputVerify").disabled = true;
                //   setOtpSendBtn(false)
                //   setOtpConst(res.data.OTP) 
            })
            .catch((err) => { console.log(err) });
    }
    const approveSupplierBank = (e) => {
        console.log("supplierSendID", e)
        var supID = e;
        axios.post(AxioxExpPort + "createcompany/supplier_approve?status=2", {
            "approved_by": buyerID,
            "supplier": [supID]
        })
            .then((res) => {
                console.log('resres', res);
                fetchPosts();
                setToasterColor("#00D100");
                toggleCheckFlagesBank();
                console.log("resresres", res)
                setToaster("Bank details is Approved");
                var xy = document.getElementById("snackbar");
                xy.className = "show"; setTimeout(function () { xy.className = xy.className.replace("show", ""); }, 3000)
            })
            .catch((err) => { console.log(err) });
    }
    const rejectSupplier = (e) => {

        var supID = e;
        console.log("supID", supID)
        axios.post(AxioxExpPort + "createcompany/supplier_approve?status=1", {
            "approved_by": buyerID,
            "supplier": [supID]
        })
            .then((res) => {
                fetchPosts();
                toggleCheckFlagesBank();
                setToasterColor("#A80808");
                toggleCheckFlagesBank();
                console.log("resresres", res)
                setToaster("Your Profile is Rejectd");
                var xy = document.getElementById("snackbar");
                xy.className = "show"; setTimeout(function () { xy.className = xy.className.replace("show", ""); }, 3000)
            })
            .catch((err) => { console.log(err) });
    }
    const rejectSupplierBank = (e) => {
        console.log("supplierSendID", e)
        var supID = e;
        axios.post(AxioxExpPort + "createcompany/supplier_approve?status=1", {
            "approved_by": buyerID,
            "supplier": [supID]
        })
            .then((res) => {
                fetchPosts();
                toggleCheckFlagesBank();
                setToasterColor("#A80808");
                toggleCheckFlagesBank();
                console.log("resresres", res)
                setToaster("Bank details is Rejectd");
                var xy = document.getElementById("snackbar");
                xy.className = "show"; setTimeout(function () { xy.className = xy.className.replace("show", ""); }, 3000)
            })
            .catch((err) => { console.log(err) });
    }
    return (
        <>
            <NavHeader />
            <div
                className="card-body"
                style={{
                    marginTop: "4%",
                }}
            >
                <div id="snackbar" style={{ backgroundColor: toasterColor, borderRadius: "50px" }}>{toaster}</div>

                <div

                >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row" style={{ marginBottom: 10 }}>

                                <div className="col-md-10">

                                    <h4 className="form-check-label" >
                                        {/* {location.PROJECT} */}
                                        {/* {location.state.name} */}
                                        New Request
                                    </h4>
                                </div>
                                <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>

                                    <IconContext.Provider value={{ color: "red", size: "22px" }}>
                                        <AiOutlineHome type="button" onClick={() => {
                                            navigate("/home");
                                        }} />
                                    </IconContext.Provider>

                                    {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}

                                    {" /"}
                                    <a style={{
                                        textDecoration: 'none',
                                        color: "#4F51C0"

                                    }}>{"New Supplier"}</a>
                                </div>

                            </div>
                        </div>
                        <div className="card" style={{ marginTop: 10 }}>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-2 noPrint">
                                        <button type="button" style={{ width: "100%", height: 35, borderRadius: 5 }} onClick={handelAllMV}>Show All</button>

                                    </div>
                                    <div className="col-md-5 noPrint">

                                    </div>
                                    <div className="col-md-3 noPrint">


                                    </div>
                                    <div className="col-md-2 noPrint">

                                        <input
                                            type="text"
                                            className="form-control"

                                            placeholder="Search Mobile / Name"
                                            style={{
                                                width: "100%",
                                                height: 35,
                                            }}
                                            onChange={(e) => {
                                                handleSearchMV(e)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-1 noPrint">

                                    </div>


                                </div>
                            </div>



                            <div className="card-body">
                                <p className="text-right" style={{ marginTop: "-30px" }}></p>
                                <table className="table table-light table-bordered">
                                    <thead className="table-light" style={{ position: "sticky", top: 50, backgroundColor: "#fff", zIndex: 1 }}>
                                        <tr
                                            className="text-center"
                                            style={{
                                                backgroundColor: COLORS.gray20,
                                                borderColor: COLORS.gray10,
                                            }}
                                        >
                                            {/* <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier ID</th> */}
                                            <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Mobile</th>
                                            <th onClick={() => sorting("VENDOR_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Name</th>
                                            <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isPurchaseOrderEmpty ? (
                                            tbody.map((vd, index) => {
                                                console.log("vryhigh", vd)
                                                return (
                                                    <tr
                                                        key={`row` + index}
                                                        style={{
                                                            backgroundColor: "white",
                                                            borderColor: "#000",
                                                            marginBottom: -100
                                                        }}
                                                        className="table-light"
                                                    >
                                                        {/* <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10, fontSize: 17 }}
                    >
                        {""}
                    </td> */}
                                                        <td
                                                            key={`col-2` + index}
                                                            className="text-center"
                                                            style={{ width: "10%", borderColor: COLORS.gray10, fontSize: 17 }}
                                                        >
                                                            {(vd.vendor_id)}
                                                        </td>
                                                        <td
                                                            key={`col-3` + index}
                                                            className="text-center"
                                                            style={{ width: "10%", borderColor: COLORS.gray10, fontSize: 17 }}
                                                        >
                                                            {(vd.first_name) + " " + (vd.last_name)}
                                                        </td>
                                                        {vd.approveStatus == 3 &&
                                                            <td
                                                                key={`col-3` + index}
                                                                className="text-center"
                                                                style={{ width: "10%", borderColor: COLORS.gray10 }}
                                                            >
                                                                <div className="col-md-12">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                        </div>
                                                                        <div className="col-md-4 text-center">
                                                                            <button type="button" title="View Supplier Details" onClick={(e) => {
                                                                                togglePODetailsFlag();
                                                                                setSupplierAlldetail(vd.vendor_details);
                                                                                setSupplierSendID(vd.vendor_details[0].TELEPHONE)
                                                                                //console.log("vd.vendor_details",supplierAlldetail)
                                                                            }} style={{ width: "160%", height: 35, borderWidth: 2, fontFamily: "serif", borderRadius: 5, borderColor: "red" }}>View Details</button>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </td>
                                                        }
                                                        {vd.approveStatus == 4 &&
                                                            <td
                                                                key={`col-3` + index}
                                                                className="text-center"
                                                                style={{ width: "10%", borderColor: COLORS.gray10 }}
                                                            >
                                                                <div className="col-md-12">
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                        </div>
                                                                        <div className="col-md-4">

                                                                            <button type="button" title="Approved Profile" style={{ height: 35, backgroundColor: "white", fontFamily: "serif", borderRadius: 5, color: "white" }}><IconContext.Provider
                                                                                value={{ color: "green", size: "35px" }}
                                                                            >
                                                                                {" "}
                                                                                <FaUserCheck />
                                                                            </IconContext.Provider></button>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </td>
                                                        }
                                                        {vd.approveStatus == 6 &&
                                                            <td
                                                                key={`col-3` + index}
                                                                className="text-center"
                                                                style={{ width: "10%", borderColor: COLORS.gray10 }}
                                                            >
                                                                <div className="col-md-12">
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                        </div>
                                                                        <div className="col-md-4">

                                                                            <button type="button" title="Rejected Profile" style={{ height: 35, backgroundColor: "white", fontFamily: "serif", borderRadius: 5, color: "white" }}>
                                                                            <IconContext.Provider
                                                                                value={{ color: "#E70707", size: "35px" }}
                                                                            >
                                                                                {" "}
                                                                                <FaUserTimes />
                                                                            </IconContext.Provider></button>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </td>
                                                        }

                                                        {vd.approveStatus == 8 &&
                                                            <td
                                                                key={`col-3` + index}
                                                                className="text-center"
                                                                style={{ width: "10%", borderColor: COLORS.gray10 }}
                                                            >
                                                                <div className="col-md-12">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <button type="button" title="Bank Details" onClick={(e) => {
                                                                                toggleCheckFlagesBank();
                                                                                setSupplierAllBank(vd.vendor_details.bank_data[0]);
                                                                                // setSupplierSendID(vd.vendor_details[0].TELEPHONE)
                                                                                //console.log("vd.vendor_details",supplierAlldetail)
                                                                            }} style={{ width: "160%", height: 35, borderWidth: 2, fontFamily: "serif", borderRadius: 5, borderColor: "red" }}>View Bank Details</button>


                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </td>
                                                        }
                                                        {vd.approveStatus == 7 &&
                                                            <td
                                                                key={`col-3` + index}
                                                                className="text-center"
                                                                style={{ width: "10%", borderColor: COLORS.gray10 }}
                                                            >
                                                                <div className="col-md-12">
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                        <IconContext.Provider
                                                                                value={{ color: "green", size: "35px" }}
                                                                            >
                                                                                {" "}
                                                                                <FaUserCheck />
                                                                            </IconContext.Provider>
                                                                            <button type="button" title="Rejected Bank Details" style={{ height: 35, backgroundColor: "white", marginLeft: "15px", fontFamily: "serif", borderRadius: 5, marginRight:-10, color: "white" }}><IconContext.Provider
                                                                                value={{ color: "red", size: "35px" }}
                                                                            >
                                                                                {" "}
                                                                                <BsBank2
                                                                                />
                                                                            </IconContext.Provider></button>
                                                                            <IconContext.Provider
                                                                                value={{ color: "red", size: "15px" }}

                                                                            >
                                                                                {" "}
                                                                                <AiOutlineClose/>
                                                                            </IconContext.Provider>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </td>
                                                        }
                                                        {vd.approveStatus == 5 &&
                                                            <td
                                                                key={`col-3` + index}
                                                                className="text-center"
                                                                style={{ width: "10%", borderColor: COLORS.gray10 }}
                                                            >
                                                                <div className="col-md-12">
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                        <IconContext.Provider
                                                                                value={{ color: "green", size: "35px" }}
                                                                            >
                                                                                {" "}
                                                                                <FaUserCheck />
                                                                            </IconContext.Provider>
                                                                       
                                                                            <button type="button" title="Approve Bank Details" style={{ height: 35, backgroundColor: "white", fontFamily: "serif", borderRadius: 5, marginRight:-10, color: "white" }}><IconContext.Provider
                                                                                value={{ color: "green", size: "35px" }}
                                                                            >
                                                                                {" "}
                                                                                <BsBank2
                                                                                />
                                                                            </IconContext.Provider></button>
                                                                            <IconContext.Provider
                                                                                value={{ color: "green", size: "15px" }}

                                                                            >
                                                                                {" "}
                                                                                <AiOutlineCheck />
                                                                            </IconContext.Provider>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </td>
                                                        }
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="text-center">
                                                    No Data Found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
            className="modal-dialog modal-content"
             size="lg"
                isOpen={showPODetailsFlag}
                toggle={togglePODetailsFlag}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom:-40
                }}
            >
            <div className="card-info">
        <div className="card-header">
          <h3 className="card-title">Personal Details</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            togglePODetailsFlag();
          }}>×</span>
          </button>
        </div>
        <div className="card-body">
                    <div className="row">
                        <div className="col-md-4" style={{
                            marginBottom: 25,
                        }}>

                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                First Name:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'

                            }}> {supplierAlldetail.FIRST_NAME}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25,
                        
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'

                                }}
                            >
                                Last Name:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.LAST_NAME}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25,
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Email:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.E_MAIL}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Phone:
                            </a>

                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.TELEPHONE}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                PAN No:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.PANCARD}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Role:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.ROLE}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                FAX No:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.FAX_NO}</a>
                        </div>
                        <div className="col-md-7" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                PAN Card:
                            </a>

                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.PAN_IMAGE}</a>
                            <IconContext.Provider
                                value={{ color: "green", size: "20px" }}
                            >
                                <FaEye
                                    type="button"
                                    style={{
                                        marginLeft: "20px"
                                    }}
                                    onClick={(e) => { setImageSrc(e.target.src); setDetailVal(supplierAlldetail.PAN_IMAGE); toggleCheckFlages() }}

                                // onClick={viewThePAN}
                                />

                            </IconContext.Provider>
                        </div>



                        <div className="col-md-12" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Address:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.ADD1}{" "}{supplierAlldetail.ADD2}{" "}{supplierAlldetail.ADD3}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                City:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.CITY}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                State:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.STATE}</a>
                        </div>
                        <div className="col-md-4" style={{
                            marginBottom: 25
                        }}>
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Country:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.COUNTRY}</a>
                        </div>
                        <div className="col-md-4" >
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                PIN Code:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.PINCODE}</a>
                        </div>
                        <div className="col-md-4" >
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Language:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.lan}</a>
                        </div>
                        <div className="col-md-4">
                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Buyer:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'
                            }}> {supplierAlldetail.BUYER}</a>
                        </div>
                    </div>
        
                   
                    </div>
                    
                    <div className="card-footer">
            <button  onClick={(e) => {approveSupplier(supplierAlldetail.TELEPHONE)}} className="btn btn-success float-right">Approve</button>
            <button  onClick={(e) => {rejectSupplier(supplierAlldetail.TELEPHONE)}} className="btn btn-warning" >Reject</button>
          </div>
                    </div>
            </Modal>

            <Modal
          
            className="modal-dialog modal-content"
                size="md"
                isOpen={showCheckFlages}
                toggle={toggleCheckFlages}
                style={{
                    alignItems: "center",
                    justifyContent: "center",

                }}
            >
              
                    <div className="modal-header model-lg"
                        style={{ marginTop: '-10px', backgroundColor: "#C4CDFE" }}
                    >
                        <h5 className="modal-title text-center" id="exampleModalLabel">
                            <p className="h4">PAN Number: <span style={{ color: '#A80808' }}>{supplierAlldetail.PANCARD}</span></p>
                        </h5>
                        <p type="button" className="text-right" onClick={toggleCheckFlages}>Close</p>
                    </div>
                    <img className="col-md-12" style={{ alignSelf: "center", display: 'flex', marginTop: "5px", height: '450px' }} src={AxioxExpPort + 'images/' + detailVal} />
              
            </Modal>
            <Modal
                size="lg"
                isOpen={showCheckFlagesBank}
                toggle={toggleCheckFlagesBank}
                style={{
                    alignItems: "center",
                    justifyContent: "center",

                }}
            >
                
                <div className="card-info">
        <div className="card-header">
          <h3 className="card-title">Personal Details</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={() => {
            toggleCheckFlagesBank();
          }}>×</span>
          </button>
        </div>
        <div className="card-body">
                    <div className="row">
                        <div className="col-md-12" >
                            <a className="text-sm-right"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Account Holder:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'

                            }}> {supplierAllBank.ACCOUNT_HOLDER}</a>
                        </div>
                        <div className="col-md-12" style={{

                            marginTop: 20
                        }}>

                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Account Number:
                            </a>
                            <a className="text-sm-right" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'

                            }}> {supplierAllBank.ACCOUNT_NUMBER}</a>
                        </div>
                        <div className="col-md-12" style={{

                            marginTop: 20
                        }}>

                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Bank Country:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'

                            }}> {supplierAllBank.BANK_COUNTRY}</a>
                        </div>
                        <div className="col-md-6" style={{

                            marginTop: 20
                        }}>

                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Bank Type:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'

                            }}> {supplierAllBank.BANK_TYPE}</a>
                        </div>
                        <div className="col-md-6" style={{

                            marginTop: 20
                        }}>

                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Bank Key:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'

                            }}> {supplierAllBank.BANK_KEY}</a>
                        </div>
                        <div className="col-md-12" style={{ marginTop: 20}}>

                            <a className="text-sm-left"
                                style={{
                                    color: "#0275d8",
                                    fontSize: 20,
                                    textDecoration: 'none'
                                }}
                            >
                                Cancel Check:
                            </a>
                            <a className="text-sm-left" style={{
                                color: "gray",
                                fontSize: 20,
                                textDecoration: 'none'

                            }}> {supplierAllBank.CHECK}</a><IconContext.Provider
                                value={{ color: "green", size: "20px" }}
                            >
                                <FaEye
                                    type="button"
                                    style={{
                                        marginLeft: "20px"
                                    }}
                                    onClick={(e) => { setImageSrcBank(e.target.src); setDetailValBank(supplierAllBank.CHECK); toggleCheckFlagesBankCheck() }}

                                // onClick={viewThePAN}
                                />

                            </IconContext.Provider>
                        </div>
                    </div>
                    </div>
                    </div>
                        <div className="card-footer">
            <button   onClick={(e) => {approveSupplierBank(supplierAllBank.PHONE_NUMBER)}} className="btn btn-success float-right">Approve</button>
            <button   onClick={() => {rejectSupplierBank(supplierAllBank.PHONE_NUMBER)}} className="btn btn-warning" >Reject</button>
          </div>
            </Modal>

            <Modal
          className="modal-dialog modal-content"
                size="md"
                isOpen={showCheckFlagesBankCheck}
                toggle={toggleCheckFlagesBankCheck}
                style={{
                    alignItems: "center",
                    justifyContent: "center",

                }}
            >
                    <div className="modal-header model-lg"
                        style={{ marginTop: '-10px', backgroundColor: "#C4CDFE" }}
                    >
                        <h5 className="modal-title text-center" id="exampleModalLabel">
                            <p className="h4">A/C Number: <span style={{ color: '#A80808 ' }}>{supplierAllBank.ACCOUNT_NUMBER}</span></p>
                        </h5>
                        <p type="button" className="text-right" onClick={toggleCheckFlagesBankCheck}>Close</p>
                    </div>
                    <img className="col-md-12" style={{ alignSelf: "center", display: 'flex', marginTop: "5", height: '450px' }} src={AxioxExpPort + 'images/' + detailValBank} />
            
            </Modal>
        </>
    );
}

export default NewSupplier;