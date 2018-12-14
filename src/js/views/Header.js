import Ticker from '../controller/Ticker';
import {header} from './Base';
import GetRSS from '../models/RssParse';

export async function renderHeaderNewsSnippet() {

    const bbc = new GetRSS('https://cors-anywhere.herokuapp.com/http://feeds.bbci.co.uk/news/rss.xml');
    const result = await bbc.getResponse();
    header.ul.innerHTML = ''; //clear dom element prior to appending fresh content
    result.map((elem)=> { //render filtered titles to the DOM
        header.ul.innerHTML +=
            `
             <li class="header__news-snippet__ul-li">
                <a href="${elem.link}"><h2 class="header__news-snippet__ul-li-title">${elem.title}</h2></a>
                <a href="${elem.link}"><span class="header__news-snippet__ul-li-info">${elem.content}</span></a>
            </li>
              `
    });

    //create Ticker instance with parameters
    let ticker = new Ticker({
        childElements: document.querySelectorAll('.header__news-snippet__ul-li'),
        parent: header.ul,
        axis: 'Y',
        fadeIn: true,
        interval: 5000
    });

    //start the ticker
    ticker.init();
}