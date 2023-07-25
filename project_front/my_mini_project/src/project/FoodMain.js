import {Link} from 'react-router-dom';
const FoodMain=()=>{
    return(
        <div className="grid">
                <Link to={`/find/city/gu/kw` } role="button">Search Food</Link>
               <Link to={'/comm'} role="button">Community</Link>
            </div>

    );
}
export default FoodMain;