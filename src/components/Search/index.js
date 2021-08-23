import React, {useState, useEffect} from 'react';
//import moment from 'moment-timezone';
/* import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css"; */
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import AdvancedSearch from './search';
import './search.css';
import Pagination from '../../utils/pagination';
import Data from './data';
import {isEqual} from 'lodash';
import Download from './download-popup';

export default function Search() {
	const [countries, setCountries]	=	useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isProcessing, setProcessing] = useState(false);
    const [searched, setSearched] = useState(false);
    const [list, setList]   =   useState([]);
    const [data, setData]   =   useState({});
	const itemsPerPage	=	25;
	const [totalRecords, setTotalRecords]	=	useState(0);
    const [pageno, setPageNo]	=	useState(1);
    const [select_all, setSelectAll]	=	useState(false);
    const [showDownload, setShowDownload]	=	useState(false);
    const [selIds, setSelIds]	=	useState([]);
	const [searchData, setSearchData]	=	useState({});
    
    
    //Column Search
    const [description, setProduct]    =   useState('');
    const [hs_code, setHSCode]    =   useState('');
    const [exporter, setExporter]    =   useState('');
    const [importer, setImporter]    =   useState('');
    const [country, setCountryOfOrigin]    =   useState('');
    const [port_of_loading, setPortOfLoading]    =   useState('');
    const [port_of_discharge, setPortOfDischage]    =   useState('');
    const [mode, setMode]    =   useState('');
    const [port_code, setPort]    =   useState('');
    const [uqc, setUQC]    =   useState('');
    const [min_qty, setMinQty]    =   useState('');
    const [max_qty, setMaxQty]    =   useState('');
    const [search_params, setSearchParams]    =   useState({});

	useEffect(() => {
		getCountries();
    }, [])

    useEffect(() => {
        if(!!select_all) {
            let ids =   list.map(item => item.id);
            setSelIds(ids);
        } else {
            setSelIds([]);
        }
    }, [select_all])

    const handleSelect  =   (id)  =>  {
        let ids =   [...selIds];
        ids.push(id);
        setSelIds(ids)
    }

    const getCountries = async (e) => {
        try{
            const payload = await callApi('GET', `/countries/list/?limit=100`);
            if(payload.data) {
				let result          =   payload.data.results || [];
				setCountries(result);
            }
        } catch(err) {
            catchErrorHandler(err);
        }
    }
    
    const handleSearch  =   async (data) => {
        try{
            setLoading(true);
            setProcessing(true);
            setSearchData(data);
            const payload = await callApi('POST', `/advanced/search/data/`, data);
            if(payload.data) {
                let result   =   payload.data || {};
                let search_id   =   result.search_id;
                setData(result);
                getSearchResult({
                    search_id: search_id,
                    pageno: pageno
                })
            } else {
                setLoading(false);
                setProcessing(false);
            }
        } catch(err) {
            setLoading(false);
            setProcessing(false);
            catchErrorHandler(err);
        }
    }

    const getSearchResult = async (reqData) => {
        try{
            let offset  =   ((reqData.pageno - 1) * itemsPerPage);
            let data    =   {...reqData, offset: offset, limit: itemsPerPage};
            if(!isEqual(search_params, data)) {
                setSearchParams(data);
                const payload = await callApi('GET', `/filtered/data/`, data);
                if(payload.data) {
                    let result          =   payload.data.results || [];
                    setList(result.data);
                    setTotalRecords(payload.data.count || 0);
                    setData({
                        ...data,
                        country_origin: result.country_origin,
                        exporter_count:result.exporter_count,
                        hs_code_count: result.hs_code_count,
                        importer_count: result.importer_count,
                        port_of_destination: result.port_of_destination,
                        shipment_count: result.shipment_count
                    });
                    setLoading(false);
                    setProcessing(false);
                    setSearched(true);
                } else {
                    setList([]);
                    setLoading(false);
                    setProcessing(false);
                    setSearched(true);
                }
            }
        } catch(err) {
            setList([]);
            setLoading(false);
            setProcessing(false);
            setSearched(true);
            catchErrorHandler(err);
        }
    }

    const getSortedResult = async (reqData) => {
        try{
            let offset  =   ((reqData.pageno - 1) * itemsPerPage);
            let data    =   {...reqData, offset: offset, limit: itemsPerPage};
            if(!isEqual(search_params, data)) {
                setSearchParams(data);
                const payload = await callApi('GET', '/ordered/data/', data);
                if(payload.data) {
                    let result          =   payload.data.results || [];
                    setList(result);
                    setLoading(false);
                    setProcessing(false);
                } else {
                    setList([]);
                    setLoading(false);
                    setProcessing(false);
                }
            }
        } catch(err) {
            setList([]);
            setLoading(false);
            setProcessing(false);
            catchErrorHandler(err);
        }
    }

	const changePage = (page) => {
		const { currentPage }	=	page;
		if(currentPage !== pageno) {
            let params = search_params || {};
            setPageNo(currentPage);
			getSearchResult({
                //search_id: data.search_id,
                ...params,
                pageno: currentPage
            });
		}
    }

    const reset = () => {        
        //setCountries([]);
        setLoading(false);
        setProcessing(false);
        setSearched(false);
        setList([]);
        setData({});
        setTotalRecords(0);
        setPageNo(1);
        setProduct('');
        setHSCode('');
        setExporter('');
        setImporter('');
        setCountryOfOrigin('');
        setPortOfLoading('');
        setPortOfDischage('');
        setMode('');
        setPort('');
        setUQC('');
        setMinQty('');
        setMaxQty('');
        setSearchParams({});
        setSearchData({});
    }
    
    const filter = (e) => {
        if (e.key === 'Enter') {
            _filter();
        }
    }

    const _filter   =   (type = '')  =>  {        
        let reqParams       =   {
            search_id: data.search_id,
            pageno: 1
        };
        if(!!description)
            reqParams.description   =   description;
        if(!!hs_code)
            reqParams.hs_code   =   hs_code;
        if(!!exporter)
            reqParams.exporter   =   exporter;
        if(!!importer)
            reqParams.importer   =   importer;
        if(!!country)
            reqParams.country   =   country;
        if(!!port_of_loading)
            reqParams.port_of_loading   =   port_of_loading;
        if(!!port_of_discharge)
            reqParams.port_of_discharge   =   port_of_discharge;
        if(!!mode)
            reqParams.mode   =   mode;
        if(!!port_code)
            reqParams.port_code   =   port_code;
        if(!!uqc)
            reqParams.uqc   =   uqc;
        if(!!min_qty && !!max_qty) {
            reqParams.min_qty   =   min_qty;
            reqParams.max_qty   =   max_qty;
        }
        if(!!type) {
            if(type === 'qty') {
                reqParams.min_qty =   '';
                reqParams.max_qty =   '';
            } else {
                reqParams[type] =   '';
            }
        }
        getSearchResult(reqParams);
    }

    const sortBy = (field) => {
        let params  =   {...search_params};
        if(search_params.ordering === field || search_params.ordering === '-'+field) {
            let orderFld    =   '';
            if(search_params.ordering === field) {
                orderFld    =   '-'+field;
            } else if(search_params.ordering === '-'+field) {
                orderFld    =   '';
            } else {
                orderFld    =   field;
            }
            if(!!orderFld) {
                params.ordering =   orderFld;
            } else {
                delete params.ordering;
            }
            getSortedResult(params);
        } else {
            params.ordering =   field;
            getSortedResult(params);
        }
    }

    return (
        <main className="main-container">
            {/* <div className="brd_cumb">
                <ul>
                    <li>
                        <i className="fas fa-home" aria-hidden="true"></i>
                        <a href="/"> Home</a>&nbsp;/&nbsp;
                    </li>
                    <li>Search</li>
                    <div className="clear"></div>
                </ul>
            </div> */}

            <div className="heading-bar">
                <div className="row">
                    <div className="col-12">
                        <h2>Search</h2>
                    </div>
                </div>
            </div>
            <div className="main-body">
                <div className="row">
                    <div className="col-12">
                        <AdvancedSearch
                            countries={countries}
                            isProcessing={isProcessing}
                            handleSearch={handleSearch}
                            reset={reset}
                        />
                        {
                            (!!searched) ?
                            <>
                                <div className="box filter-bar mt-2 p-2">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="box-list">
                                                <ul>
                                                    <li>
                                                        <h4>{data.shipment_count}</h4>
                                                        <p>Shipments</p>
                                                    </li>
                                                    <li>
                                                        <h4>{data.importer_count}</h4>
                                                        <p>Importers</p>
                                                    </li>
                                                    <li>
                                                        <h4>{data.exporter_count}</h4>
                                                        <p>Exporters</p>
                                                    </li>
                                                    <li>
                                                        <h4>{data.country_origin}</h4>
                                                        <p>Country of Origin</p>
                                                    </li>
                                                    <li>
                                                        <h4>{data.port_of_destination}</h4>
                                                        <p>Port of Destination</p>
                                                    </li>
                                                    <li>
                                                        <h4>{data.hs_code_count}</h4>
                                                        <p>HS Code</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-2 pl-0">
                                            <div className="fld-group">
                                                <label>Date Range</label>
                                                <input name="" value="" type="date" className="fld" />
                                            </div>
                                        </div>
                                        <div className="col-md-1 pl-0">
                                            <div className="fld-group">
                                                <label>Period</label>
                                                <select className="fld">
                                                    <option>Last 7 Days</option>
                                                    <option>Last 30 Days</option>
                                                    <option>Last 3 Months</option>
                                                    <option>Last 6 Months</option>
                                                </select>
                                            </div>
                                        </div> */}
                                        <div className="col-md-2 download-icons">
                                            <div className="btn-group">
                                                <button className="icon-btn save-btn" type="button">
                                                    <i className="fas fa-save"></i>
                                                    Save
                                                </button>
                                                {/* <button onClick={downloadExcel} disabled={!!isDownloading} className="icon-btn download-btn" type="button">
                                                    <i className="far fa-file-excel"></i>
                                                    {(!!isDownloading) ? 'Downloading' : 'Download'}
                                                </button> */}
                                                <button onClick={() => setShowDownload(true)} className="icon-btn download-btn" type="button">
                                                    <i className="far fa-file-excel"></i>
                                                    Download
                                                </button>
                                                {
                                                    (!!showDownload) ?
                                                    <Download 
                                                        setShowDownload={setShowDownload}
                                                        setSelIds={setSelIds}
                                                        setSelectAll={setSelectAll}
                                                        search_params={search_params}
                                                        selIds={selIds}
                                                        totalRecords={totalRecords}
                                                    />
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box p-0 mt-3">
                                    <h4 className="pt-3 pl-3 mb-1">Shipments</h4>
                                    <div className="tab-details p-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="search-result">
                                                    <div className="listing-box">
                                                        <div className="res-box mt-1">
                                                            <div className="table-hd-sticky1">
                                                                <table border="0">
                                                                    <thead>
                                                                        <tr className="header-row">
                                                                            <th><input type="checkbox" checked={select_all} onChange={() => setSelectAll(!select_all)} className="ml-2" /></th>
                                                                            <th className="c-pointer" onClick={() => sortBy(search_params.data_type === 'import' ? 'BE_DATE' : 'SB_DATE')}>Date 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'BE_DATE' || search_params.ordering === 'SB_DATE'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-BE_DATE' || search_params.ordering === '-SB_DATE' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th className="c-pointer" onClick={() => sortBy('RITC')}>HS Code 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'RITC'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-RITC' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th>HS Code Description</th>
                                                                            <th className="c-pointer" onClick={() => sortBy('UQC')}>UQC 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'UQC'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-UQC' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th className="c-pointer" onClick={() => sortBy('QUANTITY')}>Quantity                                                                                 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'QUANTITY'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-QUANTITY' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th className="c-pointer" onClick={() => sortBy('EXPORTER_NAME')}>Exporter Name 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'EXPORTER_NAME'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-EXPORTER_NAME' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th className="c-pointer" onClick={() => sortBy('COUNTRY_OF_ORIGIN')}>Country Of Origin 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'COUNTRY_OF_ORIGIN'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-COUNTRY_OF_ORIGIN' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th className="c-pointer" onClick={() => sortBy('PORT_OF_LOADING')}>Port Of Loading 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'PORT_OF_LOADING'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-PORT_OF_LOADING' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            {   
                                                                                (!!searchData.data_type && searchData.data_type === "export") ?
                                                                                <th>Port Code</th>
                                                                                : null
                                                                            }
                                                                            <th className="c-pointer" onClick={() => sortBy('PORT_OF_DISCHARGE')}>Port Of Discharge 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'PORT_OF_DISCHARGE'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-PORT_OF_DISCHARGE' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th className="c-pointer" onClick={() => sortBy('MODE_OF_PORT')}>Mode Of Port 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'MODE_OF_PORT'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-MODE_OF_PORT' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            <th className="c-pointer" onClick={() => sortBy('IMPORTER_NAME')}>Importer Name 
                                                                                <span className="sorting">
                                                                                    <i className={`fas fa-sort-up${search_params.ordering === 'IMPORTER_NAME'? ' active' : ''}`}></i>
                                                                                    <i className={`fas fa-sort-down${search_params.ordering === '-IMPORTER_NAME' ? ' active' : ''}`}></i>
                                                                                </span>
                                                                            </th>
                                                                            {/* <th>2 Digit</th> */}
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type === "import") ?
                                                                                    <th>4 Digit</th>
                                                                                : null
                                                                            }
                                                                            <th>Currency</th>
                                                                            <th>UNT Price FC</th>
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type === "import") ?
                                                                                    <th>INV Value FC</th>
                                                                                : null
                                                                            }
                                                                            <th>UNT Price INR</th>


                                                                            {/* <th>Invoice No</th> */}
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type === "import") ?
                                                                                    <>
                                                                                        <th>UNT Rate With Duty INR</th>
                                                                                        <th>Duty INR</th>                                                                                        
                                                                                        {/* <th>Duty USD</th> */}
                                                                                        {/* <th>Duty FC</th> */}
                                                                                        {/* <th>Duty %</th> */}
                                                                                        {/* <th>EX Total Value INR</th> */}
                                                                                        <th>ASS Value INR</th>
                                                                                        {/* <th>ASS Value USD</th> */}
                                                                                        {/* <th>ASS Value FC</th> */}                                                                            
                                                                                        {/* <th>Importer Value INR</th> */}
                                                                                        {/* <th>Importer Value USD</th> */}
                                                                                        {/* <th>Importer Value FC</th> */}
                                                                                    </>
                                                                                :null
                                                                            }
                                                                            {/* <th>Exchange Rate</th> */}
                                                                            <th>IEC</th>
                                                                            {/* <th>Importer Address</th>
                                                                            <th>Exporter Address</th>  */}                                                                       
                                                                            {   
                                                                                (!!searchData.data_type && searchData.data_type === "export") ? 
                                                                                    <>
                                                                                        {/* <th>SB No</th> */}
                                                                                        <th>Exporter City</th>
                                                                                        {/* <th>Exporter Pin</th> */}
                                                                                        {/* <th>FOB FC</th> */}
                                                                                        <th>FOB INR</th>
                                                                                        <th>FOB USD</th>
                                                                                       {/*  <th>PER UNT FOB</th> */}
                                                                                        {/* <th>UNIT RATE WITH FOB INR</th> */}
                                                                                    </>
                                                                                : null
                                                                            }
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type === "import") ?
                                                                                    <>
                                                                                        {/* <th>BE No</th>
                                                                                        <th>Importer City/State</th>
                                                                                        <th>Importer Pin</th>
                                                                                        <th>Importer Phone</th>
                                                                                        <th>Importer Email</th>
                                                                                        <th>IMPORTER Contact Person</th>
                                                                                        <th>BE Type</th>
                                                                                        <th>CHA Name</th> */}
                                                                                        <th>Duty Perct</th>
                                                                                        {/* <th>Per Unit Duty INR</th>
                                                                                        <th>Unit Rate with Duty INR</th> */}
                                                                                    </>
                                                                                :null
                                                                            }
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>&nbsp;</td>
                                                                            <td>&nbsp;</td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setHSCode(e.target.value)} value={hs_code} placeholder="HS Code" type="text" className="fld slow" />
                                                                                {!!hs_code ? <span className="fldClear" onClick={() => {setHSCode(''); _filter('hs_code');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setProduct(e.target.value)} value={description} placeholder="Product" type="text" className="fld slow" />
                                                                                {!!description ? <span className="fldClear" onClick={() => {setProduct(''); _filter('description');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setUQC(e.target.value)} value={uqc} placeholder="Unit" type="text" className="fld slow" />
                                                                                {!!uqc ? <span className="fldClear" onClick={() => {setUQC(''); _filter('uqc');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setMinQty(e.target.value)} value={min_qty} placeholder="Min Qty." type="text" className="fld slow" style={{width:'45%'}}/>
                                                                                <input onKeyPress={filter} onChange={(e) => setMaxQty(e.target.value)} value={max_qty} placeholder="Max Qty." type="text" className="fld slow" style={{width:'45%', marginLeft:'10px'}} />
                                                                                {!!min_qty || !!max_qty ? <span className="fldClear" onClick={() => {setMinQty(''); setMaxQty(''); _filter('qty');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setExporter(e.target.value)} value={exporter} placeholder="Exporter Name" type="text" className="fld slow" />
                                                                                {!!exporter ? <span className="fldClear" onClick={() => {setExporter(''); _filter('exporter');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setCountryOfOrigin(e.target.value)} value={country} placeholder="Country of Origin" type="text" className="fld slow" />
                                                                                {!!country ? <span className="fldClear" onClick={() => {setCountryOfOrigin(''); _filter('country');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setPortOfLoading(e.target.value)} value={port_of_loading} placeholder="Port Of Loading" type="text" className="fld slow" />
                                                                                {!!port_of_loading ? <span className="fldClear" onClick={() => {setPortOfLoading(''); _filter('port_of_loading');}}>x</span> : null}
                                                                            </td>
                                                                            {   
                                                                                (!!searchData.data_type && searchData.data_type == "export") ?
                                                                                <td>
                                                                                    <input onKeyPress={filter} onChange={(e) => setPort(e.target.value)} value={port_code} placeholder="Port" type="text" className="fld slow" />
                                                                                    {!!port_code ? <span className="fldClear" onClick={() => {setPort(''); _filter('port_code');}}>x</span> : null}
                                                                                </td>
                                                                                : null
                                                                            }
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setPortOfDischage(e.target.value)} value={port_of_discharge} placeholder="Port of Discharge" type="text" className="fld slow" />
                                                                                {!!port_of_discharge ? <span className="fldClear" onClick={() => {setPortOfDischage(''); _filter('port_of_discharge');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setMode(e.target.value)} value={mode} placeholder="Mode Of Port" type="text" className="fld slow" />
                                                                                {!!mode ? <span className="fldClear" onClick={() => {setMode(''); _filter('mode');}}>x</span> : null}
                                                                            </td>
                                                                            <td>
                                                                                <input onKeyPress={filter} onChange={(e) => setImporter(e.target.value)} value={importer} placeholder="Imported Name" type="text" className="fld slow" />
                                                                                {!!importer ? <span className="fldClear" onClick={() => {setImporter(''); _filter('importer');}}>x</span> : null}
                                                                            </td>
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type == "import") ?
                                                                                    <td>&nbsp;</td>
                                                                                : null
                                                                            }
                                                                            <td>&nbsp;</td>
                                                                            <td>&nbsp;</td>
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type === "import") ?
                                                                                    <td>&nbsp;</td>
                                                                                : null
                                                                            }
                                                                            <td>&nbsp;</td>

                                                                            {/* <td>&nbsp;</td> */}
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type === "import") ?
                                                                                    <>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        {/* <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td> */}
                                                                                    </>
                                                                                : null
                                                                            }
                                                                            <td>&nbsp;</td>
                                                                            {/* <td>&nbsp;</td>
                                                                            <td>&nbsp;</td>                                                                      
                                                                            <td>&nbsp;</td> */}
                                                                            {   
                                                                                (!!searchData.data_type && searchData.data_type === "export") ? 
                                                                                    <>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        {/* <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td> */}
                                                                                    </>
                                                                                : null
                                                                            }
                                                                            {
                                                                                (!!searchData.data_type && searchData.data_type === "import") ?
                                                                                    <>
                                                                                        {/* <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td>
                                                                                        <td>&nbsp;</td> */}
                                                                                        <td>&nbsp;</td>
                                                                                    </>
                                                                                :null
                                                                            }
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <table border="0">
                                                                <tbody>
                                                                    {
                                                                        (!isLoading) ?
                                                                        (list.length > 0) ?
                                                                            (list || []).map((item, k) => {
                                                                                return <Data key={k} selIds={selIds} handleSelect={handleSelect} type={searchData.data_type} item={item}/>
                                                                            })
                                                                        :
                                                                        <tr>
                                                                            <td colSpan="24">No Record(s)</td>
                                                                        </tr>
                                                                        : 
                                                                        <tr>
                                                                            <td colSpan="24">Loading ..</td>
                                                                        </tr>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <Pagination totalRecords={totalRecords} pageLimit={itemsPerPage} pageNeighbours={1} onPageChanged={changePage}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </>
                            : null
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}
