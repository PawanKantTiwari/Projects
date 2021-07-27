const fs = require("fs");   // imported fs
const path = require("path");// imported path
let extensions = require("./util");// imported util
let folderPath = "./Downloads";
let extFolderPath;




function moveFile(fileName) {
    // copy file
    let sourceFilePath = `${folderPath}/${fileName}`; // "./Downloads/abc.txt"
    let destinationFilePath = `${extFolderPath}/${fileName}`; // "./Downloads/Documents/abc.txt"
    fs.copyFileSync(sourceFilePath , destinationFilePath);// function is used to Copy the content from one file to Another file.
    
    // delete file
    fs.unlinkSync(sourceFilePath);
}

function createFolder() {
    fs.mkdirSync(extFolderPath);
}

function checkFolder(extension) {
  // check if extension is matching with any folderName
  // .jpg
  // "./Downloads"
  for (let key in extensions) {
    // "Images" \\ "Audio" ......
    if (extensions[key].includes(extension)) {
      // string interpolation
      extFolderPath = `${folderPath}/${key}`;
      break;
    }
  }
  // "./Downloads/Images"
  return fs.existsSync(extFolderPath);
}

function sortFolder(folderPath) {
  // get content of folderPath
  let content = fs.readdirSync(folderPath);
  for (let i = 0; i < content.length; i++) {
    // get extension of each file
    let extensionName = path.extname(content[i]);
    console.log(extensionName);
    let extensionFolderExist = checkFolder(extensionName);
    if (extensionFolderExist) {
      moveFile(content[i]);
    } else {
      createFolder();
      moveFile(content[i]);
    }
  }
}

sortFolder(folderPath);
