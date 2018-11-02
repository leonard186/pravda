import {elements} from "../views/Base";

export const pushTime = (domElement) => {
    let date = new Date();
    domElement.innerHTML = date.toLocaleTimeString();
};

export const getDate = () => {
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let weekday = date.getDay();

    let returnDate = (day) => {
        switch (day) {
            case 1: return `${day}'st of`;
            case 2: return `${day}'nd of`;
            case 3: return `${day}'rd of`;
            default: return `${day}'th of`;
        }
    };
    return `${days[weekday]}, ${returnDate(day)} ${months[month]} ${year}`;
};

let time = setInterval(() => {pushTime(elements.timeNode)}, 1000);
elements.dateNode.innerHTML = getDate();