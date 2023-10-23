import {useState, ChangeEvent, useEffect} from 'react'
import { useCreateEvent } from '../hooks/useCreateNewEvent';
import { EventInput } from '@fullcalendar/core';
import '../customCss/calendar.css'
import useEventUpdate from '../hooks/useUpdateEvent';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import useDeleteEvent from '../hooks/useDeleteEvent';

interface EventInfo{
    eventTitle: string;
    eventDate: string;
    eventStartTime: string
    eventEndTime: string
}
interface OpenEvent{
    show?: boolean;
    handleClose?:()=>void;
    eventInfo?: EventInput | undefined 
}
export const generateTimeOptions=(startHour: number, endHour: number, startMinute: number, interval: number)=> {
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push(
                <option key={time} value={time}>
                    {time}
                </option>
            );
        }
    }
    return options;
}

const EventInfoModal:React.FC<OpenEvent> = ({show, handleClose, eventInfo}) => {
    const { createEvent } = useCreateEvent();
    const{ updateEvent } = useEventUpdate()
    const overlayClass = show ? 'overlay show' : 'overlay';
    const [error, setError] = useState('');
    const {deleteEvent} = useDeleteEvent();
    const initialEvent= {
      eventTitle: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
    }
   
    const [formData, setFormData] = useState<EventInfo>(initialEvent);
      const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event?.target;
        setFormData((prevData) => ({
            ...prevData, // Use the previous state
            [name]: value,
          }));
      };
      useEffect(() => {
        if (eventInfo) {
          let eventStartDate = null;
          let eventEndDate = null;
      
          if (typeof eventInfo.start === 'string') {
            // Handle if eventInfo.start is a string
            eventStartDate = new Date(eventInfo.start);
          } else if (eventInfo.start instanceof Date) {
            // Handle if eventInfo.start is a Date object
            eventStartDate = eventInfo.start;
          }
      
          if (typeof eventInfo.end === 'string') {
            // Handle if eventInfo.end is a string
            eventEndDate = new Date(eventInfo.end);
          } else if (eventInfo.end instanceof Date) {
            // Handle if eventInfo.end is a Date object
            eventEndDate = eventInfo.end;
          }
        
      
          setFormData({
            eventTitle: eventInfo.title ?? '',
            eventDate: eventStartDate ? eventStartDate.toISOString().split('T')[0] : '',
            eventStartTime: eventStartDate ? eventStartDate.toISOString().split('T')[1].substring(0, 5) : '',
            eventEndTime: eventEndDate ? eventEndDate.toISOString().split('T')[1].substring(0, 5) : '',
          });
          
        }
      }, [eventInfo]);

      
      const handleCreateUpdate = () => {
        const { eventTitle, eventDate, eventStartTime, eventEndTime } = formData;

        if (new Date(`${eventDate}T${eventStartTime}`) >= new Date(`${eventDate}T${eventEndTime}`)) {
          setError('End time should be after the start time');
          return; 
        }
        if (eventStartTime === eventEndTime) {
          setError('End time should not be the same as the start time');
          return; 
        }
        const start = `${eventDate}T${eventStartTime=== '' ? '09:00': eventStartTime}:00`;
        const end = `${eventDate}T${eventEndTime}:00`;

        const newEventData = {
            title: eventTitle,
            start: start,
            end: end,
        };
        if (eventInfo && eventInfo.id) {
            updateEvent(String(eventInfo.id), newEventData)
              .then((updatedEvent) => {
                 handleClose?.(); 
                 setError('');
                 setFormData(initialEvent)
                 
              })
              .catch((error) => {
                console.error('Error updating event:', error);
              });
          } else {
            createEvent(newEventData)
              .then((createdEvent) => {
                console.log('Event created:', createdEvent);
                handleClose?.();
                setError('');
                setFormData(initialEvent)
              })
              .catch((error) => {
                console.error('Error creating event:', error);
              });
          }
    };
    const deleteOneEvent=()=>{
        deleteEvent(String(eventInfo?.id))
        handleClose?.(); 

    }
   
  return (
    <div className={overlayClass}>
         <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{eventInfo?.id ? 'Edit Event': 'Create new event'}</h5>
                    <div className="d-flex align-items-center gap-1">
                        {eventInfo?.id  && 
                        <button className="btn" onClick={deleteOneEvent}>
                            <Icon style={{background: 'transparent', color: 'rgb(234, 94, 93)'}} 
                                path={mdiDelete} size={1.5} 
                            />
                        </button>
                            
                        }
                    <button type="button" className="btn-close" 
                      onClick={()=>{
                        handleClose?.(); 
                        setFormData(initialEvent)}}></button>
                    </div>
                    
                </div>
                <div className="modal-body">
                {error && (
                  <div style={{color: 'red', marginBottom: '10px'}}>
                    {error}
                    <button className="btn btn-danger p-1 ms-1" onClick={() => setError('')}>Close</button>
                  </div>
                  )}
                    <form>
                    <div className="d-flex gap-1 mb-3">
                        <label style={{ width: "20%" }} htmlFor="event-title" className="col-form-label">Event:</label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        name="eventTitle"
                        id="event-title"
                        value={formData.eventTitle}
                        onChange={handleInputChange}
                        placeholder="Lunch"
                        />
                    </div>
                    <div className="d-flex mb-3 gap-1">
                        <label style={{ width: "20%" }} htmlFor="message-text" className="col-form-label">Date:</label>
                        <input
                        required
                        type="date"
                        name="eventDate"
                        className="form-control"
                        id="event-date"
                        value={formData.eventDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="d-flex mb-3 gap-1">
                        <label style={{ width: "20%" }} htmlFor="event-start-time" className="col-form-label">Start Time</label>
                        <select
                            required
                            className="form-select"
                            name="eventStartTime"
                            id="event-start-time"
                            value={formData?.eventStartTime}
                            onChange={handleInputChange}
                            >
                            {generateTimeOptions(9, 17, 0, 30).map((option) => (
                            <option
                                key={option.props.value}
                                value={option.props.value}
                                selected={option.props.value === formData.eventStartTime ? true : false}
                            >
                                {option.props.children}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="d-flex mb-3 gap-1">
                        <label style={{ width: "20%" }} htmlFor="event-end-time" className="col-form-label">End Time</label>
                        <select
                        required
                        className="form-select"
                        name="eventEndTime"
                        id="event-end-time"
                        value={formData?.eventEndTime}
                        onChange={handleInputChange}
                        >
                       {generateTimeOptions(9, 17, 0, 30).map((option) => (
                        <option
                            key={option.props.value}
                            value={option.props.value}
                            selected={option.props.value === formData.eventEndTime ? true : false}
                        >
                            {option.props.children}
                        </option>
                        ))}
                        </select>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" 
                      onClick={()=>{
                        handleClose?.(); 
                        setFormData(initialEvent)
                        }}>
                        Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleCreateUpdate}>Save</button>
                </div>
                </div>
            </div>
    </div>
    </div>
  )
}

export default EventInfoModal;
