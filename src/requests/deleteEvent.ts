import axios from 'axios';

export const deleteEvent = async (eventId: string) => {
    try {
    await axios.delete(`http://localhost:3030/events/${eventId}`)
    } catch (error) {
      throw new Error('Error deleting the event');
    }
  };
  
