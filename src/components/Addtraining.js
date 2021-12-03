import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers] = React.useState([]);
    const [training, setTraining] = React.useState({
        date: new Date(),
        duration: 0,
        activity: "",
        customer: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
        console.log(training);
    }

    const save = () => {
        handleClickClose();
        props.saveTraining(training);
    }

    const activities = [
        "Spinning",
        "Gym training",
        "Zumba",
        "Wrestling",
        "Boxing",
        "Other"
    ]

    const fetchCustomerData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const handleDateChange = (value) => {
        setTraining({ ...training, date: value })
    }

    useEffect(() => {
        fetchCustomerData();
    }, []);


    return (
        <div>
            <Button variant="contained" style={{ margin: 10 }} color="success" onClick={handleClickOpen}>
                Add training to a customer
            </Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Add training to a customer</DialogTitle>
                <DialogContent>
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <InputLabel id="datetime-label">Date and time</InputLabel>
                        <DateTimePicker 
                            renderInput={(props) => <TextField {...props} />}
                            labelId="datetime-label"
                            name="date"
                            value={training.date}
                            onChange={(value) => handleDateChange(value)}
                            format="dd.mm.yyyy hh:mm"
                            variant="standard"
                            fullWidth
                        />
                    </LocalizationProvider>

                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={event => handleInputChange(event)}
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="outlined"
                        required
                    />

                    <InputLabel id="activity-label">Activity</InputLabel>
                    <Select
                        labelId="activity-label" 
                        id="activity"
                        name="activity"
                        value={training.activity} 
                        label="Activity" 
                        onChange={event => handleInputChange(event)}
                        fullWidth
                    >
                        {activities.map(activity => {
                            return <MenuItem value={activity}>{activity}</MenuItem>;
                    })}
                    </Select>

                    <InputLabel id="customer-label">Customer</InputLabel>
                    <Select
                        labelId="customer-label" 
                        id="customer"
                        name="customer"
                        value={training.customer} 
                        label="Customer" 
                        onChange={event => handleInputChange(event)}
                        fullWidth
                    >
                        {customers.map(customer => {
                            return <MenuItem value={customer.links[0].href}>{customer.firstname} {customer.lastname}</MenuItem>;
                    })}
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClickClose} color="error">Cancel</Button>
                    <Button variant="contained" onClick={save} color="success">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}