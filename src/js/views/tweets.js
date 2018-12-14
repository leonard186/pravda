import Ticker from "../controller/Ticker";
import {twitterContainer, sidebar} from "./Base";
import fetchTweets from '../models/TwitterAPI'
import Parser from "../controller/TextParser";

export class RenderTweets{
    constructor(query) {
        this.query = query;
    }

    async render() {
        const defaultTweet = new fetchTweets(this.query);
        const dataArray = await defaultTweet.getResults();
        const parseTweets = new Parser(dataArray);
        const finalResults = parseTweets.parseTwitter();

        sidebar.tickerUl.style.opacity = '0'; //hide content

        setTimeout(()=> { //delay showing results until fade-out effect happens

            twitterContainer.twitter.innerHTML = ''; //clear existing DOM elements from the container

            if(finalResults.length !== 0){ //if there are results render content to DOM

                finalResults.map(data => {

                    twitterContainer.twitter.innerHTML +=
                        `<li class="articles-display__sidebar__container-news invisible">
                            <div class="articles-display__sidebar__container-news-img">
                                <a href="https://twitter.com/${data.name}" rel="author"><img src="${data.user.profile_image_url_https}" alt="placeholder for headline"></a>
                            </div>
                            <a href="https://twitter.com/${data.user.screen_name}" class="articles-display__sidebar__container-news-title"><h3>${data.user.screen_name}</h3></a>
                            <p class="articles-display__sidebar__container-news-text">${data.text}</p>
                      </li> `;
                });

            } else {   //if there are no results returned show error message
                twitterContainer.twitter.innerHTML =
                    `<li class="articles-display__sidebar__container-news invisible">
                        <div class="articles-display__sidebar__container-news-img">
                            <img src="../img/error.png" alt="Error">
                        </div>
                        <h3 class="articles-display__sidebar__container-news-title">ERROR</h3>
                        <p class="articles-display__sidebar__container-news-text">No results found, please try a different search query</p>
                    </li>`
            }

            sidebar.tickerUl.style.opacity = '1'; //fade in results
            sidebar.searchButton.innerHTML = '<i class="fas fa-search"></i>'; //render search button

            //create new ticker instance and set parameters
            const setTicker =  new Ticker({
                childElements: document.querySelectorAll('.articles-display__sidebar__container-news'),
                parentWrap: sidebar.tickerContainer,
                parent: sidebar.tickerUl,
                axis: 'Y'
            });
            setTicker.sidebarTicker();//start ticker
        }, 200);
    }
}
