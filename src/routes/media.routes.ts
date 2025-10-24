import { Router } from 'express';
import {
  addMedia,
  getMediaById,
  deleteMedia,
} from '../controllers/media.controller.js';

const router = Router();

router.post('/', addMedia);
router.get('/:id', getMediaById);
router.delete('/:id', deleteMedia);

export default router;
