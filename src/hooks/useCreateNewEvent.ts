
import { useQueryClient, useMutation } from 'react-query';
import { createNewEvent } from '../requests/createNewEvent'
import { EventInput } from '@fullcalendar/core';

interface CreateEventReturn{
    createEvent: (newEventData: EventInput) => Promise<EventInput>;
    isCreating: boolean
}

export function useCreateEvent():CreateEventReturn {
    const queryClient = useQueryClient();
  
    const createEventMutation = useMutation(createNewEvent, {
      onSuccess: () => {
        queryClient.invalidateQueries('events'); 
      },
    });
    const createEvent = async (newEventData: EventInput) => {
        try {
          const result = await createEventMutation.mutateAsync(newEventData);
          return result;
        } catch (error) {
          throw new Error('Error creating event');
        }
      };
      return {
        createEvent,
        isCreating: createEventMutation.isLoading,
      };
    
}