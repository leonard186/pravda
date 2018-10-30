import {variables} from '../views/Base';
import {renderSources} from "../views/Sources";

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(variables.apiKey);
// To query sources
// All options are optional
export default class Sources {
    constructor(category) {
        this.category = category;
    }
    async getResponse() {
        newsapi.v2.sources({
            category: this.category,
            language: 'en',
        }).then(response => {
            //error handler
            console.log(response);
            response.sources.map(article => {
                console.log(article);
                renderSources(article);
            })
        }).catch(error => console.log(error));
    }
}