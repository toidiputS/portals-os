import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const apiKey = process.env.GEMINI_API_KEY;
console.log('=== Server Startup ===');
console.log('API Key present:', !!apiKey);
console.log('API Key starts with:', apiKey ? apiKey.substring(0, 10) + '...' : 'NOT SET');

const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/gemini:generate', async (req, res) => {
  try {
    const { model: modelName, contents, generationConfig, tools, systemInstruction } = req.body;

    console.log('=== Gemini API Request ===');
    console.log('Model:', modelName || 'gemini-pro');
    console.log('API Key available:', !!apiKey);
    console.log('Contents length:', contents?.length);
    console.log('Contents preview:', JSON.stringify(contents?.slice(0, 2), null, 2));

    const model = genAI.getGenerativeModel({
      model: modelName || 'models/gemini-1.0-pro',
      generationConfig,
      tools,
      systemInstruction,
    });

    const result = await model.generateContent(contents);
    const response = await result.response;

    // Handle different response types
    const candidates = [];
    if (response.candidates) {
      for (const candidate of response.candidates) {
        const parts = [];
        if (candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.text) {
              parts.push({ text: part.text });
            } else if (part.functionCall) {
              parts.push({ functionCall: part.functionCall });
            } else if (part.inlineData) {
              parts.push({ inlineData: part.inlineData });
            }
          }
        }
        candidates.push({
          content: {
            parts,
            role: candidate.content?.role,
          },
          finishReason: candidate.finishReason,
          groundingMetadata: candidate.groundingMetadata,
        });
      }
    }

    console.log('=== Gemini API Success ===');
    res.json({
      candidates,
      error: response.error ? { message: response.error.message } : undefined,
    });
  } catch (error) {
    console.error('=== Gemini API Error ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve the React app for any non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3002, () => {
  console.log('Server running on http://localhost:3002');
});
