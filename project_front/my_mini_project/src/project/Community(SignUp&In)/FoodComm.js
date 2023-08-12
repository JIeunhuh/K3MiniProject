// 게시판 페이지
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../LoginRecoil';
import { useEffect } from 'react';

import style from './Login.module.css';
// community 상단에는 login / join us 구현하기
const FoodComm = () => {

    // session에 토큰값이 없는걸 초기값으로 잡음
<<<<<<< HEAD:project_front/my_mini_project/src/project/FoodComm.js
    // const [isLoggedIn, setIsLoggedIn] = useState(!sessionStorage.getItem('jwt'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 세션에 토큰없으면 로그인 링크 뜨게
    const handleLogin = () => {
        setIsLoggedIn(true);
=======
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    // 세션에 토큰없으면 로그인 링크 뜨게
    const handleLogin = () => {
        setIsLoggedIn('');
        // console.log('login', isLoggedIn);
>>>>>>> 807d2250c27bab1482c99ca353a826213a5d092a:project_front/my_mini_project/src/project/Community(SignUp&In)/FoodComm.js
    }

    // 세션에 토큰 있으면 로그인 상태이므로, 로그아웃 링크 뜨게 만듦! 
    const handleLogout = () => {
<<<<<<< HEAD:project_front/my_mini_project/src/project/FoodComm.js
        setIsLoggedIn(false);
        // sessionStorage.removeItem('jwt');
=======
        localStorage.removeItem('jwt');
        setIsLoggedIn(localStorage.getItem('jwt'));
>>>>>>> 807d2250c27bab1482c99ca353a826213a5d092a:project_front/my_mini_project/src/project/Community(SignUp&In)/FoodComm.js
        alert('logout이 완료되었습니다.');
        // console.log('login', isLoggedIn);
    }


    return (
        <main>
            <div>
                <Link to={'/joinus'}>Join us</Link>
                {/* 토큰값 있으면 로그아웃, 없으면 로그인 뜨게 */}
                {isLoggedIn != null ? <button type='button' className={`${style.logoutBtn}`} onClick={handleLogout}>Logout</button> : <Link to={'/login'} onClick={handleLogin}>Login</Link>}
            </div>
        </main>
    );
}
export default FoodComm;