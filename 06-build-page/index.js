const path = require('path');
const fs = require('fs');

let rootCurrDir = `${path.join(__dirname, 'assets')}`;
let currDir = `${path.join(__dirname, 'assets')}`;

let targetDir = `${path.join(__dirname, 'project-dist')}`;
let targetDirAssets = `${path.join(targetDir, 'assets')}`;

let SrcDir = `${path.join(__dirname, 'styles')}`;

let fileArr = [];
let isIt = [];

// async function exists (path) {  
//   try {
//     await Fs.access(path)
//     return true
//   } catch {
//     return false
//   }
// }
async function lll() {
    try {
        fs.rm(`${targetDir}`, {recursive: true}, (err) => { console.log(err)});
        }
    catch {}
}
lll()

async function mmm() {
    

    
    try {
        
        await fs.promises.mkdir(`${targetDir}`, {recursive: true});
        await fs.promises.mkdir(`${targetDirAssets}`, {recursive: true});
    } catch {
        
        await fs.rm(`${targetDir}`, {recursive: true});
        
        await fs.promises.mkdir(`${targetDir}`, {recursive: true});
        
        await fs.promises.mkdir(`${targetDirAssets}`, {recursive: true});
        
    }
}
mmm()



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

                fs.appendFile(`${targetDir}/stye.css`, `${content}\n\n`, (err) => {
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
            
           
}, 1100)








const dirReader = () => {
    const p = new Promise ((resolve, rejects) => {

        fs.readdir(currDir, (err, files) => {
            for (let file of files) {fileArr.push(file);}
            resolve()
        })
    })
    p.then(() => {
        const CheckIfDirFoo = (i) => {
  

            if (i === undefined){i = 0};

            fs.stat(`${currDir}/${fileArr[i]}`, (err, stats) => {    

                if(err) {return console.log(err)};
                isIt.push(`${stats.isDirectory()}`);


                if (i < fileArr.length - 1) {                                                                                  
                    i = ++i; 
                    CheckIfDirFoo(i)
                }
                
            })     
        }
        CheckIfDirFoo(); 
    })
        
    setTimeout(() => {
        const ifDirFoo = (i) => {
            if (i === undefined){i = 0};
            let currPath = `${path.join(currDir, fileArr[i])}`;
            let targetPath = `${path.join(targetDirAssets, fileArr[i])}`;

            
            if(isIt[i] === 'true') {                                                    
                fs.promises.mkdir(`${targetPath}`, {recursive: true});

       

                if (i < fileArr.length - 1) {

                    i = ++i;
  
                    ifDirFoo(i);                                                                                                
                } else return          
            }            
        }
        ifDirFoo();
    }, 100)
}
dirReader()





setTimeout(() => {
    const newFoo = (i) => {
        if (i === undefined) {i = 0}
        const p = new Promise ((resolve, reject) => {
            fs.readdir(`${currDir}/${fileArr[i]}`, (err, files) => {
                if (err) {throw err}
                for (let file of files) {
                    let currDirCopy = `${path.join(targetDirAssets, fileArr[i])}`;                
                        fs.promises.copyFile(`${path.join(`${currDir}/${fileArr[i]}`, file)}`, `${path.join(currDirCopy, file)}`);                                     
                }
                resolve()
            })
        })
        p.then(() => {
            if (i < fileArr.length - 1){
                i = ++i;
                newFoo(i);
            }
        })
    }
    newFoo(0);
    fs.promises.copyFile(`${path.join(__dirname, 'template.html')}`, `${path.join(__dirname, 'project-dist', 'index.html')}`);
}, 1000)



let contentArrFiles = [
    `${path.join(__dirname, 'components', 'header.html')}`,
    `${path.join(__dirname, 'components', 'articles.html')}`,
    `${path.join(__dirname, 'components', 'footer.html')}`
];
let contentArr = [];

const contentArrFoo = (i) => {
    const p = new Promise ((resolve, reject) => {
        fs.readFile(contentArrFiles[i], 'utf-8', (err, content) => {
            if (err) {
                return console.log(err);
            }
            contentArr.push(content);
        resolve()    
        })    
    })    
    p.then(() => {
        if (i < fileArr.length - 1){
            i = ++i;
            contentArrFoo(i);
        }
    }) 
}
contentArrFoo(0)

