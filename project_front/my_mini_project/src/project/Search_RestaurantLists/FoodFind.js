import style from '../Food.module.css';
// 검색 페이지 
import { useEffect, useState, useRef } from 'react';
import Mymap from './Mymap';
import SearchList from './SearchList';
import FoodNav from '../FoodNav';
const FoodFind = ({ locations }) => {

    // restaurant data 를 위한 상태
    const [restaurant, setRestaurant] = useState([]);

    // location의 city 빼오기
    const [city, setCity] = useState();
    const [city_gu, setCity_gu] = useState([]);
    const [cat_gu, setCat_gu] = useState();

    // selectCity_gu의 현재 선택값 업데이트
    const [chooseCity_gu, setChooseCity_gu] = useState('');

    // useRef : 시/도 & 구의 현재 선택값을 정하기 위해서
    const selectCity = useRef('');
    const selectCity_gu = useRef('');

    // 검색 kw를 위한 상태
    const [searchKw, setSearchKw] = useState('');

    // 검색 결과를 담을 상태
    const [searchRes, setSearchRes] = useState([]);

    // # 시/도 선택하기

    // Event Handeler 생성(onChange 걸어줌)
    // 시/도 가 선택되면 그 타겟을 잡음
    const checkCity = () => {
        setCity(selectCity.current.value); // 선택된 시/도의 value 값을 잡음
        
    }

    // #-3. 구 가 선택되면 그 타겟을 잡음
    const checkCity_gu = () => {
        // 이게 업데이트 가 안돼ㅐ애ㅑㅓㄹㄴ에ㅓㅔ너ㅑㅇ레ㅐㅔ재ㅕㄹ 선택 되란 말이야 쒯끼야 !!!!!!
        setChooseCity_gu(selectCity_gu.current.value);// 선택된 구의 value 값을 잡음
        // console.log('GU', selectCity_gu.current.value);
    };

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

    useEffect(() => {
        // # 구 선택
        // #-1. 상위 카테고리에서 설정해서 가져오기
        gu_cate = locations.filter(item => item[0] === city) // 선택된 시/도와 동일한 '구' 필터링

        //city값이 변경될 때마다 gu_cate 상태를 업데이트 하는게 더 좋음
        setCity_gu(gu_cate);
        setChooseCity_gu(gu_cate[0]?gu_cate[0][1] : gu_cate[0]);
        console.log('gu_cate',gu_cate[0]?gu_cate[0][1] : gu_cate[0]);
    }, [city]);
    
    // city_gu값이 변경될때마다 카테고리 업데이트
    useEffect(() => {

        // console.log("city_gu", city_gu)
        // #-2. map 돌려서 시/광역시에 해당하는 구 하나씩 가져옴
        setCat_gu(city_gu.map((item, idx) => (
            <option key={idx + 1} value={item[1]}>
                {item[1]}
            </option>
        )));

    }, [city_gu]);

    // useEffect(() => {
    //     console.log('구', cat_gu.map((item) => item.props.value));
    // }, [cat_gu]);

    // # 검색 !
    const searchFood = () => {

        //restaurant data fetch하긩
        //구를 선택했을때 url fetch 해서 가져오기
        const getData = () => {
            // event.preventDefault();
            let url = 'http://10.125.121.176:8080/restaurants';
            // useRef의 current value값을 가져옴
            url = url + `/${city}`;
            url = url + `/${chooseCity_gu}`;
            console.log(chooseCity_gu + ','+ selectCity_gu.current.value);

            //fetch()
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => setRestaurant(data))
                .catch((err) => console.log(err));
        }
        getData();

        console.log('getData', restaurant)
        // text box에서 입력된 키워드 가져와서 검색
        const kw = searchKw.trim();
        let allRes = [];
        if (kw == null) {
            allRes = restaurant.filter((item) => item);
            // allRes = Res.map((item) => item);
            // console.log('모든 결과', allRes)
            return allRes;
        } // kw에 아무것도 검색된거 없으면 모든 종류의 식당 다 나오게 해야 하는데 왜 안나오지 ? 껒셩영

        // locations에서 kw에 맞는 식당 필터링해서 검색결과 설정
        const filteredRes = restaurant.filter((item) =>
            item.rname.includes(kw) || item.foodtype.includes(kw) || item.food.includes(kw));
        setSearchRes(filteredRes);

        console.log('allRes', allRes);
    };


    // console.log('구', cat_gu);


    return (
        <div className='container' style={{ backgroundColor: '#FFDF86' }}>
            {/* 상단의 navigation */}
            <FoodNav />
            <div className={`nes-container is-rounded ${style.container2} container`}>
                <div className={`${style.dropDown}`}>
                    {/* select '광역시', '구' */}
                    <div className={`${style.label}`}>
                        <label htmlFor="error_select">광역시/도를 선택하세요</label>
                        <div className='nes-select is-error' >
                            <select required id="error_select" onChange={checkCity} ref={selectCity}>
                                <option defaultValue={cate[0]} disabled hidden>Select...</option>
                                {cate}
                            </select>
                        </div>
                    </div>
                    <div className={`${style.label}`}>
                        <label htmlFor="error_select">구를 선택하세요</label>
                        <div className="nes-select is-error">
                            {/* option 에다가 이벤트 핸들링 걸면 어뜩하늬ㅢㅣ */}
                            <select required id="error_select" onChange={checkCity_gu} ref={selectCity_gu}>
                                <option defaultValue='Selected' disabled hidden >Select...</option>
                                {cat_gu}
                            </select>
                        </div>
                    </div>
                    {/* search keyword */}
                    <div className={`${style.label}`}>
                        <label htmlFor="textarea_field">Insert keyword</label>
                        <textarea id="textarea_field" value={searchKw} onChange={(e) => setSearchKw(e.target.value)} className={`nes-textarea ${style.inputTxt}`}></textarea>
                    </div>

                    {/* 검색 버튼 */}
                    <div className={`${style.label} ${style.clickBtn}`}>
                        <button type='button' className={`nes-btn is-error ${style.sarchBtn}`} onClick={searchFood}>Go</button>
                    </div>
                </div>

                {/* 지도 ;*/}
                <div className={`${style.mapAndInfo}`}>
                    {searchRes && <Mymap searchRes={searchRes} />}
                    {/* 검색 결과 표시 ;*/}
                    {searchRes && <SearchList searchRes={searchRes} />}
                </div>
            </div>
        </div>
    );
}
export default FoodFind;