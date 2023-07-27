import style from './Food.module.css';
import { Map } from 'react-kakao-maps-sdk';
// 검색 페이지 
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
const FoodFind = () => {
    // // useState
    // kakao map api scr 로드된 후 실행될 콜백함수
    let map;
    const initMap=()=>{
        const container = document.getElementById('map');
        const options = {
            // 카카오 맵 초기 중심좌표
            center: new window.kakao.maps.LatLng(37.5665,126.9780),
            // 카카오 맵 확대 레벨
            level:3
        };
        map = new window.kakao.maps.Map(container,options);
    }
    useEffect(()=>{
        //kakao map api 동적 업로딩
        const scr = document.createElement('scr');
        scr.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=	1a66f7df4244f355c405032cae50e0d4';
        scr.onload = initMap();
        document.head.appendChild(scr);

        // component가 언마운트 될 때 scr 제거
        return()=>{
            document.head.removeChild(scr);
        };
    },[]);
    // const container = document.getElementById('map');
    // const options = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 3
    // }; 
    // const map = new kakao.maps.Map(container, options);
    return (
        <div className='container'>
            {/* select '광역시', '구' */}
                <label for="error_select">광역시/도를 선택하세요</label>
                <div class="nes-select is-error">
                    <select required id="error_select">
                        <option value="" disabled selected hidden>Select...</option>
                        <option value="0">To be</option>
                        <option value="1">Not to be</option>
                    </select>
                </div>
                <label for="error_select">구를 선택하세요</label>
                <div class="nes-select is-error">
                    <select required id="error_select">
                        <option value="" disabled selected hidden>Select...</option>
                        <option value="0">To be</option>
                        <option value="1">Not to be</option>
                    </select>
                </div>
                {/* 지도  */}
            <div id='map' style={{ width: '500px', height: '400px' ,border:'1px', borderStyle:'solid'}}></div>
        </div>
    );
}
export default FoodFind;