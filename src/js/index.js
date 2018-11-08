import '../scss/main.scss';
import GetNews from './models/EndPointEverything';
import GetHeadlines from './models/EndPointHeadlines';
import GetSources from './models/EndPointSources';
import {elements} from './views/Base';
import {pushTime, getDate} from "./components/Timestamp";
import * as article from './views/Article';
import {getToken} from './models/twitter';

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

const pushSingleHeadline = async () => {
    const category = 'general';
    let page = 1;
    state.singleHeadline = new GetHeadlines(category, page);
    await state.singleHeadline.getResponse();
    /*
    setInterval(() => {
        page < 5 ? page++ : page=1;
        state.singleHeadline.getResponse();
        console.log(page)
    }, 5000)
    */
};



//pushSingleHeadline();

//controlHeadlines();
//controlSources();
/*
elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    elements.articleNode.innerHTML = '';
    controlSearch();
});*/


getToken();

