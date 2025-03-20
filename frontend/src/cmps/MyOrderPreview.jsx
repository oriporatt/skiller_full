import { useState, useEffect,useRef } from 'react'
import ThreeDots from '../assets/svgs/threeDots.svg?react'
import { StatusModal } from './StatusModal';

export function MyOrderPreview({ thisOrder,markRow}) {

    let markThisOrder=false
    if (thisOrder._id===markRow){
        markThisOrder=true
    }

    return <article className={`my-order-preview ${markThisOrder ? 'mark' : ''}`}> 
            <div className='client-element'>
                <img  src={thisOrder.providerUrl}/>
                <h4>{thisOrder.providerFullname}</h4>
            </div>
            <p className="gig-title">{thisOrder.gigTitle}</p>
            <p className='order-at'>{thisOrder.createdAtFormatted}</p>
            <div className='status-col' >
                <p className='gig-status'>
                    {thisOrder.status==="pending"&&<span className='pending'>Pending</span>}                                    
                    {thisOrder.status==="approved"&&<span className='approved'>Approved</span>}                                    
                    {thisOrder.status==="in-progress"&&<span className='in-progress'>In Progress</span>}                                    
                    {thisOrder.status==="completed"&&<span className='completed'>Completed</span>}  
                    {thisOrder.status==="rejected"&&<span className='rejected'>Rejected</span>}  
                </p>
            </div>            
    </article>
}
