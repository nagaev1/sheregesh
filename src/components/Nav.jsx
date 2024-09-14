
import { Link, Form } from "react-router-dom"

export default function Nav () {

    return (
        <header id="header">
        <div class="container">
          <div class="inner">
            <div class="left">
              <Link to="/" class="logo_link"></Link>
            </div>
            <div class="center">
              <Form method="get" action="/" class="search_block">
                <input class="search_input" maxlength="45" placeholder="Поиск..." type="text" />
                <button type="submit" id="start_search"></button>
              </Form>
            </div>
            <div class="right flex">

            <Link to="/login" class="button_start" style={{margin: "0px 0px 0px 10px;"}}><img src="profile_icon.svg" /></Link>
          </div>
          </div>
        </div>
      </header>
    )
}