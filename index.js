/**
 * Steps:
 * 1. Init puppeteer
 * 2. Init FileIO
 * 3. Init scrap link, scrap content, write
 */
const scraper = require("./scraper");
const config = require('./resource/config');

const run = async (settings,website) => {
    console.log('SETTINGS = '+JSON.stringify(settings));
    await scraper.initScraper(settings, website);
    await scraper.runScraperPageIncrement(1);
}

run(config.settings, config.websites.warstek);
