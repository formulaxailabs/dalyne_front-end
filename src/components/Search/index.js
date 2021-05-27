import React, {useState, useEffect} from 'react';
import moment from 'moment-timezone';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import CompanyPop from './company';
import ProductPop from './product';
import './search.css';
import Pagination from '../../utils/pagination';

export default function Search() {
	const [countries, setCountries]	=	useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isProcessing, setProcessing] = useState(false);
	const [searched, setSearched] = useState(false);
	const [showCompany, setShowCompany] = useState(false);
    const [country, setCountry]    =   useState('');
    const [selCompanies, setSelCompanies]    =   useState([]);
    const [selCompanyIds, setSelCompanyIds]    =   useState([]);
    const [data_type, setDataType]    =   useState('import');
    const [search_field, setSearchField]    =   useState('product');
    const [search_value, setSearchValue] = useState([])
    const [start_date, setStartDate]    =   useState('');
    const [end_date, setEndDate]    =   useState('');
    const [period, setPeriod]    =   useState('');
    const [list, setList]   =   useState([]);
    const [data, setData]   =   useState({});
	const itemsPerPage	=	10;
	const [totalRecords, setTotalRecords]	=	useState(0);
	const [pageno, setPageNo]	=	useState(1);
	const [showProduct, setShowProduct] = useState(false);
    const [selProducts, setSelProducts]    =   useState([]);
    const [selProductIds, setSelProductIds]    =   useState([]);
    
	useEffect(() => {
		getCountries();
    }, [])
    
	useEffect(() => {
        setSearchValue([]);
        setSelCompanies([]);
        setSelCompanyIds([]);
	}, [search_field])

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
    
    const handleSearch  =   async () => {
        try{
            let data    =   {
                data_type: data_type,
                country: country,
                start_date: start_date,
                end_date: end_date,
                search_field: search_field,
                search_value: search_value
            }
            setLoading(true);
            setProcessing(true);
            const payload = await callApi('POST', `/advanced/search/data/`, data);
            if(payload.data) {
                let result   =   payload.data || {};
                let search_id   =   result.search_id;
                setData(result);
                getSearchResult(search_id, pageno)
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

    const getSearchResult = async (search_id, pageno) => {
        try{
            let offset  =   ((pageno - 1) * itemsPerPage);
            const payload = await callApi('GET', `/filtered/data/?search_id=${search_id}&limit=${itemsPerPage}&offset=${offset}`);
            if(payload.data) {
				let result          =   payload.data.results || [];
				setList(result);
                setTotalRecords(payload.data.count || 0);
                setLoading(false);
                setProcessing(false);
                setSearched(true);
            } else {
                setList([]);
                setLoading(false);
                setProcessing(false);
                setSearched(true);
            }
        } catch(err) {
            setList([]);
            setLoading(false);
            setProcessing(false);
            setSearched(true);
            catchErrorHandler(err);
        }
    }

    const handlePeriod  =   (e)  =>  {
        let data    =   e.target.value;
        if(!!data) {
            let startDate   =   '';
            let endDate   =   '';
            if(data === 'financial_year') {                
                startDate   =   moment('01/03', 'DD/MM').format('YYYY-MM-DD');
                endDate =   moment('30/04', 'DD/MM').add(1, 'years').format('YYYY-MM-DD');
            } else {
                let [day, type]  =   data.split('_');
                startDate   =   moment().subtract(day, type).format('YYYY-MM-DD');
                endDate =   moment().format('YYYY-MM-DD');
            }
            setPeriod(data);
            setStartDate(startDate);
            setEndDate(endDate);
        } else {
            setPeriod('');
            setStartDate('');
            setEndDate('');
        }

    }

	const changePage = (page) => {
		const { currentPage }	=	page;
		if(currentPage !== pageno) {
            setPageNo(currentPage)
			getSearchResult(data.search_id, currentPage);
		}
	}

    const applyCompany = () => {
        setSearchValue([...selCompanies]);
        setShowCompany(false);
    }

    const applyProduct = () => {
        setSearchValue([...selProducts]);
        setShowProduct(false);
    }

    const removeSearchValue =   (i)  =>  {
        let list    =   [...search_value];
        list.splice(i, 1);
        setSearchValue(list);
    }

    const validate  =   () => {
        let isError =   false;
        if(!!!data_type) {
            isError =   true;
        }
        if(!!!country) {
            isError =   true;
        }
        if(!!!start_date) {
            isError =   true;
        }
        if(!!!end_date) {
            isError =   true;
        }
        if(!!!search_field) {
            isError =   true;
        }
        if(!!!search_value) {
            isError =   true;
        }
        return isError;
    }

    let error   =   validate();
    return (
        <main className="main-container">
            <div className="brd_cumb">
                <ul>
                    <li>
                        <i className="fas fa-home" aria-hidden="true"></i>
                        <a href="/"> Home</a>&nbsp;/&nbsp;
                    </li>
                    <li>Search</li>
                    <div className="clear"></div>
                </ul>
            </div>

            {/* <div className="heading-bar">
                <div className="row">
                    <div className="col-12">
                        <h2>Search</h2>
                    </div>
                </div>
            </div> */}
            {
                (!!showCompany) ?
                <CompanyPop 
                    toggle={setShowCompany} 
                    applyCompany={applyCompany} 
                    selCompanyIds={selCompanyIds} 
                    setSelCompanyIds={setSelCompanyIds}
                    selCompanies={selCompanies} 
                    setSelCompanies={setSelCompanies}
                    title={(search_field === 'importer_name') ? 'Importer' : 'Exporter'}
                />
                : null
            }
            {
                (!!showProduct) ?
                <ProductPop 
                    toggle={setShowProduct} 
                    applyProduct={applyProduct}
                    selProductIds={selProductIds} 
                    setSelProductIds={setSelProductIds}
                    selProducts={selProducts} 
                    setSelProducts={setSelProducts}
                    title={(search_field === 'importer_name') ? 'Importer' : 'Exporter'}
                />
                : null
            }
            <div className="main-body">
                <div className="row">
                    <div className="col-12">
                        <div className="box p-0">
                            <div className="tab-wrap">
                                <div className="tab-bar-row">
                                    <ul className="d-block">
                                        <li>
                                            <div className="tab-name">
                                                Universal Search
                                            </div>
                                        </li>
                                        <li className="active">
                                            <div className="tab-name">
                                                Advnace Search
                                            </div>
                                        </li>
                                        <li>
                                            <div className="tab-name">
                                                Hot Product
                                            </div>
                                        </li>
                                        <li>
                                            <div className="tab-name">
                                                Hot Companies
                                            </div>
                                        </li>
                                        <li>
                                            <div className="tab-name">
                                                Countries
                                            </div>
                                        </li>
                                        <li>
                                            <div className="tab-name">
                                                Release Notes
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-details">
                                <div className="add-form">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="btn-group">
                                                <div className="btn active">Import</div>
                                                <div className="btn">Export</div>
                                            </div>
                                        </div>
                                        <div className="col-md-2 pl-0">
                                            <div className="fld-group">
                                                <label>Period</label>
                                                <select value={period} onChange={handlePeriod} className="fld">
                                                    <option value="">Custom</option>
                                                    <option value={`7_days`}>Last 7 Days</option>
                                                    <option value={`30_days`}>Last 30 Days</option>
                                                    <option value={`3_months`}>Last 3 Months</option>
                                                    <option value={`6_months`}>Last 6 Months</option>
                                                    <option value={`financial_year`}>Financial Year</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2 pl-0">
                                            <div className="fld-group">
                                                <label>Start Date</label>
                                                <input name="" disabled={!!period} value={start_date} onChange={(e) => setStartDate(e.target.value)} type="date" className="fld" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 pl-0">
                                            <div className="fld-group">
                                                <label>End Date</label>
                                                <input name="" disabled={!!period} value={end_date} onChange={(e) => setEndDate(e.target.value)} type="date" className="fld" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 pl-0">
                                            <div className="fld-group">
                                                <label>Select Country</label>
                                                <select value={country} onChange={(e) => setCountry(e.target.value)} className="fld">
                                                    <option>Select Country</option>
                                                    {
                                                        (countries || []).map((item, k) => {
                                                            return (
                                                                <option value={item.id} key={k}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="fld-group">
                                                <label>Search Field</label>
                                                <select value={search_field} onChange={(e) => setSearchField(e.target.value)} className="fld">
                                                    <option value="product">Product</option>
                                                    <option value="hs_description">HS Code Description</option>
                                                    <option value="hs_code">HS Code</option>
                                                    <option value="importer_name">Importer</option>
                                                    <option value="exporter_name">Exporter</option>
                                                    <option value="iec_code">IEC</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 pl-0">
                                            <div className="fld-group">
                                                <label>Consignee Name</label>
                                                {
                                                    (search_field === 'importer_name' || search_field === 'exporter_name') ?
                                                    <>
                                                        {
                                                            (search_value || []).map((item, i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        {item}
                                                                        <span onClick={() => removeSearchValue(i)}>[x]</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <div className="fld cstm-fld slow" onClick={() => setShowCompany(true)}>Select {(search_field === 'importer_name') ? 'Importer' : 'Exporter'}</div>
                                                    </>
                                                    : <ReactTagInput 
                                                        tags={search_value} 
                                                        onChange={(newTags) => setSearchValue(newTags)}
                                                    />
                                                }
                                                {
                                                    (search_field === 'hs_code') ? 
                                                    <button className="btn slow mt-1" onClick={() => setShowProduct(true)}>HS Locator</button>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="btn-group text-right mt-3">
                                                <button className="default-btn reset-btn slow" type="button">
                                                    Reset
                                                </button>
                                                <button disabled={error || isProcessing} onClick={handleSearch} className="default-btn slow" type="button">
                                                    {(!!isProcessing) ? 'Searching ..' : 'Search'}
                                                </button>
                                            </div>        
                                        </div>

                                        
                                        {/* <div className="col-md-5">
                                            <div className="row">
                                                <div className="col-md-6 pl-0">
                                                    <div className="fld-group">
                                                        <label>Type</label>
                                                        <select value={data_type} onChange={(e) => setDataType(e.target.value)} className="fld">
                                                            <option value="import">Import</option>
                                                            <option value="export">Export</option>
                                                        </select>
                                                    </div>
                                                </div>                                                
                                            </div>
                                        </div> */}
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
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
                                                <button className="icon-btn download-btn" type="button">
                                                    <i className="far fa-file-excel"></i>
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box p-0 mt-3">
                                    <div className="filter p-2">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="fld-group mb-0">
                                                            <label>Search Option</label>
                                                            <select className="fld">
                                                                <option value="">Select</option>
                                                                <option value="">HS Code</option>
                                                                <option value="">HS Code Description</option>
                                                                <option value="">UQC</option>
                                                                <option value="">Quantity</option>
                                                                <option value="">SB No</option>
                                                                <option value="">Exporter Name</option>
                                                                <option value="">Importer Name</option>
                                                                <option value="">Country of Origin</option>
                                                                <option value="">Port of Discharge</option>
                                                                <option value="">Mode of Part</option>
                                                                <option value="">Port Code</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pl-0">
                                                        <div className="fld-group mb-0">
                                                            <label>Search Field</label>
                                                            <input name="" type="text" className="fld" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 pl-0">
                                                        <button className="default-btn slow mt-3" type="button">
                                                            Filter
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-check-inline mt-4">
                                                    <label className="form-check-label">
                                                        <input type="radio" name="period" className="form-check-input" value="" /> Month
                                                    </label>
                                                </div>
                                                <div className="form-check-inline mt-4 ml-4">
                                                    <label class="form-check-label">
                                                        <input type="radio" name="period" className="form-check-input" value="" /> Year
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="tab-wrap sub-tab">
                                        <div className="tab-bar-row">
                                            <ul className="d-block">
                                                <li className="active">
                                                    <div className="tab-name">Shipments</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">Analysis</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">Importer</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">Exporter</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">Duty Minimizer</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">Country of Origin</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">Port of Destination</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">HS Code</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">Time Series</div>
                                                </li>
                                                <li>
                                                    <div className="tab-name">What's New</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                    <div className="tab-details p-0">
                                        <div className="row">
                                            {/* <div className="col-md-2 pl-0">
                                                <div className="filter-panel">
                                                    <h5 className="bar">Filters</h5>
                                                    <div className="filter-row d-flex">
                                                        <h6>Remove Duplicate Shipments</h6>
                                                        <label className="switch">
                                                            <input type="checkbox" />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                    <div className="filter-row d-flex">
                                                        <h6>Remove To Order/NA Companies</h6>
                                                        <label className="switch">
                                                            <input type="checkbox" />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                    <div className="filter-row">
                                                        <h4>Importer (Raw)</h4>
                                                        <button className="btn slow ml-0" type="button">
                                                            Select from 2
                                                        </button>
                                                    </div>
                                                    <div className="filter-row">
                                                        <h4>Exporter (Raw)</h4>
                                                        <button className="btn slow ml-0" type="button">
                                                            Select from 1
                                                        </button>
                                                    </div>
                                                    <div className="accordian">
                                                        <div className="heading">
                                                            <h4>Importer</h4>
                                                            <i className="fas fa-chevron-down"></i>
                                                        </div>
                                                        <div className="accordian-body">
                                                            <input name="" value="" type="text" className="fld" />
                                                            <div className="option-list">
                                                                <ul>
                                                                    <li>
                                                                        <input type="checkbox" className="checkfld" /> 
                                                                        <span className="text">A - 1 Sales Agency-mumbai - Id - 03060</span>
                                                                    </li>
                                                                    <li>
                                                                        <input type="checkbox" className="checkfld" /> 
                                                                        <span className="text">A - Class Marble India Private Limited-madanganj-kishangarh - Id - 05050</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="footer">
                                                                <p><a href="">Total Importer (2)</a></p>
                                                                <button className="btn slow ml-0" type="button">
                                                                    Apply
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-md-12">
                                                <div className="search-result">
                                                    <div className="listing-box">
                                                        <div className="res-box mt-1">
                                                            <div className="table-hd-sticky">
                                                                <table border="0">
                                                                    <thead>
                                                                        <tr className="header-row">
                                                                            <th><input type="checkbox" className="ml-2" /></th>
                                                                            <th>Date</th>
                                                                            <th>HS Code</th>
                                                                            <th>Product</th>
                                                                            <th>Exporter Name</th>
                                                                            <th>Imported Name</th>
                                                                            <th>Port</th>
                                                                            <th>Port of Discharge</th>
                                                                            <th>Country of Origin</th>
                                                                            <th>Port Of Loading</th>
                                                                            <th>Mode Of Port</th>
                                                                            <th>Quantity</th>
                                                                            <th>Unit</th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                            <table border="0">
                                                                <tbody>
                                                                    {
                                                                        (!isLoading) ?
                                                                        (list.length > 0) ?
                                                                            (list || []).map((item, k) => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td>
                                                                                            {/* <i className="fas fa-plus-circle p-2"></i> */}
                                                                                            <input type="checkbox" className="p-1 mt-1 ml-2" />
                                                                                        </td>
                                                                                        <td>06-Apr-2021</td>
                                                                                        <td>{item.RITC}</td>
                                                                                        <td>{item.RITC_DISCRIPTION}</td>
                                                                                        <td>{item.EXPORTER_NAME}</td>
                                                                                        <td>{item.IMPORTER_NAME}</td>
                                                                                        <td>{item.PORT_CODE}</td>
                                                                                        <td>{item.PORT_OF_DISCHARGE}</td>
                                                                                        <td>{item.COUNTRY_OF_ORIGIN}</td>
                                                                                        <td>{item.PORT_OF_LOADING}</td>
                                                                                        <td>{item.MODE_OF_PORT}</td>
                                                                                        <td>{item.QUANTITY}</td>
                                                                                        <td>{item.UQC}</td>
                                                                                    </tr>
                                                                                )
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
