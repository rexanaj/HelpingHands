import React from "react";

import options from "./Diseases"
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';




export default function SearchBar(props) {
    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select your disease" />}
            />
            
        </div>
    );
}

SearchBar.propTypes = {
    publication: PropTypes.string,
    headline: PropTypes.string,
    mainText: PropTypes.string,
    url: PropTypes.string,
};