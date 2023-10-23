import axios from "axios";
import { EventInput } from '@fullcalendar/core';

export interface Events {
    id: number;
    title: string;
    startAt: string;
    endAt: string;
}

export const allEvents = async (): Promise<EventInput[]> => {
    try {
        return await axios.get(
            'http://localhost:3030/events'
        ).then((res)=> res.data);
    } catch (error) {
        throw new Error('Error fetching all events');
    }
}

