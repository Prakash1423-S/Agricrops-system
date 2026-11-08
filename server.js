/**
 * AgriCrops Pro - Node.js Backend Service
 * Serves the HTML frontend and API endpoints.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;
const BASE_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // API endpoint
  if (pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({
      system: 'AgriCrops Pro Intelligence Server',
      status: 'active',
      runtime: 'Node.js',
      features: ['Crop Q&A', 'Fertilizer Calculator', 'Folder Vault', 'Climate Matcher']
    }));
    return;
  }

  // Serve static files
  if (pathname === '/') pathname = '/index.html';
  const safePath = path.normalize(path.join(BASE_DIR, pathname));

  // Security check
  if (!safePath.startsWith(BASE_DIR)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(safePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🌾 AgriCrops Node Server active at: http://localhost:${PORT}`);
  console.log(`Serving static directory: ${BASE_DIR}`);
});
