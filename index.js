'use strict';

/* 
Resources
Display a list of national parks in an area.
Review The National Parks Services API documentation and create an API key.
https://www.nps.gov/subjects/developer/get-started.htm
Review the API Guide on Authentication for ways to pass your API key as part of the request.
https://www.nps.gov/subjects/developer/guides.htm
Review the /parks endpoint and data model to understand how it works.
https://www.nps.gov/subjects/developer/api-documentation.htm#/parks/getPark
https://www.nps.gov/subjects/developer/api-documentation.htm#/definitions/Park
*/

/*
When you're done, submit the link to your GitHub repo at the bottom of the page.
Requirements:
-The user must be able to search for parks in one or more states.
-The user must be able to set the max number of results, with a default of 10.
-The search must trigger a call to NPS's API.
-The parks in the given state must be displayed on the page. Include at least:
Full name
Description
Website URL
-The user must be able to make multiple searches and see only the results for the current search.
-As a stretch goal, try adding the park's address to the results.
*/

const apiKey = "On8es5K7u2ZRE2NyFcyerlaKhAMj97jRPtpjiuGs";
const searchUrl = "https://developer.nps.gov/api/v1/parks";

function formatQueryString(params) {
    console.log('running formatQueryString')
    const queryParts = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryParts.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><a href="${responseJson.data[i].url}" target="_blank"><h3>${responseJson.data[i].fullName}</h3></a>
        <p>${responseJson.data[i].description}</p>
        </li>`
        )
    };
    $('#results').removeClass('hidden');
};

function getParks(searchState, searchMax) {
    console.log('running getParks');
    const params = {
        stateCode: searchState,
        limit: searchMax,
        api_key: apiKey,
    };
    console.log('params object set')
    const queryString = formatQueryString(params);
    const url = searchUrl + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
    console.log('request sent');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchState = $('#js-search-input').val();
        const searchMax = $('#js-max-results').val();
        getParks(searchState, searchMax);

    })
};


$(watchForm);