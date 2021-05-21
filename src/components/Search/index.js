import React from 'react';
import './search.css';

export default function Search() {
  return (
    <main className="main-container">
        <div class="brd_cumb">
            <ul>
                <li>
                    <i class="fas fa-home" aria-hidden="true"></i>
                    <a href="/"> Home</a>&nbsp;/&nbsp;
                </li>
                <li>Search</li>
                <div class="clear"></div>
            </ul>
        </div>

        {/* <div className="heading-bar">
            <div className="row">
                <div className="col-12">
                    <h2>Search</h2>
                </div>
            </div>
        </div> */}

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
                                    <div className="col-md-5">
                                        <div className="fld-group">
                                            <label>Select Country</label>
                                            <select className="fld">
                                                <option>Select Country</option>
                                                <option>USA</option>
                                                <option>UK</option>
                                                <option>India</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="fld-group">
                                                    <label>Period</label>
                                                    <select className="fld">
                                                        <option>Last 7 Days</option>
                                                        <option>Last 30 Days</option>
                                                        <option>Last 3 Months</option>
                                                        <option>Last 6 Months</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-0">
                                                <div className="fld-group">
                                                    <label>Start Date</label>
                                                    <input name="" value="" type="date" className="fld" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-0">
                                                <div className="fld-group">
                                                    <label>End Date</label>
                                                    <input name="" value="" type="date" className="fld" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="fld-group">
                                                    <label>Search Field</label>
                                                    <select className="fld">
                                                        <option>Consignee Name</option>
                                                        <option>Shipper Name</option>
                                                        <option>HS Code</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-0">
                                                <div className="fld-group">
                                                    <label>Operator</label>
                                                    <select className="fld">
                                                        <option>In</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-0">
                                                <div className="fld-group">
                                                    <label>Consignee Name</label>
                                                    <input name="" value="" type="text" className="fld" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-group text-right">
                                            <button className="default-btn reset-btn slow" type="button">
                                                Reset
                                            </button>
                                            <button className="default-btn slow" type="button">
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="box filter-bar mt-2 p-3">
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="mb-1">Filter</h4>
                            </div>
                            <div className="col-md-1">
                                <div className="fld-group">
                                    <label>Shipments</label>
                                    <select className="fld">
                                        <option>By Quarter</option>
                                        <option>By Month</option>
                                        <option>By Value</option>
                                        <option>By Quantity</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-1 pl-0">
                                <div className="fld-group">
                                    <label>Importers</label>
                                    <select className="fld">
                                        <option>Summary</option>
                                        <option>Relationship</option>
                                        <option>By Value</option>
                                        <option>By Quantity</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-1 pl-0">
                                <div className="fld-group">
                                    <label>Exporters</label>
                                    <select className="fld">
                                        <option>Summary</option>
                                        <option>Relationship</option>
                                        <option>By Value</option>
                                        <option>By Quantity</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-1 pl-0">
                                <div className="fld-group">
                                    <label>Country of Origin</label>
                                    <select className="fld">
                                        <option>Summary</option>
                                        <option>Relationship</option>
                                        <option>By Value</option>
                                        <option>By Quantity</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-1 pl-0">
                                <div className="fld-group">
                                    <label>Port of Destination</label>
                                    <select className="fld">
                                        <option>Summary</option>
                                        <option>Relationship</option>
                                        <option>By Value</option>
                                        <option>By Quantity</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-1 pl-0">
                                <div className="fld-group">
                                    <label>HS Code</label>
                                    <select className="fld">
                                        <option>Summary</option>
                                        <option>Relationship</option>
                                        <option>By Value</option>
                                        <option>By Quantity</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2 pl-0">
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
                            </div>
                            <div className="col-md-1 pr-0 download-icons">
                                <div className="btn-group">
                                    <button className="icon-btn save-btn" type="button">
                                        <i class="fas fa-save"></i>
                                        Save
                                    </button>
                                    <button className="icon-btn download-btn" type="button">
                                        <i class="far fa-file-excel"></i>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box p-0 mt-3">
                        <div className="tab-wrap sub-tab">
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
                        </div>
                        <div className="tab-details">
                            <div className="row">
                                <div className="col-md-2 pl-0">
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
                                                <i class="fas fa-chevron-down"></i>
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
                                </div>
                                <div className="col-md-10 pl-0 pr-0">
                                    <div className="search-result">
                                        <div className="listing-box">
                                            <div className="res-box mt-1">
                                                <div className="table-hd-sticky">
                                                    <table border="0">
                                                        <thead>
                                                            <tr className="header-row">
                                                                <th><input type="checkbox" className="ml-4" /></th>
                                                                <th>Date</th>
                                                                <th>HS Code</th>
                                                                <th>Product</th>
                                                                <th>Exporter Name</th>
                                                                <th>Exporter Address</th>
                                                                <th>Port of Destination</th>
                                                                <th>Country of Origin</th>
                                                                <th>Port Of Origin</th>
                                                                <th>Value (Usd)</th>
                                                                <th>Std Qty</th>
                                                                <th>Std Unit</th>
                                                                <th>Std Unit Price (USD)</th>
                                                                <th>Qty</th>
                                                                <th>Unit</th>
                                                                <th>Unit Rate in FC</th>
                                                                <th>Unit Rate Currency</th>
                                                                <th>Value (Inr)</th>
                                                                <th>Actual Duty(Inr)</th>
                                                                <th>Value + Duty</th>
                                                                <th>Duty Percent</th>
                                                                <th>Shipment Mode</th>
                                                                <th>IEC</th>
                                                                <th>Applicable Duty Inr</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                <table border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <i class="fas fa-plus-circle p-2"></i>
                                                                <input type="checkbox" className="p-1 mt-1" />
                                                            </td>
                                                            <td>06-Apr-2021</td>
                                                            <td>96039000</td>
                                                            <td>OTHER FACE MAKE-UP PRODUCTS : 1944-2SET-TG - PROFUSION, DEFI - NE BROWS, ARTISTRY PALETTE, 17.2 G(11.2G + 2.8G + 2G + 1.2G)</td>
                                                            <td>Z To Order NA</td>
                                                            <td>N/A</td>
                                                            <td>Bombay Air</td>
                                                            <td>China</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>545</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i class="fas fa-plus-circle p-2"></i>
                                                                <input type="checkbox" className="p-1 mt-1" />
                                                            </td>
                                                            <td>06-Apr-2021</td>
                                                            <td>96039000</td>
                                                            <td>OTHER FACE MAKE-UP PRODUCTS : 1944-2SET-TG - PROFUSION, DEFI - NE BROWS, ARTISTRY PALETTE, 17.2 G(11.2G + 2.8G + 2G + 1.2G)</td>
                                                            <td>Z To Order NA</td>
                                                            <td>N/A</td>
                                                            <td>Bombay Air</td>
                                                            <td>China</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>545</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i class="fas fa-plus-circle p-2"></i>
                                                                <input type="checkbox" className="p-1 mt-1" />
                                                            </td>
                                                            <td>06-Apr-2021</td>
                                                            <td>96039000</td>
                                                            <td>OTHER FACE MAKE-UP PRODUCTS : 1944-2SET-TG - PROFUSION, DEFI - NE BROWS, ARTISTRY PALETTE, 17.2 G(11.2G + 2.8G + 2G + 1.2G)</td>
                                                            <td>Z To Order NA</td>
                                                            <td>N/A</td>
                                                            <td>Bombay Air</td>
                                                            <td>China</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>545</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i class="fas fa-plus-circle p-2"></i>
                                                                <input type="checkbox" className="p-1 mt-1" />
                                                            </td>
                                                            <td>06-Apr-2021</td>
                                                            <td>96039000</td>
                                                            <td>OTHER FACE MAKE-UP PRODUCTS : 1944-2SET-TG - PROFUSION, DEFI - NE BROWS, ARTISTRY PALETTE, 17.2 G(11.2G + 2.8G + 2G + 1.2G)</td>
                                                            <td>Z To Order NA</td>
                                                            <td>N/A</td>
                                                            <td>Bombay Air</td>
                                                            <td>China</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>545</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i class="fas fa-plus-circle p-2"></i>
                                                                <input type="checkbox" className="p-1 mt-1" />
                                                            </td>
                                                            <td>06-Apr-2021</td>
                                                            <td>96039000</td>
                                                            <td>OTHER FACE MAKE-UP PRODUCTS : 1944-2SET-TG - PROFUSION, DEFI - NE BROWS, ARTISTRY PALETTE, 17.2 G(11.2G + 2.8G + 2G + 1.2G)</td>
                                                            <td>Z To Order NA</td>
                                                            <td>N/A</td>
                                                            <td>Bombay Air</td>
                                                            <td>China</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>545</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i class="fas fa-plus-circle p-2"></i>
                                                                <input type="checkbox" className="p-1 mt-1" />
                                                            </td>
                                                            <td>06-Apr-2021</td>
                                                            <td>96039000</td>
                                                            <td>OTHER FACE MAKE-UP PRODUCTS : 1944-2SET-TG - PROFUSION, DEFI - NE BROWS, ARTISTRY PALETTE, 17.2 G(11.2G + 2.8G + 2G + 1.2G)</td>
                                                            <td>Z To Order NA</td>
                                                            <td>N/A</td>
                                                            <td>Bombay Air</td>
                                                            <td>China</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>545</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i class="fas fa-plus-circle p-2"></i>
                                                                <input type="checkbox" className="p-1 mt-1" />
                                                            </td>
                                                            <td>06-Apr-2021</td>
                                                            <td>96039000</td>
                                                            <td>OTHER FACE MAKE-UP PRODUCTS : 1944-2SET-TG - PROFUSION, DEFI - NE BROWS, ARTISTRY PALETTE, 17.2 G(11.2G + 2.8G + 2G + 1.2G)</td>
                                                            <td>Z To Order NA</td>
                                                            <td>N/A</td>
                                                            <td>Bombay Air</td>
                                                            <td>China</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>NA</td>
                                                            <td>545</td>
                                                            <td>65</td>
                                                            <td>NOS</td>
                                                            <td>545</td>
                                                            <td>545</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>


                </div>
            </div>
        </div>
  </main>
  );
}
