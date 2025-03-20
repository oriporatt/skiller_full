import { MyOrderPreview } from "./MyOrderPreview"
import { useState, useEffect,useRef } from 'react'

export function MyOrdersList({ myOrders,markRow}) {


    return <section className="my-orders-list">
            <ul className='my-order-table' >
                <li className='table-header'>
                    <article>
                        <h4 className='seller-col'>SELLER</h4>
                        <h4 className='gig-col'>GIG</h4>
                        <h4>ORDER AT</h4>
                        <h4>STATUS</h4>
                    </article>
                </li>
                {myOrders.map((thisOrder,row) => (
                <li key={thisOrder._id}>
                    <MyOrderPreview  
                        thisOrder={thisOrder}
                        markRow={markRow}
                />
                </li> ))}                          
                        
            </ul>
    </section>
}