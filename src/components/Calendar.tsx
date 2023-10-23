import React,{useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import '../customCss/calendar.css'
import { useNavigate } from 'react-router-dom';
import { useGetAllEvents } from '../hooks/useGetAllEvents';
import CreateEvent from './EventInfoModal';
import { useMediaQuery } from 'react-responsive';
import { EventClickArg } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';

const Calendar: React.FC = () => {
  
  const events= useGetAllEvents();
  const navigate = useNavigate();

  const [eventInfo, setEventInfo]= useState<EventInput>()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getOneEvent= (eventInfo: EventClickArg)=>{
    const {event} = eventInfo
    const { _def } = event
    const eventId= _def.publicId;
    console.log(eventInfo)

    const filteredEvents = events.filter((event) => event.id === eventId)[0];
    console.log(filteredEvents)

    const eventTitle= filteredEvents?.title
    const eventStartTime= filteredEvents?.start
    const eventEndTime= filteredEvents?.end
    setEventInfo({
      id: eventId as string,
      title: eventTitle,
      start: eventStartTime,
      end: eventEndTime
    })
    setIsModalOpen(true)
    navigate(`/event/${eventId}`);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };
  const isMobile = useMediaQuery({ query: `(max-width: 826px)` });
  return (
    <div style={{padding:'10px', width:'-webkit-fill-available'}}>
      {isMobile && <h4 style={{display: 'flex', marginBottom: '10px'}}>Event Calendar</h4>}
        <CreateEvent 
          show={isModalOpen}
          handleClose={closeModal}
          eventInfo={eventInfo}
        />
        <FullCalendar
          customButtons={{
                myCustomButton: {
                    text: 'Create new event',
                    click: function() {
                      setIsModalOpen(true)
                    },
                },
            }}
            plugins={[dayGridPlugin, timeGridPlugin]}
            headerToolbar={{
              start:'myCustomButton',
              center: 'title',
              right: 'prev,next',
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events}
            eventClick={getOneEvent}
          />
      
    </div>
  )
}

export default Calendar
