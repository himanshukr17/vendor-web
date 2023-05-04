import React, { useEffect, useState } from "react";
import NavHeader from "../../Components/NavHeader";
import axios from "axios";
import { AxioxExpPort } from "../AxioxExpPort"
import { useNavigate } from "react-router-dom";
import {
  AiFillReconciliation,
  AiOutlineArrowLeft
} from "react-icons/ai";
import Select from 'react-select';

import { IconContext } from "react-icons";
import { Modal, ModalBody } from "reactstrap";
import { COLORS } from "../../Constants/theme";
import { FaUserCog } from "react-icons/fa";
function AdminManageVendor() {
  const navigate = useNavigate();
  const vendorId = localStorage.getItem('userId');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCheckFlages, setShowCheckFlages] = useState(false);
  const [allSupplier, setAllSupplier] = useState([]);
  const [allSuppliersDD, setAllSuppliersDD] = useState([]);
  const [selectBuyer, setSelectBuyer] = useState([]);
  const [allBuyers, setAllBuyers] = useState([]);
  const toggleCheckFlages = () => setShowCheckFlages(!showCheckFlages);
  const [buyerName,setBuyerName]=useState('');
  const [buyerID,setBuyerID]=useState('');
  const [suppliersName,setSupplierName]=useState([]);
  const [suppliersID,setSupplierID]=useState([]);
  const [selectedSupplier,setSelectdSupplier]=useState([])
  const fetchData = async () => {
    var tempArr = [];
    var tempArr2 = [];
    axios.get(AxioxExpPort + "buyer/all_buyer").then((response) => {
      //  setTBody(response.data);
      response.data.map((items, index) => {
        tempArr.push({
          value: items.BUYER_ID, label: items.COMPANY_NAME
        })
      })
      setAllBuyers(tempArr);
    })

    axios.get(AxioxExpPort + "createcompany/all_supplier").then((res) => {
      console.log("response.data", res.data);
      res.data.map((itemss, index) => {
        tempArr2.push({
          value: itemss.VENDOR_ID, label: itemss.FIRST_NAME + " " + itemss.LAST_NAME
        })
      })
      setAllSupplier(tempArr2);
    })
  }
  const [tableData,setTableData]=useState([])

  const tableDataFetch= async()=>{
    axios.get(AxioxExpPort + "mapping/all_data")
    .then((response) => {
      console.log('tableData',response.data);
      setTableData(response.data)
    })
  }
  useEffect(() => {
    tableDataFetch();
    fetchData();
  }, [])
  const handeleSave = () => {
    var tempArrs = []
    allSuppliersDD.map((item, index) => {
    tempArrs.push(item.value)
    })
    // console.log(selectBuyer.value)
    try {
      axios.post(AxioxExpPort + 'mapping/assign', {
        buyer: selectBuyer.value,
        supplier: tempArrs
      }).then((res) => {
        tableDataFetch();
      })
    } catch {
    }
  }

  const handleClick = (val) => {
    toggleCheckFlages();
    setSupplierName(val.supplier_details);
    setBuyerName(val.BUYER_NAME);
    setBuyerID(val.BUYER_ID);
  };

const tempArr3 = suppliersName.map(itemss => ({
  value: itemss.SUPPLIER_ID,
  label: itemss.SUPPLIER_NAME
}));


