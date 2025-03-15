import { useState, useEffect,useRef ,useLayoutEffect} from 'react'
import RadioOff from '../assets/svgs/radioOff.svg?react'
import RadioOn from '../assets/svgs/radioOn.svg?react'
import CloseModal2 from '../assets/svgs/closeModal2.svg?react'


export function StatusModal({ initialStatus,onSubmitStatusClick,orderId,onCloseModal }) {
    const [statusState, setStatusState] = useState(initialStatus);

    function onToggleStatus(newStatus){
        
        setStatusState(newStatus)
    }
    const modalRef = useRef(null);
    useEffect(() => {
        if (modalRef.current) {
            // Get the modal's position relative to the page
            const rect = modalRef.current.getBoundingClientRect();

            // Calculate the position to scroll the screen to the bottom of the modal
            window.scrollTo({
                top: window.scrollY + rect.bottom,  // Scroll to the bottom of the modal
                behavior: 'smooth',  // Smooth scrolling
            });
        }
    }, []); // Runs when the modal is first rendered

    return <div className="status-modal" ref={modalRef}>
        <div className="modal-div">
            <p>Update Status</p>
            <div  onClick={()=>onToggleStatus('pending')}>
                {statusState==='pending'? <RadioOn/>:<RadioOff/>}
                <button className='pending'>Pending</button>
            </div>
            <div onClick={()=>onToggleStatus('approved')}>
                {statusState==='approved'? <RadioOn/>:<RadioOff/>}
                <button className='approved'>Approved</button>
            </div>
            <div onClick={()=>onToggleStatus('in-progress')}>
                {statusState==='in-progress'? <RadioOn/>:<RadioOff/>}
                <button className='in-progress'>In Progress</button>
            </div>
            <div onClick={()=>onToggleStatus('completed')}>
                {statusState==='completed'? <RadioOn/>:<RadioOff/>}
                <button className='completed'>Completed</button>
            </div>
            <div onClick={()=>onToggleStatus('rejected')}>
                {statusState==='rejected'? <RadioOn/>:<RadioOff/>}
                <button className='rejected'>Rejected</button>
            </div>

            <button onClick={()=>onSubmitStatusClick(statusState,orderId)} className='menu-btn'>Apply</button>
            <button className='menu-btn'onClick={() =>onCloseModal()} >Close</button>
            <div className='x-corner' onClick={() =>onCloseModal()}>
                <CloseModal2 className='x-svg' />
            </div>

        </div>
    </div>
}