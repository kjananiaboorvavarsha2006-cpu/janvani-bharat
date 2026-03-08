import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.js';
import eligibilityRoutes from './routes/eligibility.js';
import schemesRoutes from './routes/schemes.js';
import voiceRoutes from './routes/voice.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/voice', voiceRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'JanVani Bharat API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
