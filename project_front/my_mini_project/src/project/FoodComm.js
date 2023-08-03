// 게시판 페이지
import { Link } from 'react-router-dom';
// community 상단에는 login / join us 구현하기

const FoodComm = () => {


    return (
        <div>
            <Link to={'/joinus'}>Join us</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    );
}
export default FoodComm;