import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../StyleSheets/TreeView.css'
    function Dropdown({ title, children }) {
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleDropdown = () => {
          setIsOpen(!isOpen);
        };
      
        return (
          <div className="dropdown">
            <div className="dropdown-btn"  onClick={toggleDropdown}>
              {title}
            </div>
            {isOpen && <div className="dropdown-content">{children}</div>}
          </div>
        );
      }
      
      function SectionList() {
        return (
          <div className="tree">
            <Dropdown title="Master" >
             
               
                <a className='btn_def' style={{color:'white'}}>Vendor</a>
                <a className='btn_def' style={{color:'white'}}>Material</a>
                <a className='btn_def' style={{color:'white'}}>Price Master</a>
                <a className='btn_def' style={{color:'white'}}>OA</a>

            </Dropdown>
            <Dropdown title="Transaction Data" >
             
               
                <a className='btn_def' style={{color:'white'}}>Vendor</a>
                <a className='btn_def' style={{color:'white'}}>Material</a>
                <a className='btn_def' style={{color:'white'}}>Price Master</a>
                <a className='btn_def' style={{color:'white'}}>OA</a>

            </Dropdown>
            {/* <Dropdown title="Parent 2">
              <Dropdown title="Child 3">
                <a href="#">Leaf 6</a>
              </Dropdown>
              <Dropdown title="Child 4">
                <a href="#">Leaf 7</a>
                <a href="#">Leaf 8</a>
              </Dropdown>
            </Dropdown> */}
          </div>
        );
      }
    
  export default SectionList;
  