import { useEffect,useRef,useState} from "react";
import { useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router";
import{SET_SEARCH_BOX_POS} from '../store/reducers/system.reducer'
import SVGgraphicAndDesign  from '../assets/svgs/SVGgraphicAndDesign';
import SVGprogrammingAndTech  from '../assets/svgs/SVGprogrammingAndTech';
import SVGdigitalMarketing  from '../assets/svgs/SVGdigitalMarketing';
import SVGwritingAndTranslation  from '../assets/svgs/SVGwritingAndTranslation';
import SVGvideoAndAnimation  from '../assets/svgs/SVGvideoAndAnimation';
import SVGaiSerices from "../assets/svgs/SVGaiSerices";
import SVGmusicAndAudio from "../assets/svgs/SVGmusicAndAudio";
import SVGbusiness from "../assets/svgs/SVGbusiness";
import SVGconsulting from "../assets/svgs/SVGconsulting";
import { UPDATE_FILTER_BY } from "../store/reducers/gig.reducer"; 
import { gigService } from "../services/gig/index";
import RejectSVG from '../assets/svgs/rejectSVG.svg?react'
import HomeDiamondV from '../assets/svgs/homeDiamondV.svg?react'
import HomeAccessTalent from '../assets/svgs/homeAccessTalent.svg?react'
import HomeTime from '../assets/svgs/homeTime.svg?react'
import HomeQuality from '../assets/svgs/homeQuality.svg?react'
import HomePay from '../assets/svgs/homePay.svg?react'

import LeftArrow from '../assets/svgs/leftArrow.svg?react'
import RightArrow from '../assets/svgs/rightArrow.svg?react'



export function HomePage() {
    const searchBoxEl=useRef(null); 
    const navigate = useNavigate()
	const dispatch = useDispatch()
    let showSearchOnTop = false
    const searchBoxPos = useSelector(storeState => storeState.systemModule.searchBoxPosition)
    if (searchBoxPos==='top'){
        showSearchOnTop=true
    }

    //search box functions
	const searchBoxTextGlobal = useSelector(storeState => storeState.gigModule.filterBy.txt)
	const [ showX, setShowX ] = useState(false)
	const [ localInput, setLocalInput ] = useState(searchBoxTextGlobal)





    function onSubmitSearch(event) {
        event.preventDefault(); 
        
        dispatch({
            type: UPDATE_FILTER_BY,
            filterBy: { 'txt': localInput }
        });

        navigate('/gig')

    }


    
    function onClearSearchBox(event) {
        event.preventDefault(); 
        setLocalInput('')
        setShowX(false)
        dispatch({
            type: UPDATE_FILTER_BY,
            filterBy: { 'txt': '' }
        });
    }

	useEffect(()=>{
		if (localInput){
			setShowX(true)
		}else{
            setShowX(false)

        }
	},
	[localInput])

    // horizinal scroling functions 
    const [leftScrollButton, setLeftScrollButton] = useState(false)
    const listRef = useRef(null);
    
    const scrollLeft = () => {
        listRef.current.scrollBy({
        left: -listRef.current.offsetWidth, 
        behavior: "smooth",
        });
        setLeftScrollButton(false)
    };
    
    const scrollRight = () => {
        listRef.current.scrollBy({
        left: listRef.current.offsetWidth, 
        behavior: "smooth",
        });
        setLeftScrollButton(true)


    };
    
    useEffect(()=>{
        const mainSearchBoxObserver = new IntersectionObserver(onScrollSearchBox, {
            rootMargin: '-100px 0px 0px'
        })
        mainSearchBoxObserver.observe(searchBoxEl.current)
        return () => {
            mainSearchBoxObserver.disconnect();
          }
    },
    [])






    function onScrollSearchBox(entries){
        entries.forEach((entry)=>{
            dispatch({
                type: SET_SEARCH_BOX_POS,
                searchBoxPosition: entry.isIntersecting? 'bottom':'top'
            })

        })
    }


    const emptyFilterBy= gigService.getDefaultFilter()
    function onClickCategory(newCategory){
        let newCategoriesArray = [...emptyFilterBy.categoriesArray]

        newCategoriesArray= newCategoriesArray.map(catObj=>{
            if (catObj.category===newCategory){
                return {
                    category: catObj.category,
                    active:true}
            }else{
                return catObj
            }
        })

        const newFilterBy={
            ...emptyFilterBy,
            categoriesArray:newCategoriesArray
        }

        dispatch({
            type: UPDATE_FILTER_BY,
            filterBy: newFilterBy
        });
        navigate('/gig')

    }

    return (
        <section className='home-page '>
            <div className="main-home-search ">
                <div>
                    <h1>Scale your professional workforce with <span>freelancers</span></h1>
                    {/* <h1>workforce with <span>freelancers</span></h1> */}
                </div>

                <div className="search-container " ref={searchBoxEl} >
                    <input 
                            type="text" 
                            placeholder="Search for any service..."
                            value={localInput} 
                            onChange={(e) => setLocalInput(e.target.value)} 
                    />
                    <img src="/img/search-icon.svg" alt="Search" className='search-icon' onClick={onSubmitSearch} />
                    {showX&& <RejectSVG className='x-button' onClick={onClearSearchBox} /> }
                </div>

                <ul className='trusted-by' >
                    <li className='text'>Trusted by:</li>
                    <li>
                        <svg width="70" height="14" viewBox="0 0 96 20" fill='currentcolor' xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.884 12.894c0 1.092.24 1.93.553 2.438.41.664 1.023.946 1.648.946.806 0 1.543-.2 2.963-2.165 1.139-1.575 2.48-3.785 3.382-5.17l1.528-2.348c1.061-1.63 2.29-3.443 3.698-4.672 1.15-1.002 2.39-1.56 3.639-1.56 2.096 0 4.092 1.215 5.62 3.493 1.673 2.495 2.484 5.637 2.484 8.88 0 1.928-.38 3.345-1.026 4.464-.625 1.082-1.843 2.163-3.89 2.163v-3.085c1.753 0 2.19-1.612 2.19-3.456 0-2.628-.612-5.545-1.962-7.629-.958-1.478-2.2-2.381-3.565-2.381-1.477 0-2.666 1.114-4.002 3.1-.71 1.056-1.44 2.342-2.258 3.793l-.901 1.597c-1.811 3.21-2.27 3.941-3.175 5.148-1.586 2.113-2.941 2.913-4.725 2.913-2.116 0-3.454-.916-4.282-2.296-.677-1.126-1.01-2.602-1.01-4.284l3.09.11z" 
                            fill="currentcolor"/>
                            <path d="M3.23 4.074C4.647 1.89 6.69.364 9.035.364c1.358 0 2.708.401 4.118 1.552 1.542 1.259 3.185 3.33 5.235 6.746l.735 1.225c1.775 2.957 2.785 4.478 3.375 5.195.76.921 1.293 1.196 1.984 1.196 1.754 0 2.192-1.612 2.192-3.456l2.725-.086c0 1.928-.38 3.345-1.026 4.464-.625 1.082-1.843 2.163-3.89 2.163-1.274 0-2.402-.276-3.65-1.453-.959-.903-2.08-2.508-2.942-3.95l-2.566-4.285c-1.287-2.151-2.468-3.755-3.151-4.48-.735-.782-1.68-1.725-3.188-1.725-1.22 0-2.257.857-3.125 2.167L3.23 4.074z" 
                            fill="currentcolor"/>
                            <path d="M8.986 3.47c-1.22 0-2.257.857-3.125 2.167-1.226 1.851-1.977 4.609-1.977 7.257 0 1.092.24 1.93.553 2.438l-2.634 1.735c-.677-1.126-1.01-2.602-1.01-4.284 0-3.059.84-6.247 2.437-8.709C4.647 1.89 6.69.364 9.036.364l-.05 3.106zM35.406.965h3.574l6.077 10.994L51.135.965h3.497v18.064h-2.916V5.184l-5.33 9.588H43.65l-5.329-9.588V19.03h-2.915V.965zM63.767 7.7c-2.09 0-3.35 1.574-3.651 3.523h7.096C67.066 9.215 65.908 7.7 63.767 7.7zm-6.542 4.633c0-4.1 2.65-7.085 6.593-7.085 3.879 0 6.195 2.947 6.195 7.304v.8h-9.897c.35 2.12 1.757 3.549 4.025 3.549 1.81 0 2.941-.552 4.013-1.562l1.55 1.897c-1.46 1.342-3.316 2.116-5.666 2.116-4.268 0-6.813-3.113-6.813-7.02zm16.323-4.374h-2.684V5.57h2.684V1.623h2.813v3.948h4.078V7.96H76.36v6.05c0 2.067.66 2.801 2.284 2.801.741 0 1.166-.063 1.794-.168v2.362a8.38 8.38 0 01-2.336.322c-3.037 0-4.555-1.66-4.555-4.98V7.958zm18.736 2.322c-.565-1.427-1.825-2.477-3.677-2.477-2.408 0-3.948 1.708-3.948 4.49 0 2.713 1.418 4.503 3.832 4.503 1.898 0 3.253-1.104 3.793-2.478v-4.038zm2.813 8.748h-2.761v-1.884c-.772 1.11-2.177 2.207-4.451 2.207-3.66 0-6.104-3.063-6.104-7.058 0-4.033 2.503-7.046 6.259-7.046 1.856 0 3.312.742 4.296 2.052V5.571h2.761V19.03z" 
                            fill="currentcolor"/>
                        </svg>
                    </li>
                    <li>
                        <svg width="53.41" height="17.87" viewBox="0 0 73 25" 
                            fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.004 9.214H9.506v2.538h6.027c-.298 3.559-3.24 5.076-6.017 5.076-3.553 0-6.654-2.813-6.654-6.756 0-3.842 2.956-6.8 6.662-6.8 2.859 0 4.544 1.834 4.544 1.834l1.765-1.84S13.567.727 9.433.727c-5.263 0-9.335 4.47-9.335 9.3 0 4.731 3.83 9.345 9.47 9.345 4.96 0 8.59-3.42 8.59-8.476 0-1.066-.154-1.683-.154-1.683v.001zm1.188 4.353c0-3.2 2.5-5.943 5.987-5.943 2.867 0 5.975 2.044 5.975 6.013 0 3.463-2.672 5.972-5.934 5.972-3.604 0-6.028-2.795-6.028-6.042zm9.362.054c0-2.248-1.625-3.644-3.34-3.644-1.927 0-3.408 1.55-3.408 3.626 0 2.122 1.5 3.653 3.4 3.653 1.73 0 3.348-1.435 3.348-3.635zm3.657-.054c0-3.2 2.5-5.943 5.987-5.943 2.867 0 5.975 2.044 5.975 6.013 0 3.463-2.672 5.972-5.934 5.972-3.603 0-6.028-2.795-6.028-6.042zm9.362.054c0-2.248-1.626-3.644-3.34-3.644-1.927 0-3.408 1.55-3.408 3.626 0 2.122 1.5 3.653 3.4 3.653 1.73 0 3.348-1.435 3.348-3.635zm3.657-.01c0-3.166 2.517-5.987 5.717-5.987 1.394 0 2.444.542 3.211 1.375V7.984h2.497v10.768c0 4.23-2.426 6.248-5.608 6.248-2.91 0-4.544-1.802-5.356-3.53l2.288-.962c.318.772 1.23 2.133 3.049 2.133 1.883 0 3.13-1.238 3.13-3.305v-1.182c-.666.778-1.569 1.456-3.266 1.456-2.745 0-5.662-2.392-5.662-5.999zm9.13.013c0-2.303-1.612-3.651-3.18-3.651h-.001c-1.68 0-3.329 1.372-3.329 3.673 0 2.214 1.588 3.609 3.294 3.609 1.608 0 3.216-1.29 3.216-3.631zm7.361-.016c0-3.567 2.535-5.984 5.555-5.984 2.381 0 4.18 1.598 4.952 3.511l.415.977-7.985 3.335c.477.893 1.246 1.816 2.92 1.816 1.49 0 2.384-.816 2.918-1.65l2.059 1.378c-.923 1.243-2.47 2.63-4.99 2.63-3.018 0-5.844-2.238-5.844-6.013zm7.862-2.4c-.332-.698-1.115-1.28-2.203-1.28-1.724 0-3.359 1.787-3.129 3.523l5.332-2.243zM58.25 19.252h2.622V1.59H58.25v17.663z" 
                            fill="currentcolor"/>
                        </svg>
                    </li>
                    <li>
                        <svg width="53.64" height="14.37" viewBox="0 0 74 20" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M73.495.15c-.036.062-.08.133-.108.196-1.242 2.955-2.484 5.92-3.726 8.875a.414.414 0 00-.009.357l3.753 9.83c.027.063.045.125.081.214-.324-.044-.612-.08-.9-.125-.792-.125-1.575-.259-2.367-.384-.135-.017-.189-.089-.234-.205-.675-1.741-1.36-3.482-2.043-5.232a3.478 3.478 0 00-.1-.241c-.044.098-.071.152-.098.214-.693 1.598-1.386 3.188-2.07 4.786-.063.152-.135.178-.297.16-.756-.098-1.512-.187-2.278-.276-.26-.027-.513-.063-.8-.098.071-.161.125-.304.188-.447 1.224-2.768 2.449-5.536 3.682-8.303a.423.423 0 00.009-.375c-1.152-2.911-2.295-5.83-3.43-8.76-.027-.062-.045-.133-.08-.214.071 0 .125-.009.18-.009h2.934c.135 0 .189.045.234.161.62 1.59 1.242 3.17 1.863 4.76.027.062.054.115.09.213.045-.089.072-.151.099-.214.666-1.58 1.332-3.16 1.989-4.75.054-.134.117-.179.261-.179h3.168a.09.09 0 01.01.045zM3.748 8.65v10.553c-1.044.143-2.07.277-3.105.42V.122h2.709c.144 0 .198.044.243.169 1.278 3.536 2.556 7.08 3.834 10.625a.645.645 0 00.108.205V.132h3.079v18.25c-.261.035-.522.088-.793.115-.774.09-1.539.17-2.313.26-.17.017-.252-.019-.306-.188-1.107-3.232-2.223-6.464-3.33-9.697-.027-.08-.054-.151-.081-.232-.018.01-.027.01-.045.01zm17.038 1.615c-.549 0-1.08-.009-1.62 0-.774.01-1.539.027-2.313.036-.117 0-.18.018-.18.16v4.286c0 .036.009.072.009.125 1.81-.116 3.6-.223 5.418-.339.01.09.018.16.018.223 0 .84 0 1.679.01 2.51 0 .169-.064.214-.217.223-1.134.08-2.277.17-3.41.258-1.315.108-2.63.206-3.934.313a27.2 27.2 0 01-.927.062V.132h8.478c0 .062.01.124.01.187v2.616c0 .17-.055.205-.217.205-1.665-.009-3.33 0-4.995 0-.243 0-.243 0-.243.232v3.893c1.377-.018 2.736-.035 4.104-.062.01 1.035.01 2.035.01 3.062zM44.144.131V3.15H38.59v3.91h4.176c.01.081.01.135.01.197 0 .875-.01 1.76.008 2.634 0 .179-.063.205-.225.205-1.242-.008-2.493 0-3.735 0h-.252v6.911h-2.997V.122c2.862.01 5.706.01 8.569.01zM24.135 3.15V.13h9.424v3.02H30.38v14.054h-3.06V3.417c0-.268 0-.268-.279-.268h-2.907zM46.115.131h3.033v14.224c1.755.098 3.492.187 5.23.276v2.982c-2.746-.133-5.5-.276-8.263-.41V.13zM59.994 18.06c-.999-.072-1.99-.152-2.988-.223V.13h2.988v17.93z" 
                            fill="currentcolor"/>
                        </svg>
                    </li>
                    <li>
                        <svg width="33.13" height="13.8" viewBox="0 0 46 20" 
                            fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M.5 18.346h6.577c-.564-.285-.787-.783-.614-1.325l.62-1.918c.364-1.125.728-2.25 1.09-3.375.031-.098.073-.124.176-.113.285.025.568.049.853.057a15.93 15.93 0 002.645-.144 11.834 11.834 0 002.557-.643c2.114-.808 3.654-2.186 4.478-4.263.287-.723.496-1.463.518-2.246.017-.587-.075-1.15-.34-1.682-.375-.75-.99-1.263-1.75-1.619C16.4.65 15.428.49 14.42.49H6.318c-.04 0-.077.002-.11.004.036.04.072.078.108.115.073.077.144.151.202.236.223.327.208.684.092 1.042l-.9 2.786c-1.308 4.055-2.616 8.11-3.92 12.166a2.434 2.434 0 01-.832 1.195c-.1.08-.209.15-.317.22-.047.03-.095.061-.141.093zm8.193-8.11a2.272 2.272 0 00-.033-.008l.226-.7.08-.246c.786-2.429 1.574-4.857 2.357-7.286.032-.1.072-.14.186-.136.167.005.334.005.501.006.184 0 .368 0 .552.007.425.017.83.11 1.188.349.417.278.627.678.72 1.148.111.57.054 1.136-.066 1.697-.22 1.014-.549 1.988-1.084 2.888-.454.766-1.04 1.412-1.844 1.848a4.116 4.116 0 01-2.695.453.513.513 0 01-.088-.02z" 
                                fill="currentcolor"/>
                                <path d="M45.504 1.307c-.25.802-.499 1.596-.75 2.404a4.133 4.133 0 01-.169-.13c-.663-.532-1.38-.972-2.182-1.261a4.999 4.999 0 00-2.115-.305c-.766.06-1.469.318-2.123.71-.865.518-1.57 1.215-2.18 2.005-1.053 1.367-1.804 2.89-2.32 4.529a22.73 22.73 0 00-.763 3.065c-.127.756-.197 1.518-.155 2.286.037.67.16 1.324.499 1.919.405.71 1.027 1.11 1.828 1.247.468.08.937.057 1.403-.024.083-.013.123-.052.147-.13.67-2.136 1.341-4.27 2.014-6.406.205-.653-.005-1.191-.6-1.537-.055-.033-.112-.061-.193-.107h7.099c-.096.044-.175.076-.252.113-.663.307-1.086.808-1.304 1.507-.655 2.09-1.331 4.174-1.984 6.266a.77.77 0 01-.472.527c-1.148.507-2.334.88-3.573 1.089-.792.135-1.593.19-2.397.154-1.33-.056-2.6-.355-3.785-.975-.895-.468-1.536-1.185-1.992-2.075-.365-.714-.571-1.476-.685-2.267a10.156 10.156 0 01-.079-2.029 12.883 12.883 0 011.036-4.39c1.272-2.958 3.46-4.98 6.435-6.185.86-.348 1.76-.557 2.68-.688a13.998 13.998 0 012.848-.1c1.372.087 2.712.35 4.023.764a.306.306 0 01.061.024z" 
                                fill="currentcolor"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M23.899 15.11l.052-.072a2.818 2.818 0 00.575-1.564c.018-.35-.14-.627-.453-.843h2.405c-.091 1.412-.716 2.583-1.797 3.578 1.344 1.234 2.893 2.12 4.621 2.78h-.125c-1.47 0-2.937 0-4.406.002a.47.47 0 01-.298-.085c-.428-.324-.856-.648-1.28-.975a2.633 2.633 0 01-.276-.242c-.064-.065-.11-.056-.181-.008a10.77 10.77 0 01-2.243 1.13c-.854.311-1.732.471-2.65.417-.89-.052-1.733-.244-2.456-.767-.794-.575-1.252-1.332-1.357-2.274-.17-1.533.414-2.76 1.684-3.71.673-.503 1.43-.862 2.227-1.147.437-.158.879-.305 1.32-.452.083-.028.11-.063.106-.147a7.379 7.379 0 01.25-2.408c.22-.795.572-1.526 1.183-2.127.693-.68 1.552-1.065 2.533-1.201.69-.096 1.364-.033 2 .242.708.304 1.23.776 1.404 1.52.15.648-.028 1.24-.403 1.787-.39.566-.92.996-1.504 1.372-.652.418-1.362.733-2.073 1.047l-.218.097-.108.049c-.08.037-.162.073-.244.106-.062.026-.08.057-.069.124.14.832.419 1.62.845 2.358.186.324.39.642.592.96.099.154.197.307.293.462l.05-.008zm-4.285-2.848a.61.61 0 01-.027.007.121.121 0 00-.028.01c-.67.3-1.28.685-1.794 1.193-.634.627-1.012 1.345-.884 2.242.076.533.307.985.779 1.303.546.367 1.17.463 1.82.398.81-.082 1.553-.361 2.267-.724.021-.01.04-.023.06-.036.01-.007.02-.014.032-.02-1.023-1.334-1.74-2.796-2.225-4.373zm2.312-2.273a.752.752 0 00-.039.012 9.337 9.337 0 00-.01-.122 4.44 4.44 0 01-.015-.192c-.048-.886.07-1.746.499-2.548.229-.433.535-.804.988-1.05.216-.117.445-.182.692-.143.453.069.627.337.597.776-.032.46-.229.868-.488 1.251-.519.767-1.199 1.386-1.993 1.896a1.643 1.643 0 01-.154.086l-.043.022a.164.164 0 01-.034.012z" 
                            fill="currentcolor"/>
                        </svg>
                    </li>
                    <li>
                        <svg width="53.01" height="12.69" viewBox="0 0 73 18" 
                            fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.252.243H3.576c-.388 0-.719.253-.78.596L.502 13.86c-.046.257.177.488.468.488h2.71c.388 0 .719-.252.78-.596l.618-3.512c.06-.344.391-.596.78-.596h1.796c3.739 0 5.897-1.62 6.46-4.827.254-1.403.01-2.506-.724-3.278C12.583.692 11.152.243 9.252.243zM9.907 5c-.31 1.822-1.867 1.822-3.371 1.822h-.857l.601-3.403c.036-.205.235-.357.467-.357h.393c1.025 0 1.992 0 2.491.523.298.312.39.775.276 1.415zm15.839.176h-2.68c-.229 0-.426.152-.461.359l-.12.685-.186-.249c-.58-.769-1.875-1.026-3.167-1.026-2.962 0-5.492 2.049-5.985 4.922-.256 1.433.109 2.804.999 3.76.817.879 1.986 1.245 3.376 1.245 2.387 0 3.71-1.401 3.71-1.401l-.119.68c-.045.26.175.493.46.493h2.415c.384 0 .708-.254.768-.6l1.45-8.377c.045-.257-.174-.491-.46-.491zm-3.737 4.763c-.258 1.398-1.474 2.337-3.024 2.337-.778 0-1.4-.228-1.8-.66-.396-.43-.547-1.04-.42-1.72.241-1.386 1.477-2.355 3.003-2.355.762 0 1.38.23 1.788.666.408.44.57 1.055.453 1.732zm18.587-4.994h-2.733a.826.826 0 00-.654.306l-3.769 4.902-1.597-4.71c-.1-.295-.409-.498-.758-.498H28.4c-.326 0-.553.282-.449.553l3.01 7.8-2.83 3.526c-.222.278.002.66.386.66h2.73a.823.823 0 00.648-.299l9.09-11.584c.217-.277-.007-.656-.39-.656zM49.255.243h-5.677c-.387 0-.718.253-.778.596L40.504 13.86c-.046.257.177.488.466.488h2.914c.27 0 .502-.176.544-.417l.652-3.691c.06-.344.39-.596.778-.596h1.796c3.74 0 5.897-1.62 6.461-4.827.256-1.403.01-2.506-.724-3.278C52.585.692 51.155.243 49.255.243zM49.91 5c-.31 1.822-1.865 1.822-3.371 1.822h-.856l.602-3.403c.036-.205.233-.357.466-.357h.393c1.024 0 1.992 0 2.492.523.298.312.388.775.274 1.415zm15.836.176h-2.68c-.23 0-.425.152-.46.359l-.118.685-.188-.249c-.58-.769-1.874-1.026-3.165-1.026-2.963 0-5.492 2.049-5.985 4.922-.255 1.433.108 2.804.998 3.76.819.879 1.986 1.245 3.377 1.245 2.386 0 3.71-1.401 3.71-1.401l-.12.68c-.045.26.175.493.462.493h2.414c.382 0 .708-.254.768-.6l1.45-8.377c.044-.257-.176-.491-.463-.491zm-3.737 4.763c-.257 1.398-1.474 2.337-3.024 2.337-.777 0-1.4-.228-1.8-.66-.396-.43-.545-1.04-.42-1.72.242-1.386 1.477-2.355 3.003-2.355.761 0 1.38.23 1.788.666.41.44.572 1.055.453 1.732zm7.04-9.338l-2.258 13.26c-.044.257.171.488.452.488h2.27c.377 0 .697-.252.755-.596L72.494.733c.044-.258-.171-.49-.452-.49H69.5c-.225.001-.418.152-.453.358z" 
                            fill="currentcolor"/>
                        </svg>

                    </li>
                    <li>
                        <svg width="82.42" height="16" 
                            fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 631.316 122.557">
                                <path d="M61.193 122.185a60.899 60.899 0 1149.847-25.753 60.582 60.582 0 01-49.847 25.753zm.15-107.88A46.95 46.95 0 1088.389 22.9a46.967 46.967 0 00-27.046-8.593zm98.642 87.937V75.908h11.338c21.091 0 33.77-11.826 33.77-29.382 0-16.58-12.8-26.211-31.332-26.211h-27.43v81.927zm13.167-69.736c10.85 0 18.165 4.999 18.165 15.605 0 9.754-8.168 15.606-18.897 15.606h-12.435v-31.21zm221.397 41.086c0-16.947-12.801-29.748-29.747-29.748a29.584 29.584 0 00-29.626 29.992c0 17.068 12.314 29.503 29.626 29.503a29.329 29.329 0 0029.747-29.747zm-46.45 0c0-9.753 7.198-17.597 16.703-17.312 10.508.314 17.044 7.628 16.824 17.312-.221 9.75-7.315 17.312-16.824 17.312-9.51 0-16.703-7.559-16.703-17.312zm174.95 3.413a33.445 33.445 0 00.365-5.973c0-15.971-12.191-27.188-27.675-27.188a29.145 29.145 0 00-29.503 29.504c0 17.434 11.582 29.991 29.138 29.991 11.825 0 21.7-5.608 25.846-13.41L511.1 84.32c-2.681 4.388-8.411 7.436-14.873 7.436-9.022 0-15.361-5.486-16.702-14.752zm-42.793-9.875c1.707-7.558 7.315-12.191 15.118-12.191 7.924 0 13.898 4.998 14.63 12.191zM320.912 44.942l-15.85 40.841-14.141-40.842h-14.752l21.213 57.301-8.778 20.116h14.02l32.308-77.417zm310.032.243a20.149 20.149 0 00-5.608-.731c-5.608 0-11.948 3.17-14.63 8.656v-8.169h-12.923v57.301h12.923v-30.6c0-10.607 7.071-14.997 14.386-14.997a22.91 22.91 0 015.73.61l.122-12.07zm-42.67 31.82a33.445 33.445 0 00.365-5.973c0-15.971-12.191-27.188-27.675-27.188a29.145 29.145 0 00-29.503 29.504c0 17.434 11.582 29.991 29.138 29.991 11.826 0 21.7-5.608 25.846-13.41l-10.12-5.608c-2.681 4.388-8.411 7.436-14.873 7.436-9.022 0-15.361-5.486-16.702-14.752zM545.48 67.13c1.707-7.558 7.315-12.191 15.118-12.191 7.924 0 13.898 4.998 14.63 12.191zm-289.794 6.34a17.758 17.758 0 01-18.166 18.165c-9.997 0-16.702-7.802-16.702-18.165a18.216 18.216 0 0117.922-18.044c10.119 0 16.946 7.803 16.946 18.044zm201.77-3.901c0-15.971-7.802-25.725-22.432-25.725-7.68 0-14.752 3.292-18.653 8.535v-7.437h-13.045v57.3h13.045V71.154c0-9.632 6.95-15.728 15.24-15.728s12.679 5.609 12.679 15.118v31.698h13.167V69.57zM255.688 44.94v7.437c-3.78-4.998-9.875-8.534-19.019-8.534-15.849 0-29.016 14.02-29.016 30.48 0 16.58 11.338 29.015 26.578 29.015 9.875 0 17.312-3.535 21.457-9.387v8.29h12.801v-57.3z" 
                            fill="currentcolor"/>
                        </svg>
                    </li>

                </ul>
            </div>
            
            <div className="home-main-categories">
            
                {leftScrollButton&&<button className="scroll-button left" onClick={scrollLeft} >
                    <LeftArrow/>
                </button>}
                <button className="scroll-button right" onClick={scrollRight} >
                    <RightArrow/>
                </button>
                <ul className="main-categories-list" ref={listRef} >
                    <li onClick={()=>onClickCategory('Programming & Tech')}>
                        <div className="svg-element-main"><SVGprogrammingAndTech/></div>
                        <h3>Programming & Tech</h3>
                    </li>
                    <li onClick={()=>onClickCategory('Graphics & Design')}>
                        <div className="svg-element-main"><SVGgraphicAndDesign /></div>
                        <h3>Graphics & Design</h3>
                    </li>
                    <li onClick={()=>onClickCategory('Digital Marketing')}>
                        <div className="svg-element-main">< SVGdigitalMarketing/></div>
                        <h3>Digital Marketing</h3>
                    </li>
                    <li onClick={()=>onClickCategory('Writing & Translation')}>
                        <div className="svg-element-main">< SVGwritingAndTranslation/></div>
                        <h3>Writing & Translation</h3>
                    </li>
                    <li onClick={()=>onClickCategory('Video & Animation')}>
                        <div className="svg-element-main">< SVGvideoAndAnimation/></div>
                        <h3>Video & Animation</h3>
                    </li>

                    <li onClick={()=>onClickCategory('AI Services')}>
                        <div className="svg-element-main">< SVGaiSerices/></div>
                        <h3>AI Services</h3>
                    </li>
                    
                    <li onClick={()=>onClickCategory('Music & Audio')}>
                        <div className="svg-element-main">< SVGmusicAndAudio/></div>
                        <h3>Music & Audio</h3>
                    </li>

                    <li onClick={()=>onClickCategory('Business')}>
                        <div className="svg-element-main">< SVGbusiness/></div>
                        <h3>Business</h3>
                    </li>

                    <li onClick={()=>onClickCategory('Consulting')}>
                        <div className="svg-element-main">< SVGconsulting/></div>
                        <h3>Consulting</h3>
                    </li>

                    
                </ul>

            </div>
            

            <h1 className="popular-services-h1" >Popular services</h1>
            <ul className="popular-services-list">
                <li className="web-dev">
                    <h4>Website Development</h4>
                    <img src="/img/popular/website-development.webp" /> 

                </li>
                <li className="logo-design">
                    <h4>Logo Design</h4>
                    <img src="/img/popular/logo-design.webp" /> 
                </li>
                <li className="seo">
                    <h4>SEO</h4>
                    <img src="/img/popular/seo.webp" /> 
                </li>
                <li className="architecture-interior">
                    <h4>Architecture & Interior Design</h4>
                    <img src="/img/popular/architecture-design.webp" /> 
                </li>
                <li className="voice-over">
                    <h4>Voice Over</h4>
                    <img src="/img/popular/voice-over.webp" /> 
                </li>
                <li className="social-media-marketing">
                    <h4>Social Media Marketing</h4>
                    <img src="/img/popular/social-media-marketing.webp" /> 
                </li>

                
            </ul>

            <div className="skiller-pro">
                <h2><span>skiller</span>pro.</h2>
                <h1>The <span>premium</span> freelance solution for businesses</h1>
                <ul className="skiller-pro-list"> 
                    <li>
                        <div className="title">
                            <HomeDiamondV/>
                            <h4>Dedicated hiring experts</h4>
                        </div>
                        <p>Count on an account manager to find you the right talent and see to your project’s every need.</p>
                    </li>

                    <li>
                        <div className="title">
                            <HomeDiamondV/>
                            <h4>Satisfaction guarantee</h4>
                        </div>
                        <p>Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.</p>
                    </li>

                    
                    <li>
                        <div className="title">
                            <HomeDiamondV/>
                            <h4>Advanced management tools</h4>
                        </div>
                        <p>Seamlessly integrate freelancers into your team and projects.</p>
                    </li>

                    <li>
                        <div className="title">
                            <HomeDiamondV/>
                            <h4>Flexible payment models</h4>
                        </div>
                        <p>Pay per project or opt for hourly rates to facilitate longer-term collaboration.</p>
                    </li>

                </ul>
                <img src="/img/fiverr-pro.webp" /> 
                <button>Try Now</button>

            </div>

            <div className="freelancer-add">
                <h2>Make it all happen with freelancers</h2>
                <ul>
                    <li>
                        <HomeAccessTalent/>
                        <p>Access a pool of top talent across 700 categories</p>
                    </li>
                    <li>
                        <HomeTime/>
                        <p>Enjoy a simple, easy-to-use matching experience</p>
                    </li>
                    <li>
                        <HomeQuality/>
                        <p>Get quality work done quickly and within budget</p>
                    </li>
                    <li>
                        <HomePay/>
                        <p>Only pay when you’re happy</p>
                    </li>
                    
                </ul>
                <button>Join Now</button>
            </div>


        </section >
    )
}

