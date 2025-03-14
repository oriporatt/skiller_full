
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import {saveToStorage,loadFromStorage} from '../util.service'

const STORAGE_KEY = 'order'



export const orderService = {
    query,
    getById,
    save,
    remove,
}



async function query(filterBy) {

    var orders = await storageService.query(STORAGE_KEY)
    const { clientId,providerId } = filterBy

    if (clientId){
        orders = orders.filter(order=>order.clientId===clientId)
    }

    if (providerId){
        orders = orders.filter(order=>order.providerId===providerId)
    }

    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        // const orderToSave = {
        //     _id: order._id,
        //     price: car.price,
        //     speed: car.speed,
        // }
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // const carToSave = {
        //     vendor: car.vendor,
        //     price: car.price,
        //     speed: car.speed,
        //     // Later, owner is set by the backend
        //     owner: userService.getLoggedinUser(),
        //     msgs: []
        // }
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}
