import Nav from "../components/Nav"
import { Form } from "react-router-dom"
import Card from "../components/Card"

export default function ImagesPage () {

    return (
        <div className="">
            <Nav />
            <Form method="get" action="/api/images">
                <input type="text" placeholder="Поиск" />
                <select name="filter">
                    <option value="popularity">По популярности</option>
                    <option value="date">По дате добавления</option>
                </select>
                <button type="submit">Найти</button>
            </Form>
            <div className="">
                    <Card /><Card /><Card /><Card /><Card />
            </div>
        </div>
    )
}