import React, { useState,  useEffect  } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import { AiFillAccountBook, AiOutlineArrowRight } from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaMegaport, FaFileContract,FaUsers } from "react-icons/fa";
import { BsFillCartCheckFill, BsFillBagXFill } from "react-icons/bs";
import { AiFillReconciliation } from "react-icons/ai";

function Error() {



  return (
    <div>
    	<div className="container">
  <div className="row">	
    <div className="col-sm-12 ">
      <div className="col-sm-12 col-sm-offset-1  text-center">
        <div className="four_zero_four_bg">
          <h1 className="text-center ">Oops! High Voltage!</h1>
        </div>
        <div className="contant_box_404">
          <h3 className="h2">
            Look like you're lost
          </h3>
          <p>the page you are looking for not avaible!</p>
          <Link to="/">

          <a href className="link_404">Go to Login</a>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default Error;
