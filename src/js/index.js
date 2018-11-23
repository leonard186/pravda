import '../scss/main.scss';
import GetNews from './models/EndPointEverything';
import {pushTime, getDate} from "./components/Timestamp";
import * as article from './views/Article';
import {executeSearch} from "./views/Article";
import {getToken} from './models/twitter';
import GetRSS from './models/RSSParse';
import {headlinesPopulateState, assignHeadlineButtons, headlineTicker} from "./views/Headline";
import {clickAndEnter} from "./components/helperFunctions";
import {menuSearch} from "./views/Base";
import {userQuery} from "./views/Article";


export const state = {};



userQuery('latest');
//////////////************* Initiate HEADLINES **************/////////////////
//initiate state population with categories
headlinesPopulateState();
//render initial content
state.business.getHeadlinesByCountry();
//assign headline buttons
assignHeadlineButtons();
//start the ticker effect
headlineTicker.init();
//////////////************* END **************/////////////////


//////////////************* Initiate Top Menu Search **************/////////////////
//trigger search and add search query to state
clickAndEnter(menuSearch.input, menuSearch.button, userQuery);
//////////////************* END **************/////////////////










/*
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

};*/



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



