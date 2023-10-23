import { useState } from 'react';
import { useQueryClient } from 'react-query'; // Import useQuery and useQueryClient
import { updateEvent } from '../requests/updateEvent';
import { EventInput } from '@fullcalendar/core';

// Custom hook for updating events
interface UpdateEventReturn {
  updateEvent: (eventId: string, updatedData: EventInput) => Promise<void>;
  error: string;
}

const useEventUpdate = (): UpdateEventReturn => {
  const queryClient = useQueryClient(); // Create an instance of queryClient
  const [error, setError] = useState('');

  // Function to update an event
  const updateEventById = async (eventId: string, updatedData: EventInput) => {
    try {
      await updateEvent(eventId, updatedData);
      queryClient.invalidateQueries('events');

    } catch (err: any) {
      setError(err.message);
    }
  };
  return {
    error,
    updateEvent: updateEventById,
  };
};

export default useEventUpdate;

