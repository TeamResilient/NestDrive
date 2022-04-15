import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utilities/constants";
import Header from "../Header/Header";
import './blacklistedusers.css'
import {Link} from "react-router-dom";
import SideBar from "../SideBar/SideBar";

import { ConnectContext } from "../../context/ConnectContext";


function BlackListedUsers() {
  const {fetchAll, reportedList, remFrmBlacklist, blackList,ch } = useContext(ConnectContext);

  const[Files, setFiles] =useState([])

  let [darkThemeActive, setDarkThemeActive] = useState(false);

  function switchActiveTheme() {
    if (darkThemeActive) {
      setDarkThemeActive(false);
      document.querySelector("#root").style.backgroundColor = "white";
    } else {
      setDarkThemeActive(true);
      document.querySelector("#root").style.backgroundColor = "#1C2431";
    }
  }

  useEffect(() => {
    let headerFixedContainer = document.querySelector(".header-fixed");
    let headerHeight = headerFixedContainer.clientHeight;
    document.querySelector(".preview").style.paddingTop = `${
      headerHeight + 20
    }px`;

    let lastScrolled = 0;

    window.addEventListener("scroll", () => {
      let scrolled = document.documentElement.scrollTop;
      if (scrolled > lastScrolled) {
        headerFixedContainer.style.top = `-${headerHeight + 40}px`;
      } else {
        headerFixedContainer.style.top = "0";
      }
      lastScrolled = scrolled;
    });
  });
  const report=async()=>{
 
const fl= await blackList()







setFiles(fl)

  }

 useEffect(()=>{
  report()
console.log(Files)
 },[]
 
 )
 
 useEffect(() => {
  let NestDriveContract;

  const onremInBlackList = (addr) => {
    console.log("remInBlackList", addr);
    alert( addr + "has been removed from blacklist")
  
  };
  

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
    NestDriveContract.on("remInBlackList", onremInBlackList);
  }

  return () => {
    if (NestDriveContract) {
      NestDriveContract.off("remInBlackList", onremInBlackList);
    }
  };
}, []);

  return (
    <div>
      <Header
        isdarkThemeActive={darkThemeActive}
      />
        <div className="container preview mt-3">
            <div className="row">
                <div className="col-md-3">
                    <div className="sidebar p-3">

                        <SideBar/>
                         
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row mb-3">
                        <h3>BlackListed Users</h3>
                    </div>
                    <div className="row">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>

                            
                            <tbody>
                            {Files.map((address, key)=>{
                                return(
                                  <tr>
                                  <th scope="row">{key+1}</th>
                                  <td>{address}</td>
                                  <td><button className="btn btn-lg btn-success" onClick={()=>remFrmBlacklist((address.toString()))}>Revoke User</button></td>
                              </tr>
                                )
                                

                              })}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BlackListedUsers;
