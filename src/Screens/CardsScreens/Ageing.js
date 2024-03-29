import React, { useState } from 'react'
import { AiOutlineHome, AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import "rsuite/dist/rsuite.css";
import { Provider, useDispatch, useSelector } from 'react-redux';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Link, useNavigate } from 'react-router-dom';
import SidebarHeaderToggle from "../../Components/SidebarHeaderToggle";
import { COLORS } from '../../Constants/theme';
import { Pie } from 'react-chartjs-2';

import {addItem} from '../../Reducer/bucketSlice'
import axios from 'axios';
import { AxioxExpPort } from '../AxioxExpPort';
import { useEffect } from 'react';

function Ageing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateData=useSelector(state=>state)
  const [loading, setLoading] = useState(false);
  var rightNow = new Date();
  var currentDate = rightNow.toISOString().slice(0,10).replace(/-/g,"");
  const vendorId = localStorage.getItem('userId');
 const [apiData,setApiData]=useState([]);
 const [vendorDtl,setVendorDtl]=useState('');
 const [vendorDtlName,setVendorDtlName]=useState('');
 const [outstanding,setOutstanding]=useState('');
 const [totalOverDue,settotalOverDue]=useState('');
 const [totalNotDue,settotalNotDue]=useState('');
 const [paiLabel,setPaiLabel]=useState([]);
 const [pieData,setPaiData]=useState([]);
 const [cartPieData,setCartPieData]=useState([])

 let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });
 const data = {
  labels: paiLabel,
  datasets: [
    {
      data: pieData,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#37A82C', '#D424A5'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#37A82C', '#D424A5'],
    },
  ],
};
 const datass = {
  labels: paiLabel,
  datasets: [
    {
      data: cartPieData,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#37A82C', '#D424A5'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#37A82C', '#D424A5'],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    position: 'bottom',
    labels: {
      fontColor: '#333',
      fontSize: 8,
    },
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data) => {
          sum += data;
        });
        let percentage = ((value * 100) / sum).toFixed(2) + '%';
        return percentage;
      },
    },
  },
};

 const fetchPosts = async () => {
   setLoading(true)
  axios.post(AxioxExpPort + "aging/get",
    {"DATE":currentDate,"VENDORCODE":vendorId}
  )
    .then((response) => {
     // console.log("response.data",response.data);
     setLoading(false);
       setApiData(response.data)
       setVendorDtl(response.data[0].VENDOR_CODE)
       setVendorDtlName(response.data[0].VENDOR_NAME)

       // Calculate outstanding here
       var outstand=0;
       var overDue=0;
       var notDue=0;
       response.data.forEach(item => {
         //console.log('outstand',item)
         outstand = outstand + Number(item.TOTAL_OUTSTANDING)
         overDue = overDue + Number(item.TOTAL_OVERDUE)
         notDue = notDue + Number(item.NOT_DUE)
       })
       setOutstanding(outstand);
       settotalOverDue(overDue);
       settotalNotDue(notDue)
    });
}


  
  const [inputFields, setInputFields] = useState([
    { id: 1, value:0, disabled: true },
    { id: 2, value: "", disabled: false }
  ]);
  const [inputFieldsTo, setInputFieldsTo] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" }
  ]);
  const [ageingThead, setAgeingThead] = useState(stateData.cart)
  //console.log('stateData',stateData.cart)
  const handleAddFields = () => {
    if (inputFields.length < 5) {
      const values = [...inputFields];
      //console.log(values, values)
      values.push({ id: inputFields.length + 1, value: Number(inputFields[inputFields.length-1].toValue)+1,disabled: true });
      setInputFields(values);
      console.log('inputFieldsinputFields',inputFields[inputFields.length-1].toValue)
    }
  };
  const handleInputChangeFrom = (id, event) => {
    const newValues = [...inputFields];
    const index = newValues.findIndex((value) => value.id === id);
    newValues[index].value = event.target.value;
    setInputFields(newValues);
  };
  let Arrr=[];
  const handleInputChangeTo = (id, event) => {
    const newValuess = [...inputFields];
    const newValues = [...inputFields];
    const index = newValuess.findIndex((value) => value.id === id);
    newValuess[index].toValue = event.target.value;
    newValuess[index + 1].value = Number(event.target.value) + 1;
    if (index < newValues.length - 1) {
      const nextInputField = newValues[index + 1];
      //console.log('nextInputField', nextInputField)
      nextInputField.value = Number(event.target.value) + 1;
      nextInputField.disabled = true; // Add the disabled attribute
    }
    setInputFields(newValuess);
    //console.log(Number(event.target.value) + 1)
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    const valuesTo = [...inputFieldsTo];
    if (values.length === 2) {
      return;
    }
    const index = values.findIndex((value) => value.id === id);
    const index2 = valuesTo.findIndex((value) => value.id === id);
    values.splice(index, 1);
    valuesTo.splice(index2, 1);
    setInputFields(values);
    setInputFieldsTo(valuesTo);
  };

  
  const getAllTheInput = () => {
    let validInput = true;
    inputFields.forEach(item => {
      //console.log(item)
      if (Number(item.toValue) <= Number(item.value) || item.value==='') {
        validInput = false;
      }
    });
    if (validInput) {
      //setAgeingThead(inputFields);
      // //console.log(apiData)
      
dispatch(addItem(inputFields))
var amt=0;
// getTheTableData();
inputFields.map(items=>{
    apiData.map(item=>{
  console.log('inputFields',item.DAYS)
//     if (item.DAYS >= Number(items.value) && item.DAYS <= Number(items.toValue)) {
//       amt = + Number(item.TOTAL_OVERDUE)
//     }
   })
//  // console.log('amt',amt)
 })
    }else{
      alert("Please check the Bucket input");
    }
  };

  const buildLabels = () => {
    const tempArr = [];
    stateData.cart.forEach((val, index) => {
      tempArr.push(val.toValue ? val.value + '-' + val.toValue + ' Days' : '> ' + val.value + ' Days');
    });
    setPaiLabel(tempArr);
  }

  
  const getTheTableData = () => {
  const tempArry = [];
  inputFields.forEach((items, index) => {
    var amt = 0;
    apiData.forEach(item => {
      if (item.DAYS >= Number(items.value) && item.DAYS <= (items.toValue ? Number(items.toValue) : 365)) {
        amt = amt + Number(item.TOTAL_OVERDUE);
      }
    });
    tempArry.push(amt)
  });
  //console.log('setPaiData', tempArry)
  setPaiData(tempArry)
}
  const getTheTableDataPie = () => {
  const tempArry = [];
  stateData.cart.forEach((items, index) => {
    var amt = 0;
    apiData.forEach(item => {
      if (item.DAYS >= Number(items.value) && item.DAYS <= (items.toValue ? Number(items.toValue) : 365)) {
        amt = amt + Number(item.TOTAL_OVERDUE);
      }
    });
    tempArry.push(amt)
  });
  //console.log('setPaiData', tempArry)
  setCartPieData(tempArry)
}

