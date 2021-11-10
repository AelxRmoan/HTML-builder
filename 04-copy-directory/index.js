const path = require('path');
const fs = require('fs');

let currDir = `${path.join(__dirname)}`;
let currDirDir = `${path.join(__dirname, 'files')}`;

async () => {
    try {
        await fs.promises.mkdir(`${currDir}/files-copy`, {recursive: true});
    } catch {
        await fs.rm(`${currDir}/files-copy`, {recursive: true}); 
        await fs.promises.mkdir(`${currDir}/files-copy`, {recursive: true});
    }


}

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


