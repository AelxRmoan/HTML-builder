const path = require('path');
const fs = require('fs');

const textPath = path.join(__dirname, 'text.txt');
const myReadStream = fs.createReadStream(textPath);

// fs.readFile(textPath, 'utf-8', (err, content) => {
//     if (err) {
//         throw err
//     }

//     console.log(content)
// })

myReadStream.on('data', (chunk) => {
    const utf8Chunk = chunk.toString('utf-8'); 
    console.log('Данные читаются посредством ReadStream метода:', utf8Chunk)
})