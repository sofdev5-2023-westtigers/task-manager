export function parseDate(date) {
    if (date !== null) {
        return new Date(String(date));
    }
    return null;
}

export function parseDates(dates) {
    if (dates !== null) {
        const dateStr = String(dates);
        const strList = dateStr.split('-').map(dateString => dateString.trim());
        const dateList = strList.map(dateString => new Date(dateString));
        return dateList;
    }
    return null;
}