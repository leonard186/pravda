import '../scss/main.scss';
import {pushTime, getDate} from "./components/Timestamp";
import {
    headlinesPopulateState,
    assignHeadlineButtons,
    headlineTicker,
    geoLocationPopulateState,
    assignGeoLocationButtons,
    userQuery,
    searchTwitter, navigationToggle
} from "./components/controller";
import {clickAndEnter} from "./components/helperFunctions";
import {menuSearch, sidebar} from "./views/Base";
import {renderBreakingNews} from "./views/BreakingNews";
import {renderHeaderNewsSnippet} from "./views/Header";
import {RenderTweets} from "./views/tweets";


export const state = {};

 async function init() {
     const loadDefaultTweets = new RenderTweets('top news'); //initiate default tweet query
     clickAndEnter(sidebar.searchInput, sidebar.searchButton, searchTwitter);
     userQuery('latest');
//////////////************* Initiate HEADLINES **************/////////////////
//initiate state population with categories and geo location search queries
     headlinesPopulateState();
     geoLocationPopulateState();
//render initial content
     await state.general.categories();

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
     await loadDefaultTweets.render();
}

//init();

navigationToggle();
