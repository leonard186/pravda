import {renderArticle} from '../views/Article';
import {renderHeadlines, renderHeadlinesMobile} from "../views/Headline";
import {newsApiK} from './Keys';
import Parser from '../controller/TextParser'

const baseURL = 'https://newsapi.org/v2/';
const key = newsApiK[0].concat(newsApiK[1], newsApiK[2], newsApiK[3]);

export default class GetNews {
    constructor(query) {
        query = Object.assign({}, GetNews.default, query);
        this.query = query;
        this.searchInHeadlines = []; //store headlines results
        this.searchInEverything = []; //store search query results
        this.complementary = []; //store both headlines and search query results
    }

    //search any content in 'Everything' endpoint
    async searchQuery() {
        const responseE = await fetch(`${baseURL}everything?q=${encodeURI(this.query.searchQuery)}&apiKey=${key}`);
        const responseH = await fetch(`${baseURL}top-headlines?q=${encodeURI(this.query.searchQuery)}&apiKey=${key}`);
        await this.getResults(responseH, responseE);
    }

    //query by country or by category
    async categories() {
        const responseH = await fetch(`${baseURL}top-headlines?country=${this.query.country}&category=${this.query.category}&apiKey=${key}`);
        const responseE = await fetch(`${baseURL}everything?q=${this.query.category}&apiKey=${key}`);
        await this.getResults(responseH, responseE);
    }

    //process promises
    async getResults(responseH, responseE) {
        const tabletView = window.matchMedia("(max-width: 850px)");
        const jsonH = await responseH.json();
        const jsonE = await responseE.json();
        this.searchInHeadlines = Parser.parseNews(this.filter(jsonH.articles));
        this.searchInEverything = Parser.parseNews(this.filter(jsonE.articles));
        this.complementary = this.searchInHeadlines.concat(this.searchInEverything);
        await tabletView.matches ? renderHeadlinesMobile(this.complementary) : renderHeadlines(this.complementary);
        await renderArticle(this.searchInEverything);
    }

    //filter through result object and return an array of valid items
    filter(result) {
        let final = [];
        result.map(e => {
            if(e.urlToImage !==null && e.urlToImage.startsWith('https://')  && e.content !==null && e.title !==null &&  e.description !==null && e.source.name !==null) {
                final.push(e);
            }
        });
        return final
    };
}

//default parameters
GetNews.default = {
    searchQuery: 'brexit',
    country: 'gb',
    category: 'general',
    language: 'en',
};