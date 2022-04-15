import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import moment from 'moment';

import { shortenAddress } from "../utilities/shortenAddress";
import './file.css'
import {Link} from 'react-router-dom';

function File(props) {
  let card;
  if (props.isdarkThemeActive) {

    card = "card mb-3 card-dark";
    } else {
   card = "card mb-3 ";
    }

    let myArray = ["folders/first1.jpeg", "folders/first2.jpeg", "folders/first3.jpeg"];

    let imageSrc = myArray[Math.floor(Math.random()*myArray.length)];

  useEffect(()=>{
    console.log(props.public)
 // alert(props.public.fileName)
  })
 

  return (
    <div className="col-12 col-md-4">
      <div className={card}>
            <div className="row g-0">
                <img src={imageSrc} className="img-fluid rounded-start" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{props.public.fileName}</h5>
                  <p className="card-text">{props.public.fileDescription}</p>
                  <p className="card-text"><small className="text-muted">Uploaded on  {moment.unix(props.public.uploadTime).format("Do MM YYYY")}</small></p>
                  <Link className="btn btn-small btn-primary" to="/file" state={Number(props.public.fileId)}>View File</Link>
                </div>
            </div>
        </div>
    </div>
    
      
    
  );
}

export default File;
