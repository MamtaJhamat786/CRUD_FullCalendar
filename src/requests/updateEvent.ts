import axios from 'axios';
import { EventInput } from '@fullcalendar/core';

export const updateEvent = async (eventId: string, updatedEvent: Partial<EventInput>) => {
    try {
    await axios.put(`http://localhost:3030/events/${eventId}`, updatedEvent)
    } catch (error) {
      throw new Error('Error updating the event');
    }
  };
  
