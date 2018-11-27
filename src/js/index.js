import '../scss/main.scss';
import {pushTime, getDate} from "./components/Timestamp";
import {
    headlinesPopulateState,
    assignHeadlineButtons,
    headlineTicker,
    geoLocationPopulateState, assignGeoLocationButtons
} from "./views/Headline";
import {clickAndEnter} from "./components/helperFunctions";
import {allButtons, menuSearch, sidebar} from "./views/Base";
import {userQuery} from "./views/Article";
import {renderBreakingNews} from "./views/BreakingNews";
import {renderHeaderNewsSnippet} from "./views/Header";
import {RenderTweets, searchTwitter} from "./views/tweets";


export const state = {};

 async function init() {

     userQuery('latest');
//////////////************* Initiate HEADLINES **************/////////////////
//initiate state population with categories and geo location search queries
     headlinesPopulateState();
     geoLocationPopulateState();
//render initial content
     await state.general.getHeadlinesByCountry();
//assign headline and geo location buttons
     assignHeadlineButtons();
     assignGeoLocationButtons();

     console.log(state);
//start the ticker effect
      headlineTicker.init();
//////////////************* END **************/////////////////


//////////////************* Initiate Top Menu Search **************/////////////////
//trigger search and add search query to state - news headlines and articles
    clickAndEnter(menuSearch.input, menuSearch.button, userQuery);
//////////////************* END **************/////////////////
     await renderHeaderNewsSnippet();
     await renderBreakingNews();
}

init();





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
//init twitter
//getToken();

//const test = new fetchTweets('top news');
//test.getResults();

const loadDefaultTweets = new RenderTweets('top news');
loadDefaultTweets.render();

clickAndEnter(sidebar.searchInput, sidebar.searchButton, searchTwitter);
