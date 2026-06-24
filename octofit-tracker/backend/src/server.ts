import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    backendPort: port,
    mongoUri,
  });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);

    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`);
      console.log(`MongoDB connection configured for ${mongoUri}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API:', error);
    process.exit(1);
  }
}

void startServer();