import '../scss/main.scss';
import GetNews from './models/EndPointEverything';
import GetHeadlines from './models/EndPointHeadlines';
import GetSources from './models/EndPointSources';
import {breakingNews, elements} from './views/Base';
import {pushTime, getDate} from "./components/Timestamp";
import * as article from './views/Article';
import {getToken} from './models/twitter';
import GetRSS from './models/RSSParse';
import Ticker from "./components/ticker";
import {headlines} from "./views/Base";


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
const reddit = new GetRSS('https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/news/.rss');
reddit.getResponse();
const bbc = new GetRSS('https://cors-anywhere.herokuapp.com/http://feeds.bbci.co.uk/news/rss.xml');
//bbc.getResponse();

//create Ticker instance with parameters
let ticker = new Ticker({
    childElements: document.querySelectorAll('.headlines-display__container'),
    parent: headlines.container,
    leftButton: headlines.left,
    rightButton: headlines.right,
    axis: 'X',
    fadeIn: true,
    tickerInterval: 5
});

//start the ticker
ticker.init();