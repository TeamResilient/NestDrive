import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './reporteduser.css'
import {Link} from "react-router-dom";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utilities/constants";
import SideBar from "../SideBar/SideBar";

import { ConnectContext } from "../../context/ConnectContext";
function ReportedUsers() {
  const {fetchAll, reportedList, add2Blacklist } = useContext(ConnectContext);

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
    const nfl =[]
const fl= await reportedList()

//  nfl.push(fl)


console.log(nfl)
let test = []
for(let i=0; i< fl.length; i++){
  
  let tt = await fetchAll(Number(fl[i]))
  test.push(tt)
}

console.log(test)
setFiles(test)

  }

 useEffect(()=>{
  report()
console.log(Files)
 },[]
 
 )

 useEffect(() => {
  let NestDriveContract;

  const onaddInBlackList = (addr) => {
    console.log("addInBlackList", addr);
    alert( addr + " has been made blacklisted")
  
  };
  

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
    NestDriveContract.on("addInBlackList", onaddInBlackList);
  }

  return () => {
    if (NestDriveContract) {
      NestDriveContract.off("addInBlackList", onaddInBlackList);
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
                        <h3>Reported Users</h3>
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
                            {Files.map((file, key)=>{
                                return(
                                  <tr>
                                  <th scope="row">{key+1}</th>
                                  <td>{file.uploader}</td>
                                  <td><button className="btn btn-lg btn-warning" onClick={()=>add2Blacklist(file.uploader)}>Blacklist User</button></td>
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

export default ReportedUsers;
