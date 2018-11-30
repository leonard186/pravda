export const elements = {
    searchInput: document.querySelectorAll('.news-search-input'),
    searchButton: document.querySelectorAll('.news-search'),
    newsSearchForm: document.querySelectorAll('.search-form'),
    articleNode: document.querySelector('.articles-display__content'),
    sectionNode: document.getElementById('sources'),
    dateNode: document.getElementById('header-date'),
    timeNode: document.getElementById('header-time'),
    headerNews: document.querySelector('.header__news-snippet'),
    articlesList: document.querySelector('.articles-list')
};
export const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
export const geographicLocationQuery = ['world', 'europe', 'north america', 'south america', 'australia', 'asia', 'africa'];
export const allButtons = [... document.querySelectorAll('.headlines-list__btn-group-button')].concat([... document.querySelectorAll('.articles-list__btn-group-button')]);

export const article = {
    parent: document.querySelector('.articles-display__content'),
    articles: document.querySelectorAll('.articles-display__wrap')
};

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
};

export const headlinesButtonGroup = {
    categoryButtons: document.querySelectorAll('.headlines-list .headlines-list__btn-group > *'),
    geoLocButtons: document.querySelectorAll('.articles-list .articles-list__btn-group > *')
};

export const twitterContainer = {
    twitter: document.querySelector('.articles-display__sidebar__container__ul'),
};

export const stickyNav = {
    nav: document.querySelector('.sticky-nav'),
    button: document.getElementById('search__button'),
    input: document.getElementById('search__input'),
    categoryButtons: document.querySelectorAll('.sticky-nav__category__ul-li'),
    geoLocButtons: document.querySelectorAll('.sticky-nav__geo-location__ul-li')
};
