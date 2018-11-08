let baseURL = 'https://crossorigin.me/https://api.twitter.com/oauth2/token';
let base64Key = 'Basic a3VhMjFoU1lrVkZSZ0lRaXFhSk1uNTRpQjpwZzNwZjVYeks0MFBudnBEVVg2OHRuYW02eGgyVXJ3Q1p2MnZDaDJaU1dwTmJnYVdMQw==';
let contentType = 'application/x-www-form-urlencoded';
let Token;


export const getToken = () => {
    fetch(baseURL, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization': base64Key,
            'Content-Type': contentType
        }
    }).then(res => console.log(res));
};
