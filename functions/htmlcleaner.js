const sanitizer = require('sanitize-html');

exports.sanitize = (dirtyHtml, allowed) =>{
    return sanitizer(dirtyHtml, 
    {
        allowedTags: allowed,
    });
}

