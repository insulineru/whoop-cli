import { createServer } from 'node:http';
import { URL } from 'node:url';
export async function findAvailablePort(startPort = 3000) {
    return new Promise((resolve) => {
        const server = createServer();
        server.listen(startPort, () => {
            server.close(() => resolve(startPort));
        });
        server.on('error', () => {
            resolve(findAvailablePort(startPort + 1));
        });
    });
}
export function startCallbackServer(port) {
    return new Promise((resolve, reject) => {
        let server;
        const timeout = setTimeout(() => {
            server?.close();
            reject(new Error('OAuth callback timeout'));
        }, 120000);
        server = createServer((req, res) => {
            const url = new URL(req.url || '/', `http://localhost:${port}`);
            if (url.pathname === '/callback') {
                const code = url.searchParams.get('code');
                const state = url.searchParams.get('state');
                const error = url.searchParams.get('error');
                if (error) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    res.end('<h1>Authorization Failed</h1><p>You can close this window.</p>');
                    clearTimeout(timeout);
                    server.close();
                    reject(new Error(`OAuth error: ${error}`));
                    return;
                }
                if (code && state) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h1>Authorization Successful</h1><p>You can close this window.</p>');
                    clearTimeout(timeout);
                    server.close();
                    resolve({ code, state });
                    return;
                }
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('<h1>Missing Parameters</h1>');
                return;
            }
            res.writeHead(404);
            res.end('Not Found');
        });
        server.listen(port);
    });
}
//# sourceMappingURL=server.js.map