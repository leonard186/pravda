import '../scss/main.scss';
import {renderTimeDate} from "./components/Timestamp";
import {
    headlinesPopulateState,
    assignCategoryButtons,
    geoLocationPopulateState,
    assignGeoLocationButtons,
    userQuery,
    searchTwitter, navigationToggle, videoToggle
} from "./components/controller";
import {clickAndEnter} from "./components/helperFunctions";
import {headlinesButtonGroup, menuSearch, sidebar, stickyNav, mobileNav} from "./views/Base";
import {renderBreakingNews} from "./views/BreakingNews";
import {renderHeaderNewsSnippet} from "./views/Header";
import {RenderTweets} from "./views/tweets";


export const state = {};


 async function init() {
     renderTimeDate();
     const loadDefaultTweets = new RenderTweets('top news'); //initiate default tweet query
     userQuery('latest');
//////////////************* Initiate HEADLINES **************/////////////////
//initiate state population with categories and geo location search queries
     headlinesPopulateState();
     geoLocationPopulateState();
//render initial content
     await state.technology.categories();

//assign headline and geo location buttons
     assignCategoryButtons(headlinesButtonGroup.categoryButtons);
     assignGeoLocationButtons(headlinesButtonGroup.geoLocButtons);
     assignCategoryButtons(stickyNav.categoryButtons);
     assignGeoLocationButtons(stickyNav.geoLocButtons);
     assignCategoryButtons(mobileNav.categoryButtons);
     assignGeoLocationButtons(mobileNav.geoLocButtons);

//////////////************* END **************/////////////////


//////////////************* Initiate Top Menu Search **************/////////////////
//trigger search and add search query to state - news headlines and articles
    clickAndEnter(menuSearch.input, menuSearch.button, userQuery); //execute search for top menu bar
    clickAndEnter(stickyNav.input, stickyNav.button, userQuery); //execute search for sticky navigation bar
    clickAndEnter(mobileNav.input, mobileNav.searchButton, userQuery); //execute search for sticky navigation bar

    clickAndEnter(sidebar.searchInput, sidebar.searchButton, searchTwitter); //execute twitter search
//////////////************* END **************/////////////////
     await renderHeaderNewsSnippet();
     await renderBreakingNews();
     await loadDefaultTweets.render();
}

init();

navigationToggle();
videoToggle();

