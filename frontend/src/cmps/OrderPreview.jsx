import { useState, useEffect,useRef } from 'react'
import ThreeDots from '../assets/svgs/threeDots.svg?react'
import { StatusModal } from './StatusModal';

export function OrderPreview({ thisOrder,onSubmitStatus}) {
    const [showStatusModal, setShowStatusModal] = useState(false);

    function toggleModal(thisOrder){
        setShowStatusModal(prevState=>!prevState)

    }
    function onCloseModal(){
        setShowStatusModal(false)

    }

    function onSubmitStatusClick(statusState,orderId){
        onSubmitStatus(statusState,orderId)
        setShowStatusModal(false)

    }

    return <article className="order-preview" >

            <div className='client-element'>
                <img  src={thisOrder.clientUrl}/>
                <h4>{thisOrder.clientFullName}</h4>
            </div>
            <p className="gig-title">{thisOrder.gigTitle}</p>
            <p className='order-at'><span className='cards'>Ordered at </span>{thisOrder.createdAtFormatted}</p>
            <p className='delivery-at'><span className='cards'>Delivery at </span>{thisOrder.deliveryDateFormatted}</p>
            <p className='total-price'>{thisOrder.total+'$'}</p>
            <div className='status-col' >
                <p className='gig-status' onClick={() => toggleModal(thisOrder)}>
                    {thisOrder.status==="pending"&&<span className='pending'>Pending</span>}                                    
                    {thisOrder.status==="approved"&&<span className='approved'>Approved</span>}                                    
                    {thisOrder.status==="in-progress"&&<span className='in-progress'>In Progress</span>}                                    
                    {thisOrder.status==="completed"&&<span className='completed'>Completed</span>}  
                    {thisOrder.status==="rejected"&&<span className='rejected'>Rejected</span>}  

                </p>
                <ThreeDots onClick={() => toggleModal(thisOrder)}/> 
                {showStatusModal&& <StatusModal 
                    initialStatus={thisOrder.status}
                    onSubmitStatusClick={onSubmitStatusClick}
                    orderId={thisOrder._id}
                    onCloseModal={onCloseModal}
                    />}
            </div>            
    </article>
}
