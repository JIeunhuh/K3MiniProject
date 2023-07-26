import { Link } from "react-router-dom";
import style from './Food.module.css'
const FoodNav = () => {
    return (
        <span>
             {/* main page에 클릭할 버튼 3개(home/search/community) */}
            <Link to={'/'} className={`${style.mainBut}`}><img src="/image/home.png"/></Link>
            <Link to={'/find/:city/:gu/:kw'} className={`${style.mainBut}`}><img src="/image/search.png"/></Link>
            <Link to={'/comm'} className={`${style.mainBut}`}><img src="/image/community.png"/></Link></span>);
};
export default FoodNav;