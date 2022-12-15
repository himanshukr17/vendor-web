import React, { useState } from 'react'
// import "../StyleSheets/CheckStatusStyle.css"
 import { Chrono } from "react-chrono";

function CheckStatus() {

    const [MobileNumber,setMobileNumber]=useState(0);
    const [showApplicationStatus, setShowApplicationStatus] = useState(false);

    const CheckApplicationStatus=(e)=>{
    e.preventDefault();

    if(MobileNumber.toString().length==10){
        setShowApplicationStatus(true)
        
    }
    else{
        setShowApplicationStatus(false)
    }

    }

    const items = [
      {
        title: "Wed Oct 26 2022",
        cardTitle: "Application Submiited",
        cardSubtitle:
          "Your application is submitted successfully.",
        media: {
          type: "IMAGE",
          source: {
            url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
          },
        },
      },
      {
        title: "May 1940",
        cardTitle: "Application Review",
      
        cardSubtitle:
          "Your application review is completed",
      
        media: {
          type: "IMAGE",
          source: {
            url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
          },
        },
      },
      {
        title: "May 1940",
        cardTitle: "Document Verification",
      
        cardSubtitle:
          "Document verification is in process, Take 3-5 Working Days",
   
        media: {
          type: "IMAGE",
          source: {
            url: "https://th.bing.com/th/id/R.893e41a5fab83225981e70381a1d3ac8?rik=kOZ2ncRWJwXSrg&riu=http%3a%2f%2fsamishti.com%2fimg%2flogo-dark.png&ehk=7CrQa9rEl3drPuJTbHpHvBv75MRkuz57by3xrUnBkCw%3d&risl=&pid=ImgRaw&r=0",
          },
        },
      },
    ];
  return (
    <>
      <div
        className="form-floating mb-3"
        style={{
          marginLeft: "2%",
          marginRight: "2%",
          margin: "2%",
          display: "flex",
        }}
      >
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="address"
          style={{
            width: "30%",
            height: 50,
          }}
          onChange={(e) => {
            setMobileNumber(e.target.value);
          }}
        />
        <label
          htmlFor="floatingInput"
          style={{
            fontWeight: 500,
          }}
        >
          Mobile Number{" "}
        </label>

        <button
          style={{
            width: "15%",
            justifyContent: "center",
            alignSelf: "center",
            color: "#fff",
            marginLeft: "1%",
            backgroundColor: "#ffdf00",
          }}
          className="btn"
          onClick={(e)=>{CheckApplicationStatus(e)}}

        >
          Check Status
        </button>
      </div>
      {showApplicationStatus && (
        <div style={{ width: "100%" }}>
          <Chrono
            items={items}
            slideShow
            mode="VERTICAL_ALTERNATING"
            allowDynamicUpdate={true}
            // cardWidth="300"
            disableClickOnCircle={true}
            activeItemIndex={0}
            focusActiveItemOnLoad={true}
            hideControls={true}
          />
        </div>
      )}
    </>
  );
}

export default CheckStatus