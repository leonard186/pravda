import {breakingNews} from './Base';
import Ticker from '../components/ticker';

export const renderBreakingNews = (rawData)=> {
    breakingNews.ul.innerHTML = '';
    console.log(rawData);
      rawData.items.map((elem, index)=> {
console.log(index);

          breakingNews.ul.innerHTML +=
              `
                  <li class="breaking__news__text__ul-li">
                      <a href="${elem.link}"><span class="breaking__news__text-content">${elem.title}</span></a>
                  </li>
              `
      });

};
