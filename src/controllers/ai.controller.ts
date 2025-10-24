import { Request, Response } from 'express';
import { generateTranscript } from '../services/ai.service.js';

export const transcribeAudio = async (req: Request, res: Response) => {
  const { audioUrl } = req.body;
  if (!audioUrl) {
    return res.status(400).json({ error: 'audioUrl is required' });
  }

  try {
    const transcript = await generateTranscript(audioUrl);
    res.json({ transcript });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate transcript' });
  }
};
