import React, {useState, useEffect} from 'react';
import FileDownload from 'js-file-download';
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';
import Loading from '../common/Loading';
import Pagination from '../../utils/pagination';
import {error as notifyError, success as notifySuccess} from '../../helper/notify';

export default function Download(props){
	const [isDownloading, setDownloading] = useState(false);
	const [downloadAll, setDownloadAll] = useState(false);

    useEffect(() => {
        if(props.selIds == 0) {
            setDownloadAll(true);
        }
    }, [props.selIds])

    const downloadExcel = async ()  =>  {
        try{
            if(window.confirm('Do you really want to download')){
                setDownloading(true);
                let data    =   {...props.search_params};
                if(!downloadAll) {
                    data.ids    =   props.selIds || [];
                } else {
                    data.select_all =   true;
                }
                const payload = await callApi('POST', `/export/shipments/`, data, {responseType: 'blob'});
                if(payload.data) {
                    let result          =   payload.data.results || [];
                    FileDownload(payload.data, 'Importers_shipments_dd65.xls');                
                    downloadMessage();
                    /* const url = window.URL.createObjectURL(new Blob([payload.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Importers_shipments_dd65.xls'); //or any other extension
                    document.body.appendChild(link);
                    link.click(); */
                    setDownloading(false);
                    props.setSelIds([]);
                    props.setSelectAll(false);
                    props.setShowDownload(false)
                } else {
                    setDownloading(false);
                }
            }
        } catch(error) {
            setDownloading(false);
            if(error.response.status == 400){
                if(error.response) {
                    let data = JSON.parse(await error.response.data.text());
                    notifyError({message: data.msg});
                    props.setSelIds([]);
                    props.setSelectAll(false);
                    props.setShowDownload(false)
                }
            }
        }
    }

    const downloadMessage = async () => {
        const payload = await callApi('GET', `/download/data/response/`);
        if(payload.data) {
            let resultMsg =  payload.data || "";
            notifySuccess({message: resultMsg});
        }
    }

    return(
        <div className="popup-body">
            <div className="popup-box micro">
                <div onClick={() => props.setShowDownload(false)} className="pop-close">
                    <span className="fas fa-times icon"></span>
                </div>
                <div className="pop-header">
                    <h5 className="d-flex">
                        Download Excel
                    </h5>
                </div>
                <section className="content-area download-list">
                    {
                        props.selIds.length > 0 ?
                        <>
                            <p onClick={() => setDownloadAll(false)} className={`${!downloadAll ? 'selected' : ''}`}>Download Selected ({props.selIds.length})</p>
                            <p onClick={() => setDownloadAll(true)} className={`${!!downloadAll ? 'selected' : ''}`}>Download All ({props.totalRecords})</p>
                            
                            <div className="btn-group mt-5">
                                <button onClick={() => props.setShowDownload(false)} className="default-btn reset-btn slow" type="button">
                                    Cancel
                                </button>
                                <button disabled={!!isDownloading} onClick={downloadExcel} className="default-btn slow" type="button">
                                    {!!isDownloading ? 'Downloading...' : 'Ok'}
                                </button>
                            </div>
                        </> : <>
                            <p className="selected">Download without saving workspace (Only Shipments)</p>
                            <p className="blocked">Save current workspace and download</p>
                            
                            <div className="btn-group mt-5">
                                <button onClick={() => props.setShowDownload(false)} className="default-btn reset-btn slow" type="button">
                                    Cancel
                                </button>
                                <button disabled={!!isDownloading} onClick={downloadExcel} className="default-btn slow" type="button">
                                    {!!isDownloading ? 'Downloading...' : 'Ok'}
                                </button>
                            </div>
                        </>
                    }
                </section>
            </div>
        </div>
    )
}