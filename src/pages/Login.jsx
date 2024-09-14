import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Form, Link } from "react-router-dom"

export default function LoginPage () {

    return (
        <div className=" flex flex-col min-h-svh justify-between">
            <Nav />
            <main id="main" class="pos">
                <div class="container pos">
                    <div class="inner pos">
                        <div class="form_container">
                            <h3 class="form_name">
                                Авторизация
                            </h3>
                            <Form action="" class="new_image_form">
                                <input name="login" class="t_input" placeholder="Логин" type="text" />
                                <input name="password" class="t_input" placeholder="Пароль" type="password" />
                                <Link to="/profile" class="button_start">Войти</Link>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
            <div className=""></div>
        </div>
    )
}