import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { format, parseISO } from 'date-fns';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings').then(async response => {
            try {
                const data = await response.json();
                console.log(data.content);
                setTrainings(data.content);
            } catch (error) {
                console.error(error);
            }
        })
    }

    const columns = [
        { field: 'activity', sortable: true, filter: true },
        { field: 'date', sortable: true, filter: true, cellRendererFramework: function (params){
            return (
                <p>{format(parseISO(params.data.date), 'dd.MM.yyyy hh:mm a', { timeZone: "UTC" })}</p>
            );
            }, getQuickFilterText: function (params) {
                return format(parseISO(params.data.date), 'dd.MM.yyyy hh:mm a', { timeZone: "UTC" });
            }
        },
        { field: 'duration', sortable: true, filter: true },
    ]

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="ag-theme-material" style={{height: 800, width: 1200, marginTop: 20, margin: 'auto'}}>
            <h2>Trainings</h2>
            <AgGridReact
                columnDefs={columns}
                rowData={trainings}
                pagination="true"
                paginationPageSize="14"
                >
            </AgGridReact>  
        </div>
    );
}
