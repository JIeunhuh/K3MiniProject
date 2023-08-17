import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { nicknameState } from '../LoginRecoil';
import { useEffect, useState } from 'react';
import styles from './Community.module.css';
import axios from 'axios';

const PostDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const nickname = useRecoilValue(nicknameState);
    const { post } = location.state;

    // useParams로 파라미터 값 추출
    const params = useParams();

    console.log(post);

    if (!post) {
        return <div>Loading...</div>;
    }

    const deletePost = () => {
        const seq = params.id;

        // 토큰 기반으로 리뷰 삭제 처리
        let url = `http://10.125.121.176:8080/deleteBoard/${seq}`;

        // API 호출
        axios.delete(url)
            .then((resp) => {
                console.log('게시글 삭제 성공', resp.data);

                alert('게시글 삭제가 완료되었습니다.');
                //삭제 성공시 처리
                navigate('/comm');

            })
            .catch((err) => {
                console.log('게시글 삭제 오류', err);
            });
    };


    return (<main>
        <span className={styles.star1}>
            <img src='./images/comm_back1.png' /></span>
        <div className={styles.commBox}>
            <div className={styles.comm_rec1}>
                <div className={styles.comm_rec2}>
                    <h2>{post.title}</h2>
                    <p>작성자 : {post.nickname}</p>
                    <br />
                    <p style={{ color: '#747480' }}><strong>Content</strong></p>
                    <p>{post.content}</p>
                    <div className={styles.deleteBtn}>
                        {nickname == post.nickname ? <button onClick={deletePost}>Delete</button> : ''}
                    </div>
                </div>
                <Link to='/comm' style={{ marginLeft: '10%' }}>Return to List</Link>
                <span>
                    <img className={styles.star2}
                        src='./images/comm_back2.svg' />
                </span>
               
            </div>
        </div>
    </main>
    );
};
export default PostDetail;