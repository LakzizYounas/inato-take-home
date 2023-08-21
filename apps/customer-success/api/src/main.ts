import express, { Express, Response } from 'express';

import { initOngoingTrialsRouter } from './get-ongoing-trials/initializer';

const app: Express = express();
const port = 8080;

app.use('/clinical-trials', initOngoingTrialsRouter());

app.get('/ping', (_req, res: Response) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
