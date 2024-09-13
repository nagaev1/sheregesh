import Nav from "../components/Nav"
import { Form, Link } from "react-router-dom"


export default function RegisterPage () {

    return (
        <div className="">
            <Nav />
            <Form method="post" action="/api/user/">
                <input type="email" name="email" autoComplete="email" placeholder="email" />
                <input type="password" name="password" autoComplete="password" placeholder="password" />
                <button type="submit">Зарегестрироваться</button>
                <Link to="/login">Уже зарегестрированы?</Link>
            </Form>
        </div>
    )
}