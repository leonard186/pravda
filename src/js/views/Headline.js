import {headlines, categories, geographicLocationQuery} from './Base';
import GetNews from "../models/EndPointEverything";
import {state} from '../index';
import Ticker from "../components/ticker";

 export const renderHeadlinesMobile = (array)=> {
     if(array.length !== 0) {
         headlines.container.innerHTML = '';

         array.forEach((element) => {

             headlines.container.innerHTML +=
                 `<div class="headlines-display__container">
                    <article class="headlines-display__primary">
                        <img src="${element.urlToImage}" alt="${element.title}" class="headlines-display__image">
                        <div class="headlines-display__text-container">
                            <h3 class="headlines-display__title">${element.source.name}</h3>
                            <p class="headlines-display__content">${element.title}</p>
                            <a href="${element.url}"><p class="headlines-display__content-full">${element.content}</p></a>
                        </div>
                    </article>
                </div>`;
         });
     } else {
         headlines.container.innerHTML =
             `<div class="headlines-display__container">
                <article class="headlines-display__primary">
                    <img src="../img/error.png" alt="Error">
                    <h3 class="headlines-display__title">Sorry, no such query exists in our database, please try another word</h3>
                </article>
            </div>`
     }

     headlines.container.style.opacity = '1';
};

export const renderHeadlines = (array) => {

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
                `<img src="../img/error.png" alt="Error">
                <h3 class="headlines-display__title">Sorry, no such query exists in our database, please try another word</h3>`
        }

        headlines.container.style.opacity = '1';
};


