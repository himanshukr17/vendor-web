import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

  function PurchaseOrderSupplier(){
    const companyName = 'Acme Corporation';
    const companyAddress = '123 Main Street, Anytown USA';
    const data = [
      ['ID', 'Name', 'Email'],
      ['1', 'John Doe', 'john.doe@example.com'],
      ['2', 'Jane Smith', 'jane.smith@example.com'],
      ['3', 'Bob Johnson', 'bob.johnson@example.com'],
    ];
  
    const csvContent = `data:text/csv;charset=utf-8,${encodeURI(
      `${companyName}\n${companyAddress}\n\n${data.map((row) => row.join(',')).join('\n')}`
    )}`;
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'company_data.csv');
    document.body.appendChild(link);
    link.click();
  
  
      <button onClick={PurchaseOrderSupplier}>Download CSV</button>

  
  };
  
export default PurchaseOrderSupplier