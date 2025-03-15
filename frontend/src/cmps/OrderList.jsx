import { OrderPreview } from "./OrderPreview"
import { useState, useEffect,useRef } from 'react'

export function OrderList({ sellerOrders,onSubmitStatus}) {


    return <section>
            <ul className='gig-order-table' >
                <li className='table-header'>
                    <article>
                        <h4 className='buyer-col'>BUYER</h4>
                        <h4 className='gig-col'>GIG</h4>
                        <h4>ORDER AT</h4>
                        <h4>DELIVERY AT</h4>
                        <h4>TOTAL</h4>
                        <h4>STATUS</h4>
                    </article>
                </li>
                {sellerOrders.map((thisOrder,row) => (
                <li key={thisOrder._id}>
                    <OrderPreview  
                        thisOrder={thisOrder} 
                        onSubmitStatus={onSubmitStatus}                        />
                </li> ))}                          
                        
            </ul>
    </section>
}