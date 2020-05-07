import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import { Button, Grommet } from 'grommet';
import { Trash } from 'grommet-icons';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCustomers();
    })

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer deleted');
                setOpen(true);
            })
            .catch(err => console.error(err))}
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('New customer added');
            setOpen(true); 
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(training)
        })
        //.then(_ => console.log("äääääää"))
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Training added to customer');
            setOpen(true);
        })
        .catch(err => console.log(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 160,
            Cell: row => <Addtraining customerTraining={row.original.links[0].href} addTraining={addTraining} key={row.original.links[0].href}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 90,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 70,
            Cell: row => <Button icon={<Trash />}  onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</Button>
        }
    ]
    return(
        <div>
            <Addcustomer  addCustomer={addCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} defaultPageSize={5}/>
            <Snackbar 
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }} />
        </div>
    );
}