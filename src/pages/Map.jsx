import { useState, useEffect } from 'react';
import { Map, Placemark, Circle, GeoObject, Polygon } from '@pbe/react-yandex-maps';
import { IoIosClose } from "react-icons/io";

import Footer from '../components/Footer';

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
        body: 'Посетил Кузбасс с командой "Больше чем путешествие" — это было настоящее приключение! Мы исследовали невероятные горные пейзажи, встретили гостеприимных местных жителей и узнали много нового о культуре региона. Отдельное спасибо за организацию поездки — все было на высшем уровне!',
        tags: ['горы', 'небо'],
        region: 'Кузбасс',
        title: 'Незабываемая поездка в сердце Сибири'
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
        body: 'Кузбасс покорил меня своей природной красотой и богатой историей. Благодаря "Больше чем путешествие" я смогла увидеть самые красивые места региона и насладиться каждым моментом этого путешествия. Теперь Кузбасс навсегда останется в моем сердце!',
        tags: ['река'],
        region: 'Кузбасс',
        title: 'Очарование Кузбасса'
    },
    {
        img: '/photos/1 команда (20).jpeg',
        body: 'С "Больше чем путешествие" я открыл для себя Кузбасс с совершенно новой стороны. Мы поднимались на горные вершины, гуляли по лесам и наслаждались тишиной сибирской природы. Эти моменты останутся со мной навсегда!"Путешествие мечты в Кузбасс"',
        tags: ['лес'],
        region: 'Кузбасс',
        title: 'Кузбасс: тайны сибирской природы'
    },
    {
        img: '/photos/photo_2024-09-14_09-58-45 (2).jpg',
        body: 'Спасибо "Больше чем путешествие" за отлично организованную поездку в Кузбасс! Это было настоящее путешествие мечты: мы посетили уникальные природные объекты, узнали много нового о жизни в Сибири и сделали массу потрясающих фотографий',
        tags: ['лес'],
        region: 'Кузбасс',
        title: 'Путешествие мечты в Кузбасс'
    },
    {
        img: '/photos/photo_2024-09-14_09-58-45.jpg',
        body: 'Посетив Кузбасс с Больше чем путешествие, я почувствовал, как оживают древние легенды Сибири. Природа здесь просто завораживает, а организация поездки была на высшем уровне. Обязательно вернусь сюда снова!',
        tags: ['лес', 'небо'],
        region: 'Кузбасс',
        title: 'Кузбасс — место, где оживают легенды'
    },
    {
        img: '/photos/photo_2024-09-14_09-58-145.jpg',
        body: 'С Больше чем путешествие я попала в настоящую сибирскую сказку! Кузбасс очаровал меня своими горными пейзажами, чистыми озерами и гостеприимными людьми. Спасибо за незабываемое приключение!',
        tags: ['горы', 'небо'],
        region: 'Кузбасс',
        title: 'Как красиво'
    },
    {
        img: '/photos/photo_2024-09-14_10-02-11.jpg',
        body: 'Путешествие в Кузбасс с Больше чем путешествие стало для меня источником нового вдохновения. Уникальная природа, мощные горы и тайга — это просто невероятно! Спасибо за потрясающую организацию и незабываемые впечатления!',
        tags: ['небо'],
        region: 'Кузбасс',
        title: 'Привет Шерегеш'
    },
    {
        img: '/photos/photo_2024-09-14_10-02-12 (2).jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['небо', 'лес'],
        region: 'Москва',
        title: 'Привет Москва'
    },
    {
        img: '/photos/photo_2024-09-14_10-02-12.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['небо', 'лес', 'горы'],
        region: 'Кузбасс',
        title: 'Шерегеш люблю'
    },
    {
        img: '/photos/Команда 2 (23).jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['небо'],
        region: 'Кузбасс',
        title: 'Шерегеш люблю'
    },
    {
        img: '/photos/Команда 2 (65) — копия.jpeg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, sapiente.',
        tags: ['небо', 'лес', 'горы'],
        region: 'Кузбасс',
        title: 'Шерегеш люблю'
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
                        <div className="flex justify-between">
                            <h1>{modalData.title}</h1>
                            <div className="btn-close" onClick={() => setModalData(null)}><IoIosClose /></div>
                        </div>
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
                            <span style={{fontSize: 1.5+'rem'}}>{selectedTags.toString()} </span>
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
                                {/* цвета */}
                                {/* <div class="flex">
                                    <h3 class="filter_heading">Цвет</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="color_input" class="color_input">
                                        <option value="Красный">Зелёный</option>
                                        <option value="Синий">Синий</option>
                                        <option value="Зелёный">Серый</option>
                                        <option selected value="Всё" >Не выбранно</option>
                                    </select>
                                </div> */}
                                </div>

                                <div class="filter_b">
                                {/* <div class="flex">
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
                                </div> */}
                                </div>

                                <div class="filter_b">
                                {/* <div class="flex">
                                    <h3 class="filter_heading">Ориентация</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="orientation_input" class="orientation_input">
                                        <option value="Вертикальное">Вертикальное</option>
                                        <option value="Горизонтальное">Горизонтальное</option>
                                        <option selected value="Всё" >Не выбранно</option>
                                    </select>
                                </div> */}
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
                                <div class="filter_b">
                                <div class="flex">
                                    <h3 class="filter_heading">Дата создания</h3>
                                </div>
                                <div class="hide_menu">
                                    <select name="marsh_input" class="marsh_input">
                                        <option value="Москва-Питер">По возрастанию</option>
                                        <option value="Камчатка-Алтай">По убыванию</option>
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
                <Footer />
    </div>
    )
}

