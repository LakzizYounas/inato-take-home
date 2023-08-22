import express, { Express } from 'express';

import { initOngoingTrialsRouter } from './get-ongoing-trials/initializer';

const app: Express = express();
const port = 8080;

app.use('/clinical-trials', initOngoingTrialsRouter());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
