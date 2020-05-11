import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const PensionByYearComponent = (props) => {
    console.log('test');
    return (
        <>
            <h1>Test</h1>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker />
            </MuiPickersUtilsProvider>
        </>);
}

export default PensionByYearComponent;