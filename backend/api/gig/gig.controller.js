import { logger } from '../../services/logger.service.js'
import { gigService } from './gig.service.js'

export async function getGigs(req, res) {

	try {

		const filterBy = {
			txt: req.body.txt || '',
			categoriesArray: req.body.categoriesArray || [],
			minPrice:+req.body.minPrice || 0,
			maxPrice: +req.body.maxPrice || -1,
			filterPriceGroup: req.body.filterPriceGroup || '',
			deliveryMaxTime: req.body.deliveryMaxTime || 'anytime',
			sellerRate:req.body.sellerRate || 0,
			sellerLevels:req.body.sellerLevels || [],
			sortField: req.body.sortField || '',
			sortDir: req.body.sortDir || 1,
		}

		const gigs = await gigService.query(filterBy)
		res.json(gigs)
	} catch (err) {
		logger.error('Failed to get gigs', err)
		res.status(400).send({ err: 'Failed to get gigs' })
	}
}

export async function getGigById(req, res) {
	try {
		const gigId = req.params.id
		const gig = await gigService.getById(gigId)
		res.json(gig)
	} catch (err) {
		logger.error('Failed to get gig', err)
		res.status(400).send({ err: 'Failed to get gig' })
	}
}

export async function addCar(req, res) {
	const { loggedinUser, body: car } = req

	try {
		car.owner = loggedinUser
		const addedCar = await carService.add(car)
		res.json(addedCar)
	} catch (err) {
		logger.error('Failed to add car', err)
		res.status(400).send({ err: 'Failed to add car' })
	}
}

export async function updateCar(req, res) {
	const { loggedinUser, body: car } = req
    const { _id: userId, isAdmin } = loggedinUser

    if(!isAdmin && car.owner._id !== userId) {
        res.status(403).send('Not your car...')
        return
    }

	try {
		const updatedCar = await carService.update(car)
		res.json(updatedCar)
	} catch (err) {
		logger.error('Failed to update car', err)
		res.status(400).send({ err: 'Failed to update car' })
	}
}

export async function removeCar(req, res) {
	try {
		const carId = req.params.id
		const removedId = await carService.remove(carId)

		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove car', err)
		res.status(400).send({ err: 'Failed to remove car' })
	}
}

export async function addCarMsg(req, res) {
	const { loggedinUser } = req

	try {
		const carId = req.params.id
		const msg = {
			txt: req.body.txt,
			by: loggedinUser,
		}
		const savedMsg = await carService.addCarMsg(carId, msg)
		res.json(savedMsg)
	} catch (err) {
		logger.error('Failed to update car', err)
		res.status(400).send({ err: 'Failed to update car' })
	}
}

export async function removeCarMsg(req, res) {
	try {
		const { id: carId, msgId } = req.params

		const removedId = await carService.removeCarMsg(carId, msgId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove car msg', err)
		res.status(400).send({ err: 'Failed to remove car msg' })
	}
}
