import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import './userprivatefiles.css'
import {Link} from "react-router-dom";
import UserFiles from '../UserFiles/UserFiles'
import SideBar from "../SideBar/SideBar";


import { ConnectContext } from "../../context/ConnectContext";

function UserPrivateFiles() {
  const {fetchPrivate } = useContext(ConnectContext);
  let [darkThemeActive, setDarkThemeActive] = useState(false);
  const[Files, setFiles] =useState([])

  function switchActiveTheme() {
    if (darkThemeActive) {
      setDarkThemeActive(false);
      document.querySelector("#root").style.backgroundColor = "white";
    } else {
      setDarkThemeActive(true);
      document.querySelector("#root").style.backgroundColor = "#1C2431";
    }
  }

  const fetch = async()=>{
   

    const pubFiles = await fetchPrivate()
    setFiles(pubFiles)
   // console.log(pubFiles)
  //   console.log(typeof(pubFiles.slice()
  //   .sort(function(a, b){return b.uploadTime - a.uploadTime})[1]))
  // console.log(newFiles)
     } 
  
     useEffect(()=>{
      fetch()
     },[])

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

  // const children = [];  
  // for(let i = 0;i < Files.length;i++) {
  //   children.push(<File public={Files
  //     .filter(function(el){return el.isPublic===false}).slice().sort(function(a, b){return b.uploadTime - a.uploadTime})[i]} isdarkThemeActive={darkThemeActive}/>)
  // }
  const children = [];  
 const newFile= Files.slice().sort(function(a, b){return b.uploadTime - a.uploadTime})
 const newer= newFile.filter(function(el){return el.isPublic===false})
//setnewFiles(newFile)
//console.log(newer)
  for(let i = 0;i < newer.length;i++) {
    children.push(<UserFiles public={newer[i]} isdarkThemeActive={darkThemeActive}/>);
  }
 

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
                        <h3>Your Private Files</h3>
                    </div>
                    <div className="row">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UserPrivateFiles;
