import http from 'node:http';

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    console.log(`\nReceived POST ${req.url}`);
    console.log('Headers:', req.headers);

    req.on('error', (error) => {
      console.error('Request stream error:', error);
    });

    req.resume();

    req.once('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
    });
    return;
  }

  res.writeHead(405, {
    'Content-Type': 'application/json',
    Allow: 'POST',
  });
  res.end(JSON.stringify({ message: 'Only POST requests are accepted.' }));
});

server.on('listening', () => {
  console.log(`POST logger server listening on http://localhost:${port}`);
  console.log('Send any POST request to log its headers.');
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

server.listen(port);
