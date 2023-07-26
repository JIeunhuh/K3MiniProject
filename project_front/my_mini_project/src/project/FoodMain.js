// 메인 홈페이지
import { Link } from 'react-router-dom';
import style from './Food.module.css';

const FoodMain = () => {
    return (
        <div className="container">
            <div id={`${style.txtTitle}`}>img 들어갈곳 </div>
            {/* main page에 클릭할 버튼 2개(search/community) */}
            <div id={`${style.main2btn}`}>
                <Link to={`/find/city/gu/kw`} className={`btn btn-primary ${style.mainBut}`}>
                    Search Food</Link>
                <Link to={'/comm'} className={`btn btn-primary ${style.mainBut}`}>Community</Link>
            </div>
        </div>

    );
}
export default FoodMain;