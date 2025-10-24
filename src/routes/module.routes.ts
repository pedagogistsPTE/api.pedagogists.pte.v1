import { Router } from 'express';
import { getAllModules } from '../controllers/module.controller.js';

const router = Router();

router.get('/', getAllModules);

export default router;
