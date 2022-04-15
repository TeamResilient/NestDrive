import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import moment from 'moment';


import { contractABI, contractAddress } from "../utilities/constants";
import './UserFiles.css'
import {Link} from 'react-router-dom';

import { ConnectContext } from "../../context/ConnectContext";

function UserFiles(props) {
  const {makePrivate, makePublic } = useContext(ConnectContext);
  let card;
  if (props.isdarkThemeActive) {

    card = "card mb-3 card-dark";
    } else {
   card = "card mb-3 ";
    }

    let myArray = ["folders/first1.jpeg", "folders/first2.jpeg", "folders/first3.jpeg"];

    let imageSrc = myArray[Math.floor(Math.random()*myArray.length)];

 
    useEffect(() => {
      let NestDriveContract;
    
      const onmadePublic = (id) => {
        console.log("newReport", id);
        alert("File has been made public")
      
      };
      
    
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
        NestDriveContract.on("madePublic", onmadePublic);
      }
    
      return () => {
        if (NestDriveContract) {
          NestDriveContract.off("madePublic", onmadePublic);
        }
      };
    }, []);


    useEffect(() => {
      let NestDriveContract;
    
      const onmadePrivate = (id) => {
        console.log("newReport", id);
        alert("File has been made private")
      
      };
      
    
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
        NestDriveContract.on("madePrivate", onmadePrivate);
      }
    
      return () => {
        if (NestDriveContract) {
          NestDriveContract.off("madePrivate", onmadePrivate);
        }
      };
    }, []);
  return (
  
    <div className="col-12 col-md-6">
      <div className={card}>
            <div className="row g-0">
                <img src={imageSrc} className="img-fluid rounded-start" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{props.public.fileName}</h5>
                  <p className="card-text">{props.public.fileDescription}</p>
                  <p className="card-text"><small className="text-muted">Uploaded on  {moment.unix(props.public.uploadTime).format("Do MM YYYY")}</small></p>
                  <Link className="btn btn-small btn-primary" to="/file" state={Number(props.public.fileId)}>View File</Link> 
                 
<br /><br />
                  {props.public.isPublic
              ? 
              <span className="btn btn-small btn-info text-white" onClick={()=>makePrivate(Number(props.public.fileId))}>make private</span>
              
              : (
                
                <span className="btn btn-small btn-info text-white" onClick={()=>makePublic(Number(props.public.fileId))}>make public</span>
              )}
              </div>
            </div>
        </div>
    </div>
    
      
    
  );
}

export default UserFiles;
