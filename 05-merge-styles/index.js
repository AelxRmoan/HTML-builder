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
    let fileArr = [];

    const p = new Promise ((resolve, reject) => {
        fs.readdir(`${SrcDir}`, (err, files) => {
            if (err) {
                return console.log(err);
            }
            // console.log(files)
            
            for (let file of files) {                       
                // console.log(`${file} - 1`)

                if (path.extname(file) === '.css'){fileArr.push(file)}
            }
            resolve()
        });  
    })
    // p.then(setTimeout(() => {() => console.log(fileArr)}, 1000))  
    p.then(() => {   
        const newFoo = (i) => { 
            if (i === undefined){i = 0};   

            fs.readFile(`${SrcDir}/${fileArr[i]}`, 'utf-8', (err, content) => {
                if (err) {
                    return console.log(err);
                }
                // console.log(`${fileArr[i]} - 2`)

                fs.appendFile(`${targetDir}/bundle.css`, `${content}\n\n`, (err) => {
                    // console.log(`${fileArr[i]} - 3`)
                    if(err) {
                        return console.log(err);
                    }
                    if (i < fileArr.length - 1) {                      
                        i = ++i; 
                        newFoo(i)
                    }
                }) 
            })                                     
        }
        newFoo()
    })              
            
           
}, 1000)
