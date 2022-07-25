import WebSocket from 'ws';
import { WEBSOCKET_SERVER_URL, WEBSOCKET_SERVER_KEY } from '../config';

function sendWebSocketMessage({
  data,
  clients
}: {
  data: {
    type: string;
    payload: any;
  };
  clients: string[] | 'ALL';
}) {
  const ws = new WebSocket(WEBSOCKET_SERVER_URL);
  ws.addEventListener('open', () => {
    console.log('We are connected');
    const dataObject = {
      key: WEBSOCKET_SERVER_KEY,
      data,
      clients: clients ?? 'ALL'
    };
    ws.send(JSON.stringify(dataObject));
    ws.close();
  });
}

export default sendWebSocketMessage;
