import { useQuery } from 'react-query';
import { allEvents } from '../requests/getAllEvents';
import { useMemo } from 'react';

import { EventInput } from '@fullcalendar/core';

export const useGetAllEvents = (): EventInput[] => {
    const { data } = useQuery(
        ['events'],
        allEvents,
    );
    return useMemo(() => data ?? [], [data]);
};

