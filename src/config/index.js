let env             =   process.env.REACT_APP_ENV || 'development';
//let ApiUrl          =   "http://13.251.60.31:8089/api/v1" //Live URL
let ApiUrl          =   "http://13.235.195.1:8089/api/v1" //Dev URL

let path            =   {};
/* if(env === 'production') {
} else {
    ApiUrl          =   '';
} */
const Config        =   {
    Title       :   'Dalyne',
    Pagination  : {
        itemsPerPage : 100
    },
    ApiUrl: ApiUrl,
    path: {...path}
}
export default Config;