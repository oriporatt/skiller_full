import { httpService } from '../http.service'

export const gigService = {
    query,
    getById,
    save,
    remove
}

async function query(filterBy = {txt:'' }) {
    return httpService.post(`gig`, filterBy)
}

function getById(gigId) {
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/${gig._id}`, gig)
    } else {
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

// async function addCarMsg(carId, txt) {
//     const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
//     return savedMsg
// }