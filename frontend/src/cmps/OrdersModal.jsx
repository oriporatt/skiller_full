


import { useState, useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import BlackStar from '../assets/svgs/blackStar.svg?react'
import RatePremium from '../assets/svgs/ratePremium.svg?react'
import Location from '../assets/svgs/location.svg?react'
import Member from '../assets/svgs/member.svg?react'
import Fullname from '../assets/svgs/fullname.svg?react'
import ResponseTime from '../assets/svgs/responseTime.svg?react'
import ThreeDots from '../assets/svgs/threeDots.svg?react'

import { loadOrders } from '../store/actions/order.actions'
import { orderService } from '../services/order'
import { StatusModal } from '../cmps/StatusModal'
import { updateOrder } from '../store/actions/order.actions'
import { MyOrdersList } from './MyOrdersList'


export function OrdersModal({onCloseMyOrders}) {
    const dispatch = useDispatch()
    const orders =useSelector(storeState => storeState.orderModule.orders)
    const users =useSelector(storeState => storeState.userModule.users)
    const user =useSelector(storeState => storeState.userModule.user)
    const markOrder =useSelector(storeState => storeState.systemModule.markOrder)

    

    let myOrders;
    if (users && user && orders){
        myOrders = orders.filter(orderIdx=>orderIdx.clientId===user._id)
        myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        myOrders=myOrders.map(thisOrder=>{
            return {
                ...thisOrder, 
                createdAtFormatted: formatTimestamp(thisOrder.createdAt),
                providerUrl: getUserImgUrl(thisOrder.providerId),
                deliveryDateFormatted: formatDeliveryDate(thisOrder.deliveryDate)
            }
        })
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
    
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('en-US', { month: 'long' }); 
        const year = date.getFullYear();
    
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
    function formatDeliveryDate(isoDate) {
        const date = new Date(isoDate);
    
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    }
    function getUserImgUrl(userId){
        let url=''
        const thisUser=users.filter(thisUser=>thisUser._id===userId) 
        if (thisUser.length===1){
            url=thisUser[0].imageUrl
        }
        return url
    }

    function onSubmitStatus(){
        console.log('submitted')
    }

    useEffect(() => {
        loadOrders(orderService.getDefaultFilter())
    }, [])

    return (
        <main className="orders-modal">  
            <div className='orders-modal-div'>
                <MyOrdersList className='my-orders-list' myOrders={myOrders} 
                                markRow={markOrder}/>
         
                <button className='close-modal-btn' onClick={()=>onCloseMyOrders()}>Close</button>
            </div>
        </main>
    )
}
