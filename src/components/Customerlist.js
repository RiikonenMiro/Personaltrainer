import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers').then(async response => {
            try {
                const data = await response.json();
                console.log(data.content);
                setCustomers(data.content);
            } catch (error) {
                console.error(error);
            }
        })
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true, }
    ]

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="ag-theme-material" style={{height: 800, width: '100%', marginTop: 20, margin: 'auto'}}>
            <h3>Customers</h3>
            <AgGridReact
                columnDefs={columns}
                rowData={customers}
                pagination="true"
                paginationPageSize="14"
                >
            </AgGridReact>  
        </div>
    );
}
