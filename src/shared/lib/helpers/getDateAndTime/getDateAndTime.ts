export const getDateAndTime = (timestamp: number | null) => {
    if (timestamp) {
        const fullDate = new Date(timestamp);

        const date = fullDate.toLocaleDateString();
        const time = fullDate.toLocaleTimeString();

        return { date, time };
    }
    return null;
};
