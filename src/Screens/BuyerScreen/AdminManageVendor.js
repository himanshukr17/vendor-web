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
  useEffect(() => {
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
    fetchData()
  }, [])
  const handeleSave = () => {
    var tempArrs = []
    allSuppliersDD.map((item, index) => {
      tempArrs.push(item.value)

    })
    console.log(selectBuyer.value)
    try {
      axios.post(AxioxExpPort + 'mapping/assign', {
        buyer: selectBuyer.value,
        supplier: tempArrs
      }).then((res) => {
        navigate("/AdminManageVendor")
      })

    } catch {


    }
  }
  // alert(optionVal)






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
{/* 
          <div className="form-check form-check-inline">
            <button
              className="btn btn"

              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <IconContext.Provider value={{ color: "#000", size: "22px" }}>
                <AiOutlineArrowLeft />
              </IconContext.Provider>
            </button>
          </div> */}
          <div className="form-check form-check-inline">
            <h4 className="form-check-label" htmlFor="inlineRadio2">
              {/* {location.PROJECT} */}
              {/* {location.state.name} */}
              Manage Vendor
            </h4>
          </div>
          <div
            className="form-check form-check-inline"
            style={{
              float: "right",
            }}
          ></div>
        </div>
        <div className="container" style={{ marginTop: -15 }} >
          <div className="row">
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
              <button type="submit" id="submitBtn" className="btn btn-dark" onClick={handeleSave} > Save </button>
            </div>
          </div>
          <br />
        </div>

      </div>
      <div className="card-body" style={{ marginTop: "-35px", }}  >
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
              <tr style={{
                backgroundColor: "white",
                borderColor: "#000",
              }}
                className="table-light">
              
                <td className="text-center"
                  style={{ width: "10%", borderColor: COLORS.gray10 }}>2</td>
                <td className="text-center"
                  style={{ width: "10%", borderColor: COLORS.gray10 }}>3</td>
                <td className="text-center"
                  style={{ width: "10%", borderColor: COLORS.gray10 }}><IconContext.Provider
                      value={{ color: "green", size: "30px" }}
                    >
                      {" "}
                      <FaUserCog />
                    </IconContext.Provider></td>
              </tr>
              <tr>
                <td className="text-center"
                  style={{ width: "10%", borderColor: COLORS.gray10 }}>2</td>
                <td className="text-center"
                  style={{ width: "10%", borderColor: COLORS.gray10 }}>3</td>
                <td className="text-center"
                  style={{ width: "10%", borderColor: COLORS.gray10 }}><IconContext.Provider
                      value={{ color: "green", size: "30px" }}
                    >
                      {" "}
                      <FaUserCog />
                    </IconContext.Provider></td>
              </tr>
            </tbody>
          </table>

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
            hi
          </div>
          hi
        </ModalBody>
      </Modal>
    </>
  );
}
export default AdminManageVendor;