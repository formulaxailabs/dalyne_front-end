import {error as notifyError, success as notifySuccess} from './notify';

export const isValidEmail =(email) =>{
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email));
}

export const isValidMobile =(mobile) =>{
    let pattern = /^[1-9]{1}[0-9]{9}$/;
    return pattern.test(mobile);
}

export const isValidNumber =(num) =>{
    //console.log(Number(mobile), !isNaN(mobile) && Number.isInteger(Number(mobile)));
    //return !isNaN(mobile) && Number.isInteger(Number(mobile));
    let reg = /^\d{0,4}(\.\d{0,2})?$/;
    //console.log(num, num===0)
    if(num === 0)
        return true;
    else
        return reg.test(num);
}

export const catchErrorHandler =(err) =>{
    console.log(err.response);
    if(err.response) {
        let response    =   err.response || {};
        if(response.statusText === 'Unauthorized') {
            window.location.href    =   '/';
        } else {
            let data    =  response.data || {};
            let message =   data.msg || 'Something went wrong';
            notifyError({message: message});
        }
    }
}
