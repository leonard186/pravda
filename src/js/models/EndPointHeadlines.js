import {variables} from '../views/Base';
import {renderHeadlines} from '../views/Headline';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(variables.apiKey);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
export default class Headlines {
    constructor(category, page) {
        this.category = category;
        this.page = page;
}
    async getResponse() {
        newsapi.v2.topHeadlines({
            country: ['gb', 'us', 'ca', 'au'],
            category: this.category,
            pageSize: 5,
            page: this.page
        }).then(response => {
            //error handler
            console.log(response);
            response.articles.map(article => {
                console.log(article);
                renderHeadlines(article);
            })
        }).catch(error => console.log(error));
    }
}
