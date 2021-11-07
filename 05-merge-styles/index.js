const path = require('path');
const fs = require('fs');

let targetDir = `${path.join(__dirname, 'project-dist')}`;
let SrcDir = `${path.join(__dirname, 'styles')}`;

// const sleep = ms => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(), ms)
//     })
// }


fs.promises.rmdir(`${targetDir}/bundle.css`, {recursive: true});

setTimeout(() => {
    fs.readdir(`${SrcDir}`, (err, files) => {
        if (err) {
            return console.log(err);
        }
        // console.log(files)

        for (let file of files) {                       
            // console.log(`${file} - 1`)

            if (path.extname(file) === '.css'){                
                fs.readFile(`${SrcDir}/${file}`, 'utf-8', (err, content) => {
                    if (err) {
                        return console.log(err);
                    }
                    // console.log(`${file} - 2`)

                    fs.appendFile(`${targetDir}/bundle.css`, `${content}\n\n`, (err) => {
                        // console.log(`${file} - 3`)
                        if(err) {
                            return console.log(err);
                        }                        
                    }) 
                })
            // console.log('end')                                       
            }     
        }     
    })           
}, 1000)
