// const [selectedRow, setSelectedRow] = useState(null);
import React, { useState } from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { BsFillCaretDownFill, BsFillCheckCircleFill, BsFillDashCircleFill } from 'react-icons/bs';
import { AiOutlineArrowRight, AiOutlineDown, AiOutlineHome } from 'react-icons/ai';
import { Table } from 'reactstrap';
import { IconContext } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import NavHeader from '../../Components/NavHeader';
import { AxioxExpPort } from '../AxioxExpPort';
import axios from 'axios';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';

function PricePartApproval() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedRow, setSelectedRow] = useState(null);
    const [toaster, setToaster] = useState("")
    const [toasterColor, setToasterColor] = useState("")
    const [projectName, setProjctName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [testProject, setTestProject] = useState('')
    const [division, setDivision] = useState('')
    const [purcCate, setPurcCate] = useState('')
    const [source, setSource] = useState('')
    const [eventType,setEventType]=useState('')



    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const [showDetails, setShowDetails] = useState(false);

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const uploadPan = () => {
        // Handle uploading PAN here
        console.log(currentStep);
        if(currentStep===4){
            alert('done')
        }else{
        handleNextStep();
    }
    };

    const data = [
        { id: 1, name: '123456', country: 'Niger', city: 'Oud-Turnhout', salary: '$36,738' },
        { id: 2, name: '43666', country: 'Curaçao', city: 'Sinaai-Waas', salary: '$23,789' },
        { id: 3, name: '6567', country: 'Netherlands', city: 'Baileux', salary: '$56,142' },
        { id: 4, name: '66556', country: 'Korea, South', city: 'Overland Park', salary: '$38,735' },
        { id: 5, name: '67877', country: 'Malawi', city: 'Feldkirchen in Kärnten', salary: '$63,542' },
        { id: 6, name: '123456', country: 'Chile', city: 'Gloucester', salary: '$78,615' },
        { id: 7, name: '123456', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 8, name: '123456', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 9, name: '123456', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 10, name: '123456', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 11, name: '123456', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 12, name: '123456', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
    ];

    const [storeArr, setStoreArr] = useState({})
    const handleRowClick = (id) => {
        if (!filteredData) {
            return;
        }
        setSelectedRow(id);
        const getSelectedRow = filteredData.find((RFO) => RFO.id === id);
        console.log('selectedRow', getSelectedRow);
        setStoreArr(getSelectedRow)

    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    const onChangeValue = (event) => {
        
        console.log(event.target.value);
    }
    const [suppliersID, setSupplierID] = useState([]);
    const [selectedSupplier, setSelectdSupplier] = useState([])
    const fetchData = async () => {
        var tempArr2 = [];
        axios.get(AxioxExpPort + "createcompany/all_supplier").then((res) => {
            console.log("response.data", res.data);
            res.data.map((itemss, index) => {
                tempArr2.push({
                    ...itemss, value: itemss.VENDOR_ID, label: itemss.FIRST_NAME + " " + itemss.LAST_NAME, checked: false
                })
            })
            console.log('sss', tempArr2)
            setSelectdSupplier(tempArr2);
        })
    }
    useEffect(() => {
        fetchData();
    }, [])



    return (
        <>
            <NavHeader />
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
                                        Price Part Approval
                                    </h4>
                                </div>
                                <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>
                                    <IconContext.Provider value={{ color: "red", marginTop: -210, size: "20px" }}>
                                        <AiOutlineHome type="button" onClick={() => {
                                            navigate("/home");
                                        }} />
                                    </IconContext.Provider>
                                    {" / Price Part Approval"}
                                </div>
                            </div>
                        </div>

                        <div className="card" >
                            <div className="card-body">
                                {currentStep > 0 && currentStep < 5 &&
                                    <div className='card-body' style={{ display: 'flex', justifyContent: 'center', }}>
                                        <div className="col-md-12">
                                            <div style={{
                                                backgroundColor: '#343a40',
                                                color: '#fff',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
                                            }}>                                                <h2 style={{ marginBottom: '10px' }}><span style={{ fontSize: '20px', color: 'red' }}>RFQ Number: </span>{storeArr.name}</h2>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <p style={{ margin: 0 }}>{"Comodity: " + storeArr.country}</p>
                                                    <p style={{ margin: 0 }}>{"Project ID: " + storeArr.city}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div style={{ marginLeft: '5%', marginRight: '5%' }}>

                                    <ProgressBar
                                        percent={(currentStep) * 25}
                                        filledBackground="linear-gradient(to right, #00C9FF, #92FE9D)"
                                    >
                                        <Step transition="scale">
                                            {({ accomplished }) => (
                                                <>
                                                    <div style={{ textAlign: 'center', marginTop: '30%' }}>
                                                        {accomplished && currentStep >= 1 ? <BsFillCheckCircleFill size={15} /> : <BsFillDashCircleFill size={15} />}
                                                        <p style={{ marginTop: 10 }}>Select RFO</p>
                                                    </div>
                                                </>
                                            )}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished }) =>
                                                <>
                                                    <div style={{ textAlign: 'center', marginTop: '25%' }}>
                                                        {accomplished && currentStep >= 2 ? <BsFillCheckCircleFill size={15} /> : <BsFillDashCircleFill size={15} />}
                                                        <p style={{ marginTop: 10 }}>Create Project</p>
                                                    </div>
                                                </>}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished }) =>
                                                <>
                                                    <div style={{ textAlign: 'center', marginTop: '25%' }}>
                                                        {accomplished && currentStep >= 3 ? <BsFillCheckCircleFill size={15} /> : <BsFillDashCircleFill size={15} />}
                                                        <p style={{ marginTop: 10 }}>Create Event</p>
                                                    </div>
                                                </>}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished }) =>
                                                <>
                                                    <div style={{ textAlign: 'center', marginTop: '25%' }}>
                                                        {accomplished && currentStep >= 4 ? <BsFillCheckCircleFill size={15} /> : <BsFillDashCircleFill size={15} />}
                                                        <p style={{ marginTop: 10 }}>Invite Supplier</p>
                                                    </div>
                                                </>}
                                        </Step>
                                        <Step transition="scale">
                                            {({ accomplished }) =>
                                                <>
                                                    <div style={{ textAlign: 'center', marginTop: '60%', marginLeft: '-8px' }}>
                                                        {accomplished && currentStep >= 5 ? <BsFillCheckCircleFill size={15} /> : <BsFillDashCircleFill size={15} />}
                                                        <p style={{ marginTop: 10 }}>Review</p>
                                                    </div>
                                                </>}
                                        </Step>
                                    </ProgressBar>
                                </div>
                            </div>

                            <div className='card-body' style={{ display: 'flex', justifyContent: 'center' }}>
                                {currentStep === 0 &&
                                    <div className='card' style={{ width: '95%' }}>
                                        <div className='' style={{ padding: '2px' }}>
                                            <div style={{ height: "300px", overflowY: "auto" }}>
                                                <div className="d-flex justify-content-end">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search by name"
                                                        value={search}
                                                        onChange={handleSearchChange}
                                                        style={{ width: '25%', marginBottom: '0.2%', }}
                                                    />
                                                </div>
                                                <Table className="tablesorter table-hover" >
                                                    <thead className="text-primary" style={{ position: 'sticky', top: 0, background: '#fff', marginTop: '-10' }}>
                                                        <tr  >
                                                            <th className="text-center">RFQ Number</th>
                                                            <th className="text-center">Comodity</th>
                                                            <th className="text-center">Project ID</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredData.map((item) => (
                                                            console.log(item),
                                                            <tr
                                                                key={item.id}
                                                                onClick={() => {
                                                                    handleRowClick(item.id);
                                                                    uploadPan();
                                                                }}
                                                                className={selectedRow === item.id ? 'selected' : ''}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <td className="text-center">{item.name}</td>
                                                                <td className="text-center">{item.country}</td>
                                                                <td className="text-center">{item.city}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {currentStep === 1 &&
                                    <>
                                        <div className='card-body' style={{ width: '95%' }}>

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <label >Project Name*</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={projectName}                                                       
                                                        onChange={(e)=>setProjctName(e.target.value)}
                                                        placeholder="Project Name"
                                                    />
                                                </div>
                                                <div className='col-md-6'>
                                                    <label >Project Description*</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={projectDesc}
                                                        onChange={(e)=>setProjectDesc(e.target.value)}
                                                        placeholder="Project Description"
                                                    />
                                                </div>
                                                <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                    <label >Test Project*</label>
                                                    <div onChange={(e) => setTestProject(e.target.value)}>
                                                        <label style={{ display: 'inline-block', marginRight: '10px' }}>
                                                            <input type="radio" value="yes" name="gender" style={{ marginRight: '5px' }} />
                                                            Yes
                                                        </label>
                                                        <label style={{ display: 'inline-block' }}>
                                                            <input type="radio" value="no" name="gender" style={{ marginRight: '5px' }} />
                                                            No
                                                        </label>
                                                    </div>

                                                </div>

                                                <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                    <label >Division*</label>
                                                    <select className="form-control" aria-label="Default select example" onChange={(e=>{setDivision(e.target.value); console.log(e.target.value)})}>

                                                        <option selected disabled>--Select Division--</option>
                                                        {/* {languageArr.map((val,index) => {
                        return ( */}
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION1'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION2'}</option>
                                                        {/* );
                      })}  */}
                                                    </select>
                                                </div>
                                                <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                    <label >Purchase Category*</label>
                                                    <select className="form-control" aria-label="Default select example" onChange={(e)=>setPurcCate(e.target.value)}>

                                                        <option selected disabled>--Select Purchase Category--</option>
                                                        {/* {languageArr.map((val,index) => {
                        return ( */}
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'Purchase Category'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'Purchase Category1'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'Purchase Category'}</option>
                                                        {/* );
                      })}  */}
                                                    </select>
                                                </div>
                                                <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                    <label >Source*</label>
                                                    <select className="form-control" aria-label="Default select example" onChange={(e)=>{setSource(e.target.value)}}>

                                                        <option selected disabled>--Select Source--</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION1'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION2'}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {currentStep === 2 &&
                                    <>
                                        <div className='card-body' style={{ width: '95%' }}>
                                            <div className='row'>
                                                 <div className='col-md-4' style={{ marginTop: '1.5%' }}>
                                                    <label >Event Type*</label>
                                                    <select className="form-control" aria-label="Default select example" onChange={(e)=>{setEventType(e.target.value)}}>
                                                        <option selected disabled>--Select Event--</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION1'}</option>
                                                        <option key={'index'} value={'val.LANGUAGE'}>{'DESCRIPTION2'}</option>
                                                    </select>
                                                </div>
                                                <div className='col-md-3' style={{ marginTop: '1.5%' }}>
                                                    <label >Event Start Date*</label>
                                                    <DatePicker className="form-control" selected={startDate} onChange={(date) =>
                                                        setStartDate(date)} />
                                                </div>
                                                <div className='col-md-3' style={{ marginTop: '1.5%' }}>
                                                    <label >Event End Date*</label>
                                                    <DatePicker className="form-control" selected={endDate} onChange={(date) =>
                                                        setEndDate(date)} />
                                                </div>
                                                <div className='col-md-12' style={{ marginTop: '1.5%' }}>
                                                    <div className='card' style={{ padding: '2px' }}>
                                                        <div style={{ height: "300px", overflowY: "auto" }}>
                                                            <div className="d-flex justify-content-end">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Search by name"
                                                                    value={search}
                                                                    onChange={handleSearchChange}
                                                                    style={{ width: '25%', marginBottom: '0.2%', marginTop: '%' }}
                                                                />
                                                            </div>
                                                            <Table className="tablesorter table-hover" >
                                                                <thead className="text-primary" style={{ position: 'sticky', top: 0, background: '#fff', marginTop: '-10' }}>
                                                                    <tr  >
                                                                        <th className="text-center">Select Suppliers</th>
                                                                        <th className="text-center">Supplier ID</th>
                                                                        <th className="text-center">Supplier Name</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {selectedSupplier.map((item, index) => (
                                                                        <tr key={`supplier-${item.value}-${index}`}>
                                                                            {item.value != null &&
                                                                                <>                                                                       <td className="text-center" key={`col+1` + index}>
                                                                                    <input
                                                                                        type='checkbox'
                                                                                        checked={item.checked}
                                                                                        onChange={() => {
                                                                                            item.checked = !item.checked;
                                                                                            setSelectdSupplier([...selectedSupplier.slice(0, index), item, ...selectedSupplier.slice(index + 1)])
                                                                                        }}
                                                                                    />
                                                                                </td>
                                                                                    <td className="text-center" key={`col+2` + index}>{item.value}</td>
                                                                                    <td className="text-center" key={`col+3` + index}>{item.label}</td>
                                                                                </>}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {currentStep === 3 &&
                                    <>
                                        <div className='col-md-12' style={{ marginTop: '1.5%' }}>
                                            <div className='card' style={{ padding: '2px' }}>
                                                <div style={{ height: "300px", overflowY: "auto" }}>
                                                    <div className="d-flex justify-content-end">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search by name"
                                                            value={search}
                                                            onChange={handleSearchChange}
                                                            style={{ width: '25%', marginBottom: '0.2%', marginTop: '%' }}
                                                        />
                                                    </div>
                                                    <Table className="tablesorter table-hover" >
                                                        <thead className="text-primary" style={{ position: 'sticky', top: 0, background: '#fff', marginTop: '-10' }}>
                                                            <tr  >
                                                                <th className="text-center">Select Suppliers</th>
                                                                <th className="text-center">Supplier ID</th>
                                                                <th className="text-center">Supplier Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedSupplier.map((item, index) => (
                                                                <tr key={`supplier-${item.value}-${index}`}>
                                                                    {item.checked &&
                                                                        <>                                                                       <td className="text-center" key={`col+1` + index}>
                                                                            <input
                                                                                type='checkbox'
                                                                                checked={item.checked}
                                                                                onChange={() => {
                                                                                    item.checked = !item.checked;
                                                                                    setSelectdSupplier([...selectedSupplier.slice(0, index), item, ...selectedSupplier.slice(index + 1)])
                                                                                }}
                                                                            />
                                                                        </td>
                                                                            <td className="text-center" key={`col+2` + index}>{item.value}</td>
                                                                            <td className="text-center" key={`col+3` + index}>{item.label}</td>
                                                                        </>}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {
                                    currentStep === 4 &&
                                    <>
                                        <div className='card-body' >
                                            <div className='row'>

                                                <div className='col-md-4'  >
                                                    <label >Event Type:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={eventType}
                                                        disabled
                                                        placeholder="Project Name"
                                                    />
                                                </div>
                                                <div className='col-md-4' >
                                                    <label >Start Date:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={dateFormat(startDate, "dd/mm/yyyy")}
                                                        

                                                        disabled
                                                        placeholder="Project Name"
                                                    />
                                                </div>
                                                <div className='col-md-4'  >
                                                    <label >End Date:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={dateFormat(endDate, "dd/mm/yyyy")}
                                                        disabled
                                                        placeholder="Project Name"
                                                    />

                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='row'>
                                                        <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                            <label >Project Name:</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                inputMode="numeric"
                                                                value={projectName}
                                                                disabled
                                                                placeholder="Project Name"
                                                            />
                                                        </div>
                                                        <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                            <label >Project Description:</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={projectDesc}
                                                                disabled
                                                                placeholder="Project Name"
                                                            />

                                                        </div>
                                                        <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                            <label >Division:</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={division}
                                                                placeholder="Project Name"
                                                            />
                                                            <label style={{ marginTop: '3%' }} >Source:</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={source}
                                                                disabled
                                                                placeholder="Project Name"
                                                            />
                                                        </div>
                                                        <div className='col-md-6' style={{ marginTop: '1.5%' }}>
                                                            <label >Purchase Category:</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={purcCate}
                                                                placeholder="Project Name"
                                                            />
                                                            <label  style={{ marginTop: '4%' }}>Test Project:</label>
                                                            <div onChange={(e) => onChangeValue(e)}>
                                                                {
                                                                    testProject === 'yes'?
                                                                    <div style={{marginTop:'1.5%'}}>
                                                                <label style={{ display: 'inline-block', marginRight: '10px' }}>

                                                                    <input type="radio" value="yes" name="gender" style={{ marginRight: '5px' }} checked/>
                                                                    Yes
                                                                </label>
                                                                <label style={{ display: 'inline-block' }}>
                                                                    <input type="radio" value="no" name="gender" style={{ marginRight: '5px' }} />
                                                                    No
                                                                </label>
                                                                </div>
                                                                :
                                                                <div style={{marginTop:'1.5%'}}>
                                                                <label style={{ display: 'inline-block', marginRight: '10px' }}>

                                                                    <input type="radio" value="yes" name="gender" style={{ marginRight: '5px' }} />
                                                                    Yes
                                                                </label>
                                                                <label style={{ display: 'inline-block' }}>
                                                                    <input type="radio" value="no" name="gender" style={{ marginRight: '5px' }} checked/>
                                                                    No
                                                                </label>
                                      
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                           
                                                </div>
                                                            <div className='col-md-4' style={{ marginTop: '1%' }}>
                                                            <label >Invited Suppliers*</label>
                                            <div  className="form-control" style={{ height: "190px", overflowY: "auto"  }}>
                                                            <Table className="tablesorter table-hover" >
                                                                <thead className="text-primary" style={{ position: 'sticky', top: '-14px', background: '#fff',  }}>
                                                                    <tr  >
                                                                        <th className="text-center"  style={{fontSize:'10px'}}>Selected</th>
                                                                        <th className="text-center"  style={{fontSize:'10px'}}>Supplier ID</th>
                                                                        <th className="text-center"  style={{fontSize:'10px'}}>Supplier Name</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {selectedSupplier.map((item, index) => (
                                                                <tr key={`supplier-${item.value}-${index}`}>
                                                                    {item.checked &&
                                                                        <>                                                                       <td className="text-center" key={`col+1` + index}>
                                                                            <input
                                                                                type='checkbox'
                                                                                checked={item.checked}
                                                                                onChange={() => {
                                                                                    item.checked = !item.checked;
                                                                                    setSelectdSupplier([...selectedSupplier.slice(0, index), item, ...selectedSupplier.slice(index + 1)])
                                                                                }}
                                                                            />
                                                                        </td>
                                                                            <td className="text-center" style={{fontSize:'10px'}} key={`col+2` + index}>{item.value}</td>
                                                                            <td className="text-center" style={{fontSize:'10px'}} key={`col+3` + index}>{item.label}</td>
                                                                        </>}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                            </div>
                                                            </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="row" >
                                <div className="col-md-9">
                                    {currentStep === 1 &&
                                        <>
                                            <label style={{ color: 'red', marginLeft: '5%', cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>
                                                RFO Details  {showDetails ? <BsFillCaretDownFill style={{ transform: 'rotate(180deg)' }} /> : <BsFillCaretDownFill />}
                                            </label>
                                            {showDetails && (
                                                <div style={{ backgroundColor: '#f7f7f7', padding: '10px', borderRadius: '10px', marginBottom: '10px', marginLeft: '4%' }}>
                                                    <div className='row' style={{ marginLeft: '5%', }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Quantity:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Last PO Vendor:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Budget Price:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Last PO Price:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Plant:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Last PO Date:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Item Category:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Last PO Quantity:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Material Group:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Requisition ID:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Material Code:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Requisition Item No:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ marginLeft: '5%', marginTop: '1.5%' }}>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>Ship to:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#888', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-5' style={{ borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <p style={{ fontWeight: 'bold', textAlign: 'left', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px', marginRight: '10px', fontStyle: 'italic' }}>HSN Code:</p>
                                                            <p style={{ fontWeight: 'normal', display: 'inline-block', fontSize: '15px', color: '#333', marginBottom: '3px' }}>150mg/l</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            )}
                                        </>
                                    }</div>
                                <div className="col-md-3" >
                                    <div >
                                        <button
                                            type="button"
                                            className="btn btn-outline-success float-right"
                                            style={{ margin: 15 }}
                                            onClick={uploadPan}
                                        >
                                            {currentStep === 4 && 'Finish'}{' '}
                                            {/* {currentStep === 0 && ''} */}
                                            {currentStep < 4 && currentStep > 0 && 'Continue'}
                                            {currentStep < 4 && currentStep > 0 && <AiOutlineArrowRight />}
                                        </button>
                                        {currentStep > 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-default float-right"
                                                style={{ margin: 15 }}
                                                onClick={handlePreviousStep}
                                            >
                                                Previous
                                            </button>
                                        )}
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

export default PricePartApproval