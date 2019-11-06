// db.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });

// const fs = require("fs");
// let directory = './output/';
// let fileName =  'output';
// let documentProps = {
//     unwanted : [],
//     footerSign : null,
// }
// let initiated = false;

// exports.init = (website) => {
//     if (!fs.existsSync(directory)){
//         fs.mkdirSync(directory);
//     }
//     directory = directory + website.outputDir;
//     if (!fs.existsSync(directory)){
//         fs.mkdirSync(directory);
//     }
//     fileName = website.name;
//     documentProps.unwanted = website.unwantedTexts;
//     documentProps.footerSign = website.footerSign;
//     initiated = true;

// }

// exports.write = (html,isRemoveFooter,isRemoveUnwanted) => {
//     if(initiated === false){
//         throw new Error('FileIO need to be initiated first');
//     }
// 	//output path setup
// 	let fileExist = -1;
// 	let index = 1;
// 	let filePath = "";
// 	while(fileExist !== 0){
// 		filePath = `${directory}/${fileName}_${index}.html`;
// 		if(fs.existsSync(filePath)){
// 			index++;
// 		}else{
// 			fileExist = 0;
// 		}
//     }
//     const writer = fs.createWriteStream(filePath);
//     let htmlText = html;
//     if(isRemoveFooter){
//         index = htmlText.indexOf(documentProps.footerSign);
//         const indexParagraph = htmlText.indexOf('<p>');
//         if(index < indexParagraph){
//             //in case of footer written on the top of paragraph and below the title
//             const noFooterHtml = htmlText.substring(0, index);
//             htmlText = noFooterHtml + htmlText.substring(indexParagraph);
//         }else{
//             htmlText = htmlText.substring(0,index);
//         }
//     }
//     if(isRemoveUnwanted){
//         for(const unwanted of documentProps.unwanted){
//             let local = '';
//             let cropIndex = htmlText.indexOf(unwanted);
//             local = htmlText.substring(0,cropIndex);
//             htmlText = local + htmlText.substring(cropIndex + unwanted.length);
//         }
//     }
//     writer.write(htmlText);
//     writer.end();
// }