import {elements} from './Base';

export const renderArticle = (data) => {
    return elements.articleNode.innerHTML +=
        `<div class="article-wrapper article-wrapper__article">
              <h1>${data.title}</h1>
              <img src="${data.urlToImage}" alt="descriptive image of news article"/>
              <p>${data.description}</p>
              <p>${data.content}</p>
              <a href="${data.url}" target="_blank">Read More</a>
         </div>
        `;
};

export const getInput = () => elements.searchInput.value;
