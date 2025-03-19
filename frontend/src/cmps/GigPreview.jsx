import { Link } from 'react-router-dom'
import { GigPreviewCarrousel } from './GigPreviewCarrousel'
import { useNavigate } from 'react-router-dom';
import BlackStar from '../assets/svgs/blackStar.svg?react'
import GrayDiamond from '../assets/svgs/grayDiamond.svg?react'
import BlackDiamond from '../assets/svgs/blackDiamond.svg?react'

export function GigPreview({ gig }) {
    const navigate = useNavigate();
    let rateInt =0
    let level=''
    if (gig){
        rateInt=Math.round(gig.owner.rate)
    
        if (gig.owner.level==='basic'){
          level='Level 1'
        } else if (gig.owner.level==='standard'){
          level='Level 2'
        } else if (gig.owner.level==='premium'){
          level='Level 3'
        }else{
          level=gig.owner.level
        }
    }




    return <article className="gig-preview">
        <div className="img-container"
        >
            <GigPreviewCarrousel images={gig.imgs} gigId={gig._id} />
        </div>

        <header className='card-header'>
            <div className='owner-img'>
                <img  src={gig.owner.imgUrl}/>
            </div>
            <div className='owner-name'>
                {/* <Link to={`/gig/${gig._id}`}>{gig.owner.fullname}</Link> */}
                <h4>{gig.owner.fullname}</h4>
            </div>
            {(level==='Level 1')&&<div className='owner-level'>
                <p>{level}</p> <BlackDiamond/> <GrayDiamond/> <GrayDiamond/>
            </div>}
            {(level==='Level 2')&&<div className='owner-level'>
                <p>{level}</p> <BlackDiamond/> <BlackDiamond/> <GrayDiamond/>
            </div>}
            {(level==='Level 3')&&<div className='owner-level'>
                <p>{level}</p> <BlackDiamond/> <BlackDiamond/> <BlackDiamond/>
            </div>}
                                  
                                

        </header>

        <p onClick={()=>navigate(`/gig/${gig._id}`)}>
            <span className='gig-title' >
                {gig.title}
            </span>
        </p>
        
          
        <div className='rate' onClick={()=>navigate(`/gig/${gig._id}`)}>
            {/* {Array.from({ length: rateInt}, (_, index) => (
            <BlackStar key={index} />
            ))} */}
            <BlackStar/>
            <p>{gig.owner.rate}</p>
        </div>
        <p onClick={()=>navigate(`/gig/${gig._id}`)}><span className='price-tag'>From {gig.price}$</span></p>
    </article>
}