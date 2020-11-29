import React, { useState ,useEffect} from 'react';


function Alert({type,msg,removeAlert,list}){
    useEffect(()=>{
       const timeout= setTimeout(()=>{
            removeAlert()
        },1000)
        return()=>clearTimeout(timeout)
    },[list])
    return(<p className={`alert alert-${type}`}>{msg}</p>)
}


export default Alert