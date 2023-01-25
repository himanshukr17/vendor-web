import React, { useState } from 'react'
import { IconContext } from 'react-icons';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import NavHeaderSupplier from '../../Components/NavHeaderSupplier';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const PurchaseOrderSupplier = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState('home')
    const [createOrderTab, setCreateOrderTab] = useState(true);
    const [displayOrderTab, setDisplayOrderTab] = useState(false);
    const [changeOrderTab, setChangeOrderTab] = useState(false);
    const [activeCreatTab,setCreateActiveTab]=useState('active')
    const [activeDisplayTab,setDisplayActiveTab]=useState('')
    const [activeChangeTab,setChangeActiveTab]=useState('')
    const [startDate, setStartDate] = useState(new Date());

    const creatOrder = () => {
        setCreateOrderTab(true)
        setDisplayOrderTab(false)
        setChangeOrderTab(false)
        setCreateActiveTab('active')
        setDisplayActiveTab('')
        setChangeActiveTab('')
    }
    const displayOrder = () => {
        setDisplayOrderTab(true)
        setCreateOrderTab(false)
        setChangeOrderTab(false)
        setCreateActiveTab('')
        setDisplayActiveTab('active')
        setChangeActiveTab('')
    }
    const changeOrder = () => {
        setDisplayOrderTab(false)
        setCreateOrderTab(false)
        setChangeOrderTab(true)
        setCreateActiveTab('')
        setDisplayActiveTab('')
        setChangeActiveTab('active')
    }
    return (
        <>

            <NavHeaderSupplier />
            <div
                className="card"
                style={{
                    marginTop: "5%",
                }}
            >
                <div
                    className="card-body"
              
                >

                
                <div className='row' >
                <div className='col-sm-1'>
                <div className="form-check form-check-inline">
                        <button
                            className="btn btn"
                            style={{
                                borderRadius: 50,
                            }}
                            onClick={() => {
                                navigate("/home");
                            }}
                        >
                            <IconContext.Provider value={{ color: "#000", size: "22px" }}>
                                <AiOutlineArrowLeft />
                            </IconContext.Provider>
                        </button>
                    </div>
                   
                    
                </div>
                <div className='col-md-9' >
                    <div className='row'>

                    <button className={"col-md-3 navTabs "+activeCreatTab} onClick={() => { creatOrder(); setCurrentPage('home') }}>Create Order</button>
                    <button className={"col-md-3 navTabs "+activeDisplayTab} onClick={() => { displayOrder(); displayOrderTab() }} id="defaultOpen">Display Order</button>
                    <button className={"col-md-3 navTabs "+activeChangeTab} onClick={() => { changeOrder(); setChangeOrderTab(true) }}>Change Order</button>

                    </div>
                    </div>
                </div>
                
                    
                   
                {
                    createOrderTab &&
                    <div className='card-body' style={{ backgroundColor:"#F0DEFE", border:'30px' }}>
                    <div
                className="form-floating mb-3"
              >
                <form> 
<div className='row'>
    <div className='col-md-2'>
    
                <p  style={{fontSize:"13px", marginBottom:'-1px'}}>Select Date* </p>
              <DatePicker className="form-control" selected={startDate} onChange={(date:Date) => setStartDate(date)} />

                {/* {error && businessRole.length <= 0 ?
                  <p className="text-left text-danger">Business Role is required</p>
                  : ""} */}
                  </div>
                  
    <div className='col-md-3'>
    <p  style={{fontSize:"13px", marginBottom:'-1px'}}>Purchase Organization* </p>
    <select className="form-control" type="text" onChange={(e) => { console.log(e.target.value)}}>
                      <option selected hidden>--Choose Options--</option>
                      <option >options1 </option>
                      <option >options2 </option>
                      <option >options3 </option>
                       {/* {roleDesc.map((val,index) => {
                        return (
                          <option key={index} value={val.INDUSTRY}>{val.DESCRIPTION}</option>
                        );
                      })}  */}
                    </select>
                {/* {error && businessRole.length <= 0 ?
                  <p className="text-left text-danger">Business Role is required</p>
                  : ""} */}
                
    </div>
    <div className='col-md-2'>
    <p  style={{fontSize:"13px", marginBottom:'-1px'}}>Purchase Group*</p>

    <select className="form-control" type="text" onChange={(e) => { console.log(e.target.value)}}>
                      <option selected hidden>--Choose Options--</option>
                      <option >options1 </option>
                      <option >options2 </option>
                      <option >options3 </option>
                       {/* {roleDesc.map((val,index) => {
                        return (
                          <option key={index} value={val.INDUSTRY}>{val.DESCRIPTION}</option>
                        );
                      })}  */}
                    </select>
                {/* {error && businessRole.length <= 0 ?
                  <p className="text-left text-danger">Business Role is required</p>
                  : ""} */}
             
    </div>
    <div className='col-md-2'>
    <p  style={{fontSize:"13px", marginBottom:'-1px'}}>Purchase Code* </p>

    <select className="form-control" type="text" onChange={(e) => { console.log(e.target.value)}}>
    <option selected hidden>--Choose Options--</option>

                      <option  >options1 </option>
                      <option >options2 </option>
                      <option >options3 </option>
                       {/* {roleDesc.map((val,index) => {
                        return (
                          <option key={index} value={val.INDUSTRY}>{val.DESCRIPTION}</option>
                        );
                      })}  */}
                    </select>
               
                {/* {error && businessRole.length <= 0 ?
                  <p className="text-left text-danger">Business Role is required</p>
                  : ""} */}
              
    </div>
    <div className='col-md-2'>
    <p  style={{fontSize:"13px", marginBottom:'-1px'}}>Vendor no* </p>

    <input className="form-control" type="text" onChange={(e) => { console.log(e.target.value)}} placeholder="Example-123456"/>
  
               
                {/* {error && businessRole.length <= 0 ?
                  <p className="text-left text-danger">Business Role is required</p>
                  : ""} */}
              
    </div>
    <div className='col-md-1'>
    
    <button type="submit" id="submitBtn"  style={{fontSize:"13px", marginTop:'20px'}} className="btn btn-dark" onClick={() => alert("HI Sexy")} > Save </button>

    </div>
    </div>
    </form>
</div>

                    </div>
                }
                {
                    displayOrderTab &&
                    <div className='card-body' style={{ backgroundColor:"#F0DEFE" }}>
                        here is display order
                    </div>
                }
                {
                    changeOrderTab &&
                    <div className='card-body' style={{ backgroundColor:"#F0DEFE" }}>
                        here is change order
                    </div>
                }
            </div>
                </div>
        </>
    )
}

export default PurchaseOrderSupplier