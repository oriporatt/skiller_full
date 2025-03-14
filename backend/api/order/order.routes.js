import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import {AddOrder, getOrders, deleteOrder,updateOrder} from './order.controller.js'

const router = express.Router()

router.get('/', log, getOrders)
router.post('/',  log, requireAuth, AddOrder)
router.put('/:id',  log, requireAuth, updateOrder)
router.delete('/:id',  requireAuth, deleteOrder)

export const orderRoutes = router