import {elements} from './Base';
import GetNews from "../models/EndPointEverything";
import {state} from "../index";

export const renderArticle = (array) => {
    setTimeout(()=> {//delay rendering content until fade out effect finishes
        elements.articleNode.innerHTML = '';
        array.forEach(data => {
            elements.articleNode.innerHTML +=
                `<div class="articles-display__wrap">
                <picture class="articles-display__wrap__img-container">
                <img src="${data.urlToImage}" class="articles-display__wrap__img-container-img" alt="article image">
                </picture>
                <article class="articles-display__wrap__text">
                <h3 class="articles-display__wrap__text-title">${data.source.name}</h3>
                <p class="articles-display__wrap__text-description">${data.content}</p>
                <a href="${data.url}" class="articles-display__wrap-button">Read More</a>
            </article>
        </div>`;
        });

        elements.articleNode.style.opacity = '1';
        elements.searchButton.innerHTML = '<i class="fas fa-search"></i>'; //render search button
    }, 250);


};

//read user input and add to state then execute
export const userQuery = ()=> {
    const input = elements.searchInput.value;
    if(input) {
        elements.searchButton.innerHTML = '<img class="articles-display__sidebar__heading__search-button-spinner" src="./img/spinner.gif" alt="spinner">';
        state.search = new GetNews({searchQuery: input});
        state.searchHeadlines = new GetNews({searchQuery: input});
        state.search.searchQuery();
    }
};


