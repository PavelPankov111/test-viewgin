import './LoginPage.css'
import React from 'react'

// Это наша страница входа
export function LoginPage({ request, error }) {
    const [login, setLogin] = React.useState('')

    const [password, setPassword] = React.useState('')

    function handleLogin(e) {
        setLogin(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        request(login, password)
    }

    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Вход</h1>
                <div className="login__input-list">
                    <input type="text" autoComplete="off" placeholder="Логин" value={login} className="login__input-email" required minLength="2" maxLength="100" onChange={handleLogin} />
                    <input type="password" autoComplete="off" placeholder="Пароль" value={password} className="login__input-password" required minLength="2" maxLength="100" onChange={handlePassword} />
                </div>
                <button type="submit" className="login__button">
                    Войти
                </button>
                {error && <span className="login__error">Произошла ошибка</span>}
            </form>
        </section>
    )
}