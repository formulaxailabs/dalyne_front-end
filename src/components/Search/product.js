import React, {useState, useEffect} from 'react';
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import Loading from '../common/Loading';
import Pagination from '../../utils/pagination';
import HSCode from './hs_code';

export default function ProductPop(props){
	const [products, setProducts]	=	useState([]);
	const [orgProducts, setOrgProducts]	=	useState([]);
    const [selectAll, setSelectAll]	=	useState(false);
    const [searchTxt, setSearch]	=	useState('');
    const [isLoading, setLoading]	=	useState(true);
	const itemsPerPage	=	10;
	const [totalRecords, setTotalRecords]	=	useState(0);
	const [pageno, setPageNo]	=	useState(1);
    const [showList, setShowList]	=	useState(false);
    const [digits, setDigits]	=	useState(2);    
    const [hs_code, setHSCode]	=	useState('');
    
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
                limit: 98,
                //limit: itemsPerPage,
                //offset: offset - 1,
                digits: 2
            }
            if(!!searchTxt) {
                data.hs_code =   searchTxt;
            }
            _getProducts(data);
        } catch(err) {
            catchErrorHandler(err);
        }
    }

    const _getProducts = async (data) => {
        try{
            setLoading(true);
            const payload = await callApi('GET', `/products/list/`, data);
            if(payload.data) {
                let result          =   payload.data.results || [];
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
                    //newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code + ' ' + item.description});
                    newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code});
                    //newList.push(item.hs_code);
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
            //newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code + ' ' + item.description});
            newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code});
            //newList.push(item.hs_code);
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

    const getList   =   (hs_code)  =>  {
        setShowList(true);
        setDigits(digits + 2);
        setHSCode(hs_code);
    }

    const closeList   =   ()  =>  {
        setShowList(false);
        setDigits(2);
        setHSCode('');
    }
    
    return(
        <>
            <div className="popup-body">
                <div className="popup-box mini">
                    <div className={!!showList ? 'd-none' : ''}>
                        <div onClick={() => props.toggle(false)} className="pop-close">
                            <span className="fas fa-times icon"></span>
                        </div>
                        <div className="pop-header">
                            <form onSubmit={handleSearch}>
                                <h5 className="d-flex">
                                    HS Code
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
                                                    <th width="20%">Product ID</th>
                                                    <th width="75%">Product Name</th>
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
                                                            <td width="20%">{item.hs_code}</td>
                                                            <td width="75%"><span className="txtLink" onClick={() => getList(item.hs_code)}>{item.description}</span></td>
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
                        {/* <Pagination totalRecords={totalRecords} pageLimit={itemsPerPage} pageNeighbours={1} onPageChanged={changePage}/> */}
                        </section>
                    </div>
                    <div className={!!!showList ? 'd-none' : ''}>
                        <HSCode
                            setSelectAll={setSelectAll}
                            applyProduct={props.applyProduct}
                            selProductIds={props.selProductIds}
                            selectAll={selectAll}
                            handleSelectAll={handleSelectAll}
                            _handleSelect={_handleSelect}
                            getList={getList}
                            closeList={closeList}
                            hs_code={hs_code}
                            digits={digits}
                            selProducts={props.selProducts}
                            selProductIds={props.selProductIds}
                            setSelProducts={props.setSelProducts}
                            setSelProductIds={props.setSelProductIds}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}