export const getCurrentDate = (separator = '-') => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let day = weekday[newDate.getDay()%7];
    return { day: day, date: `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`}
}