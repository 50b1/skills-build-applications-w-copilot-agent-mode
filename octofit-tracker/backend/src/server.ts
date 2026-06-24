import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase, mongoUri } from './config/database.js';
import { apiRouter } from './routes/api.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    backendPort: port,
    mongoUri,
    apiBaseUrl: baseUrl,
  });
});

async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`);
      console.log(`MongoDB connection configured for ${mongoUri}`);
      console.log(`API base URL configured as ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API:', error);
    process.exit(1);
  }
}

void startServer();