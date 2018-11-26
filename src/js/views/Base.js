export const elements = {
    searchInput: document.getElementById('search'),
    searchButton: document.getElementById('search-button'),
    articleNode: document.querySelector('.articles-display__content'),
    sectionNode: document.getElementById('sources'),
    dateNode: document.getElementById('header-date'),
    timeNode: document.getElementById('header-time'),
    headerNews: document.querySelector('.header__news-snippet')
};
export const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

export const sidebar = {
    tickerContainer : document.querySelector('.articles-display__sidebar__container'),
    tickerUl : document.querySelector('.articles-display__sidebar__container__ul'),
    searchInput: document.getElementById('twitter-search__input'),
    searchButton: document.getElementById('twitter-search__button')
};

export const header = {
    ul: document.querySelector('.header__news-snippet__ul')
};

export const breakingNews = {
    ul: document.querySelector('.breaking__news__text > ul'),
    left: document.getElementById('breaking-left'),
    right: document.getElementById('breaking-right'),
};

export const headlines = {
    left: document.querySelector('.headlines-display__arrows-left'),
    right: document.querySelector('.headlines-display__arrows-right'),
    container: document.querySelector('.headlines-display__slider-wrap'),
    article: document.querySelectorAll('.headlines-display__container > article')
};

export const menuSearch = {
    input: document.querySelector('.top-menu__search-input'),
    button: document.getElementById('search-button')
}