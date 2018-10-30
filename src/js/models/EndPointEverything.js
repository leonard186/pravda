import {renderArticle} from '../views/Article';
import handleErrors from './ErrorHandler';
import {variables} from '../views/Base';

const baseURL = 'https://newsapi.org/v2/';


export default class GetNews {
    constructor(query) {
        this.query = query;
    }
    async getResponse() {
        try {
            return await fetch
            (`${baseURL}/everything?q=${this.query}&apiKey=${variables.apiKey}`)
                .then(result => {
                    console.log(`API result status: ${result.status}`);
                    //error handler
                    if(result.status === 200) {
                        return result.json();
                    } else { handleErrors(result) }
                })
                .then(dataReturned => {
                    this.data = dataReturned.articles;
                    console.log(this.data);
                    if(dataReturned) {
                        dataReturned.articles.map(article => {
                            renderArticle(article);
                        })
                    }
                })
        } catch(error) {
            console.log(error);
        }
    }
}