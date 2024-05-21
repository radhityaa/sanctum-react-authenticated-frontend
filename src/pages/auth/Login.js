import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { authenticated } from '../../store'

export default function Login() {
    const navigate = useNavigate()

    const setAuth = useSetRecoilState(authenticated)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    async function Login(e) {
        e.preventDefault()

        try {
            let { data } = await axios.post('/login', { email, password })
            localStorage.setItem('tokenUser', data.token)
            setAuth({ check: true, user: data.data })
            navigate('/')
        } catch (e) {
            setErrors(e.response.data.errors)
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-5'>
                    <div className='card'>
                        <div className='card-header'>Login</div>
                        <div className='card-body'>
                            <form onSubmit={Login}>
                                <div className='mb-4'>
                                    <label htmlFor='email' className='form-label'>Email</label>
                                    <input type='email' name='email' id='email' className={`form-control ${errors.email && 'is-invalid'}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <div className='invalid-feedback'>{errors.email[0]} </div>}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input type='password' name='password' id='password' className={`form-control ${errors.password && 'is-invalid'}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <div className='invalid-feedback'>{errors.password[0]} </div>}
                                </div>

                                <button type='submit' className='btn btn-primary'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
