import {breakingNews} from './Base';
import Ticker from '../controller/Ticker';
import GetRSS from '../models/RssParse';

export async function renderBreakingNews() {

     const reddit = new GetRSS('https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/news/.rss');
    const result = await reddit.getResponse();
        breakingNews.ul.innerHTML = ''; //clear dom element prior to appending fresh content
        result.map((elem)=> { //render filtered titles to the DOM
            breakingNews.ul.innerHTML +=
                `
                  <li class="breaking__news__text__ul-li">
                      <a href="${elem.link}"><span class="breaking__news__text-content">${elem.title}</span></a>
                  </li>
              `
        });

        //create Ticker instance with parameters
        let ticker = new Ticker({
            childElements: document.querySelectorAll('.breaking__news__text__ul-li'),
            parent: breakingNews.ul,
            leftButton: breakingNews.left,
            rightButton: breakingNews.right,
            axis: 'Y',
            interval: 5000
        });

        //start the ticker
        ticker.init();
}
