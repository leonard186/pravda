import {twitterK} from "./keys";

let baseURL = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token';
let base64Key = twitterK[0].concat(twitterK[1], twitterK[2], twitterK[3]);
let contentType = 'application/x-www-form-urlencoded';

export default class fetchTweets {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const queryURL = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=${encodeURI(this.query)}&lang=en`;
        const request = await fetch(baseURL, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization': base64Key,
                'Content-Type': contentType,
            }
        });
        const token = await request.json();
        const response = await fetch(queryURL, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token.access_token}
        });
        const result = await response.json();
        if(result.statuses.length === 0) {
            console.log('error in search query, please try a different word or phrase')
        }
        return result.statuses;
    }
}



