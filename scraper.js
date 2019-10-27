const puppeteer = require('puppeteer');
const MAX_PAGE = 3;
const LINK_PAGES = 'https://warstek.com/category/sains-alam/page'

let browser = null;
let page = null;

const initPuppeteer = async () => {
    try{
        browser = await puppeteer.launch({ headless: false, executablePath : 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' });
        page = await browser.newPage();
        return 1;
    }catch(err){
        throw new Error('Error puppeteer initialization: '+ err.message);
    }
}

const scrapeLinks = async (pagenum) => {
    try{
        await page.goto(`${LINK_PAGES}/${pagenum}/`,{ timeout: 0 , waitUntil : 'domcontentloaded'});
        const result = await page.evaluate(() => {
            let links = [];
            const elements = document.querySelectorAll("#content article .entry-content.clearfix .ecae .ecae-button a");
            if(elements && elements.length > 0){
                for(const element of elements){
                    links.push(element.href);
                }
                return links; 
            }
            return null;
        });
        return result;
    }catch(err){
        throw new Error('Error scraping Links: '+ err.message);
    }
}

const scrapeContent = async (link) => {
    try{
        await page.goto(link,{ timeout: 0 , waitUntil : 'domcontentloaded'});
        const result = await page.evaluate(() => {
            const content = document.querySelector(".entry-content.clearfix").innerHTML;
            if(content){
                return content; 
            }
            return null;
        });
        return result;  
    }catch(err){
        throw new Error('Error scraping Content: '+ err.message);
    }
}

exports.runScraper = async () => {
    let articles = [];
    await initPuppeteer();
    for(let page = 1 ; page<= MAX_PAGE ; page++){
        const result = await scrapeLinks(page);
        if(result === null){
            console.log('skip page '+page);
            continue;
        }
        for(let link of result){
            const article = await scrapeContent(link);
            if(article === null){
                console.log('skip link '+ link);
                continue;
            }
            articles.push(article);
        }
    }
    await browser.close();
  	return articles;
}