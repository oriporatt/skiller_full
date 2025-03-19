import React from 'react'
import { Routes, Route } from 'react-router'
import { useDispatch,useSelector} from 'react-redux'

import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { CategoriesHeader } from './cmps/CategoriesHeader.jsx'
import { SellerIndex } from './pages/SellerIndex.jsx'
import { MenuMobile } from "./cmps/MenuMobile.jsx"
import { SET_SHOW_MENU_MOBILE } from "./store/reducers/system.reducer.js"

export function RootCmp() {
    const showMenuMobile = useSelector(storeState => storeState.systemModule.showMenuMobile)
    const dispatch = useDispatch()

    function onCloseMenuModal(){
        dispatch({
            type: SET_SHOW_MENU_MOBILE,
            showMenuMobile: (false)
        });
    }
    return (
        <div >
            <AppHeader />
            <CategoriesHeader/>
            <UserMsg />
            <MenuMobile showMenuMobile={showMenuMobile} onCloseMenuModal={onCloseMenuModal} />

            {/* <GigPreviewCarrousel/> */}
            <main className='main-container'>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="gig" element={<GigIndex />} />
                    <Route path="gig/:gigId" element={<GigDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                    <Route path="seller" element={<SellerIndex />}></Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


