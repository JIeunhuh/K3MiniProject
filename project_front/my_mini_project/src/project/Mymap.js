// search - map 표시 
// react-kakao-maps-sdk
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect, useRef } from 'react';
import style from './Food.module.css';

const Mymap = ({ searchRes }) => {
    // 위치 표시하기 위한 useRef
    const mapRef = useRef({ markers: [] }); //빈 배열로 초기화

    // 마커 표시
    const [desMarkers, setMarkers] = useState([]);

    // 초기 위치 표시
    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    });

    // searchRef object에 있는 주소를 좌표로 변환하고 마커 추가
    useEffect(() => {
        //주소-좌표간 변환 서비스 객체를 생성한다.
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 이전 마커를 삭제하기 위해 현재 마커를 변수에 저장
        // const prevMarkers = mapRef.current.markers;

        //searchRes에 있는 각 식당의주소 좌표로 변환하고 마커 표시
        const updateMark = searchRes.map((item) => {
            const fullAddr = item.city + item.city_gu + item.city_dong + item.city_address;
            geocoder.addressSearch(fullAddr, (result, status) => {
                if (status == window.kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    const marker = new window.kakao.maps.Marker({
                        position: coords,
                    });
                    marker.setMap(mapRef.current);
                    // mapRef.current.markers.push(marker);
                }
            });
        });

        //
        // Promise.all(prevMarkers.map(marker => new Promise((resolve)=>{
        //     marker.setMap(null); // 이전 마커 삭제
        //     window.kakao.maps.event.addListener(marker, 'remove', ()=> resolve());
        // }))).then(()=>{
        //     const marker = new window.kakao.maps.Marker({
        //         position : coords
        //     });
        //     marker.setMap(mapRef.current);
        //     mapRef.current.markers = [marker]
        // });
        //마커들을 상태에 저장하고 지도에 추가
        setMarkers(updateMark);
        // updateMark.forEach((marker) => marker.setMap(saveMarker));

        //이전 마커를 삭제
        // prevMarkers.forEach((marker) => marker.setMap(null));

        // 검색결과가 있을 때, 첫 번째 음식점의 좌표를 가져오기
        if (searchRes.length > 0) {
            const firstAddr = searchRes[0].city + searchRes[0].city_gu + searchRes[0].city_dong + searchRes[0].city_address;
            geocoder.addressSearch(firstAddr, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: coords.getLat(),
                            lng: coords.getLng(),
                        },
                    }));
                }
            });
        }
    }, [searchRes]);



    console.log(desMarkers);
    return (
        <div className={`${style.kakaoMap}`}>
            <Map ref={mapRef} // 지도를 표시할 Container
                center={state.center}
                style={{
                    // 지도의 크기
                    width: "650px",
                    height: "550px",
                    display: "flex",
                }}
                level={3} // 지도의 확대 레벨
            >
                <MapMarker position={{ lat: state.center?.lat, lng: state.center?.lng }} />
            </Map>
        </div>
    );
}
export default Mymap;
