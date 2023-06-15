import express from 'express';
import apiMocker from 'connect-api-mocker';
import cors from 'cors';

const port = 8080;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS with specific origin and allow credentials

app.use('/api', apiMocker('mock-api'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
