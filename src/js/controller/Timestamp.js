import {elements} from "../views/Base";

//customize date
const getDate = () => {
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let weekday = date.getDay();

    let returnDate = (day) => {
        switch (day) {
            case 1:
            case 21:
            case 31:
                return `${day}'st of`;
            case 2:
            case 22:
                return `${day}'nd of`;
            case 3:
            case 23:
                return `${day}'rd of`;
            default:
                return `${day}'th of`;
        }
    };
    return `${days[weekday]}, ${returnDate(day)} ${months[month]} ${year}`;
};

//returns exact time
const pushTime = (domElement) => {
    let date = new Date();
    domElement.innerHTML = date.toLocaleTimeString(); //insert time to any given HTML Element
};

//renders exact time and date every second
export const renderTimeDate = ()=> {
    setInterval(() => {pushTime(elements.timeNode)}, 1000);
    elements.dateNode.innerHTML = getDate(); //insert date into HTML element
};