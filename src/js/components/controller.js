import GetNews from '../models/EndPointEverything';
import {
    categories,
    elements,
    geographicLocationQuery,
    menuSearch,
    mobileNav,
    sidebar,
    stickyNav,
    video
} from "../views/Base";
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
export const navigationToggle = ()=> {
    let mobileNavElements = [mobileNav.nav, mobileNav.navBackground, mobileNav.navMenu, mobileNav.navButton];
    const mobileCategoryButtons = [... mobileNav.categoryButtons].concat([... mobileNav.geoLocButtons]);
    const header = document.querySelector('.header');
    const scroll = document.getElementById('scroll-top');
    let prevScrollPos = window.pageYOffset;
    const trigger = header.offsetTop + 50;


    const scrollToHeadlines = ()=> {
        mobileNav.checkbox.checked = false; // hide mobile navigation
        jump('.headlines-display');//scroll to headlines
    };

    //on search, scroll to headlines
    clickAndEnter(mobileNav.input, mobileNav.searchButton, scrollToHeadlines);
    clickAndEnter(menuSearch.input, null, scrollToHeadlines);
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


export const videoToggle = ()=> { //show video player on user request
    video.play.addEventListener('click', ()=> { //insert video players into page on user interaction
        video.play.setAttribute('style', 'animation: spin 2s infinite;');
            video.parent.innerHTML +=
                `<div class="videos__main">
                    <iframe width="900" height="525" src="https://www.youtube-nocookie.com/embed/XOacA3RYrXk"
                            frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
    
                <div class="videos__sub">
                    <h3 class="videos__sources">Other Sources</h3>
                    <div class="videos__sub-wrapper">
                        <div class="videos__top">
                            <iframe id="ls_embed_1541523791" src="https://livestream.com/accounts/21596942/events/6378067/player?width=640&height=360&enableInfoAndActivity=true
                                &autoPlay=false&mute=false" width="300" height="220" frameborder="0" scrolling="no"
                                    allowfullscreen> </iframe>
                        </div>
                        <div class="videos__bottom">
                            <iframe frameborder="0" width="300" height="220"
                                    src="https://www.dailymotion.com/embed/video/x2j4h4m" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>`;

            setTimeout(()=> { //after 3 seconds delay remove the play button and show video players
                const mainVideo = document.querySelector('.videos__main');
                const subVideo = document.querySelector('.videos__sub');
                if(document.querySelector('.videos')) document.querySelector('.videos').removeChild(document.querySelector('.videos__play'));
                mainVideo.setAttribute('style', 'display: table; opacity: 1');
                subVideo.setAttribute('style', 'display: table; opacity: 1')
            }, 3000)
    })
};
