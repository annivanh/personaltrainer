// Basis for the code by arshaw on Github: https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/react/src/DemoApp.jsx

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import './main.scss'

export default function Calendar() {

    const [event, setEvent] = useState([]);

    useEffect(() => {
        getTraining();
    })

    const getTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
                let caldata = data;
                addCaldata(caldata)
                })
            .catch(err => console.error(err))
        }
    
    function addCaldata(data){
      let caldata = Array();
      data.map((a, index) => {
        let newDate = new Date(a.date);
        newDate.setMinutes(newDate.getMinutes() + a.duration)
        if (a.customer)
          caldata.push({title: a.activity + " " + a.customer.firstname + " " + a.customer.lastname, start: a.date, end: newDate})
      })
      setEvent(caldata)
    }

  let calendarComponentRef = React.createRef()
  
  //const handleDateClick = (arg) => {}

    return (
      <div className='demo-app'>
        <div className='demo-app-top'>
        </div>
        <div className='demo-app-calendar'>
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            ref={ calendarComponentRef }
            events={ event }
            />
        </div>
      </div>
    )
}