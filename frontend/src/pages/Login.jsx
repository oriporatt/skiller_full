import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector ,useDispatch} from 'react-redux'

import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'
import { SET_SYSTEM_MODE } from '../store/reducers/system.reducer'
import { showErrorMsg } from '../services/event-bus.service'

export function Login() {

    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])



    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        try{
            await login(credentials)
            dispatch({
                type: SET_SYSTEM_MODE,
                mode: 'buyer'
            });
            navigate('/')
        } catch (err) {  
            if (err.response?.status === 401) {
                showErrorMsg(`Wrong Password/Username`)
                
            } else {
                showErrorMsg(`Can't login`)
            }
        }

    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (


        <form className="login-form" onSubmit={onLogin}>
            <img src='/img/sign.jpg' className='login-img'/>

            <div className='login-inputs'>
                <div className='input-username'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required

                    />
                </div>

                <div className='input-password'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required

                    />
                </div>
            


                <button type="submit">Login</button>
            </div>
    
        </form>

    )
}