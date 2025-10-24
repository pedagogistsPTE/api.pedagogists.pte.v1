import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import * as fs from 'node:fs/promises';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateTranscript = async (audioUrl: string): Promise<string> => {
  try {
    // Download the audio file
    const response = await axios.get(audioUrl, {
      responseType: 'arraybuffer',
    });
    const audioData = Buffer.from(response.data, 'binary');

    // Save the audio file to a temporary location
    const tempFilePath = `/tmp/audio.mp3`;
    await fs.writeFile(tempFilePath, audioData);

    // Upload the audio file to the Gemini API
    const audioFile = await genAI.files.upload({
      file: tempFilePath,
      config: { mimeType: 'audio/mpeg' },
    });

    // Generate the transcript
    const result = await model.generateContent([
      { text: 'Generate a transcript of the speech.' },
      { fileData: { mimeType: audioFile.mimeType, fileUri: audioFile.uri } },
    ]);

    // Clean up the temporary file
    await fs.unlink(tempFilePath);

    return result.response.text();
  } catch (error) {
    console.error('Error generating transcript:', error);
    throw new Error('Failed to generate transcript');
  }
};
