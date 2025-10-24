import { Router } from 'express';
import { transcribeAudio } from '../controllers/ai.controller.js';

const router = Router();

router.post('/transcribe', transcribeAudio);

export default router;