useEffect(() => {
  fetchPosts();
  buildLabels();
}, []);

useEffect(() => {
  getTheTableData();
}, [inputFields, apiData]);

useEffect(() => {
  getTheTableDataPie();
}, [stateData.cart, apiData]);

  return (
    <div>  {
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
        <SidebarHeaderToggle />
        <div

        >
          <div className="row">
            <div className="col-md-12">
              <div className="row" >


                <div className="col-lg-10">
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                    <h4 className="form-check-label">
                      Ageing data
                    </h4>
                    {/* <button style={{
                      marginLeft: '10px',
                      padding: '7px 14px',
                      backgroundColor: "#02a5ab",
                      color: '#fff',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer'
                    }} onClick={() => { window.history.go(-1) }}>Go Back</button> */}
                  </div>

                </div>
                <div className="col-md-2 text-end noPrint" style={{ marginTop: 10 }}>

                  <IconContext.Provider value={{ color: "#3a91e8", marginTop: -210, size: "20px" }}>
                    <AiOutlineHome type="button" onClick={() => {
                      navigate("/dashboard");
                    }} />
                  </IconContext.Provider>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '4.5%', marginRight: '1%' }}>

        <div className='row'>
          <div className='col-md-7'>
            <div className='card' style={{ boxShadow: '5px 10px 10px rgba(2, 104, 144, 8)' }}>

              <p style={{ fontSize: "15px", marginTop: "2%", paddingBottom: "5px", borderBottom: "1px solid #000" }}><p style={{ marginLeft: '20px',color:'#000' }}>Supplier Details</p></p>

              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-6'>
                    <p className="text-sm-left" style={{ color: "#151B54", fontSize: 16 }}>
                      Supplier Code: <span style={{ color: "#033E3E", fontSize: 19,fontFamily:'bold' }}>{Number(vendorDtl)}</span>
                    </p>

                    <p className="text-sm-left" style={{ color: "#151B54", fontSize: 16 }}>
                      Supplier Name: <span style={{ color: "#033E3E", fontSize: 19,fontFamily:'bold' }}>{vendorDtlName}</span>
                    </p>

                    <p className="text-sm-left" style={{ color: "#151B54", fontSize: 16 }}>
                      Total Overdues: <span style={{ color: "#033E3E", fontSize: 19,fontFamily:'bold' }}>{ num.format(Math.abs(Number(totalOverDue))) }</span> {Number(totalOverDue)<0  && <span className="badge badge-success"   >{'credit'}</span>}
                    </p>
                    <p className="text-sm-left" style={{ color: "#151B54", fontSize: 16 }}>
                     Total Not Dues: <span style={{ color: "#033E3E", fontSize: 19, fontFamily:'bold'}}>{num.format(Math.abs(Number(totalNotDue)))}</span>
                    </p>
                    <p className="text-sm-left" style={{ color: "#151B54", fontSize: 16 }}>
                      Total Outstanding: <span style={{ color: "#033E3E", fontSize: 19,fontFamily:'bold' }}>{num.format(Math.abs(Number(outstanding)))}</span>
                    </p>
                  </div>

                  <div className='col-md-6'>
                    <p style={{ fontSize: "10px", marginTop: "-4%", paddingBottom: "5px", marginBottom: 2, borderBottom: "1px solid maroon" }}><p style={{ marginLeft: '0px', color: '#027332' }}>Create Your Bucket</p></p>

                    <div className='row' style={{ marginTop: 5 }}>
                      <div className='col-md-10'>
                        <div className='scrollable-ageing'>
                          {inputFields.map((inputField, index) => (
                            <div className='row' key={inputField.id}>
                              <div className='col-md-4' style={{ marginBottom: 2 }}>
                                <input type="number" className="form-control" value={inputField.value} disabled={inputField.disabled} onChange={(event) => handleInputChangeFrom(inputField.id, event)} />
                              </div>
                              <div className='col-md-2 d-flex justify-content-center' style={{ marginTop: '3%' }}>
                                to
                              </div>
                              <div className='col-md-4' style={{ marginBottom: 2 }}>
                                <input type="number" className="form-control" min={Number(inputField.value) + 1} value={inputField.toValue} onChange={(event) => handleInputChangeTo(inputField.id, event)} />
                              </div>
                              {index >= 2 && (
                                <div className='col-md-2'>
                                  <button type="button" className='btn' onClick={() => handleRemoveFields(inputField.id)}><AiOutlineMinusCircle size={20} color='red' /></button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='col-md-2' style={{ marginBottom: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <button type="button" onClick={handleAddFields} style={{
                            background: 'linear-gradient(90deg, #00c2ff, #008148)',
                            border: 'none',
                            borderRadius: '50%',
                            padding: 5,
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                          }}>
                            <AiOutlinePlusCircle size={25} color={'white'} />
                          </button>
                        </div>  </div>
                      <div  onClick={() => { getAllTheInput() }} type='button' style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '5%',
                        width: '60%',
                        marginLeft: '5%',
                        background: 'linear-gradient(to right, #1abc9c, #2ecc71)',
                        padding: '6px 12px',
                        borderRadius: '50px'
                      }}>
                        <button type="button"  style={{
                          color: '#fff',
                          fontSize: '12px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer'
                        }}>Create Your Bucket</button>
                      </div>
                    </div>
                  </div>
                  {/* <p style={{ fontSize: "10px", marginTop: "2%", paddingBottom: "5px", borderBottom: "1px solid black",marginTop:'30px'}}><p style={{ marginLeft: '0px', }}>Bucket Details</p></p>

                                    <div className='col-md-4'>
                                        <table style={{ width: '90%',  }}>
                                            <thead className="table-light " style={{ borderBottom: "0.1px solid green", height: '40px', textAlign: 'center' }} >
                                                <tr>
                                                    <th>0 - 30 Days </th>
                                                </tr>
                                            </thead>
                                            <tr className='row text-center' style={{ borderBottom: "0.1px solid green", marginTop: 10 }}>
                                                <td className='col-md-6' style={{ color: '#1F87D0', fontSize: 17 }}>{"30%"}</td>
                                                <td className='col-md-6' style={{ color: '#14CA96', fontSize: 17 }}>{"6,73,573"}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className='col-md-4'>
                                        <table style={{ width: '90%' }}>
                                            <thead className="table-light " style={{ borderBottom: "0.1px solid green", height: '40px', textAlign: 'center' }} >
                                                <tr>
                                                    <th>31 - 60 Days </th>
                                                </tr>
                                            </thead>
                                            <tr className='row text-center' style={{ borderBottom: "0.1px solid green", marginTop: 10 }}>
                                                <td className='col-md-6' style={{ color: '#1F87D0', fontSize: 17 }}>{"30%"}</td>
                                                <td className='col-md-6' style={{ color: '#14CA96', fontSize: 17 }}>{"6,73,573"}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className='col-md-4'>
                                        <table style={{ width: '90%' }}>
                                            <thead className="table-light " style={{ borderBottom: "0.1px solid green", height: '40px', textAlign: 'center' }} >
                                                <tr>
                                                    <th>61 -90 Days </th>
                                                </tr>
                                            </thead>
                                            <tr className='row text-center' style={{ borderBottom: "0.1px solid green", marginTop: 10 }}>
                                                <td className='col-md-6' style={{ color: '#1F87D0', fontSize: 17 }}>{"30%"}</td>
                                                <td className='col-md-6' style={{ color: '#14CA96', fontSize: 17 }}>{"6,73,573"}</td>
                                            </tr>
                                        </table>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='card' style={{ boxShadow: '5px 10px 10px rgba(2, 104, 144, 8)', textAlign: 'center' }}>
              <div className='card-body'>
              {stateData.cart.length > 0 ?
                <Pie
                  data={datass}
                  options={options}
                  width={'200%'}
                  height={'200%'}
                  plugins={[ChartDataLabels]}

                />  
                :
                <Pie
                  data={data}
                  options={options}
                  width={'200%'}
                  height={'200%'}
                  plugins={[ChartDataLabels]}

                />              }
              </div>
              <p style={{ fontSize: '13px', fontWeight: 'bold' }}>Ageing Data</p>
            </div>
          </div>
          {stateData.cart.length > 0 &&
            <div className='col-md-12'>
              <div className='card' >
                <p style={{ fontSize: "15px", color: 'black', paddingBottom: "5px", borderBottom: "1px solid black", marginTop: '20px' }}><p style={{ marginLeft: '10px', }}>Ageing Data table</p></p>
                <div className='card-body'>
                  <table style={{ width: '100%' }}>
                    <thead className="table-light" style={{ borderBottom: "0.1px solid green", height: '40px', textAlign: 'center' }}>
                      <tr
                        className="text-center"
                        style={{
                          backgroundColor: "#1F87D1",
                          color: "white",
                          borderColor: "#000",
                        }}
                      >
                        {/* <th
                          className="text-center"
                          style={{
                            backgroundColor: "#1F87D1",
                            color: "white",
                            width: '15%',
                            borderColor: COLORS.white,
                          }}
                          scope="col"
                        >
                          Vendor Code
                        </th>
                        <th

                          className="text-center"
                          style={{
                            backgroundColor: "#1F87D1",
                            color: "white",
                            width: '15%',
                            borderColor: COLORS.white,
                          }}
                          scope="col"
                        >
                          Total Due
                        </th> */}
                        {
  stateData.cart.map((val, index) => {
    var tempAr = [];
    tempAr.push(val.toValue ? val.value + '-' + val.toValue + ' Days' : '> ' + val.value + ' Days');
   
    return (
      <>
        <th
          className="text-center"
          style={{
            backgroundColor: "#1F87D1",
            color: "white",
            width: '10%',
            
          }}
          scope="col"
        >
          {tempAr[0]}
        </th>
      </>
    );
  })
}

                      </tr>
                    </thead>
                    <tbody>
      <tr
        style={{
          backgroundColor: "white",
          borderColor: "#000",
       
        }}
        className="table-light"
      >
 {stateData.cart.map((items,index )=> {
  var amt = 0;
  apiData.map(item => {
   
    if (item.DAYS >= Number(items.value) && item.DAYS <= (items.toValue ? Number(items.toValue) : 365)) {
      amt = amt + Number(item.TOTAL_OVERDUE)
    }

  });
    
    return (
        <>
        <td
          key={`col-2-${index}`} // Add a unique key for each table cell
          className="text-center"
          style={{
              borderColor: "black",
              borderRight: "1px solid #000",
              borderLeft: "1px solid #000",
              borderBottom: "1px solid #000",
               // Add a vertical line after every column
            }}        >
            
        <div className='row' style={{  borderBottom: "1px solid #000", marginLeft:'0.2%',marginRight:'0.2%',padding:10  }}>
        
          <div className='col-md-6' style={{color:'#000'}}>
          <p style={{fontSize:'16px', fontFamily:'bold'}}>  {"Percentage"}</p>
            
          </div>
          <div className='col-md-6'  style={{color:'#000 '}}>

       <p style={{fontSize:'16px', fontFamily:'bold'}}>{"Amonunt (₹)"}</p>
          </div>
        </div>
        <div className='row'style={{padding:8}} >
          <div className='col-md-6' style={{color:'#922B21'}}>
       <p style={{fontSize:'15px',fontFamily:'bold'}}>{((Math.abs(Number(amt))/Math.abs(Number(outstanding)))*100).toFixed(2) +'%'}</p>
            
          </div>
          <div className='col-md-6'  style={{color:'#4A235A '}}>

          <p style={{fontSize:'15px', fontFamily:'bold'}}>  {num.format(Math.abs(Number((amt))).toFixed(2))}</p>
          </div>
        </div>
        </td>
        </>
    )
  })}
      </tr>
</tbody>

                  </table>

                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Ageing