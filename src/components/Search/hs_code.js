import React, {useState, useEffect} from 'react';
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import Loading from '../common/Loading';
import Pagination from '../../utils/pagination';

export default function HSCode(props){
	const [dataList, setDataList]	=	useState([]);
    const [selectAll, setSelectAll]	=	useState(false);
    const [isLoading, setLoading]	=	useState(true);

    useEffect(() => {
		getProducts();
    }, [props.digits, props.hs_code])

    const getProducts = async () => {
        try{
            let data    =   {
                digits: props.digits,
                hs_code: props.hs_code
            }
            setLoading(true);
            const payload = await callApi('GET', `/products/list/`, data);
            if(payload.data) {
                let result          =   payload.data.results || [];
                let selAll  =   result.every((item) => props.selProductIds.includes(item.id))
                setDataList(result);
                props.setSelectAll(selAll);
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
            (dataList || []).map(item => {
                if(!newIds.includes(item.id)) {
                    newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code});
                    //newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code + ' ' + item.description});
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
            newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code});
            //newList.push({id: (item.id || '').toString(), value: item.hs_code, text: item.hs_code + ' ' + item.description});
            //newList.push(item.hs_code);
            newIds.push(item.id);
        } else {
            let index   =   newIds.indexOf(item.id);
            newIds.splice(index, 1);
            newList.splice(index, 1);
        }
        handleSelect(newList, newIds);
        let selAll  =   dataList.every((item) => newIds.includes(item.id))
        setSelectAll(selAll);
    }

    return(
        <>
            <div onClick={() => props.closeList()} className="pop-close">
                <span className="fas fa-times icon"></span>
            </div>
            <div className="pop-header">
                <h5 className="d-flex">
                    HS Code
                </h5>
            </div>
            <section className="content-area">
                {
                    (!props.isLoading) ?
                    (dataList.length > 0) ?
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
                                        (dataList || []).map((item, k) => {
                                            return (
                                                <tr key={k}>
                                                    <td width="5%">
                                                        <input type="checkbox" checked={(props.selProductIds || []).includes(item.id)} onChange={() => _handleSelect(item)}/>
                                                    </td>
                                                    <td width="20%">{item.hs_code}</td>
                                                    <td width="75%">
                                                        {
                                                            (props.digits < 8) ?
                                                            <span className="txtLink" onClick={() => props.getList(item.hs_code)}>{item.description}</span>
                                                            : <span>{item.description}</span>
                                                        }
                                                    </td>
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
            </section>
        </>
    )
}