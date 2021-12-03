import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Addcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const save = () => {
        handleClickClose();
        props.saveCustomer(customer);
    }

    return (
        <div>
            <Button variant="contained" style={{ margin: 10 }} color="success" onClick={handleClickOpen}>
                Add new customer
            </Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new customer to the database!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={event => handleInputChange(event)}
                        label="Firstname"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={event => handleInputChange(event)}
                        label="Lastname"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={event => handleInputChange(event)}
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={event => handleInputChange(event)}
                        label="Phonenumber"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={event => handleInputChange(event)}
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={event => handleInputChange(event)}
                        label="Postcode"
                        type="number"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={event => handleInputChange(event)}
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClickClose} color="error">Cancel</Button>
                    <Button variant="contained" onClick={save} color="success">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}