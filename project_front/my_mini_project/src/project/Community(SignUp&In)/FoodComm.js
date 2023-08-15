// 게시판 페이지
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../LoginRecoil';
import { useEffect, useState } from 'react';
import styles from './Community.module.css'
import style from './Login.module.css';
// community 상단에는 login / join us 구현하기
const FoodComm = () => {

    // session에 토큰값이 없는걸 초기값으로 잡음
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    const [bList, setBList] = useState([]);

    // 세션에 토큰없으면 로그인 링크 뜨게
    const handleLogin = () => {
        setIsLoggedIn('');
        // console.log('login', isLoggedIn);
    }

    // 세션에 토큰 있으면 로그인 상태이므로, 로그아웃 링크 뜨게 만듦! 
    const handleLogout = () => {
        setIsLoggedIn(false);
        // sessionStorage.removeItem('jwt');
        localStorage.removeItem('jwt');
        setIsLoggedIn(localStorage.getItem('jwt'));
        alert('logout이 완료되었습니다.');
        // console.log('login', isLoggedIn);
    }

    useEffect(() => {

        let url = 'http://10.125.121.176:8080/getBoardList';

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => setBList(data))
            .catch((err) => console.log(err));

    }, []);

    console.log(bList.content);
    let listTags = [];
    
    // 게시판 목록 주르륵 
    for (let row of bList.content) {
        listTags.push(
            <tr>
                <td>{row.seq}</td>
                <td>{row.title}</td>
                <td>{row.createDate}</td>
                <td>{row.nickName}</td>
                {/* <td>{item.seq}</td> */}
            </tr>
        );
        console.log(row);
    }


    return (
        <main>
            <div>
                <Link to={'/joinus'}>Join us</Link>
                {/* 토큰값 있으면 로그아웃, 없으면 로그인 뜨게 */}
                {isLoggedIn != null ? <button type='button' className={`${style.logoutBtn}`} onClick={handleLogout}>Logout</button> : <Link to={'/login'} onClick={handleLogin}>Login</Link>}
            </div>

            <span className={styles.star1}>
                <img src='./images/comm_back1.png' /></span>
            <div className={styles.commBox}>
                <div className={styles.comm_rec1}>
                    <div>
                        <button className={styles.writeBtn}>
                            Write
                        </button>
                        <table className={styles.comm_rec2}>
                            <th>No</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Nickname</th>
                            {/* <th>Count</th> */}
                            {listTags}
                        </table>
                    </div>
                </div>
                <div>
                    <span>
                        <img className={styles.star2}
                            src='./images/comm_back2.svg' /></span>

                    <img className={styles.hearts} src='./images/hearts.svg' />
                </div>
            </div>
        </main>
    );
}
export default FoodComm;