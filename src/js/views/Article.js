import {elements, menuSearch} from './Base';
import GetNews from "../models/EndPointEverything";
import {state} from "../index";

export const renderArticle = (array) => {
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
};

//read user input and add to state then execute
export const userQuery = ()=> {
    const input = elements.searchInput.value;
    if(input) {
        state.search = new GetNews({searchQuery: input});
        state.searchHeadlines = new GetNews({searchQuery: input});
        state.search.searchQuery();
    }
};


