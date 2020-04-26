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
            id: 'date',
            accessor: d => {
            return moment(d.date).locale('fi').format('L LT')}
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