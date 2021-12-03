import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { format, parseISO } from 'date-fns';
import Button from '@mui/material/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Addtraining from './Addtraining';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.error(error))
    }

    const columns = [
        { field: 'activity', sortable: true, filter: true },
        { field: 'date', sortable: true, filter: true, cellRendererFramework: function (params) {
                return (
                    <p>{format(parseISO(params.data.date), 'dd.MM.yyyy hh:mm a', { timeZone: "UTC" })}</p>
                );
            }, getQuickFilterText: function (params) {
                return format(parseISO(params.data.date), 'dd.MM.yyyy hh:mm a', { timeZone: "UTC" });
            }
        },
        { field: 'duration', sortable: true, filter: true },
        
        { field: 'customer', sortable: true, filter: true, cellRendererFramework: function (params) {
                let fullname = "";
                if (params.data.customer) {
                    fullname = params.data.customer.firstname + " " + params.data.customer.lastname;
                }
                return (
                    <p key={fullname} value={fullname}>{fullname}</p>
                );
            }, getQuickFilterText: function (params) {
                return params.data.customer.firstname + " " + params.data.customer.lastname;
            }
        },
        { field: 'delete training', cellRendererFramework: function (params) {
            return (
                <Button variant="contained" onClick={() => deleteTraining(params.data.id)} color="error">Delete</Button>
            );
        }
    }
    ]

    const saveTraining = (training) => {
        if (!training.customer || !training.activity) {
            return alert("Error, please check that all text fields are filled!")
        }
        fetch('https://customerrest.herokuapp.com/api/trainings', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(training) })
            .then(response => { response.json(); console.log(response); })
            .then(data => { fetchData(); alert("Successfully added training to a customer!") })
            .catch(error => console.error(error))
    }

    const deleteTraining = (id) => {
        if (window.confirm("Would you like to delete the selected training?")) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id,  { method: 'DELETE' })
                .then(res => { fetchData(); alert("Training deleted succesfully!")})
                .catch(error => console.error(error));
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ agCell: { display: 'flex', alignItems: 'center'} }}>
            <h2>Trainings</h2>
            <div>
                <Addtraining saveTraining={saveTraining}/>
            </div>
            <div className="ag-theme-material" style={{height: 800, width: '100%', marginTop: 20, marginLeft: 20, margin: 'auto'}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                    pagination="true"
                    paginationPageSize="14"
                    >
                </AgGridReact>  
            </div>
        </div>
    );
}
