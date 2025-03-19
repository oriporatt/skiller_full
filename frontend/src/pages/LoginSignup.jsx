import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'

export function LoginSignup() {
    return (
        <div className="login-page">
            <nav>
                <NavLink to="." className='link-login' end>Login</NavLink>
                <NavLink to="signup" className='link-signup'>Signup</NavLink>
            </nav>
            <Outlet/>
        </div>
    )
}