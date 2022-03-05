import React, { useState } from 'react'
import '../css_Modules/AuthScreen.css'
import { Container } from 'react-bootstrap'
import { login } from '../axiox'
import { useNavigate } from 'react-router-dom'



const AuthScreen = ({ setUser }) => {
    const navigate = useNavigate();

    const [FormData, setFormData] = useState({
        email: "",
        password: "",
    })

    return (
        <Container className='container'>
            <main>
                <form className="form"
                    onSubmit={(e) => {
                        e.preventDefault();

                        login(FormData)
                            .then((res) => {
                                localStorage.setItem('user', JSON.stringify(res.data.user))
                                setUser(res.data.user)
                                navigate('/')
                            })
                            .catch((err) => {
                                console.log(err.response.data.message)
                            })
                    }}
                >
                    <h2 >Giriş Yap</h2>
                    <label >
                        <div > Email</div>
                        <input required
                            type="email"
                            placeholder="Email Adresi"
                            name="email"
                            onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
                        />
                    </label>

                    <label >
                        <div >Şifre</div>
                        <input required
                            type="password"
                            placeholder="Şifre"
                            name="password"
                            onChange={(e) => setFormData({ ...FormData, password: e.target.value })}
                        />
                    </label>

                    <input type="Submit" value="Giriş Yap" />
                </form>
            </main>
        </Container>
    )
}

export default AuthScreen