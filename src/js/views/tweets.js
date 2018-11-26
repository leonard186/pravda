import Ticker from "../components/ticker";
import {elements, sidebar} from "./Base";
import fetchTweets from '../models/TwitterAPI'
import Parser from "../components/textParser";
import {state} from "../index";
import GetNews from "../models/EndPointEverything";

export const twitterContainer = {
    twitter: document.querySelector('.articles-display__sidebar__container__ul'),
};

export class RenderTweets{
    constructor(query) {
        this.query = query;
    }

    async render() {
        const defaultTweet = new fetchTweets(this.query);
        const dataArray = await defaultTweet.getResults();
        const parseTweets = new Parser(dataArray);
        const finalResults = parseTweets.parseTwitter();

        twitterContainer.twitter.innerHTML = '';

        finalResults.map(data => {
            twitterContainer.twitter.innerHTML +=
                `
              <li class="articles-display__sidebar__container-news invisible">
                    <div class="articles-display__sidebar__container-news-img">
                        <a href="https://twitter.com/${name}" rel="author"><img src="${data.user.profile_image_url_https}" alt="placeholder for headline"></a>
                    </div>
                    <a href="https://twitter.com/${data.user.screen_name}" class="articles-display__sidebar__container-news-title"><h3>${data.user.screen_name}</h3></a>
                    <p class="articles-display__sidebar__container-news-text">${data.text}</p>
              </li>      
        `;
        });

//create new ticker instance and set the parameters
        const setTicker =  new Ticker({
            childElements: document.querySelectorAll('.articles-display__sidebar__container-news'),
            parentWrap: sidebar.tickerContainer,
            parent: sidebar.tickerUl,
            axis: 'Y'
        });
        setTicker.sidebarTicker();//start ticker
    }

};

//read user input and add to state then execute
export const searchTwitter = ()=> {
    const input = sidebar.searchInput.value;
    if(input) {
        state.searchTwitter = new RenderTweets(input);
        state.searchTwitter.render();
    }
};