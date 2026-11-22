import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname,resolve,sep} from 'node:path';
const root=resolve('.');const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
http.createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);return res.end()}const file=path===root?resolve(root,'index.html'):path;res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.writeHead(404);res.end('No encontrado')}}).listen(5173,'127.0.0.1',()=>console.log('VapeFree: http://localhost:5173'));
