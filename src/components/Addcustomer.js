import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Add } from "grommet-icons";
import { Button } from "grommet";

export default function Addcustomer(props) {

    const [customer, setCustomer] = useState({firstname:'', lastname:'', streetaddress:'', postcode:'', city:'', email:'', phone:''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        props.addCustomer(customer);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <Button style={{margin: 10}} icon={<Add />} label="New customer" primary onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new customer</DialogTitle>
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstname"
                    name="firstname"
                    value={customer.firstname}
                    onChange={inputChanged}
                    label="First name"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lastname"
                    name="lastname"
                    value={customer.lastname}
                    onChange={inputChanged}
                    label="Last name"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="streetaddress"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={inputChanged}
                    label="Street address"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="postcode"
                    name="postcode"
                    value={customer.postcode}
                    onChange={inputChanged}
                    label="Post code"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="city"
                    name="city"
                    value={customer.city}
                    onChange={inputChanged}
                    label="City"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    name="email"
                    value={customer.email}
                    onChange={inputChanged}
                    label="Email"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    name="phone"
                    value={customer.phone}
                    onChange={inputChanged}
                    label="Phone"
                    fullWidth
                />
                <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
}
