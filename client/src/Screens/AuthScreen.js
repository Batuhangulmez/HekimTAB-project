import React, { useState } from 'react'
import '../css_Modules/AuthScreen.css'
import { Container } from 'react-bootstrap'
import { login } from '../axiox'



const AuthScreen = ({ setUser }) => {

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

                        login(FormData).then((res) => { console.log(res) }).catch((err) => { console.log(err); })
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