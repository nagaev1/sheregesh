import { useState } from 'react';
import { Map, Placemark, Circle, GeoObject } from '@pbe/react-yandex-maps';

import Card from '../components/Card';
import Nav from '../components/Nav';

import { Form } from 'react-router-dom';

let regions = [
    {
        name: 'Шерешеш',
        geometry: [[52.9199042, 87.971775], 100000]
    },
    {
        name: 'Москва',
        geometry: [[55.5592356, 35.0194095], 100000]
    }
]

let posts = [
    {
        img: '/photos/1 команда (1).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['лес'],
        region: 'Москва'
    },
    {
        img: '/photos/1 команда (5).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['горы', 'небо'],
        region: 'Шерегеш'
    },
    {
        img: '/photos/1 команда (16).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['лес']
    },
    {
        img: '/photos/1 команда (17).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['река']
    },
    {
        img: '/photos/1 команда (20).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['Лес']
    },
]

export default function MapPage (props) {
    const [regionSelected, setRegionSelected] = useState('')
    const [modalData, setModalData] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])
    
    async function handleRegionSelect (el) {
        setRegionSelected(el)
        // const response = await fetch(`/api/images?region=${el.name}`)
    }

    function modal() {
        return (
            <>
                <div className="modal-bg" onClick={() => setModalData(null)} />
                <div className="modal">
                    <img src={modalData.img} alt="" />
                    <p>
                        {modalData.body}
                    </p>
                </div>
            </>
        )
    }

    function handleSelectTag(tag) {
        if (selectedTags.find(el => el === tag)) {
            setSelectedTags(selectedTags.filter(el => el !== tag))
        } else {
            setSelectedTags(selectedTags.concat(tag))
        }
    }


    return (
        <div className="">
            {modalData ? modal() : null}
            <Nav />
            <Map
            className='y-map'
                defaultState={{
                center: [52.9199042, 87.971775],
                zoom: 4,
                controls: ["zoomControl"],
                }}
                modules={["control.ZoomControl"]}>
                {regions.map((el, i) => {
                return (<Circle
                    geometry={el.geometry}
                    onClick={() => handleRegionSelect(el)}
                    key={i}
                />)}
                )}
                
            </Map>
            <main id="main">
                <div class="container">
                    <div class="inner">
                    <h2 class="heading">
                        Галерея
                    </h2>

                    <div class="all_container">
                        <div class="inner">
                        <div class="left">
                            <div class="fast_tags" >
                            <div onClick={() => handleSelectTag('лес')} class="tag">Лес</div>
                            <div onClick={() => handleSelectTag('горы')} class="tag">Горы</div>
                            <div onClick={() => handleSelectTag('небо')} class="tag">Небо</div>
                            <div onClick={() => handleSelectTag('рассвет')} class="tag">Рассвет</div>
                            <div onClick={() => handleSelectTag('реки')} class="tag">Река</div>
                            </div>
                            <div class="filters_block">
                            <span style={{fontSize: '1.5rem'}}>{selectedTags.toString()} </span>
                            {selectedTags.length > 0 ? <button onClick={() => setSelectedTags([])}>очистить</button> : null}
                            <Form action="" class="filter_f">
                                <div class="filter_b">
                                <div class="flex">
                                    <h3 class="filter_heading">Регион</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="region_input" class="region_input">
                                        {regions.map((el, i) => {
                                            <option value="any">Любой</option>
                                            if (regionSelected.name === el.name) {
                                                return <option key={i} value={el.name} selected>{el.name}</option>
                                            } else {
                                                return <option key={i} value={el.name}>{el.name}</option>
                                            }
                                            
                                        })}
                                    </select>
                                </div>
                                </div>

                                <div class="filter_b">
                                <div class="flex">
                                    <h3 class="filter_heading">Цвет</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="color_input" class="color_input">
                                        <option value="Красный">Зелёный</option>
                                        <option value="Синий">Синий</option>
                                        <option value="Зелёный">Серый</option>
                                        <option selected value="Всё" >Не выбранно</option>
                                    </select>
                                </div>
                                </div>

                                <div class="filter_b">
                                <div class="flex">
                                    <h3 class="filter_heading">Время года</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="seazon_input" class="season_input">
                                        <option value="Лето">Лето</option>
                                        <option value="Осень">Осень</option>
                                        <option value="Зима">Зима</option>
                                        <option value="Зима">Весна</option>
                                        <option selected value="Всё" >Не выбранно</option>
                                    </select>
                                </div>
                                </div>

                                <div class="filter_b">
                                <div class="flex">
                                    <h3 class="filter_heading">Ориентация</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="orientation_input" class="orientation_input">
                                        <option value="Вертикальное">Вертикальное</option>
                                        <option value="Горизонтальное">Горизонтальное</option>
                                        <option selected value="Всё" >Не выбранно</option>
                                    </select>
                                </div>
                                </div>

                                <div class="filter_b">
                                <div class="flex">
                                    <h3 class="filter_heading">Маршруты</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="marsh_input" class="marsh_input">
                                        <option value="Москва-Питер">Москва-Питер</option>
                                        <option value="Камчатка-Алтай">Камчатка-Алтай</option>
                                        <option selected value="Всё" >Все</option>
                                    </select>
                                </div>
                                </div>

                                {/* <button type="submit" class="button_start">Искать</button> */}
                            </Form>

                            </div>
                        </div>
                        <div class="right">

                            <div class="all_posts">
                            <div class="inner">
                                <ul class="images_posts">
                                    {posts.map((el, i) => {

                                        if (selectedTags.length > 0 && !el.tags.some(r => selectedTags.includes(r))) {
                                            return
                                        }
                                        
                                        return (
                                            <img className="image_post" src={el.img} onClick={() => setModalData(el)} alt="photo" />
                                        )}
                                    )}
                                </ul>
                            </div>
                            </div>

                        </div>
                        </div>
                    </div>
                    <img class="partners" src="partners.png" width="1280"/>
                    </div>
                </div>
                </main>
                <footer id="footer">
      <div class="container">
        <div class="inner">
          <div class="left">
            <img src="logo_white.png" width="118" height="110"/>
          </div>
          <div class="center">
            <img src="footer_center.png" width="371" height="142"/>
          </div>
          <div class="right">
            <img src="right_footer.png" width="256" height="111"/>
          </div>
        </div>
      </div>
    </footer>
    </div>
    )
}

