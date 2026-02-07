import express from 'express';
import { validateCpuUsageQuery, getCpuUsage } from './cpu.controller.js';

const router = express.Router();

router.get('/', validateCpuUsageQuery, getCpuUsage);

export default router;