import '../scss/main.scss';
import {renderTimeDate} from "./controller/Timestamp";
import {
    headlinesPopulateState,
    assignCategoryButtons,
    geoLocationPopulateState,
    assignGeoLocationButtons,
    userQuery,
    searchTwitter, navigationToggle, videoToggle
} from "./controller/Controller";
import {clickAndEnter} from "./controller/HelperFunctions";
import {headlinesButtonGroup, menuSearch, sidebar, stickyNav, mobileNav, headlines} from "./views/Base";
import {renderBreakingNews} from "./views/BreakingNews";
import {renderHeaderNewsSnippet} from "./views/Header";
import {RenderTweets} from "./views/Tweets";
import Ticker from './controller/Ticker'


export const state = {}; //store all class instances for search queries and category buttons

 async function init() {

     renderTimeDate(); //show time and date
     const loadDefaultTweets = new RenderTweets('top news'); //initiate default tweet query
     userQuery('latest'); //initiate default article query

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


//////////////************* Render dynamic content **************/////////////////
     //initiate ticker for headlines section
     const headlineTicker = new Ticker({
         childElements: document.querySelectorAll('.headlines-display__container'),
         parent: headlines.container,
         leftButton: headlines.left,
         rightButton: headlines.right,
         axis: 'X',
         fadeIn: false,
         forHeadlines: true,
         interval: 15000
     });

     //show dynamic content
     await renderHeaderNewsSnippet();
     await renderBreakingNews();
     await loadDefaultTweets.render();
     headlineTicker.init();
//////////////************* END **************/////////////////


     //start responsive navigation
     navigationToggle();

     //show video iframes
     videoToggle();
}

 init();



