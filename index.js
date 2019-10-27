
const scraper = require("./scraper");
const fs = require("fs");

const createOutput = (content) =>{
    const linksDir 	= ".\\data\\";
	
	//output path setup
	let fileExist = -1;
	let index = 0;
	let fileName = "";
	while(fileExist != 0){
		if(index === 0){
			fileName = linksDir+"linkList.html";
		}else{
			fileName = linksDir+"linkList("+ index +").html";
		}
		if(fs.existsSync(fileName)){
			index++;
		}else{
			fileExist = 0;
		}
	}
    console.log("File Name = "+fileName);
    const writer = fs.createWriteStream(fileName);
    writer.write(
        `<!DOCTYPE html>
        <html>
            <head>
                <meta name = "viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    body{
                        font-family: Verdana, sans-serif;
                    }
                </style>
            </head>
            <body>`
    );
    writer.write(content);
    writer.write(
        `</body>
        </html>`
    );
    writer.end();
}

const run = async () => {
    const result = await scraper.runScraper();
    if(result){
        for(let item of result){
            createOutput(item);
        }
    }
}

run();

