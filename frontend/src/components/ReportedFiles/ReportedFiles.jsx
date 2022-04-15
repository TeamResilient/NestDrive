import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './reportedfiles.css'
import {Link} from "react-router-dom";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utilities/constants";
import { ConnectContext } from "../../context/ConnectContext";
import SideBar from "../SideBar/SideBar"


function ReportedFiles() {
  const {fetchAll, reportedList, takeAction } = useContext(ConnectContext);
   const[Files, setFiles] =useState([])
    const[newFiles, setnewFiles] =useState([])
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

  const onmadePrivateMod = (id) => {
    console.log("madePrivateMod", id);
    alert("File has been made penalised")
  
  };
  

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    NestDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
    NestDriveContract.on("madePrivateMod", onmadePrivateMod);
  }

  return () => {
    if (NestDriveContract) {
      NestDriveContract.off("madePrivateMod", onmadePrivateMod);
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
                        <h3>Reported Files</h3>
                    </div>
                    <div className="row">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Hash</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {Files.map((file, key)=>{
                                return(
                                  <tr>
                                    <th scope="row">{key+1}</th>
                                    <td> {file.fileHash}</td>
                                    <td><Link className="btn btn-md btn-info" to="/file" state={Number(file.fileId)}> View Files</Link></td>
                                    <td><span className="btn btn-md btn-warning" onClick={()=>takeAction(Number(file.fileId))}>make private</span></td>
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

export default ReportedFiles;
