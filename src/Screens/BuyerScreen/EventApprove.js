import React from 'react'
import NavHeader from '../../Components/NavHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';

function EventApprove() {
    const navigate = useNavigate();
    const [isPurchaseOrderEmpty, setIsPurchaseOrderEmpty] = useState(true);
    const [ClickedPOsDataArr, setClickedPOsDataArr] = useState([]);
    const [sort, setSort] = useState("ASC");
    // const [query, setQuery]=useState("")
    const [filterData, setFilterdata] = useState([])


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
            'Supplier': "Rahul",
            'Amount': 53245,
            'Discount_Percentage': 76,
            'Discount': 24,
            'Sub_Total': 132434,
            'Freight_Percentage': 44,
            'Freight_Per_Unit': 22
        },
        {
            'Supplier': "Muskan",
            'Amount': 53245,
            'Discount_Percentage': 76,
            'Discount': 24,
            'Sub_Total': 132434,
            'Freight_Percentage': 44,
            'Freight_Per_Unit': 22
        },
        {
            'Supplier': "Shagun",
            'Amount': 53245,
            'Discount_Percentage': 76,
            'Discount': 24,
            'Sub_Total': 132434,
            'Freight_Percentage': 44,
            'Freight_Per_Unit': 22
        },
        {
            'Supplier': "soumen",
            'Amount': 53245,
            'Discount_Percentage': 76,
            'Discount': 24,
            'Sub_Total': 132434,
            'Freight_Percentage': 44,
            'Freight_Per_Unit': 22
        },
        {
            'Supplier': "Himanshu",
            'Amount': 53245,
            'Discount_Percentage': 76,
            'Discount': 24,
            'Sub_Total': 132434,
            'Freight_Percentage': 44,
            'Freight_Per_Unit': 22
        },

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
            item.Supplier.toLowerCase().includes(searchValue)
        );
    });
    return (
        <div>  <NavHeader />
            <div id="snackbar" style={{ backgroundColor: toasterColor, borderRadius: "50px" }}>{toaster}</div>

            <div
                className="card-body"
                style={{
                    marginTop: "4%",
                }}
            >
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-lg-10">
                                    <h4 className="form-check-label" >
                                        {/* {location.PROJECT} */}
                                        {/* {location.state.name} */}
                                        Event Approval
                                    </h4>
                                </div>
                                <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>
                                    <IconContext.Provider value={{ color: "red", marginTop: -210, size: "20px" }}>
                                        <AiOutlineHome type="button" onClick={() => {
                                            navigate("/home");
                                        }} />
                                    </IconContext.Provider>
                                    {" / Event Approval"}
                                </div>

                            </div>
                        </div>
                        <div className="card" >
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-5">
                                    </div>
                                    <div className="col-md-5 noPrint">

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
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="text-right" style={{ fontFamily: "Serif", marginTop: "-35px", marginBottom: "1px", size: 60 }}></p>
                                <div className='row'>
                                    {
                                        filteredData.map(item =>
                                            <div className='col-md-3'>
                                                <div className=' card' style={{ margin: 5 }}>
                                                    <div style={{ margin: '10px' }}>
                                                        <p className="text-center" style={{ color: '#D20000 ' }}>Supplier:           {item.Supplier}</p>
                                                        <p style={{ color: '#0089D2', fontSize: '15px' }}>Amount:             {item.Amount} </p>
                                                        <p>Discount Percentage:{item.Discount_Percentage} </p>
                                                        <p>Discount:           {item.Discount}  </p>
                                                        <p>Sub Total:          {item.Sub_Total}  </p>
                                                        <p>Freight Percentage: {item.Freight_Percentage}   </p>
                                                        <p>Freight Per Unit:   {item.Freight_Per_Unit}   </p>
                                                        <br />
                                                        <div className="d-flex justify-content-between" >
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
                                                        </div>
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
    )
}

export default EventApprove