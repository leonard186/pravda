import {elements} from './Base';

export const renderHeadlines = (data) => {
    return elements.headlinesNode.innerHTML +=
        `<div class="article-wrapper article-wrapper__headline">
              <h1>${data.title}</h1>
              <img src="${data.urlToImage}" alt="descriptive image of news article"/>
              <p>${data.description}</p>
              <p>${data.content}</p>
              <a href="${data.url}" target="_blank">Read More</a>
         </div>
        `;
};