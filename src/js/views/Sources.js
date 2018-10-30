import {elements} from './Base';

export const renderSources = (data) => {
    return elements.sectionNode.innerHTML +=
        `<div class="sources-wrapper sources-wrapper__sources">
              <h4>${data.name}</h4>
              <p>${data.description}</p>
              <a href="${data.url}" target="_blank">Read More</a>
         </div>
        `;
};