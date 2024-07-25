const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/img') {
    // Read the image file and send it as the response
    fs.readFile('imgage.png', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/gif' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
