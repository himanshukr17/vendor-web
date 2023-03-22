import React, { useState, useEffect } from "react";
import axios from "axios";
// import "rsuite/dist/rsuite.css";
import NavHeader from "../../Components/NavHeader";
import { AxioxExpPort } from "../AxioxExpPort"
import { Link, useNavigate } from "react-router-dom";
import { AiFillReconciliation, AiOutlineArrowLeft, AiOutlineDownload, AiOutlineHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { COLORS } from "../../Constants/theme";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";
function ManageVendors() {
  const navigate = useNavigate();
  const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
  const [modalDataStatus, setModalDataStatus] = useState(true);
  const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
  const [toaster,setToaster]=useState("")
  const [toasterColor,setToasterColor]=useState("")
  const [sort, setSort] = useState("ASC");
  const [checkAll, setCheckAll] = useState(false)
  // const [query, setQuery]=useState("")
  const [filterData, setFilterdata] = useState([])
  const headers = [
    { label: "Material No", key: "MATERIAL" },
    { label: "Material Description", key: "MATERIAL_DESCRIPTION" },
    { label: "Item Category", key: "ITEM_CATEGORY" },
    { label: "Price/Unit", key: "NET_PRICE" },
    { label: "Delevered Quantity", key: "DELIVERED_QUANTITY" },
    { label: "Pending Quantity", key: "PENDING_QUANTITY" },
    { label: "Order Quantity", key: "ORDER_QUANTITY" },
  ];
  const data = ClickedPOsDataArr;
  const buyerID = localStorage.getItem('userId');
  console.log("buyerIDbuyerID", buyerID)
  const [tbody, setTBodys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
  const [singleCheck, setSingleCheck] = useState([]);
  const fetchPosts = async () => {
    let tempArr = []
    axios.get(AxioxExpPort + "mapping/get?buyer=" + buyerID)
      .then((response) => {
        response.data.map((val, index) => {
          if (val.STATUS == 1) {
            tempArr.push({ ...val, STRING_STATUS: "Inactive",IS_CHECKEDS:false })
          } else {
            tempArr.push({ ...val, STRING_STATUS: "Active", IS_CHECKEDS:true})
          }
        })
        console.log("DATA", tempArr);
        setTBodys(tempArr);
        console.log("response.datass", response.data);
        
        setFilterdata(tempArr);
      })
  }
  useEffect(() => {
    
    fetchPosts()
  }, []);

  const handleCheck = (id) => {
    
    const updatedData = tbody.map((row, index) => {
      if (index === id) {
        return { ...row,  IS_CHECKEDS: !row.IS_CHECKEDS };
      }
      console.log("updatedData", row)
      return row;
    });
    console.log("Something Went Wrong",updatedData);
    setTBodys(updatedData)
    setSingleCheck(updatedData)
  
  };
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
      const searchDatasMV = tbody.filter((item) => (item.VENDOR_NAME).toString().toLowerCase().includes(searchElements) || (item.VENDOR_ID).toString().toLowerCase().includes(searchElements) || (item.STRING_STATUS).toLowerCase().includes(searchElements));
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
  const handleActive = () => {
    var tempArr = [];
    tbody.map((values, index) => {
      // console.log("values",values);
      if (values.IS_CHECKED == true) {
        tempArr.push(values.VENDOR_ID)

      }
    })
    try {
      if (tempArr.length > 0) {
        axios.post(AxioxExpPort + 'mapping/update_status', {
          buyer_id: buyerID,
          supplier: tempArr,
          "STATUS": 1
        }).then((res) => { 
          setToaster("Supplier active successfully")
          var xz = document.getElementById("snackbar");
          setToasterColor("green")
          xz.className = "show";
          setTimeout(function(){
             xz.className = xz.className.replace("show", ""); }, 3000)
               
          // window.location.reload();
          // fetchPosts();

        })
      } else {
  setToaster("Please select atlist one supllier")
  var xz = document.getElementById("snackbar");
  setToasterColor("red")
  xz.className = "show";
  setTimeout(function(){
  xz.className = xz.className.replace("show", ""); }, 3000)
       
      }

    } catch {

      console.log("Something Went Wrong");

    }
  }
  const handleSave = () => {
    var tempArr = [];
    var tempArrSUBMITONE = [];
    var tempArrSUBMITtwo = [];
    console.log("values",singleCheck);
    singleCheck.map((values, index) => {
     { values.IS_CHECKEDS &&
          tempArrSUBMITONE.push({"ID":values.VENDOR_ID,"STATUS":1})   
       }
       { !values.IS_CHECKEDS &&
          
        tempArrSUBMITONE.push({"ID":values.VENDOR_ID,"STATUS":2})
        }
        console.log("Went Wrongs",tempArrSUBMITONE);
        console.log("Went Wrong2",tempArrSUBMITtwo);
    })


     try {
       if (singleCheck.length > 0) {
         axios.post(AxioxExpPort + 'mapping/update_status', {
           buyer_id: buyerID,
           supplier: tempArrSUBMITONE,
           
         }).then((res) => {
         //  window.location.reload();
         setToaster("Supplier inactive successfully")
         var xz = document.getElementById("snackbar");
         setToasterColor("green")
         xz.className = "show";
         setTimeout(function(){
         xz.className = xz.className.replace("show", ""); }, 3000);
         fetchPosts();
         //window.location.reload();
         })
        } else {
          setToaster("Select any supllier to change his satus")
          var xz = document.getElementById("snackbar");
          setToasterColor("red")
          xz.className = "show";
          setTimeout(function(){
          xz.className = xz.className.replace("show", ""); }, 3000)
        }
     } catch {
       console.log("Something Went Wrong");
     }
  }

  const handleDeActiveAll = () => {
    var tempArr = [];
    tbody.map((values, index) => {
      // console.log("values",values);
      if (values.IS_CHECKED == true) {
        tempArr.push(values.VENDOR_ID)

      }
    })
    console.log("values", tempArr);
  }

  const handleActiveAll = () => {
    var tempArr = [];
    tbody.map((values, index) => {
      // console.log("values",values);
      if (values.IS_CHECKED == true) {
        tempArr.push(values.VENDOR_ID)

      }
    })
    console.log("values", tempArr);
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
        <div
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row" style={{ marginBottom:10}}>
               
                <div className="col-md-10">

                  <h4 className="form-check-label" >
                    {/* {location.PROJECT} */}
                    {/* {location.state.name} */}
                    Manage Supplier
                  </h4>
                </div>
                <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>
                    <IconContext.Provider value={{ color: "red", size: "22px" }}>
                      <AiOutlineHome type="button"   onClick={() => {
                      navigate("/home");
                    }} />
                    </IconContext.Provider>
                  {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}
                  {" /"}
                  <Link to="/vdtls" style={{
                          textDecoration: 'none',
                          color:"#4F51C0"

                        }}>{" Supplier Details"}</Link>
                </div>
              </div>
            </div>
            <div className="card" style={{marginTop:10}}>
            <div className="card-body">
            <div className="row" >
            <div className="col-md-1">
              <button type="button" style={{ width: "100%", height: 35, borderRadius: 5 }} onClick={handelAllMV}>Show All</button>
            </div>
            <div className="col-md-5" >

            </div>
            <div className="col-md-2 noPrint" >
            </div>
            <div className="col-md-1 noPrint" >
            {/* <button type="button" title="Click to deactive Suppliers"  onClick={handleDeActive} style={{width:"100%", height: 35, borderWidth:3, fontFamily: "serif", borderRadius: 5,color:"red", borderColor:"red" }}>Inactive</button> */}

            </div>
            <div className="col-md-1 noPrint" >
            <button type="button" title="Click to active Suppliers"  onClick={handleSave} style={{width:"100%", height: 35, borderWidth:3, fontFamily: "serif", borderRadius: 5, color:"green", borderColor:"green" }}>Save</button>
                                               

            </div>
            <div className="col-md-2 noPrint">
              <input
                type="text"
                className="form-control"
                placeholder="Supplier Code / Name"
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

        <div >
        <div className="card-body">
          <p className="text-right" style={{ marginTop: "-30px" }}></p>
          <table className="table table-light table-bordered">
            <thead className="table-light">
              <tr
                className="text-center"
                style={{
                  backgroundColor: COLORS.gray20,
                  borderColor: COLORS.gray10,
                }}
              >
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Select Supplier</th>
                {/* <th onClick={() => sorting("BUYER_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer ID</th>
                <th onClick={() => sorting("BUYER_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer Name</th> */}
                <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Code</th>
                <th onClick={() => sorting("VENDOR_ID")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Name</th>
                {/* <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Actions</th> */}
                <th onClick={() => sorting("STRING_STATUS")} className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Status</th>
                {/* <th className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</th> */}
              </tr>
            </thead>

            <tbody>
              {isPurchaseOrderEmpty ? (
                tbody.map((vd, index) => {
                   if (vd.STATUS == 2) {
                    vd.IS_CHECKED= true
                  } 
                   if (vd.STATUS == 1) {
                    vd.IS_CHECKED = false
                  } 
                  console.log(vd)
                  return (
                    <tr
                      key={ index}
                      style={{
                        backgroundColor: "white",
                        borderColor: "#000",

                        marginBottom: -100

                      }}
                      className="table-light"
                    >
                      <td key={`col-1` + index}
                        className="text-center"
                        style={{ borderColor: COLORS.gray10, }}>
                      
                          <input
                            type="checkbox"
                            // checked={checkAll}
                            
                            defaultChecked={vd.IS_CHECKED}
                          onChange={() => { handleCheck(index)}}
                          />
                        {/* }
                        {vd.STATUS == '2' &&
                          <input
                            type="checkbox"
                            checked="checked"
                            // value={po.IS_CHECKED}
                            onClick={(e) => {
                              vd.IS_CHECKED = !vd.IS_CHECKED;
                              //setCheckAll(e.target.value)

                            }}
                          />
                        } */}

                      </td>
                      {/* <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                          {(po.BUYER_ID).toString()}
                        <br />
                      </td>
                      <td
                        key={`col-1` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {(po.BUYER_ID).toString()}
                      </td> */}
                      <td
                        key={`col-2` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10, fontSize: 17 }}
                      >
                        {(vd.VENDOR_ID).toString()}
                      </td>
                      <td
                        key={`col-3` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10, fontSize: 17 }}
                      >
                        {(vd.VENDOR_NAME).toString()}
                      </td>
                   
                      <td
                        key={`col-5` + index}
                        className="text-center"
                        style={{ width: "10%", borderColor: COLORS.gray10 }}
                      >
                        {vd.STRING_STATUS == 'Active' &&
                          <span className="badge badge-success" >Active</span>
                        }
                        {vd.STRING_STATUS == 'Inactive' &&
                          <span className="badge badge-danger"  >Inactive</span>
                        }
                      </td>

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
      </div>
    
    </>
  );
}

export default ManageVendors;