setTimeout(() => {
    replaceTargetArr = [
        '{{header}}',
        '{{articles}}',
        '{{footer}}'
    ];
    const replaceFoo = (i) => {
        const p = new Promise ((resolve, reject) => {
            fs.readFile(`${path.join(__dirname, 'project-dist', 'index.html')}`, 'utf-8', (err, content) => {
                if (err) {
                    return console.log(err);
                }
                const result = content.replace(`${replaceTargetArr[i]}`, contentArr[i])
                fs.writeFile(`${path.join(__dirname, 'project-dist', 'index.html')}`, result, 'utf8', function (err) {
                    if (err) return console.log(err);
                    resolve()
                });
            })
        })
        p.then(() => {
            if (i < fileArr.length - 1){
                i = ++i;
                replaceFoo(i);
            }
        }) 
    }
    replaceFoo(0);     
}, 2000)















    // setTimeout(() => {
    //     const ifFileFoo = (i) => {
    //         if (i === undefined){i = 0};
    //         let currPath = `${path.join(currDir, fileArr[i])}`;
    //         let targetPath = `${path.join(targetDirAssets, fileArr[i])}`;
    //         if(isIt[i] !== true) {                                                    
    //             fs.promises.copyFile(`${path.join(currPath)}`, `${path.join(targetPath)}`);                            
    //         }
    //     }
    //     ifFileFoo();
    // }, 200)
            // let currPath = `${path.join(currDir, file)}`;
            // let targetPath = `${path.join(targetDirAssets, file)}`;
            // let targetForCopy = `${path.join(targetPath, file)}`;

            // const p = new Promise ((resolve, rejects) => {
            //     console.log(currPath); 
           
              
                
            // p.then(CheckIfDir => {      
            //     console.log(CheckIfDir[0]);  
            //     return new Promise ((resolve, rejects) => {        
                    // if(CheckIfDir[0] !== true) {
                        
                            
                    //         fs.promises.copyFile(`${path.join(currPath)}`, `${path.join(targetPath, file)}`);
                    //         resolve(CheckIfDir);
                            
                    // } else {resolve(CheckIfDir)}     
            //     })                          
            // })

            // .then(folderPath => {
            //     setTimeout(function(){if(folderPath[0] === true) {
            //         console.log(folderPath[0]); 
            //         fs.promises.mkdir(`${targetPath}/${file}`, {recursive: true});
                    
            //         currDir = `${path.join(rootCurrDir, file)}`;
            //         dirReader() 
            //     }}, 1500)
            // })                                
        
    

// setTimeout(() => {
//     const newFoo = (i) => {
//         
        
//         currDir = currDir = `${path.join(rootCurrDir, fileArr[i])}`;  
//         targetDirAssets = `${path.join(targetDir, 'assets', fileArr[i])}`;  
//        
//         if (i < fileArr.length - 1){
//             i = ++i;
//             newFoo(i);
//         }
//         dirReader()
//     }     
//     newFoo(0);
// }, 2000)


// setTimeout(() => {
//     let fileArr = [];

//     const p = new Promise ((resolve, reject) => {
//         fs.readdir(`${SrcDir}`, (err, files) => {
//             if (err) {
//                 return console.log(err);
//             }
//             console.log(files)
            
//             for (let file of files) {                       
//                 console.log(`${file} - 1`)

//                 if (path.extname(file) === '.css'){fileArr.push(file)}
//             }
//             resolve()
//         });  
//     })
//     // p.then(setTimeout(() => {() => console.log(fileArr)}, 1000))  
//     p.then(() => {   
//         const newFoo = (i) => { 
//             if (i === undefined){i = 0};   

//             fs.readFile(`${SrcDir}/${fileArr[i]}`, 'utf-8', (err, content) => {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log(`${fileArr[i]} - 2`)

//                 fs.appendFile(`${targetDir}/bundle.css`, `${content}\n\n`, (err) => {
//                     console.log(`${fileArr[i]} - 3`)
//                     if(err) {
//                         return console.log(err);
//                     }
//                     if (i < fileArr.length - 1) {                      
//                         i = ++i; 
//                         newFoo(i)
//                     }
//                 }) 
//             })                                     
//         }
//         newFoo()
//     })              
            
           
// }, 2000)


