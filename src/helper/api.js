import Config from '../config';
import axios from "axios";

let baseAPIUrl          =   Config.ApiUrl;

export function callApi(...params) {
    let method          =   params[0];
    let url             =   params[1] || '';
    let postData        =   params[2] || {};
    let header          =   params[3] || '';
    let userData        =   JSON.parse(localStorage.getItem('user') || '{}');
    let reqHeaders      =   {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            
                                //'Access-Control-Allow-Origin': '*'
                            };
    
    //console.log('headers : ', reqHeaders)
    let noTokenUrls     =   ['/login/', '/plans/list/', '/signup/', '/create/order/', '/capture/payment/'];
    if(!noTokenUrls.includes(url)) {
        if(!!userData.token) {
            reqHeaders.Authorization    =   "Token " + userData.token;
        }
    }
    
    let obj     =   {
        headers: reqHeaders
    }
    if(!!header) {
        obj      =   {...obj, ...header};
    }
    let instance = axios.create({...obj});

    let result          =   '';
    let bodydata        =   {};
    switch(method) {
        case'POST': 
            bodydata = JSON.stringify(
                {...postData});
            result      =   instance.post(baseAPIUrl+url, bodydata);
        break;

        case'PUT': 
            bodydata = JSON.stringify(
                {...postData});
                console.log(baseAPIUrl+url, bodydata)
            result      =   instance.put(baseAPIUrl+url, bodydata);
        break;

        case'DELETE': 
            bodydata = JSON.stringify(
                {...postData});
            result      =   instance.delete(baseAPIUrl+url, bodydata);
        break;
        
        case'GET':
            let data        =   getParams(postData);
            if(!!data)
                result      =   instance.get(`${baseAPIUrl}${url}?${data}`);
            else
                result      =   instance.get(baseAPIUrl+url);
        break;

        default:
            result      =   instance.get(baseAPIUrl+url);
        break;
    }
    return result;
}

export function callApiFileUpload(...params) {
    let method          =   params[0];
    let url             =   params[1] || '';
    let postData        =   params[2] || {};
    let userData        =   JSON.parse(localStorage.getItem('user') || '{}');
    let reqHeaders      =   {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                'Access-Control-Allow-Origin': '*',
                                'content-type': 'multipart/form-data'
                            };
    if(!!userData.token) {
        reqHeaders.Authorization    =   "Token " + userData.token;
    }
    
    let instance = axios.create({
        headers: reqHeaders
    });

    let result          =   '';
    let bodydata        =   {};
    bodydata            =   postData
    result      =   instance.post(baseAPIUrl+url, bodydata);
    return result;
}
function getParams(data) {
    return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
}