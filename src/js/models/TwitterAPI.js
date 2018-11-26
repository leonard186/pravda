import {twitterK} from "./keys";
import Parser from '../components/textParser';

let baseURL = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token';
let base64Key = twitterK[0].concat(twitterK[1], twitterK[2], twitterK[3]);
let contentType = 'application/x-www-form-urlencoded';


//callback function to handle token and retrieve response object
/*
const request = (response) => {
    let query = encodeURI('top news');
    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=${query}&lang=en`;

    fetch(queryURL, {
        method: 'GET',
        headers: {'Authorization' : response}
    }).then(promise => promise.json())
        .then(result => {
            //console.log(result);
            let parseTweets = new Parser(result.statuses);
            return parseTweets.parseTwitter();

            twitterContainer.twitter.innerHTML = '';
            tweets.map(entry => {
               renderTweets(entry.user.screen_name, entry.text, entry.user.profile_image_url_https);
            });

            //create new ticker instance and set the parameters
            let setTicker =  new Ticker({
                childElements: document.querySelectorAll('.articles-display__sidebar__container-news'),
                parentWrap: sidebar.tickerContainer,
                parent: sidebar.tickerUl,
                axis: 'Y'
            });
            setTicker.sidebarTicker();//start ticker

        })
        .catch(error => console.log('[ERROR] resource server endpoint: ' + error));
};



//get token function
export const getToken = () => {
    try{
        fetch(baseURL, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization': base64Key,
                'Content-Type': contentType,
            }
        }).then(promise => promise.json())
            .then(response => {request('Bearer ' + response.access_token);})
            .catch(error => console.log('ERRORS:', error));
    } catch(error) {
        throw error;
    }
};*/

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
        return result.statuses;
    }

}



