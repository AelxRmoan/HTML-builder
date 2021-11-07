console.log("\n<<Hello to your mind log>>\n");

// Start

const path = require('path');
const fs = require('fs');
const events = require('events');

const writePath = path.join(__dirname, 'MindLog.txt');


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

fs.appendFile(writePath, '\nNew Session\n\n', (err) => {
    if(err) {
        return console.log(err);
    }
}); 

const readlineRepeat = (i, question) => {
    if (i === undefined) {
        i = 1;
    }

    // if (question === undefined) {
    //     question = '';
    // }
    
    readline.question('What have you just thought about?> ', name => {

        fs.appendFile(writePath, `${i}. ${name}\n`, (err) => {
            if (err) {
                throw err
            }
        })

        if (name === 'exit') {
            console.log('thank you for your data')
            return readline.close();
        } 
        
        readlineRepeat(++i); 
    })
}  

readlineRepeat();