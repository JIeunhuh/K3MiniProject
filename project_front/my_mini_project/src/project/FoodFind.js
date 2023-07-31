import style from './Food.module.css';
// 검색 페이지 
import { Map } from 'react-kakao-maps-sdk';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
const FoodFind = ({ locations }) => {

    // location의 city 빼오기
    const [city, setCity] = useState();
    const [city_gu, setCity_gu] = useState();

    // useRef : 시/도 & 구의 현재 선택값을 정하기 위해서
    const selectCity = useRef();
    // const selectCity_gu = useRef();

    useEffect(() => {

        // kakao map api scr 로드된 후 실행될 콜백함수
        let map;
        const initMap = () => {
            const container = document.getElementById('map');
            const options = {
                // 카카오 맵 초기 중심좌표
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                // 카카오 맵 확대 레벨
                level: 3
            };
            map = new window.kakao.maps.Map(container, options);
        }

        //kakao map api 동적 업로딩
        const scr = document.createElement('scr');
        scr.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=1a66f7df4244f355c405032cae50e0d4';
        scr.onload = initMap();
        document.head.appendChild(scr);

        // component가 언마운트 될 때 scr 제거
        return () => {
            document.head.removeChild(scr);
        };

    }, []);

    // # 시/도 선택하기

    // Event Handeler 생성(onChange 걸어줌)
    // 시/도 가 선택되면 그 타겟을 잡음
    const checkCity = () => {
        // Error ! ; value 값을 읽어오지를 못하맘마앙망ㅁ난ㅇ밀;ㅓ
        setCity(selectCity.current.value); // 선택된 시/도의 value 값을 잡음
    }

    // #-1. 중복 제거
    const uniqueCities = Array.from(new Set(locations.map(item => item[0])));

    // #-2. 정렬
    // let sortedCities = uniqueCities.sort((a, b) => a.localeCompare(b, 'ko'));

    // #-3. category map 돌려서 광역시/도 하나씩 가져옴
    let cate = uniqueCities.map((item, idx) =>
        <option key={item.city + idx} value={item} onChange={checkCity}>
            {item}
        </option>
        // console.log(item, idx)
    );

    let gu_cate;
    let cate_gu;

    useEffect(() => {
        // # 구 선택
        // #-1. 상위 카테고리에서 설정해서 가져오기
        gu_cate = locations.filter(item => item[0] === city) // 선택된 시/도와 동일한 '구' 필터링

        // #-2. map 돌려서 시/광역시에 해당하는 구 하나씩 가져옴
        cate_gu = setCity_gu(gu_cate.map((item, idx) => (
            <option key={idx} value={item[1]}>
                {item[1]}
            </option>
        )));
        console.log('구', city_gu);
    }, [city]);

    // # 검색 !
    const searchFood = () => {

    };

    return (
        <div className='container'>
            <div className={`${style.dropDown}`}>
                {/* select '광역시', '구' */}
                <div className={`${style.label}`}>
                    <label for="error_select">광역시/도를 선택하세요</label>
                    <div className='nes-select is-error' >
                        <select required id="error_select" onChange={checkCity} ref={selectCity}>
                            <option defaultValue='' disabled selected hidden>Select...</option>
                            {cate}
                        </select>
                    </div>
                </div>
                <div className={`${style.label}`}>
                    <label for="error_select">구를 선택하세요</label>
                    <div className="nes-select is-error">
                        <select required id="error_select">
                            <option defaultValue="" disabled selected hidden>Select...</option>
                            {city_gu}
                        </select>
                    </div>
                </div>
                <div className={`${style.label}`}>
                    <label for="textarea_field">Textarea</label>
                    <textarea id="textarea_field" className={`nes-textarea ${style.inputTxt}`}></textarea>
                </div>
                {/* 검색 버튼 */}
                <div className={`${style.label}`}>
                    <button type='button' class={`nes-btn is-error ${style.sarchBtn}`}>Go</button>
                </div>
            </div>

            {/* 지도  */}
            <div id='map' className={`${style.kakaoMap}`}></div>
        </div>
    );
}
export default FoodFind;