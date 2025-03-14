import { ObjectId } from 'mongodb'

import { asyncLocalStorage } from '../../services/als.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const orderService = { query, remove, add,update }

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const criteria = { _id: ObjectId.createFromHexString(orderId) }
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        const orderToAdd = {
            clientId: ObjectId.createFromHexString(order.clientId),
            clientFullName: order.clientFullName,
            providerId:ObjectId.createFromHexString(order.providerId),
            providerFullname : order.providerFullname,
            gigId: ObjectId.createFromHexString(order.gigId),
            gigTitle: order.gigTitle,
            createdAt: order.createdAt,
            deliveryDate: order.deliveryDate,
            status: order.status,
            total: order.total
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)

        return orderToAdd
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}

async function update(order) {
    try {
        // Destructure _id and remove it from the update object
        const { _id, ...updateFields } = order;

        const criteria = { _id: ObjectId.createFromHexString(order._id) }

		const collection = await dbService.getCollection('order')
		await collection.updateOne(criteria, { $set: updateFields })

		return order
	} catch (err) {
		logger.error(`cannot update order ${order._id}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
    const criteria = {}

	if (filterBy.txt) {
		const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
		criteria.$or = [
			{
				clientFullName: txtCriteria
			},
			{
				providerFullname: txtCriteria
			},
            {
				gigTitle: txtCriteria
			},
		]
	}
    return criteria
}