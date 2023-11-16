export const getDateAndTime = (timestamp: number | null) => {
    if (!timestamp) return null;

    const fullDate = new Date(timestamp);

    return `${fullDate.toLocaleDateString()} / ${fullDate.toLocaleTimeString()}`;
};
