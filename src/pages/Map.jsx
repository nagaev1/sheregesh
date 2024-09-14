import { useState, useEffect } from 'react';
import { Map, Placemark, Circle, GeoObject, Polygon } from '@pbe/react-yandex-maps';

import Nav from '../components/Nav';

import { Form } from 'react-router-dom';

let regions = [
    {
        name: 'Кузбасс',
    },
    {
        name: 'Москва',
    }
]

let posts = [
    {
        img: '/photos/1 команда (1).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['лес'],
        region: 'Москва',
        title: 'Шерегеш'
    },
    {
        img: '/photos/1 команда (5).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['горы', 'небо'],
        region: 'Кузбасс',
        title: 'Шерегеш'
    },
    {
        img: '/photos/1 команда (16).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['лес'],
        region: 'Москва',
        title: 'Шерегеш'
    },
    {
        img: '/photos/1 команда (17).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['река'],
        region: 'Кузбасс',
        title: 'Шерегеш'
    },
    {
        img: '/photos/1 команда (20).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['Лес'],
        region: 'Кузбасс',
        title: 'Шерегеш'
    },
]

export default function MapPage (props) {
    const [regionSelected, setRegionSelected] = useState({name: 'any'})
    const [modalData, setModalData] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])
    const [kuzzData, setKuzzData] = useState(null);
    const [moscowData, setMoscowData] = useState(null);

    async function handleRegionSelect (el) {
        setRegionSelected(el)
        // const response = await fetch(`/api/images?region=${el.name}`)
    }

    useEffect(() => {
        fetch('/moscow.geojson') // Замените на путь к вашему GeoJSON файлу
          .then(response => response.json())
          .then(data => setMoscowData(data));
        fetch('/kuzz.geojson') // Замените на путь к вашему GeoJSON файлу
          .then(response => response.json())
          .then(data => setKuzzData(data));
      }, []);
    
      if (!moscowData && !kuzzData) {
        return <div>Загрузка данных...</div>;
      }

    function modal() {
        return (
            <>
                <div className="modal-bg" onClick={() => setModalData(null)} />
                <div className="modal">
                    <img src={modalData.img} alt="" />
                    <div className="modal-text">
                        <h1>{modalData.title}</h1>
                        <p className=''>
                            {modalData.body}
                        </p>
                    </div>
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
            {/* <MapComponent /> */}
            <Map
            className='y-map'
                defaultState={{
                center: [52.9199042, 87.971775],
                zoom: 4,
                controls: ["zoomControl"],
                }}
                modules={["control.ZoomControl"]}>
                {kuzzData.features.map((feature, index) => (
          <GeoObject
            key={index}
            onClick={() => handleRegionSelect(regions[0])}
            geometry={{
                type: 'Polygon',
                coordinates: feature.geometry.coordinates.map(polygon => 
                  polygon.map(coord => [coord[1], coord[0]]) 
                ),
              }}
            properties={{
              hintContent: feature.properties.name, // Подсказка при наведении
            }}
            options={{
              fill: true,
              fillColor: '#007bff', // Цвет заливки
              fillOpacity: 0.5, // Прозрачность заливки
              strokeColor: '#000', // Цвет обводки
              strokeOpacity: 1, // Прозрачность обводки
            }}
          />
          
        ))}
        {moscowData ? moscowData.features.map((feature, index) => (
          <GeoObject
            key={index}
            onClick={() => handleRegionSelect(regions[1])}
            geometry={{
                type: 'Polygon',
                coordinates: feature.geometry.coordinates.map(polygon => 
                  polygon.map(coord => [coord[1], coord[0]]) 
                ),
              }}
            properties={{
              hintContent: feature.properties.name, // Подсказка при наведении
            }}
            options={{
              fill: true,
              fillColor: '#007bff', // Цвет заливки
              fillOpacity: 0.5, // Прозрачность заливки
              strokeColor: '#000', // Цвет обводки
              strokeOpacity: 1, // Прозрачность обводки
            }}
          />
          
        )) : null}
            </Map>
            {regionSelected.name}
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
                                    <select onChange={e => setRegionSelected({name: e.target.value})} name="region_input" class="region_input">
                                        {regionSelected.name === 'any' ? <option value="any" selected>Любой</option> : <option value="any">Любой</option>}
                                        {regions.map((el, i) => {
                                            
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

                                        if (regionSelected.name !== 'any' && el.region !== regionSelected.name){
                                            return
                                        }

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

