// const [selectedRow, setSelectedRow] = useState(null);
import React, { useState } from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { BsCircle,BsFillCheckCircleFill,BsFillCircleFill, BsFillDashCircleFill } from 'react-icons/bs';
import { AiOutlineArrowRight, AiOutlineCheckCircle } from 'react-icons/ai';
import { Table } from 'reactstrap';

function PricePartApproval() {
    const [currentStep, setCurrentStep] = useState(0);
    const [search, setSearch] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const uploadPan = () => {
        // Handle uploading PAN here
        handleNextStep();
    };

    const data = [
        { id: 1, name: 'Dakota Rice', country: 'Niger', city: 'Oud-Turnhout', salary: '$36,738' },
        { id: 2, name: 'Minerva Hooper', country: 'Curaçao', city: 'Sinaai-Waas', salary: '$23,789' },
        { id: 3, name: 'Sage Rodriguez', country: 'Netherlands', city: 'Baileux', salary: '$56,142' },
        { id: 4, name: 'Philip Chaney', country: 'Korea, South', city: 'Overland Park', salary: '$38,735' },
        { id: 5, name: 'Doris Greene', country: 'Malawi', city: 'Feldkirchen in Kärnten', salary: '$63,542' },
        { id: 6, name: 'Mason Porter', country: 'Chile', city: 'Gloucester', salary: '$78,615' },
        { id: 7, name: 'Jon Porter', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 8, name: 'Jon Porter', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 9, name: 'Jon Porter', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 10, name: 'Jon Porter', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 11, name: 'Jon Porter', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
        { id: 12, name: 'Jon Porter', country: 'Portugal', city: 'Gloucester', salary: '$98,615' },
    ];


    const handleRowClick = (id) => {
        setSelectedRow(id);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="card" style={{ margin: "2%", borderRadius: 30 }}>
            <div style={{ marginLeft: 20, marginTop: 20 }}>
                <h3>Price Part Approval</h3>
            </div>

            <div className="card-body">
                <div style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <ProgressBar
                        percent={(currentStep) * 25}
                        filledBackground="linear-gradient(to right, #00C9FF, #92FE9D)"
                    >
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <>
                                    <div style={{ textAlign: 'center', marginTop: '30%' }}>
                                        {accomplished && currentStep >= 1 ? <BsFillCheckCircleFill  size={15} /> : <BsFillDashCircleFill size={15} />}
                                        <p style={{ marginTop: 10 }}>Select RFO</p>
                                    </div>
                                </>
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) =>
                                <>
                                    <div style={{ textAlign: 'center', marginTop: '25%' }}>
                                        {accomplished && currentStep >= 2 ? <BsFillCheckCircleFill  size={15} /> : <BsFillDashCircleFill size={15} />}
                                        <p style={{ marginTop: 10 }}>Create Project</p>
                                    </div>
                                </>}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) =>
                                <>
                                    <div style={{ textAlign: 'center', marginTop: '25%' }}>
                                        {accomplished && currentStep >= 3 ? <BsFillCheckCircleFill  size={15} /> : <BsFillDashCircleFill size={15} />}
                                        <p style={{ marginTop: 10 }}>Create Event</p>
                                    </div>
                                </>}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) =>
                                <>
                                    <div style={{ textAlign: 'center', marginTop: '25%' }}>
                                        {accomplished && currentStep >= 4 ? <BsFillCheckCircleFill  size={15} /> : <BsFillDashCircleFill size={15} />}
                                        <p style={{ marginTop: 10 }}>Invite Supplier</p>
                                    </div>
                                </>}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) =>
                                <>
                                    <div style={{ textAlign: 'center', marginTop: '60%', marginLeft: '-8px' }}>
                                        {accomplished && currentStep >= 5 ? <BsFillCheckCircleFill  size={15} /> : <BsFillDashCircleFill size={15} />}
                                        <p style={{ marginTop: 10 }}>Review</p>
                                    </div>
                                </>}
                        </Step>
                    </ProgressBar>
                </div>
            </div>
            <div className='card-body' style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5%' }}>
                <div className='card' style={{ width: '95%' }}>
                    <div className='card-body'>
                        {currentStep === 0 &&
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
                                <Table className="tablesorter" >
                                    <thead className="text-primary" style={{ position: 'sticky', top: 0, background: '#fff', marginTop: '-10' }}>
                                        <tr >
                                            <th>Name   </th>
                                            <th>Country</th>
                                            <th>City</th>
                                            <th className="text-center">Salary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item) => (
                                            <tr
                                                key={item.id}
                                                onClick={() => {
                                                    handleRowClick(item.id);
                                                    uploadPan();
                                                }}
                                                className={selectedRow === item.id ? 'selected' : ''}

                                            >
                                                <td >{item.name}</td>
                                                <td >{item.country}</td>
                                                <td >{item.city}</td>
                                                <td >{item.salary}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        }
                        {currentStep === 1 &&
                            <p>Herere</p>
                        }
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-md-7"></div>
                <div className="col-md-5" >
                    <div style={{ marginRight: '10%' }}>
                        <button
                            type="button"
                            className="btn btn-outline-success float-right"
                            style={{ margin: 15 }}
                            onClick={uploadPan}
                        >
                            {currentStep < 4 ? 'Continue' : 'Finish'}{' '}
                            {currentStep < 4 && <AiOutlineArrowRight />}
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
    )
}

export default PricePartApproval