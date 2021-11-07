
const fs = require('fs');
const path = require('path');
let currDir = `${path.join(__dirname, 'secret-folder')}`; // delete sec arg


const dirReader = () => {
    fs.readdir(currDir, (err, files) => {
        files.forEach(file => {
            let currPath = `${path.join(currDir, file)}`
            
            const p = new Promise ((resolve, rejects) => {
                let isIt;
                let itSize;
                fs.stat(currPath, (err, stats) => {    
                    if(err) {return console.log(err)};
                    itSize = stats.size;
                    isIt = stats.isDirectory();
                    resolve([isIt, itSize]) 
                })                
            })
                
            p.then(CheckIfDir => {                
                if(CheckIfDir[0] !== true) {
                    console.log(`${path.basename(currPath, `${path.extname(currPath)}`)} - ${path.extname(currPath)} - ${CheckIfDir[1]} b`)
                }                
            })

            // p.then(folderPath => {
            //     setTimeout(function(){if(folderPath[0] === true) {
            //         console.log(`${path.basename(currPath)}>>`);
            //         currDir = `${path.join(currDir, file)}`;
            //         dirReader() 
            //     }}, 1000)
            // })                                   open folders and read its content
        })
    })
}

dirReader()





    
    






