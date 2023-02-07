import React from 'react'
import { IconContext } from 'react-icons';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import NavHeaderSupplier from '../../../Components/NavHeader';
import { COLORS } from '../../../Constants/theme';

const ManageVendor = () => {
    const navigate=useNavigate();
  return (
    <>
     <NavHeaderSupplier />
     <div id="snackbar" style={{ backgroundColor: "green", borderRadius: "50px" }}></div>

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
          navigate("/home");
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
  <div className="container" >


    <div className="formdesign"  >
     


      <div className="row">
        <div className="col-md-3">
          <select className="form-control" type="text"
          >
            <option selected disabled >--Select Buyer--</option>
          
          </select>
        </div>
        <div className="col-md-5">
          <input type="text" className="form-control" name="optionInputVal" readOnly={true} id='optionInputVal' required />
         </div>

      
        <div className="col-md-1">

          <button type="submit" id="submitBtn" className="btn btn-dark"  > Save </button>

        </div>
      </div>
      <br />
    </div>
  </div>
</div>
<div className="card-body" style={{ marginTop: "-35px" }} >
  <div className="row" >
  <table className="table table-light table-bordered table-hover">
    <thead className="table-light">
    <tr  className="text-center"
                style={{
                  backgroundColor: COLORS.gray20,
                  borderColor: COLORS.gray10,
                }}>

        <td className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Buyer Name </td>
        <td className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Supplier Name </td>
        <td className="text-center" style={{ width: "5%", borderColor: COLORS.gray10 }} scope="col">Action </td>
    </tr>
    </thead>
    <tbody>
    <tr   style={{
                        backgroundColor: "white",
                        borderColor: "#000",
                      }}
                      className="table-light">
        <td>Buyer 1</td>
        <td>Buyer @</td>
        <td>Option to Change</td>
    </tr>
    </tbody>
  </table>


  </div>
 
</div>

    </>
  )
}
export default ManageVendor;