import React from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineEdit, AiOutlineHome, AiOutlineMessage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'reactstrap'
import NavHeader from '../../Components/NavHeader'
import { COLORS } from '../../Constants/theme'

function RecSupport() {
        const navigate = useNavigate();

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
Receive Support
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
          <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Ticket ID</th>
          <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Supplier</th>
          <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">About</th>
          <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Date</th>
          <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Description</th>
          <th className="text-center" style={{ width: "5%",backgroundColor:"#4F51C0", color:"white", borderColor: COLORS.gray10 }} scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
       
              <tr
                key={`row`}
                style={{
                  backgroundColor: "white",
                  borderColor: "#000",
                }}
                className="table-light"
              >
                <td className="text-center">HEllo</td>
                <td className="text-center">SupplirNAme <small class="badge badge-info"><i class="far fa-clock"></i>Supplier ID</small></td>
                <td className="text-center">About</td>
                <td className="text-center">19/12/1998</td>

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
</div></div>
  )
}

export default RecSupport