import { DateTime } from 'luxon';

export const getDateAndTime = (timestamp: number | null) => {
    if (!timestamp) return '';

    const luxonDateTime = DateTime.fromMillis(timestamp);

    return luxonDateTime.toFormat('dd.MM.yyyy / HH:mm:ss');
};
