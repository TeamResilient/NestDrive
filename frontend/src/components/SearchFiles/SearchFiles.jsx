import React from "react";
import "./searchfiles.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'


function SearchFiles(props) {
let searchBg;
let inputstuff;
if (props.isdarkThemeActive) {
searchBg = "search-wrapper search-wrapper-active mt-3";
inputstuff = "form-control form-control-lg email email-dark";
} else {
searchBg = "search-wrapper mt-3";
inputstuff = "form-control form-control-lg email";
}

return (
            <div className={searchBg}>
                <div className="container">
                <div className="row form">
                    <label className="col-sm-2 col-form-label col-form-label-lg">Search Here?</label>
                    <div className="col-sm-10">
                        <input type="text" className={inputstuff} id="colFormLabelLg" placeholder="Enter your Search" onChange={(e)=>props.setQuery(e.target.value)}/>
                    </div>
                </div>
                </div>
                
            
            </div>

);
}

export default SearchFiles;
    