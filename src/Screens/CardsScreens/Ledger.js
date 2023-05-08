import React, { useState } from 'react'
import { BsFillFileTextFill } from 'react-icons/bs'
import SidebarHeaderToggle from '../../Components/SidebarHeaderToggle';
import { AiFillFilePdf, AiOutlineHome } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IconContext } from "react-icons";
import { COLORS } from "../../Constants/theme";
import { AxioxExpPort } from "../AxioxExpPort"
import { AiFillAccountBook, AiFillReconciliation, AiOutlineWallet } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";
import axios from 'axios';
import { useEffect } from 'react';
function Ledger() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [tbody, setTBody] = useState([]);
    const vendorId = localStorage.getItem('userId');
    let num = Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" });
    const [pdfDownload,setPdfDownload]=useState('')
    
    const fetchData = async () => {
        setLoading(true)
        axios.get(AxioxExpPort + "ledger/all?id=" + vendorId)
          .then((response) => {
            setTBody( response.data[0].item);
            // setFilterData(response.data)
            setPdfDownload(response.data[1].FILE_NAME)
            setTimeout(() => {
              setLoading(false);
            });
            console.log("response.data", response.data[0].item);
          })
      }
      useEffect(() => {
        fetchData();
      }, []);
      function handlePdfDownload() {
        console.log(pdfDownload)
        axios({
          url: AxioxExpPort + 'ledger/' + pdfDownload,
          method: 'GET',
          responseType: 'blob'
        }).then(response => {
          const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.setAttribute('download', 'Ledger.pdf');
          document.body.appendChild(link);
          link.click();
        });
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
Ledger Details
</h4>
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

                {/* <a style={{marginTop:"30"}}>{"/Purchase Order"}</a> */}

                {" / "}
                  <a className="dropdown-toggle" style={{color:"maroon"}} type="button"  data-bs-toggle="dropdown" aria-expanded="false" >
          Transaction Data
        </a>
        <ul className="dropdown-menu" style={{width:"95%"}}>
    <li className="row" ><Link style={{ }}  to="/pos"><BsFillCartCheckFill  color={"#F07857"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Purchase Order   </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/res"><AiFillReconciliation color={"#43A5BE"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Goods Receipt    </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/ackn"><AiOutlineWallet     color={"#F5C26B"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Order to confirm </a></Link></li>
    {/* <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"#4FB06D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Invoice Booked   </a></Link></li>  */}
    <li className="row" ><Link style={{ }}  to="/inv"><FaFileInvoiceDollar  color={"pink"}    size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Invoice Pending  </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/grs"><BsFillCartXFill      color={"#53BDAS"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> Goods Return     </a></Link></li>
    <li className="row" ><Link style={{ }}  to="/mcs"><FaFileContract       color={"#BE398D"} size={15} />  <a style={{marginLeft:10, marginRight:7, color:"#02a5ab"}}> My Documents     </a></Link></li> </ul>  </div>


            </div>
          </div>
        
          <div >
          <div className="card" style={{marginTop:10,marginLeft:'2.2%', marginRight:'-1.4%'}}>
          <div className="card-body" >
          <div className='d-flex justify-content-end'>

  <button type="button" style={{ width: "4%", height: 33, backgroundColor: "#02a5ab", borderRadius: 5 }} onClick={handlePdfDownload}>
    <AiFillFilePdf style={{ color: "white" }} size={20} />
  </button>
          </div>
          




        <table className="table table-light table-bordered table-hover" responsive>
          <thead className="table-light" style={{ position: "sticky", top: 50, backgroundColor: "#fff", zIndex: 1 }}>
            <tr
              className="text-center"
              style={{
                backgroundColor: COLORS.gray20,
                borderColor: COLORS.gray10,
              }}
            >

              <th className="text-center" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Company Code</th>
              {/* <th className="text-center" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Vendor</th> */}
              <th className="text-center" style={{ width: "15%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Doc. Date</th>
              <th className="text-center" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Billing Doc No.</th>
              <th className="text-center noPrint" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Invoice  Number</th>
              <th className="text-center noPrint" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">TDS Amount</th>
              <th className="text-center noPrint" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Debit Amount</th>
              <th className="text-center noPrint" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Credit Amount</th>
              <th className="text-center noPrint" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Item Text</th>
              <th className="text-center noPrint" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Clearing Doc. No</th>
              <th className="text-center noPrint" style={{ width: "15%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Clearing Date</th>
              <th className="text-center noPrint" style={{ width: "5%",backgroundColor:"#02a5ab", color:"white", borderColor: COLORS.gray10 }} scope="col">Fy. Year</th>
            </tr>
          </thead>

          <tbody>
             {/* {isLedgerEmpty ? ( */}
              {tbody? tbody.map((val, index) => {
                {/* let total = 0;
                val.return_order.map((itemsPrice) =>
                  total = total + itemsPrice.PER_UNIT_PRICE * itemsPrice.RETURN_QTY
                )
                let totalQtuy = 0;
                val.return_order.map((itemsPrices) =>
                totalQtuy = totalQtuy + itemsPrices.RETURN_QTY
                ) */}
                return (
                  <tr
                    key={`row` + index}
                    style={{
                      backgroundColor: "white",
                      borderColor: "#000",
                    }}
                    className="table-light"
                  >
                    {/* <td
                      key={`col-1` + index}
                      className="text-center"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      <a
                      style={{
                          textDecoration: 'none',
                         
                        }}
                        type="button"
                        
                      >
                        {Number(val.COMPANY_CODE)}
                      </a>
                      <br />
                    </td> */}
                    <td
                      key={`col-1` + index}
                      className="text-center"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      {val.COMPANY_CODE}
                    </td>
                    <td
                      key={`col-2` + index}
                      className="text-center"
                      style={{ width: "15%", borderColor: COLORS.gray10 }}
                    >
                      {val.DOCUMENT_DATE}
                    </td>
                    <td
                      key={`col-3` + index}
                      className="text-center"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      {val.REF_DOC_NO}
                    </td>
                    <td
                      key={`col-4` + index}
                      className="text-center"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      {val.INVOICE_NO}
                    </td>
                    <td
                      key={`col-5` + index}
                      className="text-center"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      {val.TAX_AMOUNT}
                    </td>
                    <td
                      key={`col-6` + index}
                      className="text-center"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                                           {num.format(Number(val.DEBIT_AMOUNT))}

                    </td>
                    <td
                      key={`col-7` + index}
                      className="text-center"
                      style={{ width: "5%", borderColor: COLORS.gray10 }}
                    >
                      {num.format(Number(val.CREDIT_AMOUNT))}
                      </td>

                    <td
                      key={`col-8` + index}
                      className="text-center noPrint"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      {val.ITEM_NAME}
                    </td>
                    <td
                      key={`col-9` + index}
                      className="text-center noPrint"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      {val.CLEARING_DOC}
                    </td>
                    <td
                      key={`col-10` + index}
                      className="text-center noPrint"
                      style={{ width: "15%", borderColor: COLORS.gray10 }}
                    >
                      {val.CLEARING_DATE}
                    </td>
                    <td
                      key={`col-11` + index}
                      className="text-center noPrint"
                      style={{ width: "10%", borderColor: COLORS.gray10 }}
                    >
                      {val.FINANCIAL_YEAR}
                    </td>

                   
                    {/* <td
                      key={`col-6` + index}
                      className="text-center"
                      style={{ width: "5%", color:"white", borderColor: COLORS.gray10 }}
                    >
                      <CSVLink filename={"GR_No:"+val.GRN_NO+".csv"} className="btn" data={val.return_order} headers={headers}>
                        <IconContext.Provider
                          value={{ color: "#FF7B25", size: "22px" }}
                        >
                          <AiOutlineDownload />
                        </IconContext.Provider>
                      </CSVLink>
                    </td> */}
                  </tr>
                );
              }) : 
              <tr>
                <td colSpan={15} className="text-center">
                  No Data Found
                </td>
              </tr>}
            {/* ) : (
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
    </div>
    </div>
    </div>
    </div>
  </>
  )
}

export default Ledger