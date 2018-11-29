import {headlines, categories, geographicLocationQuery} from './Base';
import GetNews from "../models/EndPointEverything";
import {state} from '../index';
import Ticker from "../components/ticker";

export const renderHeadlines = (array) => {
    setTimeout(()=> {//delay rendering content until fade out effect finishes
        if(array.length !== 0) {
            headlines.article.forEach((element, index)=> {
                element.innerHTML =
                    `<img src="${array[index].urlToImage}" alt="${array[index].title}" class="headlines-display__image">
            <div class="headlines-display__text-container">
                <h3 class="headlines-display__title">${array[index].source.name}</h3>
                <p class="headlines-display__content">${array[index].title}</p>
                <a href="${array[index].url}"><p class="headlines-display__content-full">${array[index].content}</p></a>
            </div>`
            });
        } else {
            headlines.article.innerHTML =
                `
                <img src="../img/error.png" alt="Error">
                <h3 class="headlines-display__title">Sorry, no such query exists in our database, please try another word</h3>
                `
        }

        headlines.container.style.opacity = '1';
    }, 250);
};


