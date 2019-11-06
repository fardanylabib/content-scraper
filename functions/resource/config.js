exports.websites =  {
    warstek : {
        name : 'warstek',
        outputDir : 'warstek',
        footerSign : '<a href="#abh_about">',
        unwantedTexts : ['Baca juga:\n'],
        incrementalPage: true,
        url: 'https://warstek.com/category/sains-alam/page/',
        maxPage: 1,
        selectors: {
            links: '#content article .entry-content.clearfix .ecae .ecae-button a',
            title: '.entry-header h1',
            date: '.posted-on a .entry-date.published',
            category: '.cat-links a',
            content: '.entry-content.clearfix'
        },
        defaultTitle: 'Wacana Sains Populer',
        allowedTags: ['img','h1','h2','p', 'a']
    },
    infoastronomy1:{
        name : 'astronomy_1',
        outputDir : 'astronomy_1',
        footerSign : '<a href="#abh_about">',
        unwantedTexts : ['Baca juga:\n'],
        incrementalPage: false,
        url: 'https://www.infoastronomy.org/',
        maxPage: 2,
        selectors: {
            links: '#newarlinalabel2-wrapper div div div .newarlina_right ul li span a',
            title: '.post.hentry .posting-wrapper h1 a',
            date: '.timestamp-link .published.updated',
            category: null,
            content: '.post-body.entry-content .widget-middle'
        }
    },
    infoastronomy2:{
        name : 'astronomy_2',
        outputDir : 'astronomy_2',
        footerSign : '<a href="#abh_about">',
        unwantedTexts : ['Baca juga:\n'],
        incrementalPage: false,
        url: 'https://www.infoastronomy.org/',
        maxPage: 2,
        selectors: {
            links: '.post.hentry .posting-wrapper h2 a',
            title: '.post.hentry .posting-wrapper h1 a',
            date: '.timestamp-link .published.updated',
            category: null,
            content: '.post-body.entry-content .widget-middle'
        }
    }
}

exports.settings = {
    puppeter: {
        isUsingChrome : false,
        props : { headless: true, executablePath : 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'},
        pageProps: { timeout: 0 , waitUntil : 'domcontentloaded'}
    }
}
