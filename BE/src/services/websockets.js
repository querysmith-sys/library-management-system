import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const clients = new Set();

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  clients.add(ws);
  ws.on("close", () => {
    clients.delete(ws);
  });
});

export const broadcast = (data) => {
  clients.forEach((c) => {
    // console.log(c);  objects
    // console.log(c.readyState);   readyState 1= open, 2= closing, 3= closed

    if (c.readyState === 1) {
      c.send(JSON.stringify(data));
    }
  });
};

export default wss;
