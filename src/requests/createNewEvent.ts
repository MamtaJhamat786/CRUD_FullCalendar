import axios from "axios";
import { EventInput } from '@fullcalendar/core';

export interface Events {
    id: number;
    title: string;
    startAt: string;
    endAt: string;
}

export const createNewEvent = async (newEvent: EventInput): Promise<EventInput> => {
    try {
      const response = await axios.post('http://localhost:3030/events', newEvent); // Replace with your API endpoint
      return response.data; // Assuming the API responds with the created event
    } catch (error) {
      throw new Error('Error posting new events');
    }
  };