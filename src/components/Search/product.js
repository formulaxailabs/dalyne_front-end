import React, {useState, useEffect} from 'react';
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import Loading from '../common/Loading';
import Pagination from '../../utils/pagination';

export default function ProductPop(props){
	const [products, setProducts]	=	useState([]);
	const [orgProducts, setOrgProducts]	=	useState([]);
    const [selectAll, setSelectAll]	=	useState(false);
    const [searchTxt, setSearch]	=	useState('');
    const [isLoading, setLoading]	=	useState(true);
	const itemsPerPage	=	10;
	const [totalRecords, setTotalRecords]	=	useState(0);
	const [pageno, setPageNo]	=	useState(1);
    
	useEffect(() => {
		getProducts(pageno);
    }, [])
    
    /* useEffect(() => {
        let filteredList    =   (orgProducts || []).filter(item => (item.name || '').toLowerCase().includes(searchTxt.toLowerCase()));
        setProducts(filteredList);
    }, [searchTxt]) */

    const getProducts = async (pageno) => {
        try{
            let offset  =   ((pageno - 1) * itemsPerPage) + 1;
            let data    =   {
                limit: itemsPerPage,
                offset: offset - 1
            }
            if(!!searchTxt) {
                data.search =   searchTxt;
            }
            setLoading(true);
            const payload = await callApi('GET', `/products/list/`, data);
            if(payload.data) {
                let result          =   payload.data.results || [];
                console.log('result : ', result)
                let selAll  =   result.every((item) => props.selProductIds.includes(item.id))
                setProducts(result);
                setOrgProducts(result);
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
            let newList     =   [...props.selProducts];
            let newIds     =   [...props.selProductIds];
            (products || []).map(item => {
                if(!newIds.includes(item.id)) {
                    newList.push(item.hs_code);
                    newIds.push(item.id);
                } else {
                    
                }
            })
            handleSelect(newList, newIds);
            setSelectAll(true);
        }
    }

    const handleSelect = (newList, newIds) => {
        props.setSelProducts(newList);
        props.setSelProductIds(newIds);
    }

    const _handleSelect =   (item)  =>  {
        let newList     =   [...props.selProducts];
        let newIds     =   [...props.selProductIds];
        if(!newIds.includes(item.id)) {
            newList.push(item.hs_code);
            newIds.push(item.id);
        } else {
            let index   =   newIds.indexOf(item.id);
            newIds.splice(index, 1);
            newList.splice(index, 1);
        }
        handleSelect(newList, newIds);
        let selAll  =   products.every((item) => newIds.includes(item.id))
        setSelectAll(selAll);
    }

    const handleSearch  =   (e)  =>  {
        e.preventDefault();
        setPageNo(1)
        getProducts(1);
    }

	const changePage = (data) => {
		const { currentPage }	=	data;
		if(currentPage !== pageno) {
            setPageNo(currentPage)
			getProducts(currentPage);
		}
    }

    console.log('products : ', products)
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
                        (products.length > 0) ?
                        <div className="listing-box">
                            <div className="res-box mt-1">
                                <div className="table-hd-sticky">
                                    <table border="0">
                                        <thead>
                                            <tr className="header-row">
                                                <th width="5%"><input type="checkbox" checked={selectAll} onChange={handleSelectAll}/></th>
                                                <th width="15%">Product ID</th>
                                                <th width="35%">Product Name</th>
                                                <th width="15%">Action</th>
                                                <th width="15%">Help</th>
                                                <th width="15%">Unified ID</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <table border="0">
                                    <tbody>
                                        {
                                            (products || []).map((item, k) => {
                                                return (
                                                    <tr key={k}>
                                                        <td width="5%">
                                                            <input type="checkbox" checked={(props.selProductIds || []).includes(item.id)} onChange={() => _handleSelect(item)}/>
                                                        </td>
                                                        <td width="15%">{item.hs_code}</td>
                                                        <td width="35%">{item.description}</td>
                                                        <td width="15%">
                                                            <button className="btn slow ml-0" type="button">Merge Request</button>
                                                        </td>
                                                        <td width="15%">
                                                            <button className="btn slow ml-0" type="button">Merge Request</button>
                                                        </td>
                                                        <td width="15%">{item.iec_code}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="btn-group mt-2">
                                <button onClick={props.applyProduct} className="default-btn slow" type="button">
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