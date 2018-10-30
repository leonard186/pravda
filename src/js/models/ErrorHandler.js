

const handleErrors = (result) => {
    switch(result.status) {
        case 400:
            console.log('Bad Request, missing or misconfigured parameter');
            alert('Bad Request, missing or misconfigured parameter');
            break;
        case 401:
            console.log('Unauthorized. API key was missing from the request, or wasn\'t correct');
            alert('Unauthorized. API key was missing from the request, or wasn\'t correct');
            break;
        case 429:
            console.log('Too Many Requests. There where too many requests within a window of time and have been rate limited. Please try again later.');
            alert('Too Many Requests. There where too many requests within a window of time and have been rate limited. Please try again later.');
            break;
        case 500:
            console.log('Temporary! Server Error. Something went wrong with the NewsApi servers. Try again later');
            alert('Temporary! Server Error. Something went wrong with the NewsApi servers. Try again later');
            break;
    }
};

export default handleErrors;