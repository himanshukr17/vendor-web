import React from 'react'
import Footer from '../../Components/Footer'
import NavHeader from '../../Components/NavHeader'
import NavTab from '../../Components/NavTab'

function AdminScreen() {
  return (
    <div>  
    <NavHeader/>
    <NavHeader />
      {/* <Navbar/> */}
      <div 
        style={{
          marginTop: 64,
          marginBottom:15
        }}
      >
      <NavTab />
      <Footer/>
      </div>
    </div>
  )
}

export default AdminScreen