const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`request for ${req.url} from ${req.url}`);

    if (req.method === 'GET') {
        let fileUrl;
        if (req.url === '/') {
            fileUrl = '/index.html'
        }
        else {
            fileUrl = req.url;
        }

        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt === '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('content-type', 'text/html');
                    res.end(`<html><body><h1>ERROR 404 REQUEST NOT FOUND</h1></body></html>`);
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            })
        }
        else {
            res.statusCode = 404;
            res.setHeader('content-type', 'text/html');
            res.end(`<html><body><h1>ERROR 404 PATH NOT FOUND</h1></body></html>`);
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('content-type', 'text/html');
        res.end(`<html><body><h1>ERROR 404 REQUEST METHOD NOT SUPPORTED</h1></body></html>`);
    }

})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})