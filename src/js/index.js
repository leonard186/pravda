"use:strict";

import '../scss/main.scss';
import GetNews from './models/EndPointEverything';
import GetHeadlines from './models/EndPointHeadlines';
import GetSources from './models/EndPointSources';
import {elements} from './views/Base';
import * as article from './views/Article';

const state = {};

const controlSearch = async () => {
    const query = article.getInput();
    console.log(query);
    if (query) {
        state.searchByQuery = new GetNews(query);
        await state.searchByQuery.getResponse();
    }
};

const controlHeadlines = async () => {
    const category = 'entertainment';
    const page = 4;
    state.getHeadlines = new GetHeadlines(category, page);
    await state.getHeadlines.getResponse();
};

const controlSources = async () => {
    const category = 'business';
    if(category) {
        state.getSources = new GetSources(category);
        await state.getSources.getResponse();
    }

};

controlHeadlines();
controlSources();

elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    elements.articleNode.innerHTML = '';
    controlSearch();
});

