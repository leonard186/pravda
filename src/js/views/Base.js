export const elements = {
    searchInput: document.getElementById('search'),
    searchButton: document.getElementById('search-button'),
    articleNode: document.getElementById('articles'),
    headlinesNode: document.getElementById('headlines'),
    sectionNode: document.getElementById('sources'),
    dateNode: document.getElementById('header-date'),
    timeNode: document.getElementById('header-time'),
    headerNews: document.querySelector('.header__news-snippet')
};

export const sidebar = {
    tickerContainer : document.querySelector('.articles-display__sidebar__container'),
    tickerUl : document.querySelector('.articles-display__sidebar__container__ul'),
};

export const breakingNews = {
    ul: document.querySelector('.breaking__news__text > ul'),
    left: document.getElementById('breaking-left'),
    right: document.getElementById('breaking-right'),
};

export const headlines = {
    left: document.querySelector('.headlines-display__arrows-left'),
    right: document.querySelector('.headlines-display__arrows-right'),
    container: document.querySelector('.headlines-display__slider-wrap')
};

export const variables = {
    apiKey:'ec4010328c434b43a28619d8f4b0ac83'
};