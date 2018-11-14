import {breakingNews} from './Base';
import Ticker from '../components/ticker';

export const renderBreakingNews = (rawData)=> {
    let startTicker = new Ticker();
    breakingNews.ul.innerHTML = ''; //clear dom element prior to appending fresh content
    //filter through rss feed titles with certain character length
    let dataToDisplay = [];
    rawData.items.forEach(e=> {
        e.title.length < 80 ? dataToDisplay.push(e) :  null;
    });

    //render fitlered titles to the DOM
    dataToDisplay.map((elem, index)=> {
          breakingNews.ul.innerHTML +=
              `
                  <li class="breaking__news__text__ul-li">
                      <a href="${elem.link}"><span class="breaking__news__text-content">${elem.title}</span></a>
                  </li>
              `
      });
    startTicker.breakingNewsTicker();

};
