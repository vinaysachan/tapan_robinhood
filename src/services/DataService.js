import { useState } from 'react'

const DataService               =   {

    handleFormState             :   function(key, value, stateName, stateFn) {
        let data =  {...stateName};
        data[key] = value;
        stateFn({...data});
    }
       
};

export default DataService;
