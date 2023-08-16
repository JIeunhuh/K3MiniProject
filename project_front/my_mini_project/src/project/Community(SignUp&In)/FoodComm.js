// 게시판 페이지
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../LoginRecoil';
import { useEffect, useState } from 'react';
import styles from './Community.module.css'
import style from './Login.module.css';
import Write from './Write';
// community 상단에는 login / join us 구현하기
const FoodComm = () => {

    // pagind
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);

    // session에 토큰값이 없는걸 초기값으로 잡음
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    const [bList, setBList] = useState([]);
    const [listTags, setlistTags] = useState([]);

    const navigate = useNavigate();

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

    // data fetch
    useEffect(() => {

        let url = `http://10.125.121.176:8080/getBoardList?page=${currentPage - 1}&size=${postsPerPage}&sort=desc`;

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // 최신순으로 정렬
                const sortedData = data.content.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
                setBList({ ...data, content: sortedData });
                setTotalPages(data.totalPages);
            })
            .catch((err) => console.log(err));

    }, [currentPage]);

    // 게시글 클릭하면 detailpost로 이동
    const clickPage = (row) => {
        navigate(`/post/${row.seq}`, { state: { post: row } });
    };

    useEffect(() => {
        // 게시판 목록 주르륵 
        if (bList.length === 0) return;

        let temp = [];
        for (let row of bList.content) {
            let dateStr = row.createDate.match(/^\d{4}-\d{2}-\d{2}/)[0];
            temp.push(
                <tr key={row.seq} style={{ height: '20px' }} onClick={() => clickPage(row)}>
                    <td>{row.seq}</td>
                    <td>{row.title}</td>
                    <td>{dateStr}</td>
                    <td>{row.nickname}</td>
                    {/* <td>{item.seq}</td> */}
                </tr>
            );
        }
        setlistTags(temp);

    }, [bList])

    // post Btn
    const handleWriting = () => {
        if (setIsLoggedIn == '') {
            alert('로그인이 필요합니다.')
        }
        else {
            navigate('/write');
        }
    }

    // paging function
    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <span
                    key={i}
                    className={currentPage === i ? styles.currentPage : styles.page}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </span>
            );
        }

        return (
            <div className={styles.paging}>
                {pages}
            </div>
        );
    };




    return (
        <main>
            <div>
                <Link to={'/joinus'}>Join us</Link>
                {/* 토큰값 있으면 로그아웃, 없으면 로그인 뜨게 */}
                {isLoggedIn != null ? <button type='button' className={`${style.logoutBtn}`} onClick={handleLogout}>Logout</button> : <Link to={'/login'} onClick={handleLogin}>Login</Link>}
            </div>

            <div className={styles.star1}>
                <img src='./images/comm_back1.png' /></div>
            <div className={styles.commBox}>
                <div className={styles.comm_rec1}>
                    <div>
                        <table className={styles.comm_rec2}>
                            <thead>
                                <th>No</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Nickname</th>
                            </thead>
                            <tbody>
                                {listTags}
                            </tbody>
                        </table>
                        <button className={styles.writeBtn} onClick={handleWriting}>
                            Write
                        </button>
                        <div className={styles.paging}>
                            {renderPages()}
                        </div>
                    </div>
                </div>
                <div>
                    <img className={styles.star2}
                        src='./images/comm_back2.svg' />
                </div>
                <div>
                    <img className={styles.hearts} src='./images/hearts.svg' />
                </div>
            </div>
        </main>
    );
}
export default FoodComm;