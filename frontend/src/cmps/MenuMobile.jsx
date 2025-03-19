import { Link, NavLink ,useLocation} from 'react-router-dom'
import CloseModal2 from '../assets/svgs/closeModal2.svg?react'
import { useSelector ,useDispatch} from 'react-redux'
import { SET_SYSTEM_MODE } from '../store/reducers/system.reducer'

export function MenuMobile({showMenuMobile, onCloseMenuModal}) {
    const dispatch = useDispatch()

    const systemMode = useSelector(storeState => storeState.systemModule.mode)
	const user = useSelector(storeState => storeState.userModule.user)
    function onSwitchToBuying(){
        dispatch({
            type: SET_SYSTEM_MODE,
            mode: 'buyer'
        });
    }
    function onSwitchToSelling(){
        dispatch({
            type: SET_SYSTEM_MODE,
            mode: 'seller'
        });
    }

    return (
        <div className={`menu-mobile ${showMenuMobile ? 'active' : ''}`} >  
                    <div className='top-menu'>
                        <NavLink  to='/login/signup'>
                            <button className="join-btn" onClick={() => onCloseMenuModal()}>Join Skiller</button>
                        </NavLink>
                        <button className="close-btn" onClick={() => onCloseMenuModal()}><CloseModal2/></button>
                    </div>

                    <nav>
                        <ul>
                            <NavLink to='/login' onClick={() => onCloseMenuModal()}><li>Sign in</li></NavLink>
                            <NavLink to='/gig' onClick={() => onCloseMenuModal()}><li>Browse categories</li></NavLink>
                            <NavLink to='/gig' onClick={() => onCloseMenuModal()}><li>Explore</li></NavLink>

                            <li className='general'>General</li>
                            <NavLink to='/' onClick={() => onCloseMenuModal()}><li>Home</li></NavLink>
                            {systemMode==='buyer'&&user&&<NavLink  to="/seller" onClick={onSwitchToSelling}><li>Switch to Selling</li></NavLink>}
                            {systemMode==='seller'&&user&&<NavLink to="" onClick={onSwitchToBuying}><li>Switch to Buying</li></NavLink>}

                        </ul>
                    </nav>
        </div>
    )
}
