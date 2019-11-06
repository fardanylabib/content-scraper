const puppeteer = require('puppeteer');
const htmlCleaner = require('./htmlcleaner');
const fileIO = require('./fileIO');
let browser = null;
let page = null;
let website = null;
let config = null;
let initiated = false;

exports.initScraper = async (settings,webTarget) => {
    try{
        if(settings.puppeter.isUsingChrome === true){
            /*eslint-disable*/
            browser = await puppeteer.launch(settings.puppeter.props);
        }else{
            /*eslint-disable*/
            browser = await puppeteer.launch();
        }
        page = await browser.newPage();
        website = webTarget;
        config = settings;
        initiated = true;
        return 1;
    }catch(err){
        throw new Error('Error puppeteer initialization: '+ err.message);
    }
}

const scrapeLinks = async (settings,webTarget, pageNum) => {
    try{
        if(initiated === false){
            throw new Error('Scraper need to be initiated first');
        }
        await page.goto(webTarget.url + pageNum, settings.puppeter.pageProps);
        /*eslint-disable*/
        const result = await page.evaluate((webTarget) => {
            let links = [];
            const elements = document.querySelectorAll(webTarget.selectors.links);
            if(elements && elements.length > 0){
                for(const element of elements){
                    links.push(element.href);
                }
                return links; 
            }
            return null;
        }, webTarget);
        return result;
    }catch(err){
        throw new Error('Error scraping Links: '+ err.message);
    }
}

const scrapeContent = async (settings,webTarget, link) => {
    try{
        if(initiated === false){
            throw new Error('Scraper need to be initiated first');
        }
        await page.goto(link,settings.puppeter.pageProps);
        /*eslint-disable*/
        const result = await page.evaluate((webTarget) => {
            const getTitle = document.querySelector(webTarget.selectors.title).textContent;
            const getDate = document.querySelector(webTarget.selectors.date).textContent;
            const getContent = document.querySelector(webTarget.selectors.content).innerHTML;
            if(getContent){
                if(getTitle === undefined || getTitle === null){
                    title = website.defaultTitle;
                }
                if(getDate === undefined || getDate === null){
                    date = new Date();
                }
                return { title: getTitle, date: getDate, content: getContent };
            }
            return null;
        }, webTarget);
        if(result){
            return result;
        }
        return null;
    }catch(err){
        throw new Error('Error scraping Content: '+ err.message);
    }
}


//for warstek
exports.runScraperPageIncrement = async (pageStart) => {
    if(initiated === false){
        throw new Error('Scraper need to be initiated first');
    }
    console.log('run scraper');
    fileIO.init(website);
    const maxPage = website.maxPage;
    //url,selector,pageProps
    for(let page = pageStart ; page<= maxPage ; page++){
        console.log('Scraping page '+ page);
        /*eslint-disable*/
        const result = await scrapeLinks(config, website, page);
        if(result === null){
            console.log('skip page '+page);
            continue;
        }
        for(let link of result){
            /*eslint-disable*/
            const article = await scrapeContent( config, website, link);
            if(article === null){
                console.log('skip link '+ link);
                continue;
            }
            const articleContent = htmlCleaner.sanitize(article.content,website.allowedTags);
            const fullArticle = '<title>' + article.title + '</title>' + '<date>' + article.date + '</date>' + articleContent;
            fileIO.write(fullArticle,true,true);
        }
    }
    await browser.close();
  	return 1;
}