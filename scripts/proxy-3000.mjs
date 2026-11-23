// Forwards http://localhost:3000 to the Astro dev server Ship Studio already
// runs (it picks its own port). Lets the fidelity tools use the configured URL
// without starting a second dev server for the same project.
//   TARGET_PORT=3657 node scripts/proxy-3000.mjs
import http from 'node:http';
import net from 'node:net';

const TARGET_PORT = Number(process.env.TARGET_PORT ?? 3657);
const TARGET_HOST = process.env.TARGET_HOST ?? 'localhost';

const server = http.createServer((req, res) => {
  const up = http.request(
    { host: TARGET_HOST, port: TARGET_PORT, path: req.url, method: req.method, headers: { ...req.headers, host: `localhost:${TARGET_PORT}` } },
    (r) => { res.writeHead(r.statusCode ?? 502, r.headers); r.pipe(res); r.on('error', () => res.destroy()); }
  );
  up.on('error', (e) => { if (!res.headersSent) res.writeHead(502); res.end('proxy: ' + e.message); });
  req.on('error', () => up.destroy());
  res.on('error', () => up.destroy());
  req.pipe(up);
});

// Dev-server HMR websocket.
server.on('upgrade', (req, sock, head) => {
  sock.on('error', () => sock.destroy());
  const up = net.connect(TARGET_PORT, TARGET_HOST, () => {
    up.write(`${req.method} ${req.url} HTTP/1.1\r\n` + Object.entries(req.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n') + '\r\n\r\n');
    up.write(head); up.pipe(sock); sock.pipe(up);
  });
  up.on('error', () => { up.destroy(); sock.destroy(); });
});

// A dev-server restart resets open sockets; never let that end the proxy.
process.on('uncaughtException', (e) => console.error('proxy: ignored', e.code ?? e.message));

server.listen(3000, () => console.log(`proxy :3000 -> ${TARGET_HOST}:${TARGET_PORT}`));
