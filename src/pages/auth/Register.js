import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const record = { name, email, password, password_confirmation: passwordConfirmation }

    async function Register(e) {
        e.preventDefault()

        try {
            await axios.post('/register', record)

            setName('')
            setEmail('')
            setPassword('')
            setPasswordConfirmation('')

            navigate('/login')
        } catch (e) {
            setErrors(e.response.data.errors)
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-5'>
                    <div className='card'>
                        <div className='card-header'>Register</div>
                        <div className='card-body'>
                            <form onSubmit={Register}>
                                <div className='mb-4'>
                                    <label htmlFor='name' className='form-label'>Name</label>
                                    <input type='text' name='name' id='name' className={`form-control ${errors.name && 'is-invalid'}`} value={name} onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <div className='invalid-feedback'>{errors.name[0]}</div>}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='email' className='form-label'>Email</label>
                                    <input type='email' name='email' id='email' className={`form-control ${errors.email && 'is-invalid'}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <div className='invalid-feedback'>{errors.email[0]}</div>}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input type='password' name='password' id='password' className={`form-control ${errors.password && 'is-invalid'}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <div className='invalid-feedback'>{errors.password[0]}</div>}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='password_confirmation' className='form-label'>Confirm Password</label>
                                    <input type='password' name='password_confirmation' id='password_confirmation' className={`form-control`} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                </div>

                                <button type='submit' className='btn btn-primary'>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
