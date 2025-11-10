import express from 'express';
import { 
  placeProductOrder, 
  processNextOrder, 
  getOrderQueueStatus 
} from '../controllers/ordercontroller.js';

const router = express.Router();

// Place a new order
router.post('/', placeProductOrder);

// Process the next order in queue
router.post('/process', processNextOrder);

// Get current queue status
router.get('/status', getOrderQueueStatus);

export default router;