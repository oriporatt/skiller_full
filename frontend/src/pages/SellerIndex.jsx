import { useState, useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import {  loadGigs } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/index'
import { userService } from '../services/user'
import BlackStar from '../assets/svgs/blackStar.svg?react'
import RatePremium from '../assets/svgs/ratePremium.svg?react'
import Location from '../assets/svgs/location.svg?react'
import Member from '../assets/svgs/member.svg?react'
import Fullname from '../assets/svgs/fullname.svg?react'
import ResponseTime from '../assets/svgs/responseTime.svg?react'
import StatCart from '../assets/svgs/statCart.svg?react'

import Income from '../assets/svgs/income.svg?react'
import Clients from '../assets/svgs/clients.svg?react'

import { loadOrders } from '../store/actions/order.actions'
import { orderService } from '../services/order'
import { StatusModal } from '../cmps/StatusModal'
import { updateOrder } from '../store/actions/order.actions'
import { OrderList } from '../cmps/OrderList'


export function SellerIndex() {
    const dispatch = useDispatch()
    const orders =useSelector(storeState => storeState.orderModule.orders)
    const users =useSelector(storeState => storeState.userModule.users)
    const user =useSelector(storeState => storeState.userModule.user)
    let seller=''
    if (user){
        const sellerArray=users.filter(thisUser=>thisUser._id===user._id)

        if (sellerArray.length===1){
            seller=sellerArray[0]
        }
    }



    let statsObj={}
    let rateInt=''
    let sellerOrders=[]
    if (seller){
        rateInt=Math.round(seller.rate)
        sellerOrders = orders.filter(order => seller._id === order.providerId);
        sellerOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        sellerOrders=sellerOrders.map(thisOrder=>{
            return {
                ...thisOrder, 
                createdAtFormatted: formatTimestamp(thisOrder.createdAt),
                clientUrl: getUserImgUrl(thisOrder.clientId),
                deliveryDateFormatted: formatDeliveryDate(thisOrder.deliveryDate)
            }
        })
        calcStats()

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

    
    function calcStats(){
        
        statsObj.totalOrders=sellerOrders.length
        statsObj.completedOrders=sellerOrders.filter(order=>order.status==='completed').length
        statsObj.rejectedOrders=sellerOrders.filter(order=>order.status==='rejected').length
        statsObj.pending=sellerOrders.filter(order=>order.status==='pending').length
        statsObj.approved=sellerOrders.filter(order=>order.status==='approved').length
        statsObj.inProgress=sellerOrders.filter(order=>order.status==='in-progress').length

        statsObj.totalOrderValue = sellerOrders
            .filter(order => order.status !== 'rejected') 
            .filter(order => order.status !== 'pending') 
            .reduce((sum, order) => sum + order.total, 0);
        statsObj.clients =getUniqueClientFullnames(sellerOrders
            .filter(order => order.status !== 'rejected') 
        ).length

    }

    function getUniqueClientFullnames(sellerOrders) {
        return Array.from(
          sellerOrders.reduce((acc, order) => {
            acc.add(order.clientFullName); 
            return acc;
          }, new Set()) 
        );
      }
    


    

    function onSubmitStatus(newStatus,orderId){
        let oldOrder={}
        const oldOrderArray = orders.filter(currentOrder=>currentOrder._id===orderId)
        if (oldOrderArray.length===1){
            oldOrder=oldOrderArray[0]
        }
        const newOrder=
            {
                ...oldOrder,
                status: newStatus
            }
        updateOrder(newOrder)
    }


    useEffect(() => {
        loadOrders(orderService.getDefaultFilter())
    }, [])

    return (
        <main className="seller-index">  
            <div className='seller-side'>
                <h3>My Profile</h3>
                <div className='seller-profile'>
                    <div className='top-details'>
                        <div className='img-container'>
                            <img  src={seller.imageUrl}/>
                            {seller.level==='premium'&& <div className='premium'>
                                <RatePremium />
                                <h5>Premium member</h5>
                            </div>}
                        </div>
                        <div className='rate'>
                            {Array.from({ length: rateInt}, (_, index) => (
                                <BlackStar key={index} />
                            ))}
                            <p>{seller.rate}</p>
                        </div>
                    </div>

                    <ul className='buttom-details'>

                        <li className='name-line'>
                            <Fullname/>
                            <h6>Full Name</h6>
                            <h6 className='data-bold'>{seller.fullname}</h6>
                        </li>
                        <li className='from-line'>
                            <Location/>
                            <h6>From</h6>
                            <h6 className='data-bold'>{seller.from}</h6>
                        </li>
                        <li className='member-since'>
                            <Member/>
                            <h6>Member Since</h6>
                            <h6 className='data-bold'>{seller.memberSince}</h6>
                        </li>

                        <li className='response-line'>
                            <ResponseTime/>
                            <h6>Avg. Response Time</h6>
                            <h6 className='data-bold'>{seller.avgResponseTime} min.</h6>
                        </li>

                    </ul>
                </div>

            </div>
            
            
            
            <div className='stats-and-orders'>

            
                {statsObj&&<div className='stats'>
                    <h3>Seller Stats</h3>
                    <ul className='stats-list'>
                        <li className='total-by-status'>
                            <div className='totals'>
                                <h4>Total Orders</h4>
                                <h5>{statsObj.totalOrders}</h5>
                                <StatCart/>
                            </div>


                        </li>
                        <li className='total-by-amount'>
                            <div className='total-amount'>
                                <h4>Total Income</h4>
                                <h5>{statsObj.totalOrderValue}$</h5>
                                <Income/>
                            </div>
                        </li>
                        <li className='total-by-clients'>
                            <div className='total-client'>
                                <h4>Clients</h4>
                                <h5>{statsObj.clients}</h5>
                                <Clients/>
                            </div>
                        </li>
                    </ul>

                </div>}

                {/* {statsObj.pending>0&&<h6 className='pending-stats'>{statsObj.pending} <span > Pending</span></h6>}
                {statsObj.approved>0&&<h6 className='approved-stats'>{statsObj.approved} <span> Approved</span></h6>}
                {statsObj.inProgress>0&&<h6 className='in-progress-stats'>{statsObj.inProgress} <span> In-Progress</span></h6>}
                {statsObj.rejectedOrders>0&&<h6 className='rejected-stats'>{statsObj.rejectedOrders} <span> Rejected</span></h6>}
                {statsObj.completedOrders>0&&<h6 className='completed-stats'>{statsObj.completedOrders} <span> Completed</span></h6>} */}


                <div className='manage-orders'>
                    <h3>Manage Orders</h3>
                    <OrderList sellerOrders={sellerOrders} 
                                onSubmitStatus={onSubmitStatus}
                                />
                </div>

            </div>

        </main>
    )
}
