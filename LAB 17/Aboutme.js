const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/index') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('./Portfolio adv/index.html'));
    } else if (req.url === '/porto.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(fs.readFileSync('./Portfolio adv/porto.css'));
    } else if (req.url === '/age') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('./Portfolio adv/age.html'));
    } else if (req.url === '/loc'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('./Portfolio adv/loc.html'));
    }else{
        res.end("Hello guys you are on wrong page 404!!!!")
    }
      
})

const PORT = 5632;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});