import React, {useState, useEffect} from 'react';
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import Loading from '../common/Loading';
import Pagination from '../../utils/pagination';

export default function ImporterExporter(props){
	const [companies, setCompanies]	=	useState([]);
	const [orgCompanies, setOrgCompanies]	=	useState([]);
    const [selectAll, setSelectAll]	=	useState(false);
    const [searchTxt, setSearch]	=	useState('');
    const [isLoading, setLoading]	=	useState(true);
	const itemsPerPage	=	10;
	const [totalRecords, setTotalRecords]	=	useState(0);
	const [pageno, setPageNo]	=	useState(1);
    
	useEffect(() => {
		getCompanies(pageno);
    }, [])

    const getCompanies = async (pageno) => {
        try{
            let offset  =   ((pageno - 1) * itemsPerPage) + 1;
            let data    =   {
                limit: itemsPerPage,
                offset: offset - 1,
                end_date: '2021-05-30',
                start_date: '2020-01-01',
                data_type: 'export',
                country: 1
            }
            setLoading(true);
            const payload = await callApi('GET', `/exporters/importers/list/`, data);
            if(payload.data) {
                let result          =   payload.data.results || [];
                let selAll  =   result.every((item) => props.selCompanyIds.includes(item.id))
                setCompanies(result);
                setOrgCompanies(result);
                setTotalRecords(payload.data.count || 0);
                setSelectAll(selAll);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch(err) {
            setLoading(false);
            catchErrorHandler(err);
        }
    }

    const handleSelectAll   =   ()  =>  {
        if(!!selectAll) {
            handleSelect([], []);
            setSelectAll(false);
        } else {
            let newList     =   [...props.selCompanies];
            let newIds     =   [...props.selCompanyIds];
            (companies || []).map(item => {
                if(!newIds.includes(item.id)) {
                    newList.push(item.name);
                    newIds.push(item.id);
                } else {
                    
                }
            })
            handleSelect(newList, newIds);
            setSelectAll(true);
        }
    }

    const handleSelect = (newList, newIds) => {
        props.setSelCompanies(newList);
        props.setSelCompanyIds(newIds);
    }

    const _handleSelect =   (item)  =>  {
        let newList     =   [...props.selCompanies];
        let newIds     =   [...props.selCompanyIds];
        if(!newIds.includes(item.id)) {
            newList.push(item.name);
            newIds.push(item.id);
        } else {
            let index   =   newIds.indexOf(item.id);
            newIds.splice(index, 1);
            newList.splice(index, 1);
        }
        handleSelect(newList, newIds);
        let selAll  =   companies.every((item) => newIds.includes(item.id))
        setSelectAll(selAll);
    }

    const handleSearch  =   (e)  =>  {
        e.preventDefault();
        setPageNo(1)
        getCompanies(1);
    }

	const changePage = (data) => {
		const { currentPage }	=	data;
		if(currentPage !== pageno) {
            setPageNo(currentPage)
			getCompanies(currentPage);
		}
    }

    return(
        <>
            <div className="popup-body">
                <div className="popup-box">
                    <div onClick={() => props.toggle(false)} className="pop-close">
                        <span className="fas fa-times icon"></span>
                    </div>
                    <div className="pop-header">
                        <form onSubmit={handleSearch}>
                            <h5 className="d-flex">
                                {props.title}
                                <input name="searchTxt" value={searchTxt} onChange={(e) => setSearch(e.target.value)} type="text" className="fld ml-3" placeholder="Search company name here..." />
                                <button type="submit" className="btn slow">Search</button>
                            </h5>
                        </form>
                    </div>
                    <section className="content-area">
                    {
                        (!isLoading) ?
                        (companies.length > 0) ?
                        <div className="listing-box">
                            <div className="res-box mt-1">
                                <div className="table-hd-sticky">
                                    <table border="0">
                                        <thead>
                                            <tr className="header-row">
                                                <th width="5%"><input type="checkbox" checked={selectAll} onChange={handleSelectAll}/></th>
                                                <th width="35%">Company Name</th>
                                                <th width="15%">Action</th>
                                                <th width="15%">Help</th>
                                                <th width="15%">Company ID</th>
                                                <th width="15%">Unified ID</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <table border="0">
                                    <tbody>
                                        {
                                            (companies || []).map((item, k) => {
                                                return (
                                                    <tr key={k}>
                                                        <td width="5%">
                                                            <input type="checkbox" checked={(props.selCompanyIds || []).includes(item.id)} onChange={() => _handleSelect(item)}/>
                                                        </td>
                                                        <td width="35%">{item.name}</td>
                                                        <td width="15%">
                                                            <button className="btn slow ml-0" type="button">Merge Request</button>
                                                        </td>
                                                        <td width="15%">
                                                            <button className="btn slow ml-0" type="button">Merge Request</button>
                                                        </td>
                                                        <td width="15%">{item.iec_code}</td>
                                                        <td width="15%">{item.iec_code}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="btn-group mt-2">
                                <button onClick={props.applyCompany} className="default-btn slow" type="button">
                                    Apply
                                </button>
                            </div>
                        </div> :
                        <div>No matching data found</div>
                        : <Loading />
                    }
                    <Pagination totalRecords={totalRecords} pageLimit={itemsPerPage} pageNeighbours={1} onPageChanged={changePage}/>
                    </section>
                </div>
            </div>
        </>
    )
}