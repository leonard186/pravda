import GetNews from '../models/EndPointEverything';
import {categories, elements, geographicLocationQuery, headlines, sidebar, stickyNav} from "../views/Base";
import {state} from "../index";
import Ticker from "./ticker";
import {RenderTweets} from "../views/tweets";

//read user input and add to state then execute
export const userQuery = ()=> {
    const input = elements.searchInput.value;
    if(input) {
        elements.searchButton.innerHTML = '<img class="articles-display__sidebar__heading__search-button-spinner" src="./img/spinner.gif" alt="spinner">';
        state.search = new GetNews({searchQuery: input});
        state.searchHeadlines = new GetNews({searchQuery: input});
        state.search.searchQuery();
    }
};

//populate state with categories
export const headlinesPopulateState = ()=> {
    categories.forEach((category) => {
        state[category] = new GetNews({country: 'gb', category: category});
    })
};

//assign category button to their corresponding category
export const assignHeadlineButtons = ()=> {
    let buttons = document.querySelectorAll('.headlines-list__btn-group-button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', ()=>{
            state[categories[index]].categories();
        })
    })
};

//populate state with geo location search queries
export const geoLocationPopulateState = () => {
    geographicLocationQuery.forEach(geoLoc => {
        state[geoLoc] = new GetNews({searchQuery: geoLoc})
    })
};

//assign geo location button to their corresponding category
export const assignGeoLocationButtons = () => {
    let buttons = document.querySelectorAll('.articles-list__btn-group-button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', ()=> {
            state[geographicLocationQuery[index]].searchQuery();
        })
    })
};

//create Ticker instance with parameters for headline section
export const headlineTicker = new Ticker({
    childElements: document.querySelectorAll('.headlines-display__container'),
    parent: headlines.container,
    leftButton: headlines.left,
    rightButton: headlines.right,
    axis: 'X',
    fadeIn: true,
    tickerInterval: 10
});

//read user input and add to state then execute
export const searchTwitter = ()=> {
    const input = sidebar.searchInput.value;
    if(input) {
        state.searchTwitter = new RenderTweets(input);
        state.searchTwitter.render();
    }
};

//nav-bar show-hide
//show/hide navigation arrows and bookmark
export const navigationToggle = ()=> {
    let prevScrollPos = window.pageYOffset;
    let trigger = elements.articlesList.offsetTop + 50;
    window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;
            if (prevScrollPos > currentScrollPos && window.pageYOffset > trigger) {
                stickyNav.nav.style.transform = 'translateY(0px)';
            } else {
                stickyNav.nav.style.transform = 'translateY(-50px)';
            }
            prevScrollPos = currentScrollPos;
        }

};
