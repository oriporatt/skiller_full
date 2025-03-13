import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

// const PAGE_SIZE = 3

export const gigService = {
	remove,
	query,
	getById,
	add,
	update,
	addCarMsg,
	removeCarMsg,
}

async function query(filterBy = { txt: '' }) {
    
	try {
        const criteria = _buildCriteria(filterBy)
        const sort = _buildSort(filterBy)

		const collection = await dbService.getCollection('gig')
		
		var gigCursor = await collection.find(criteria, { sort })

		// if (filterBy.pageIdx !== undefined) {
		// 	carCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
		// }

		const gigs = gigCursor.toArray()
		return gigs
	} catch (err) {
		logger.error('cannot find gigs', err)
		throw err
	}
}

async function getById(gigId) {
	try {
        const criteria = { _id: ObjectId.createFromHexString(gigId) }

		const collection = await dbService.getCollection('gig')
		const gig = await collection.findOne(criteria)
        
		return gig
	} catch (err) {
		logger.error(`while finding gig ${gigId}`, err)
		throw err
	}
}

async function remove(carId) {
    const { loggedinUser } = asyncLocalStorage.getStore()
    const { _id: ownerId, isAdmin } = loggedinUser

	try {
        const criteria = { 
            _id: ObjectId.createFromHexString(carId), 
        }
        if(!isAdmin) criteria['owner._id'] = ownerId
        
		const collection = await dbService.getCollection('car')
		const res = await collection.deleteOne(criteria)

        if(res.deletedCount === 0) throw('Not your car')
		return carId
	} catch (err) {
		logger.error(`cannot remove car ${carId}`, err)
		throw err
	}
}

async function add(car) {
	try {
		const collection = await dbService.getCollection('car')
		await collection.insertOne(car)

		return car
	} catch (err) {
		logger.error('cannot insert car', err)
		throw err
	}
}

async function update(car) {
    const carToSave = { vendor: car.vendor, speed: car.speed }

    try {
        const criteria = { _id: ObjectId.createFromHexString(car._id) }

		const collection = await dbService.getCollection('car')
		await collection.updateOne(criteria, { $set: carToSave })

		return car
	} catch (err) {
		logger.error(`cannot update car ${car._id}`, err)
		throw err
	}
}

async function addCarMsg(carId, msg) {
	try {
        const criteria = { _id: ObjectId.createFromHexString(carId) }
        msg.id = makeId()
        
		const collection = await dbService.getCollection('car')
		await collection.updateOne(criteria, { $push: { msgs: msg } })

		return msg
	} catch (err) {
		logger.error(`cannot add car msg ${carId}`, err)
		throw err
	}
}

async function removeCarMsg(carId, msgId) {
	try {
        const criteria = { _id: ObjectId.createFromHexString(carId) }

		const collection = await dbService.getCollection('car')
		await collection.updateOne(criteria, { $pull: { msgs: { id: msgId }}})
        
		return msgId
	} catch (err) {
		logger.error(`cannot remove car msg ${carId}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const criteria = {
	};

    if (filterBy.txt) {
        criteria.title = { $regex: filterBy.txt, $options: 'i' };
    }


    if (filterBy.filterPriceGroup){
		criteria.price = {};
		if (filterBy.minPrice !== undefined) {
			criteria.price.$gte = filterBy.minPrice;
		}
		if (filterBy.maxPrice !== undefined && filterBy.maxPrice > 0) {
			criteria.price.$lte = filterBy.maxPrice;
		}
    }
	// check later what type of object coming from front?
	const tagsFilter=_buildCriteriaArray(filterBy.categoriesArray)
	if (Object.keys(tagsFilter).length !== 0) {
		criteria.tags=tagsFilter
	}

	if (filterBy.sellerRate) {
		  criteria['owner.rate'] = { $gte: +filterBy.sellerRate };
	}


	if (filterBy.sellerLevels&&filterBy.sellerLevels.length > 0) {
		criteria['owner.level'] = { $in: filterBy.sellerLevels };
	}

	if (filterBy.deliveryMaxTime !== 'anytime') {
		criteria.daysToMake = { $lte: +filterBy.deliveryMaxTime };
	}


	return criteria
}

function _buildSort(filterBy) {
    if(!filterBy.sortField) return {}
    return { [filterBy.sortField]: filterBy.sortDir }
}

function _buildCriteriaArray(categoriesArrayInput) {
    let tags = {};

    let categoriesArray = categoriesArrayInput;
    // if (typeof categoriesArray === 'string') {

	// 	try {
    //         categoriesArray = JSON.parse(categoriesArray);
    //     } catch (error) {
    //         console.error('Invalid JSON format for categoriesArray:', error);
    //         categoriesArray = [];
    //     }
    // }
	if (Array.isArray(categoriesArray) && categoriesArray.length > 0) {
        // const allActive = categoriesArray.every(category => category.active === true);
        const allInactive = categoriesArray.every(category => category.active === false);

        if (!allInactive) {
            const activeCategories = categoriesArray
                .filter(category => category.active === true)
                .map(category => category.category);

            if (activeCategories.length > 0) {
                tags = { $all: activeCategories };
            }
        }
    }
	return tags

}

