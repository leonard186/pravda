import Ticker from "../components/ticker";
import {sidebar} from "./Base";

export const twitterContainer = {
    twitter: document.querySelector('.articles-display__sidebar__container__ul'),
};

export const renderTweets = (name, text, img) => {
    twitterContainer.twitter.innerHTML +=
        `
              <li class="articles-display__sidebar__container-news invisible">
                    <div class="articles-display__sidebar__container-news-img">
                        <a href="https://twitter.com/${name}" rel="author"><img src="${img}" alt="placeholder for headline"></a>
                    </div>
                    <a href="https://twitter.com/${name}" class="articles-display__sidebar__container-news-title"><h3>${name}</h3></a>
                    <p class="articles-display__sidebar__container-news-text">${text}</p>
              </li>      
        `;
};