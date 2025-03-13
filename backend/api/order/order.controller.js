import { logger } from '../../services/logger.service.js'
// import { socketService } from '../../services/socket.service.js'
// import { userService } from '../user/user.service.js'
// import { authService } from '../auth/auth.service.js'
import { orderService } from './order.service.js'

export async function getOrders(req, res) {
	try {
		const orders = await orderService.query(req.query)
		res.send(orders)
	} catch (err) {
		logger.error('Cannot get orders', err)
		res.status(400).send({ err: 'Failed to get orders' })
	}
}

export async function deleteOrder(req, res) {
    
	try {
		await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })

	} catch (err) {
		logger.error('Failed to delete order', err)
		res.status(400).send({ err: 'Failed to delete order' })
	}
}

export async function AddOrder(req, res) {

	try {
		var order = req.body
		const addedOrder = await orderService.add(order)
		res.send(addedOrder)
	} catch (err) {
		logger.error('Failed to add order', err)
		res.status(400).send({ err: 'Failed to add order' })
	}
}

