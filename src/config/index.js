//let env             =   process.env.REACT_APP_ENV || 'development';
//let ApiUrl          =   "https://13.251.60.31:8089/api/v1" //Live URL
//let ApiUrl          =   "http://52.221.234.3:8089/api/v1" //Dev URL
let ApiUrl          =   "http://52.221.120.142:8089/api/v1" //Dev2 URL
//let ApiUrl          =   ":8089/api/v1" //Dev URL

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