import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import SearchFiles from "../SearchFiles/SearchFiles";
import File from "../File/File";
import { ConnectContext } from "../../context/ConnectContext";

function PublicFiles() {
  const {fetchPublic } = useContext(ConnectContext);
  const [query, setQuery] = useState("")
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

  const fetch =async()=>{
   

  const pubFiles = await fetchPublic()
  setFiles(pubFiles)

   } 

   useEffect(()=>{
    fetch()
   },[])

  useEffect(() => {
    let headerFixedContainer = document.querySelector(".header-fixed");
    let headerHeight = headerFixedContainer.clientHeight;
    document.querySelector(".form").style.paddingTop = `${
      headerHeight + 40
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
  const filteredData = Files.filter((el) => {
    //if no input the return the original
    if (query === '') {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.fileName.toLowerCase().includes(query.toLowerCase())
    }
})

  const children = [];  
  // const newer= Files.filter(file => {
  //   if (file.fileName.toLowerCase().includes(query.toLowerCase())) {
  //     return file;
  //   } 
  //   return file
  // })
  for(let i = 0;i < filteredData.length;i++) {
    children.push(<File public={filteredData
      .slice()
      .sort(function(a, b){return b.uploadTime - a.uploadTime})[i]} isdarkThemeActive={darkThemeActive}/>);
  }

  return (
    <div>
      <Header
        isdarkThemeActive={darkThemeActive}
        switchActiveTheme={switchActiveTheme}
      />

      <SearchFiles setQuery={setQuery}  isdarkThemeActive={darkThemeActive}/>
      
      <div className="container mt-5">
      <div className="row">
      
      {children}
        
          

      </div>
    </div>
    </div>
  );
}

export default PublicFiles;
