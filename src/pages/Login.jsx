import Nav from "../components/Nav"
import { Form, Link } from "react-router-dom"

export default function LoginPage () {

    return (
        <div className="flex min-h-sh flex-col justify-between">
            <Nav />
            <Form method="post" action="/api/user/login">
                <div className="flex flex-col" id="login-form">
                    <h1 className="">Вход</h1>
                    <label htmlFor="email">Адрес электронной почты</label>
                    <input className="text-xl" type="email" id="email" name="email" autoComplete="email" placeholder="email" />
                    <label htmlFor="password">Пароль</label>
                    <input id="password" className="text-xl" type="password" name="password" autoComplete="password" placeholder="password" />
                    <Link to="#" className="text-xl">Забыли пароль?</Link>
                    <button type="submit">Войти</button>
                </div>
            </Form>
            <div className=""></div>
        </div>
    )
}