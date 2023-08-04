// 게시판 페이지
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import style from './Login.module.css';
// community 상단에는 login / join us 구현하기
const FoodComm = () => {

    // session에 토큰값이 없는걸 초기값으로 잡음
    const [isLoggedIn, setIsLoggedIn] = useState(!sessionStorage.getItem('jwt'));

    // 세션에 토큰없으면 로그인 링크 뜨게
    const handleLogin = () => {
        setIsLoggedIn(!sessionStorage.getItem('jwt'));
    }

    // 세션에 토큰 있으면 로그인 상태이므로, 로그아웃 링크 뜨게 만듦! 
    const handleLogout = () => {
        setIsLoggedIn(sessionStorage.getItem('jwt'));
        sessionStorage.removeItem('jwt');
        alert('logout이 완료되었습니다.');
    }


    return (
        <main>
            <div>
                <Link to={'/joinus'}>Join us</Link>
                {/* 토큰값 있으면 로그아웃, 없으면 로그인 뜨게 */}
                {isLoggedIn ? <Link to={'/login'} onClick={handleLogin}>Login</Link> : <button type='button' className={`${style.logoutBtn}`} onClick={handleLogout}>Logout</button>}
            </div>
        </main>
    );
}
export default FoodComm;