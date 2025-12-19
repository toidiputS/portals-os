import { GoogleGenerativeAI } from '@google/generative-ai';

// This works as both a Vercel serverless function AND locally
export default async function handler(req: any, res: any) {
    // CORS headers for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { model: modelName, contents, generationConfig, tools, systemInstruction } = req.body;

        console.log('=== Gemini API Request ===');
        console.log('Model:', modelName || 'gemini-1.5-flash');
        console.log('Tools:', JSON.stringify(tools, null, 2));
        console.log('System Instruction:', JSON.stringify(systemInstruction, null, 2));
        console.log('Contents length:', contents?.length);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        const model = genAI.getGenerativeModel({
            model: modelName || 'gemini-1.5-flash',
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
        res.json({ candidates });
    } catch (error: any) {
        console.error('=== Gemini API Error ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Full error:', error);
        res.status(500).json({ error: error.message });
    }
}