const seveSuppliers=()=>{
   console.log('tempArr3',suppliersID);
  const tempArr4 = suppliersID.map(itemss => (itemss.value));
  
  if(suppliersID.length > 0){
    console.log('suppliersID',tempArr4);
     axios.post(AxioxExpPort + "mapping/assign", {
       "supplier":tempArr3,
       "buyer":buyerName
     })
       .then((res) => {  
         console.log('buyerName',res)
         tableDataFetch();
         fetchData();  
         toggleCheckFlages();
      })
  }else{
    toggleCheckFlages();
  }
 

}


  return (
    <>
      <NavHeader />
      <div
       
        style={{
          marginLeft: "1%",
          marginTop: "5%",
          marginRight:'0.8%'

        }}
      >
        
         
      <div className="row">
        <div className="col-md-10">
        <div className="form-check form-check-inline">
            <h4 className="form-check-label" htmlFor="inlineRadio2" style={{marginLeft:18}}>
           
              Manage Vendor
            </h4>
          </div>
        </div>
       
          <div className="col-md-2 text-right" >Go to Home</div>
      </div>
      
        <div className="card-body" style={{ marginTop: '1.2%' }} >
          <div className="row" style={{marginLeft:-12}}>
          
            <div className="col-md-3">
              <Select
                placeholder="--Select Buyer--"
                options={allBuyers}
                onChange={(e) => { setSelectBuyer(e) }}
              />
            </div>
            <div className="col-md-5">
              <Select
                isMulti
                onChange={(e) => { setAllSuppliersDD(e); }}
                placeholder="--Select Suppliers--"
                options={allSupplier}
              />
            </div>
            <div className="col-md-1">
              <a type="submit" id="submitBtn" className="btn btn-dark" style={{marginTop:-0}} onClick={handeleSave} > Save </a>
            </div>
          </div>
          <br />

          <div className="row" >
          <table className="table table-light table-bordered ">
            <thead className="table-light">
              <tr
                className="text-center"
                style={{
                  backgroundColor: COLORS.gray20,
                  borderColor: COLORS.gray10,
                }}
              >
                <td className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer</td>
                <td className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier</td>
                <td className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action</td>
              </tr>
            </thead>
            <tbody>
    {tableData.map((val, index) => {
      return (
        <tr
          style={{
            backgroundColor: "white",
            borderColor: "#000"
          }}
          className="table-light"
          key={index}
        >
          <td
            // className="text-center"
            style={{  borderColor: COLORS.gray10 }}
          >
            {val.BUYER_NAME}
          </td>
          <td
          
            style={{ width: "10%",  borderColor: COLORS.gray10 }}
          >
            {val.supplier_details.map((valus, idx) => {
              return <div key={idx}>{valus.SUPPLIER_NAME }                        <span className="badge badge-success" style={{marginLeft:5}} >{valus.SUPPLIER_ID}</span>
</div>;
            })}
          </td>
          <td
            className="text-center"
            style={{ borderColor: COLORS.gray10 }}
          >
            <IconContext.Provider
              value={{ color: "green", size: "30px" }}
            >
 <FaUserCog
      type="button"
      onClick={() => handleClick(val)}
    />            </IconContext.Provider>
          </td>
        </tr>
      );
    })}
  </tbody>
          </table>
        </div>
        </div>
        
    
         
          </div>

      <Modal
        
        isOpen={showCheckFlages}
        toggle={toggleCheckFlages}
        style={{
          alignItems: "center",
          justifyContent: "center",

        }}
      >
      <ModalBody>
      <div className=" card-info">
      <div className="card-header">
        <h3 className="card-title">Edit Suppliers</h3>
      </div>
        <div className="card-body">
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Buyer
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                placeholder={buyerName}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputPassword3"
              className="col-sm-2 col-form-label"
            >
              Suppliers
            </label>
            <div className="col-sm-10">
            <Select
  isMulti
  defaultValue={tempArr3} // <-- pass supplierID instead of selectedSupplier
  onChange={(e) => { setSupplierID(e); }} // <-- update supplierID when the selection changes
  placeholder="--Select Suppliers--"
  options={allSupplier}
/>
          </div>
          </div>
         
        </div>
        <div className="card-footer">
          <button onClick={seveSuppliers} className="btn btn-info">
           Save
          </button>
          <a type="button" onClick={toggleCheckFlages} className="btn btn-default float-right">
            Cancel
          </a>
        </div>
    </div>
      </ModalBody>
      
      </Modal>
    </>
  );
}
export default AdminManageVendor;