import {renderTweets, twitterContainer} from '../views/tweets';
import Ticker from '../components/ticker';
import {twitterK} from "./keys";
import Parser from '../components/textParser';

let baseURL = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token';
let base64Key = twitterK[0].concat(twitterK[1], twitterK[2], twitterK[3]);
let contentType = 'application/x-www-form-urlencoded';


//callback function to handle token and retrieve response object
const request = (response) => {
    let query = encodeURI('top news');
    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=${query}&lang=en`;

    fetch(queryURL, {
        method: 'GET',
        headers: {'Authorization' : response}
    }).then(promise => promise.json())
        .then(result => {
            console.log(result);
            let parseTweets = new Parser(result.statuses);
            let tweets = parseTweets.parseTwitter();
            let setTicker = new Ticker();
            //console.log(tweets.entities);
            twitterContainer.twitter.innerHTML = '';
            tweets.map(entry => {
               renderTweets(entry.user.screen_name, entry.text, entry.user.profile_image_url_https);
            });
            setTicker.sidebarTicker();
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
};



