const path = require('path');
const fs = require('fs');

let currDir = `${path.join(__dirname)}`;
let currDirDir = `${path.join(__dirname, 'files')}`;
let lll = `${path.join(currDir, 'files-copy')}`


async function mmm() {
    try {
        await fs.promises.mkdir(lll, {recursive: true});
    } catch {
        await fs.rm(lll, {recursive: true}); 
        await fs.promises.mkdir(lll, {recursive: true});
    }


}
mmm()

setTimeout(function(){
    
    
    fs.readdir(currDirDir, (err, files) => {
        files.forEach(file => {
            let currDirCopy = `${path.join(__dirname, 'files-copy')}`;
            
            const p = new Promise ((resolve, rejects) => {
                fs.promises.copyFile(`${path.join(`${currDir}/files`, file)}`, `${path.join(currDirCopy, file)}`);
                resolve();
            })                
            
        })
    })
}, 1000)


