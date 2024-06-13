import React from 'react';
import './App.css';
import { useState } from 'react';
import * as XLSX from 'xlsx';

function App ()  {

  const[excelFile, setExcelfile]= useState(null);
  const[typeError, setTypeError]= useState(null);


  const[excelData, setExcelData]= useState(null);

  const handleFile =(e) =>{
    let fileType = ['.csv'];
    let selectFile = e.target.files[0];
    if(selectFile){
       if(selectFile&&fileType.includes(selectFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectFile);
        reader.Onload=(e)=>{
          setExcelfile(e.target.result);
        }
      }
        else{
          setTypeError('');
          setExcelfile(null);
        }
       }
    else{
       console.log('Please Select your File');
    }
  }


  const handleFileSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0,5));
    }
  }

  return (
    <div className="App">

      <h1 className='app-head'>Kaiser Foundation Hospitals</h1>

      
      <form className='form-content' onSubmit={handleFileSubmit}>
        <input type='file' className='Excel' placeholder='Import' onChange={handleFile}/>
        <button type='submit' className='button'>UPLOAD</button>
        {typeError&&(
          <div className='alert' role='alert'>{typeError}</div>
        )}
      </form>
      
     
     <div className='view'>
      {excelData?(
        <div className='table-response'>
          <table className='table'>

            <thead>
              <tr>
                {Object.keys(excelData[0]).map((key)=>(
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {excelData.map((individualExcelData, index)=>(
               <tr key={index}>
                {Object.keys(individualExcelData).map((key)=>(
                  <td key={key}>{individualExcelData[key]}</td>
                ))}
               </tr> 
              ))}
            </tbody>
          </table>
     </div>
   
  ):(
    <div>NO File Is Uploaded yet!</div>
  )}

</div>
</div>
  )}
export default App;
