import React from 'react'
import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';

interface Event {
    id: number
    name: string
    backgroundColor: string
    border?: string
    color?: string
}

const events: Event[] = [
    {id: 1, name: 'Education project', backgroundColor: '#F69D80'},
    {id: 2, name: 'Theatre/concert', backgroundColor: '#A5C365'},
    {id: 3, name: 'Meeting', backgroundColor: '#DF82B1'},
    {id: 4, name: 'Traianing', backgroundColor: '#EA5E5D'},
    {id: 5, name: 'Joint Event', backgroundColor: '#CC7979'},
    {id: 6, name: 'Class Event', backgroundColor: '#EFAD4E'},
    {id: 7, name: 'Learning activity', backgroundColor: '#73CAC2'},
    {id: 8, name: 'Other event', backgroundColor: '#5BC0DE'},
    {id: 9, name: 'Public holiday', backgroundColor: '#fff', border: '1px solid red', color: 'black'},
]
const EventCalendar = () => {
  return (
    <div style={{padding:'10px'}}>
      <p className="h5 d-flex">Event calendar</p>
      <br/>
      <div className="d-flex" style={{width: 'max-content', height: 'calc(100% - 40px)'}}> 
          <div>
            <p className="d-flex" style={{fontWeight: 800, fontSize: '12px'}}>TYPES</p>
                {events.map((event)=> (
                    <div style={{marginBottom:'5px'}} className="d-flex gap-2" key={event.id}>
                        <Icon path={mdiCheck} size={0.8} 
                            style={{backgroundColor: event.backgroundColor, border: event.border, color: event.color }}
                        />
                        <div style={{fontSize: '12px'}} className="d-flex">
                            {event.name}
                        </div>
                    </div>
                    
                ))}
          </div>
          <hr className="border-gray" style={{border: '0.5px solid', marginLeft: '40px'}}/>
      </div>
      
      
    </div>
  )
}

export default EventCalendar
