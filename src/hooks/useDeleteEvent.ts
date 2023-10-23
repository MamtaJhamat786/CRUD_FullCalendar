import { useState } from 'react';
import { useQueryClient } from 'react-query'; 
import { deleteEvent } from '../requests/deleteEvent';

// Custom hook for updating events
interface UpdateEventReturn {
    deleteEvent: (eventId: string) => Promise<void>;
    error: string;
}

const useDeleteEvent = (): UpdateEventReturn => {
  const queryClient = useQueryClient(); // Create an instance of queryClient
  const [error, setError] = useState('');

  // Function to update an event
  const deleteEventById = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      queryClient.invalidateQueries('events');

    } catch (err: any) {
      setError(err.message);
    }
  };
  return {
    error,
    deleteEvent: deleteEventById,
  };
};

export default useDeleteEvent;

