import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import SidebarHeaderToggle from '../Components/SidebarHeaderToggle';

function InvitedEvents() {
    const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
    const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
    const [sort, setSort] = useState("ASC");
    // const [query, setQuery]=useState("")
    const [filterData, setFilterdata] = useState([])
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });
    const [change,setChange]=useState('Open')

    const data = ClickedPOsDataArr;
    const vendorId = localStorage.getItem('userId');
    //console.log("vendorIdvendorId", vendorId)
    const [tbody, setTBody] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ClickedPOsDataArr.slice(indexOfFirstPost, indexOfLastPost);
    const [toaster, setToaster] = useState("")
    const [toasterColor, setToasterColor] = useState("")

    const eventData = [
        {
            'NAME': "TEST DATA AGRO Chem",
            'EVENT_TYPE': 53245,
            'END_DATE': 76,
            'PARTICIPATED': 24},
        {
            'NAME': "TEST DATA AGRO Chem",
            'EVENT_TYPE': 53245,
            'END_DATE': 76,
            'PARTICIPATED': 24},
        {
            'NAME': "TEST DATA AGRO Chem",
            'EVENT_TYPE': 53245,
            'END_DATE': 76,
            'PARTICIPATED': 24},
        {
            'NAME': "TEST DATA AGRO Chem",
            'EVENT_TYPE': 53245,
            'END_DATE': 76,
            'PARTICIPATED': 24},
    ];


    const handleReject = (cardData) => {
        // Handle the reject button click event with the corresponding card data
        console.log("Reject clicked. Card Data:", cardData);
    };

    const handleApprove = (cardData) => {
        // Handle the approve button click event with the corresponding card data
        console.log("Approve clicked. Card Data:", cardData);
    };
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = eventData.filter((item) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            item.NAME.toLowerCase().includes(searchValue)
        );
    });

    const changeEvent=(e)=>{
        setChange(e)
    }
  return (
    <>
    <SidebarHeaderToggle />
    {
    loading &&
    <div className="loader-container">
          <div className="spinnerCircle"></div>
      </div>
  }
    <div
      className="card-body"
      style={{
        marginTop: "2%",
      }}
    >
      <div

      >
        <div className="row">
          <div className="col-md-12">
            <div className="row" style={{ marginBottom:10}}>

              <div className="col-md-10">


                <div style={{ display: 'flex', alignItems: 'center',marginLeft:'40px' }}>
<h4 className="form-check-label">
Invted Events
</h4>
<p style={{color:'#fff', marginLeft:'5px' , borderBlockColor:'#000'}}>{change}</p>
{/* <button  style={{
    marginLeft: '10px',
    padding: '7px 14px',
    backgroundColor:"#02a5ab",
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
  }} onClick={() => { window.history.go(-1) }}>Go Back</button> */}
</div>
              </div>
              <div className="col-md-2 text-end noPrint" style={{marginTop:10}}>

                  <IconContext.Provider value={{ color: "#3a91e8", size: "22px" }}>
                    <AiOutlineHome  type="button"  onClick={() => {
                    Navigate("/dashboard");
                  }} />
                  </IconContext.Provider>
            </div>
          </div>
        
          <div >
          <div className="" style={{marginTop:10,marginLeft:'2.2%', height:'100%', marginRight:'-1.4%'}}>
          <div className="card-body" >
          <div className="row">
                            <div className="col-sm-2">
                            <select className="form-control" aria-label="Default select example" type="text" onChange={(e)=>changeEvent(e.target.value)}>
                                        <option selected >Open</option>
                                        <option  >Pending</option>
                                        <option  >Completed</option>
                                    </select>
                            </div>
                            <div className="col-md-2 noPrint">
                            <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Supplier Code / Name"
                                    style={{ width: "100%", height: 35 }}
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-5 noPrint">

                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="text-right" style={{ fontFamily: "bold", marginTop: "-35px", marginBottom: "1px", size: 60 }}></p>
                        <div className='row'>
                            {
                                filteredData.map(item =>
                                    <div className='col-md-2'>
                                        <div className='card' >
                                            <div style={{ margin: '10px' }}>
                                                <p style={{ color: '#D20000 ' }}>{item.NAME}</p>
                                                <p style={{  }}>Event Type:{item.EVENT_TYPE} </p>
                                                <p>End Date:{item.END_DATE} </p>
                                                <p>Participated:{item.PARTICIPATED}  </p>
                                              
                                                {/* <div className="d-flex justify-content-between" >
                                                    <button
                                                        style={{ backgroundColor: '#FFC300 ', color: 'white', marginRight: '10px', padding: '5px', borderRadius: '20px' }} onClick={() => handleReject(item)}
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        style={{ backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '20px' }} onClick={() => handleApprove(item)}
                                                    >
                                                        Approve
                                                    </button>
                                                </div> */}
                                            </div>
                                            </div>
                                        
                                    </div>
                                )
                            }

                        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default InvitedEvents