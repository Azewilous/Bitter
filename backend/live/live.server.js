import { WebSocketServer } from 'ws'
import { broadcastPipeline, singularPipeline } from './live.pipeline.js';

export const createLiveServer = (server) => {

  const wss = new WebSocketServer({ noServer: true, path: '/ws' });

  broadcastPipeline(wss.clients)

  server.on("upgrade", (request, socket, head) => {
    try {
       wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit("connection", ws, request);
       });
    } catch (err) {
      console.log("upgrade exception", err);
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
  });

  wss.on("connection", (ctx) => {

    console.log("connected", wss.clients.size);

    const interval = singularPipeline(ctx)

    ctx.on("message", (message) => {
      console.log(`Received message => ${message}`);
      ctx.send(`you said ${message}`);
    });

    ctx.on("close", () => {
      console.log("closed", wss.clients.size);
      clearInterval(interval)
    });

    ctx.send("connection established.");
  });

}

 export default createLiveServer

