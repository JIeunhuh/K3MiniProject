import style from './Food.module.css';
import { Map } from 'react-kakao-maps-sdk';
// 검색 페이지 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const FoodFind = () => {

    // useState 사용
    const [locations, setLocations] = useState([]);
    const getData = () => {
                let url = 'http://10.125.121.176:8080/restaurants';
    
                //fetch()
                fetch(url)
                    .then((resp) => resp.json())
                    .then((data) => setLocations(data))
                    .catch((err) => console.log(err));
            }
    console.log(locations);
    getData();

    // useEffect(() => {
    //     //data fetch
    //     const getData = () => {
    //         let url = 'http://10.125.121.176:8080/restaurants';

    //         //fetch()
    //         fetch(url)
    //             .then((resp) => resp.json())
    //             .then((data) => setLocations(data))
    //             .catch((err) => console.log(err));
    //     }
    //     // kakao map api scr 로드된 후 실행될 콜백함수
    //     let map;
    //     const initMap = () => {
    //         const container = document.getElementById('map');
    //         const options = {
    //             // 카카오 맵 초기 중심좌표
    //             center: new window.kakao.maps.LatLng(37.5665, 126.9780),
    //             // 카카오 맵 확대 레벨
    //             level: 3
    //         };
    //         map = new window.kakao.maps.Map(container, options);
    //     }

    //     //kakao map api 동적 업로딩
    //     const scr = document.createElement('scr');
    //     scr.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=1a66f7df4244f355c405032cae50e0d4';
    //     scr.onload = initMap();
    //     document.head.appendChild(scr);

    //     // component가 언마운트 될 때 scr 제거
    //     return () => {
    //         document.head.removeChild(scr);
    //     };
    //     getData();

    // }, []);

    // let cate = locations.map((item)=> console.log('location',item.city));
    // let cate = locations.map((location) =>
    //     <option key={location.city_gu} value={location.id}>
    //       {location.name}
    //     </option>);

    return (
        <div className='container'>
            <div className={`${style.dropDown}`}>
                {/* select '광역시', '구' */}
                <div className={`${style.label}`}>
                    <label for="error_select">광역시/도를 선택하세요</label>
                    <div className='nes-select is-error' >
                        <select required id="error_select">
                            <option value="" disabled selected hidden>Select...</option>
                                {/* {cate} */}
                        </select>
                    </div>
                </div>
                <div className={`${style.label}`}>
                    <label for="error_select">구를 선택하세요</label>
                    <div className="nes-select is-error">
                        <select required id="error_select">
                            <option value="" disabled selected hidden>Select...</option>
                            <option value="0">To be</option>
                            <option value="1">Not to be</option>
                        </select>
                    </div>
                </div>
                <div className={`${style.label}`}>
                    <label for="textarea_field">Textarea</label>
                    <textarea id="textarea_field" className={`nes-textarea ${style.inputTxt}`}></textarea>
                </div>
            </div>
            {/* 지도  */}
            <div id='map' className={`${style.kakaoMap}`}></div>
        </div>
    );
}
export default FoodFind;