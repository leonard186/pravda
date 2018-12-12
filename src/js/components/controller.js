import GetNews from '../models/EndPointEverything';
import {categories, elements, geographicLocationQuery, mobileNav, sidebar, stickyNav} from "../views/Base";
import {state} from "../index";
import {RenderTweets} from "../views/tweets";
import {clickAndEnter} from "./helperFunctions";
import jump from 'jump.js';

//read user input and add to state then execute
export const userQuery = ()=> {
    let inputField = elements.searchInput;
    const input = [].map.call(inputField, (inp)=> inp.value).join('');
    if(input) {
        elements.searchButton.forEach(elem => elem.innerHTML = '<img class="articles-display__sidebar__heading__search-button-spinner" src="./img/spinner.gif" alt="spinner">');
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
export const assignCategoryButtons = (buttonCollection)=> {
    console.log(buttonCollection);
    buttonCollection.forEach((button, index) => {
        button.addEventListener('click', ()=>{
            console.log(state[categories[index]].query.category);
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
export const assignGeoLocationButtons = (buttonCollection) => {
    buttonCollection.forEach((button, index) => {
        button.addEventListener('click', ()=> {
            state[geographicLocationQuery[index]].searchQuery();
        })
    })
};

//read user input and add to state then execute
export const searchTwitter = ()=> {
    const input = sidebar.searchInput.value;
    if(input) {
        state.searchTwitter = new RenderTweets(input);
        state.searchTwitter.render();
    }
};

//nav-bar toggle visibility(mobile and desktop)
export const mobileNavToggle = ()=> {
    let mobileNavElements = [mobileNav.nav, mobileNav.navBackground, mobileNav.navMenu, mobileNav.navButton];
    const mobileCategoryButtons = [... mobileNav.categoryButtons].concat([... mobileNav.geoLocButtons]);
    const header = document.querySelector('.header');
    const scroll = document.getElementById('scroll-top');
    const headlines = document.querySelector('.headlines-display').offsetTop;
    let prevScrollPos = window.pageYOffset;
    const trigger = header.offsetTop + 50;

    //scroll to headlines and hide mobile navigation
    const scrollToHeadlines = ()=> {
        mobileNav.checkbox.checked = false;

        window.scrollTo({
            top: headlines,
            left: 0,
            behavior: 'smooth'
        });
    };

    //on search, scroll to headlines
    clickAndEnter(mobileNav.input, mobileNav.searchButton, scrollToHeadlines);
    //on category button click, scroll to headlines
    mobileCategoryButtons.forEach(el => {
       el.addEventListener('click', scrollToHeadlines);
    });

    //scroll back to top
    scroll.addEventListener('click', ()=> {jump('.container')});

    //on window scroll toggle menu button visibility
    window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;

        //scroll up
        if (prevScrollPos > currentScrollPos && window.pageYOffset > trigger) {
            mobileNavElements.map(el => {el.setAttribute('style', 'top: .5rem; right: .5rem;')});
            scroll.style.transform = 'translateY(0)';
            stickyNav.nav.style.transform = 'translateY(0px)';

        //reset to initial top position
        } else if(window.pageYOffset < 36) {
            mobileNavElements.map(el => {el.setAttribute('style', 'top: 6rem; right: .5rem;')});
        }

        //scroll down
        else if(prevScrollPos < currentScrollPos && window.pageYOffset > 36) {
            mobileNavElements.map(el => {el.setAttribute('style', 'top: -6rem; right: .5rem;')});
            scroll.style.transform = 'translateY(100px)';

        } else {
            stickyNav.nav.style.transform = 'translateY(-50px)';
        }

        prevScrollPos = currentScrollPos;
    }
};

