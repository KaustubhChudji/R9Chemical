import { List } from '@material-ui/core';
import Dashboard from '../Pages/Dashboard';
import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
// let UploadFile = {height:"5em",marginLeft:"39%",width:"2em"}
const UploadStyle = {marginTop:'2em',marginLeft:'2em',marginRight:'2em',backgroundColor:"#f2f0f0",borderRadius:"1em"}

export default class CSVReader2 extends Component {
  handleOnDrop = async (data) => {
    debugger;
    let jsonbody=[];
    for(var i=1;i<data.length;i++){
      jsonbody.push(data[i].data);
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonbody)
    };
    await fetch('/productInfo/saveProductInfo', requestOptions)
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      
    })
    .catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
    });
    window.location.reload();
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  render() {
    return (
      <div style={UploadStyle}>
        <CSVReader onDrop={this.handleOnDrop}    onError={this.handleOnError} addRemoveButton onRemoveFile={this.handleOnRemoveFile}>
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
       
      </div>
    );
  }
}