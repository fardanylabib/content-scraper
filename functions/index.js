const functions = require('firebase-functions');
const scraper = require("./scraper");
const config = require('./resource/config');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.scrap = functions.https.onRequest((request, response) => {
    return doScrap().then(status => {
        return response.send("Scraped from warstek.com");
    });
});

async function doScrap(){
    return scraper.initScraper(config.settings, config.websites.warstek)
    .then(status1 => {
        console.log('init scraper done');
        return scraper.runScraperPageIncrement(1);
    }).then(status2 =>{
        console.log('scraping done');
        return 1;
    });
}

//test
doScrap();