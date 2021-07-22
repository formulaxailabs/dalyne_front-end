import React, {useState, useEffect} from 'react';
import ReactTags from 'react-tag-autocomplete';
import ReactDOM from 'react-dom';
import { WithContext as ReactTagInput } from 'react-tag-input';
/* import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css"; */
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import CompanyPop from './company';
import ProductPop from './product';
import ImporterExporter from './importer-exporter';
import moment from 'moment-timezone';

export default function AdvancedSearch(props){
    const [showCompany, setShowCompany] = useState(false);
    const [country, setCountry]    =   useState('');
    const [selCompanies, setSelCompanies]    =   useState([]);
    const [selCompanyIds, setSelCompanyIds]    =   useState([]);
    const [data_type, setDataType]    =   useState('import');
    const [search_field, setSearchField]    =   useState('hs_description');
    const [search_value, setSearchValue] = useState([])
    const [start_date, setStartDate]    =   useState('');
    const [end_date, setEndDate]    =   useState('');
    const [period, setPeriod]    =   useState('');
	const [showProduct, setShowProduct] = useState(false);
    const [selProducts, setSelProducts]    =   useState([]);
    const [selProductIds, setSelProductIds]    =   useState([]);
    const [searchTxt, setSearchTxt] =   useState('');
    const [productList, setProducts]    =   useState([]);
    const [importerExporterList, setImporterExporter]    =   useState([]);
    const maxDate = moment().format('YYYY-MM-DD');
    
	useEffect(() => {
        if(search_field === 'hs_description' || search_field === 'hs_code' || search_field === 'product') {
            getProducts();
        } else {
            if((data_type === 'import' && search_field === 'exporter_name') || (data_type === 'export' && search_field === 'importer_name')) {
                getImporterExporter();
            }
        }
    }, [searchTxt, search_field, data_type])
    
	useEffect(() => {
        setSelCompanies([]);
        setSelCompanyIds([]);
        setSearchValue([]);
    }, [search_field])
    
	useEffect(() => {
        setSearchValue([])
    }, [data_type])
    

    const getProducts = async (pageno) => {
        try{
            if(!!searchTxt) {
                let offset  =   0;
                let data    =   {
                    limit: 10,
                    offset: offset
                }
                if(search_field === 'hs_code') {
                    data.hs_code =   searchTxt;
                    /* if(searchTxt.length <= 2)
                        data.digits =   2;
                    if(searchTxt.length > 2 && searchTxt.length <= 4)
                        data.digits =   4;
                    if(searchTxt.length > 4 && searchTxt.length <= 6)
                        data.digits =   6;
                    if(searchTxt.length > 6 && searchTxt.length <= 8)
                        data.digits =   8; */
                } else {                    
                    data.search =   searchTxt;
                }

                const payload = await callApi('GET', `/products/list/`, data);
                if(payload.data) {
                    let result          =   payload.data.results || [];
                    if(search_field === 'product') {
                        setProducts(result.map(item => ({id: item.id.toString(), value: item.description, text: item.description})));
                    }
                    if(search_field === 'hs_code') {
                        setProducts(result.map(item => ({id: item.id.toString(), value: item.hs_code, text: item.hs_code + ' ' + item.description})));
                    }
                    if(search_field === 'hs_description') {
                        setProducts(result.map(item => ({id: item.id.toString(), value: item.description, text: item.description})));
                    }
                }
            } else {
                setProducts([]);
            }
        } catch(err) {
            catchErrorHandler(err);
        }
    }
    

    const getImporterExporter = async (pageno) => {
        try{
            if(!!searchTxt) {
                let offset  =   0;
                let data    =   {
                    limit: 100,
                    offset: offset,
                    start_date:   moment('01/03', 'DD/MM').format('YYYY-MM-DD'),
                    end_date:   moment('30/04', 'DD/MM').add(1, 'years').format('YYYY-MM-DD'),
                    data_type: data_type,
                    country: country
                }
                data.search =   searchTxt;

                const payload = await callApi('GET', `/exporters/importers/list/`, data);
                if(payload.data) {
                    let result          =   payload.data.results || [];
                    setImporterExporter(result.map((item, i) => ({id: i.toString(), text: (data_type === 'import') ? item.EXPORTER_NAME : item.IMPORTER_NAME})));
                    //setImporterExporter([]);
                }
            } else {
                setImporterExporter([]);
            }
        } catch(err) {
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

    const reset = () => {
        setShowCompany(false);
        setCountry('');
        setSelCompanies([]);
        setSelCompanyIds([]);
        setDataType('import');
        setSearchField('product');
        setSearchValue([]);
        setStartDate('');
        setEndDate('');
        setPeriod('');
        setShowProduct(false);
        setSelProducts([]);
        setSelProductIds([]);
        setSearchTxt('');
        setProducts([]);
        props.reset();
    }

    const applyCompany = () => {
        setSearchValue([...selCompanies]);
        setShowCompany(false);
    }

    const applyProduct = () => {
        //console.log(selProducts)
        setSearchValue([...selProducts]);
        setShowProduct(false);
    }

    const removeSearchValue =   (i)  =>  {
        let list    =   [...search_value];
        list.splice(i, 1);
        setSearchValue(list);
    }

    const onAddition    =   (tag)  =>  {
        if(search_field === 'hs_code') {
            //console.log(tag)
            setSelProducts([...selProducts, {id : tag.id, text : tag.value, value : tag.value}]);
            setSelProductIds([...selProductIds, tag.id]);
            setSearchValue([...search_value, {id : tag.id, text : tag.value, value : tag.value}]);
        }else if(search_field === 'product' || search_field === 'hs_description') {
            setSearchValue([...search_value, {id : tag.id, text : searchTxt, value : searchTxt}]);
        }else{
            setSearchValue([...search_value, tag]);
        }
        console.log(tag, search_field,searchTxt, 22)
    }

    const onDelete    =   (i)  =>  {
        const tags = search_value;
        tags.splice(i, 1)
        setSearchValue(tags);
    }

    const _handleSearch =   ()  =>  {
        let searchdata  =   (search_value || []).map(item => (typeof item == 'object') ? (!!item.value) ? item.value : item.text : item);
        let reqData     =   {
            data_type: data_type,
            country: country,
            start_date: start_date,
            end_date: end_date,
            search_field: search_field,
            search_value: searchdata
        }
        props.handleSearch(reqData);
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

    //console.log(' selProductIds ; ', selProducts)
    let error   =   validate();
    return(
        <>
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
                                    <div onClick={() => setDataType('import')} className={`btn${(data_type === 'import') ? ' active' : ''}`}>Import</div>
                                    <div onClick={() => setDataType('export')} className={`btn${(data_type === 'export') ? ' active' : ''}`}>Export</div>
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
                                    <input max={maxDate} name="" disabled={!!period} value={start_date} onChange={(e) => setStartDate(e.target.value)} type="date" className="fld" />
                                </div>
                            </div>
                            <div className="col-md-2 pl-0">
                                <div className="fld-group">
                                    <label>End Date</label>
                                    <input max={maxDate} name="" disabled={!!period} value={end_date} onChange={(e) => setEndDate(e.target.value)} type="date" className="fld" />
                                </div>
                            </div>
                            <div className="col-md-4 pl-0">
                                <div className="fld-group">
                                    <label>Select Country</label>
                                    <select value={country} onChange={(e) => setCountry(e.target.value)} className="fld">
                                        <option>Select Country</option>
                                        {
                                            (props.countries || []).map((item, k) => {
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
                                    <select value={search_field} disabled={!!!start_date || !!!end_date || !!!country} onChange={(e) => { setSearchValue([]); setSearchTxt(''); setSearchField(e.target.value)}} className="fld">
                                        {/* <option value="product">Product</option> */}
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
                                    <label>
                                        {search_field === 'product' ? 'Product' : null}
                                        {search_field === 'hs_code' ? 'HS Code' : null}
                                        {search_field === 'hs_description' ? 'HS Code Description' : null}
                                        {search_field === 'importer_name' ? 'Importer' : null}
                                        {search_field === 'exporter_name' ? 'Exporter' : null}
                                        {search_field === 'iec_code' ? 'IEC' : null}
                                    </label>
                                    {
                                        (search_field === 'importer_name') ?
                                        data_type === 'import' ?
                                        <>
                                            {
                                                (search_value || []).map((item, i) => {
                                                    return (
                                                        (typeof item == 'object') ?
                                                        null :
                                                        <span className="selectedTag" key={i}>
                                                            {item}
                                                            <span className="tagClose" onClick={() => removeSearchValue(i)}>x</span>
                                                        </span>
                                                    )
                                                })
                                            }
                                            <div className="fld cstm-fld slow" onClick={() => setShowCompany(true)}>Select {(search_field === 'importer_name') ? 'Importer' : 'Exporter'}</div>
                                        </>
                                        : <ReactTagInput
                                            tags={search_value}
                                            suggestions={importerExporterList}
                                            handleInputChange={(newTags) => setSearchTxt(newTags)}
                                            handleDelete={onDelete}
                                            handleAddition={onAddition}
                                            //onInput={(text) => setSearchTxt(text)}
                                        /> : null
                                    }
                                    
                                    {
                                        (search_field === 'exporter_name') ?
                                        data_type === 'export' ?
                                        <>
                                            {
                                                (search_value || []).map((item, i) => {
                                                    return (
                                                        (typeof item == 'object') ?
                                                        null :
                                                        <span className="selectedTag" key={i}>
                                                            {item}
                                                            <span className="tagClose" onClick={() => removeSearchValue(i)}>x</span>
                                                        </span>
                                                    )
                                                })
                                            }
                                            <div className="fld cstm-fld slow" onClick={() => setShowCompany(true)}>Select {(search_field === 'importer_name') ? 'Importer' : 'Exporter'}</div>
                                        </>
                                        : <ReactTagInput
                                            tags={search_value}
                                            suggestions={importerExporterList}
                                            handleInputChange={(newTags) => setSearchTxt(newTags)}
                                            handleDelete={onDelete}
                                            handleAddition={onAddition}
                                            //onInput={(text) => setSearchTxt(text)}
                                        /> : null
                                    }
                                    {
                                        (search_field === 'iec_code') ?
                                        <ReactTagInput
                                            tags={search_value}
                                            //handleInputChange={(newTags) => setSearchTxt(newTags)}
                                            handleDelete={onDelete}
                                            handleAddition={onAddition}
                                            //onInput={(text) => setSearchTxt(text)}
                                        /> : null
                                    }   
                                    {
                                        (search_field === 'hs_description' || search_field === 'hs_code' || search_field === 'product') ?
                                        <ReactTagInput
                                            tags={search_value}
                                            suggestions={productList}
                                            handleInputChange={(newTags) => setSearchTxt(newTags)}
                                            handleDelete={onDelete}
                                            handleAddition={onAddition}
                                            //onInput={(text) => setSearchTxt(text)}
                                        /> : null
                                    }                                 
                                    {
                                        /* (search_field === 'hs_description' || search_field === 'hs_code' || search_field === 'product') ?
                                        <ReactTags
                                            tags={search_value} 
                                            suggestions={productList}
                                            onChange={(newTags) => setSearchValue(newTags)}
                                            onDelete={onDelete}
                                            onAddition={onAddition}
                                            onInput={(text) => setSearchTxt(text)}
                                        /> : null */
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
                                    <button onClick={reset} className="default-btn reset-btn slow" type="button">
                                        Reset
                                    </button>
                                    <button
                                        disabled={error || props.isProcessing} 
                                        onClick={_handleSearch}
                                        className="default-btn slow" 
                                        type="button"
                                    >
                                        {(!!props.isProcessing) ? 'Searching ..' : 'Search'}
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
        </>
    )
}