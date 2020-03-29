const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getFormatedDate(dateString) {

    var reggie = /(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/;
    var dateArray = reggie.exec(dateString);
    var d = new Date((+dateArray[1]), (+dateArray[2]) - 1, (+dateArray[3]), (+dateArray[4]), (+dateArray[5]), (+dateArray[6]));

    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = months[d.getMonth()];
    const dayName = days[d.getDay()]
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const formatted = `${hour}:${minutes}, ${dayName}, ${date} ${monthName} ${year}`

    return formatted;

}