import Config from '../config';
import axios from "axios";

let baseAPIUrl          =   Config.ApiUrl;
export function callApi(...params) {
    let method          =   params[0];
    let url             =   params[1] || '';
    let postData        =   params[2] || {};
    let userData        =   JSON.parse(localStorage.getItem('user') || '{}');
    let reqHeaders      =   {
                                // Accept: "application/json",
                                "Content-Type": "application/json",
                                // 'Access-Control-Allow-Origin': '*',
                                //'Allow' : 'POST, OPTIONS',
                                //"Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT",
                                //"Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
                            };
    if(!!userData.token) {
        reqHeaders.Authorization    =   "Token " + userData.token;
    }
    
    let instance = axios.create({
        headers: reqHeaders
    });

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
            result      =   instance.get(baseAPIUrl+url);
        break;

        default:
            result      =   instance.get(baseAPIUrl+url);
        break;
    }
    return result;
}