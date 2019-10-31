const fs = require("fs");
let directory = './output/';
let fileName =  'output';
let documentProps = {
    unwanted : [],
    footerSign : null,
}
let initiated = false;

exports.init = (website) => {
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }
    directory = directory + website.outputDir;
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }
    fileName = website.name;
    documentProps.unwanted = website.unwantedTexts;
    documentProps.footerSign = website.footerSign;
    initiated = true;

}

exports.write = (html,isRemoveFooter,isRemoveUnwanted) => {
    if(initiated == false){
        throw new Error('FileIO need to be initiated first');
    }
	//output path setup
	let fileExist = -1;
	let index = 1;
	let filePath = "";
	while(fileExist != 0){
		filePath = `${directory}/${fileName}_${index}.html`;
		if(fs.existsSync(filePath)){
			index++;
		}else{
			fileExist = 0;
		}
    }
    const writer = fs.createWriteStream(filePath);
    let htmlText = html;
    if(isRemoveFooter){
        console.log('remove footer');
        index = htmlText.indexOf(documentProps.footerSign);
        htmlText = htmlText.substring(0,index);
    }
    if(isRemoveUnwanted){
        console.log('remove unwanted');
        for(const unwanted of documentProps.unwanted){
            let local = '';
            let cropIndex = htmlText.indexOf(unwanted);
            local = htmlText.substring(0,cropIndex);
            htmlText = local + htmlText.substring(cropIndex + unwanted.length);
        }
    }
    writer.write(htmlText);
    writer.end();
}