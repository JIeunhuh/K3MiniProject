// 메인 홈페이지
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Food.module.css';
import FoodNav from './FoodNav';

const FoodMain = () => {

    return (

        <div className={`${style.mainHome} container`}>
            {/* 상단의 navigation */}
            <FoodNav />
            <div className={`${style.container}`}>
                {/* main title */}
                <img id={`${style.txtTitle}`} src='/image/title.png' alt='main title' />
                {/* background img */}
                <img id={`${style.mainBackground3}`} src='/image/background3.png' />
            </div>
            {/* background img */}
            {/* <img id={`${style.mainBackground4}`} src='/image/background4.png'/> */}
            {/* background img */}
            <div className={`${style.container1}`}>
                <img id={`${style.mainBackground1}`} src='/image/background1.png' />
                <img id={`${style.mainBackground2}`} src='/image/background2.png' />
            </div>
        </div>

    );
}
export default FoodMain;