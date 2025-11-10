import express from 'express';
import { 
  updateProductQuantity,
  getInventoryActivity
} from '../controllers/activityStack.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id/quantity')
  .put(protect, admin, updateProductQuantity);

router.route('/activity')
  .get(protect, admin, getInventoryActivity);

export default router;