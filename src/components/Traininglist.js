import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import moment from 'moment-with-locales-es6';
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from 'grommet';
import { Trash } from 'grommet-icons';



export default function Traininglist() {

    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect (() => {
        getTraining();
    }, [])

    const getTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTraining(data)
            })
        .catch(err => console.error(err))
    }

    const deleteTraining = (row) => {
        console.log(row)
        if (window.confirm('Are you sure?')){
        setTraining(training.filter((training, index) => index !== row))};
        setMsg('Training deleted');
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    
    const columns = [
        {
            Header: 'Date',
            id: 'date', //A unique ID is required if the accessor is not a string https://github.com/tannerlinsley/react-table/tree/v6#columns
            accessor: date => {
            return moment(date.date).format('L LT')} // L on päiväys (paikallisessa formaatissa ja LT on aika ilman sekunteja) https://momentjscom.readthedocs.io/en/latest/moment/01-parsing/03-string-format/
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            id: 'customerid', // Tämä oltava, koska muuten tulee herja "A column id is required if using a non-string accessor for column above.""
            accessor: c => {
                return (c.customer.firstname + ' ' + c.customer.lastname)}
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: row => <Button icon={<Trash />} onClick={() => deleteTraining(row.index)}>Delete</Button>
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={training} columns={columns} defaultPageSize={5}/>
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