import React, { useEffect, useState } from 'react'
import '../StyleSheets/NewLogin.css'
import { Link, redirect, useNavigate } from "react-router-dom";
import { AxioxExpPort } from "./AxioxExpPort"

function NewLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongDetail, setWrongDetail] = useState("")
  const axios = require('axios')
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType === 'supplier') {
      window.location.href = '/dashboard'
        } else if (userType === 'buyer') {
          window.location.href = '/home'
        }
  }, []);
const stylesWelcome = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
    heading: {
      fontFamily: 'Arial',
      fontSize: '2rem',
      color: '#1F87D0',
      textShadow: '1px 1px 1px #000',
      marginBottom: '0.8rem',
      textAlign: 'left',
      marginLeft:'1%',
      marginTop:'10px',
      animation: 'colorchanges 5s ease-in-out infinite'
    },
    headingg: {
      fontFamily: 'Arial',
      fontSize: '1.5rem',
      color: '#14CA96',
      textShadow: '0.5px 0.5px 0px #000',
      marginBottom: '1rem',
      textAlign: 'center',
    }
  };
  //localStorage.clear() 
  const [isActive, setIsActive] = useState(true);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const loginHandle = async(e) => {
    e.preventDefault();
    if (isActive) {
      axios.post(AxioxExpPort + 'createcompany/login_mob', {
        user: username,
        pass: password
      })
        .then((response) => {
         
           localStorage.setItem('userType', ('supplier'));
           localStorage.setItem('token', (response.data[0]._id));
           localStorage.setItem('userId', (response.data[0].VENDOR_ID));
           localStorage.setItem('userCompany', (response.data[0].COMPANY_NAME));
           window.location.href = "/dashboard"
           console.log("ress", response)

        }).catch((err) => {
          console.log(err);
          localStorage.clear() ;
          if (err.response.status == 400) {
            setWrongDetail("You are able to login after approve your application")
          } else { setWrongDetail("Please check Username or Password") }
        })
    } else {
      var bUser = (username).toString()
      axios.get(AxioxExpPort + 'buyer/buyer_login?buyer=' + username + '&&password=' + password)
        .then((res) => {
          console.log('resresres',('buyer'))
           localStorage.setItem('userType', ('buyer'));
           localStorage.setItem('token', (res.data[0]._id));
           localStorage.setItem('userId', (res.data[0].BUYER_ID));
           localStorage.setItem('userCompany', (res.data[0].COMPANY_NAME));
           if (res.data[0].BUYER_ID == 1) {
             window.location.href = "/adminManageVendor"
           } else {
             window.location.href = "/home"
           }
        }).catch((err) => { localStorage.clear(); setWrongDetail("Please check Username or Password") })
    }
  }

  return (
    <>
    <div className='login-bg' >
    <div >
    <div style={stylesWelcome.container}>
    <span style={stylesWelcome.heading}>Vendor Connect</span>
  </div>
    <div className="box-container ">
  <div className="login-box login">

  {isActive &&
  <>
  <span style={{
  display: 'block',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  textAlign: 'center',
  margin: '0 auto',
  marginBottom: '1%',
}}>
    <h2 style={stylesWelcome.headingg}>Login as Supplier </h2>
</span>
    <form onSubmit={loginHandle}>
    
      <div className="user-box">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label>Username</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label>Password</label>
      <p className="text-left" style={{ color: "red" }}>{wrongDetail}</p>
      </div>
      <button type="submit">Login</button>
      <div style={{ flexDirection:'row'}}>
      <br/>
        <Link to="/forgot_password" className="no-underline">
          <p style={{ color: '#0f1c2e' }}>Forget password?</p>
        </Link>
        <div className="toggle-container" onClick={handleToggle}>
        <button
          className={`toggle-button  ${isActive ? "active" : ""}`}
          style={{ width: isActive ? "100px" : "0" }}
        >
         Go to Buyer
        </button>
        <button
          className={`toggle-button ${!isActive ? "active" : ""}`}
          style={{ width: !isActive ? "100px" : "0" }}
        >
         Go to Supplier
        </button>
      </div>
        <p
                    style={{
                      // marginTop: "20%",
                      marginRight: "40%",
                      color: "#0f1c2e"
                    }}
                  >
                    Already Applied? Check Status of application{" "}
                    <Link to="/checkStatus" className="no-underline"> Here </Link>
                  </p>
      <div style={{ textAlign: 'right' }}>
      <span style={{ color: 'black' }}>
      <Link to="/signup" className="no-underline">Create Your Account</Link>
    </span>
    </div>
    </div>
    </form>
    </>
  }
  {!isActive &&
  <>
  <span style={{
  display: 'block',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  textAlign: 'center',
  margin: '0 auto',
  marginBottom: '1%',
}}>
    <h2 style={stylesWelcome.headingg}>Login as Buyer</h2>
</span>
    <form onSubmit={loginHandle}>
    
      <div className="user-box">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label>Username</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label>Password</label>

      <p className="text-left" style={{ color: "red" }}>{wrongDetail}</p>
      </div>
      <button type="submit">Login</button>
      <div style={{ flexDirection:'row'}}>
      <br/>
        <Link to="/forgot_password">
          <p style={{ color: '#0f1c2e' }}>Forget password?</p>
        </Link>
    
        <div className="toggle-container" onClick={handleToggle}>
        <button
          className={`toggle-button  ${isActive ? "active" : ""}`}
          style={{ width: isActive ? "100px" : "0" }}
        >
          Go to Buyer
        </button>
        <button
          className={`toggle-button ${!isActive ? "active" : ""}`}
          style={{ width: !isActive ? "100px" : "0" }}
        >
          Go to Supplier
        </button>
      </div>        
     
    </div>
    </form>
    </>
  }
  </div>
</div>

    <div style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
  <p style={{ fontSize: "15px",marginTop:'5%', fontWeight: "bold",  color: "#fff" }}>Powered by</p>
    <img src="../Images/Picture1.png" alt="Logo" style={{ width: "40%", height: "70%", marginLeft: "5px" }} />
  
</div>
   <div style={{ position: "absolute", bottom: "10px", right: "unset", left: "10px", display: "flex", alignItems: "center", justifyContent: "flex-start", width:'50%' }}>
   <p style={{ 
  fontSize: "14px", 
  marginTop: '5%', 
  color: "#00C2A5", 
  textShadow: "0.5px 0px 0px #999999",
  fontFamily: "Helvetica, Arial, sans-serif",
  lineHeight: "1.5",
}}>
  Experience the ease and efficiency of <span style={{color: "#0066CC"}}>vendor management</span> like never before. With our <span style={{color: "#0066CC"}}>vendor portal</span>, you'll have everything at your fingertips, from <span style={{color: "#0066CC"}}>procurement</span> to <span style={{color: "#0066CC"}}>collaboration</span>, all in one user-friendly platform.
</p>
</div>
</div>
    </div>
    </>
  )

} 

export default NewLogin