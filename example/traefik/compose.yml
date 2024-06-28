// traefik-compose.ts

import * as express from 'express';
import * as http from 'http';

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello from Traefik Compose Example!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
