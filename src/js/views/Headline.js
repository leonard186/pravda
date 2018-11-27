import {headlines, categories, geographicLocationQuery} from './Base';
import GetNews from "../models/EndPointEverything";
import {state} from '../index';
import Ticker from "../components/ticker";

export const renderHeadlines = (array) => {
    setTimeout(()=> {//delay rendering content until fade out effect finishes
        headlines.article.forEach((element, index)=> {
            element.innerHTML =
                `<img src="${array[index].urlToImage}" alt="headline placeholder 2" class="headlines-display__image">
            <div class="headlines-display__text-container">
                <h3 class="headlines-display__title">${array[index].source.name}</h3>
                <p class="headlines-display__content">${array[index].title}</p>
            </div>`
        });
        headlines.container.style.opacity = '1';
    }, 250);
};

//populate state with categories
export const headlinesPopulateState = ()=> {
    categories.forEach((category) => {
        state[category] = new GetNews({country: 'gb', category: category});
    })
};

//assign category button their corresponding category
export const assignHeadlineButtons = ()=> {
    let buttons = document.querySelectorAll('.headlines-list__btn-group-button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', ()=>{
            state[categories[index]].getHeadlinesByCountry();
        })
    })
};

//populate state with geo location search queries
export const geoLocationPopulateState = () => {
    geographicLocationQuery.forEach(geoLoc => {
        state[geoLoc] = new GetNews({searchQuery: geoLoc})
    })
};

export const assignGeoLocationButtons = () => {
    let buttons = document.querySelectorAll('.articles-list__btn-group-button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', ()=> {
            state[geographicLocationQuery[index]].searchQuery();
        })
    })
};


//create Ticker instance with parameters
export const headlineTicker = new Ticker({
    childElements: document.querySelectorAll('.headlines-display__container'),
    parent: headlines.container,
    leftButton: headlines.left,
    rightButton: headlines.right,
    axis: 'X',
    fadeIn: true,
    tickerInterval: 10
});


