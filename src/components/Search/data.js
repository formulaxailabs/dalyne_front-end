import React, {useMemo} from 'react';
import moment from 'moment-timezone';
import {catchErrorHandler, convertFloatTwoDecimal} from '../../helper/common';

const Data = (props) => {
    let item = props.item || {};
    return useMemo(() =>  (
        <tr>
            <td>
                {/* <i className="fas fa-plus-circle p-2"></i> */}
                <input type="checkbox" onChange={() => props.handleSelect(item.id)} checked={props.selIds.includes(item.id)} className="p-1 mt-1 ml-2" />
            </td>
            <td>{(!!item.BE_DATE) ? moment(item.BE_DATE).format('DD-MMM-YYYY') : moment(item.SB_DATE).format('DD-MMM-YYYY')}</td>
            <td>{item.RITC}</td>
            <td>{item.RITC_DISCRIPTION}</td>
            <td>{item.UQC}</td>
            <td>{item.QUANTITY}</td>
            <td>{item.EXPORTER_NAME}</td>
            <td>{item.COUNTRY_OF_ORIGIN}</td>
            <td>{item.PORT_OF_LOADING}</td>
            <td>{item.PORT_CODE}</td>
            <td>{item.PORT_OF_DISCHARGE}</td>
            <td>{item.MODE_OF_PORT}</td>
            <td>{item.IMPORTER_NAME}</td>
            {/* <td>-</td> */}
            {/* <td>{item.MONTH}</td>
            <td>{item.YEAR}</td> */}
            <td>{item.TWO_DIGIT}</td>
            <td>{item.FOUR_DIGIT}</td>
            {/* <td>-</td> */}
            <td>{item.CURRENCY}</td>
            <td>{convertFloatTwoDecimal(item.UNT_PRICE_FC)}</td>
            <td>{convertFloatTwoDecimal(item.INV_VALUE_FC)}</td>
            <td>{convertFloatTwoDecimal(item.UNT_PRICE_INR)}</td>
            <td>{item.INV_NO}</td>
            <td>{item.BE_NO}</td>
            <td>{convertFloatTwoDecimal(item.UNT_RATE_WITH_DUTY)}</td>
            {/* <td>{convertFloatTwoDecimal(item.PER_UNT_DUTY)}</td> */}
            <td>{convertFloatTwoDecimal(item.DUTY_INR)}</td>
            <td>{convertFloatTwoDecimal(item.PER_UNT_DUTY)}</td>
            <td>{convertFloatTwoDecimal(item.DUTY_FC)}</td>
            <td>{convertFloatTwoDecimal(item.DUTY_PERCENT)}</td>
            <td>{convertFloatTwoDecimal(item.EX_TOTAL_VALUE)}</td>
            <td>{convertFloatTwoDecimal(item.ASS_VALUE_INR)}</td>
            <td>{convertFloatTwoDecimal(item.ASS_VALUE_USD)}</td>
            <td>{convertFloatTwoDecimal(item.ASS_VALUE_FC)}</td>
            <td>{convertFloatTwoDecimal(item.ASS_VALUE_INR)}</td>
            <td>{convertFloatTwoDecimal(item.ASS_VALUE_USD)}</td>
            <td>{convertFloatTwoDecimal(item.ASS_VALUE_FC)}</td>
            <td>{item.EXCHANGE_RATE}</td>
            <td>{item.EXPORTER_ADDRESS}</td>
            <td>{item.iec}</td>
            <td>{item.IMPORTER_ADDRESS}</td>
            <td>{item.IMPORTER_CITY_STATE}</td>
            <td>{item.IMPORTER_PIN}</td>
            <td>{item.IMPORTER_PHONE}</td>
            <td>{item.IMPORTER_EMAIL}</td>
            <td>{item.IMPORTER_CONTACT_PERSON}</td>
            <td>{item.BE_TYPE}</td>
            <td>{item.CHA_NAME}</td>
            {/* <td>-</td> */}
        </tr>
    ), [props.item, props.selIds])
}
export default Data;