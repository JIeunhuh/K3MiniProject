import { Link } from "react-router-dom";
import style from './Food.module.css'
const FoodNav = () => {
    return (
        <div id={`${style.nav}`}>
            {/* main page에 클릭할 버튼 3개(home/search/community) */}
            <Link to={'/'} className={`${style.mainBut1}`}><img src="/image/home.png" /></Link>
            <Link to={'/find'} className={`${style.mainBut2}`}><img src="/image/search.png" /></Link>
            <Link to={'/comm'} className={`${style.mainBut3}`}><img src="/image/community.png" /></Link>
        </div>);
};
export default FoodNav;