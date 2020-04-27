import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import moment from 'moment-with-locales-es6';


export default function Traininglist() {

    const [training, setTraining] = useState([]);

    useEffect (() => {
        getTraining();
    }, [])

    const getTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTraining(data.content))
        .catch(err => console.error(err))
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
        }
    ]

    return (
        <div>
            <ReactTable filterable={true} data={training} columns={columns}/>
        </div>
    );
}