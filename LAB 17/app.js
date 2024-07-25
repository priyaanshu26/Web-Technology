//Path core module

// const path = require('path');
// console.log(path.normalize("/hii", "\hello","..."));
// console.log(path.join("/hii", "\hello"));
// console.log(path.dirname("hii/yoo.txt"));
// console.log(path.extname("hii/yoo.yola"));

// fs core module

// const fs = require ('fs');
// fs.exists('/ting/tong',(exists) => {console.log(exists ? "Found" : "Not Found!")});
// fs.stat('display.js', (err, data)=> {console.log(data)});
// fs.readFile('Hii.txt',(err, data)=> {console.log(data)});
// fs.writeFile('Hii.txt','Hello World',()=> {console.log('File Written')});
// fs.appendFile('Hii.txt','Have a nice day.',()=> {console.log('File Appended')});
// fs.rename('Hii.txt','Hii2.txt',()=> {console.log('File Renamed')});
// fs.unlink('Hii2.txt',()=> {console.log('File Deleted')});

//child-processes

const cp = require ('child_process');
cp.exec('hii.txt', (err, stdout, stdin)=> {console.log(stdout)});
