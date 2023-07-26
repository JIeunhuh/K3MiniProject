// 메인 홈페이지
import { Link } from 'react-router-dom';
import style from './Food.module.css';

const FoodMain = () => {
    return (
        <div>
            <img id={`${style.txtTitle}`} src='/image/title.png' alt='main title' />
            <span>
                <img id={`${style.mainBackground1}`} src='/image/background1.png'/>
                <img id={`${style.mainBackground2}`} src='/image/background2.png'/>
            </span>
        </div>
        
    );
}
export default FoodMain;