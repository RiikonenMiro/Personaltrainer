import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';


export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers').then(async response => {
            try {
                const data = await response.json();
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
        { field: 'phone', sortable: true, filter: true, },
        { field: 'delete customer', cellRendererFramework: function (params) {
                return (
                    <Button variant="contained" 
                    onClick={() => deleteCustomer(params.data.links[0].href)} color="error">Delete</Button>
                );
            }
        },
        { field: 'edit customer', cellRendererFramework: function (params) {
            return (
                <Editcustomer variant="contained" customer={params.data} editCustomer={editCustomer} />
            );
        }
    }
    ]

    const deleteCustomer = (url) => {
        if (window.confirm("Would you like to delete the selected customer?")) {
            fetch(url, { method: 'DELETE' })
                .then(res => { fetchData(); alert("Customer deleted succesfully!")})
                .catch(err => console.error(err));
        }
    }

    const saveCustomer = (customer) => {
        if (!customer.firstname || !customer.lastname || !customer.email || !customer.phone || !customer.streetaddress || !customer.postcode || !customer.city) {
            return (
                alert("Error, please check that all text fields are filled!")
            );
        }
        fetch('https://customerrest.herokuapp.com/api/customers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(customer) })
            .then(response => response.json())
            .then(data => { fetchData();})
            .catch(err => console.error(err))
    }

    const editCustomer = (customer, url) => {
        if (!customer.firstname || !customer.lastname || !customer.email || !customer.phone || !customer.streetaddress || !customer.postcode || !customer.city) {
            return (
                alert("Error, please check that all text fields are filled!")
            );
        }
        fetch(url, { method: 'PUT', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(customer) })
            .then(response => response.json())
            .then(data => { fetchData(); alert("Customer has been updated succesfully!") })
            .catch(err => console.error(err))
    }

    const gridReady = (params) => {
        setGridApi(params.api);
    }

    function onBtnExport() {
        gridApi.exportDataAsCsv();
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ agCell: { display: 'flex', alignItems: 'center'} }}>
            <h2>Customers</h2>
            <div>
                <Addcustomer saveCustomer={saveCustomer} />
                <Button variant="contained" color="secondary" onClick={onBtnExport} >Export table to CSV file</Button>
            </div>
            <div className="ag-theme-material" style={{ height: 800, width: '100%', marginTop: 20, marginLeft: 20, margin: 'auto'}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customers}
                    pagination="true"
                    paginationPageSize="14"
                    onGridReady={gridReady}
                    >
                </AgGridReact>  
            </div>
        </div>
    );
}
