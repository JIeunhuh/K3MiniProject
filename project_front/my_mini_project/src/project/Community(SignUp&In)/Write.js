import { nicknameState } from '../LoginRecoil';
import styles from './Community.module.css';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Write = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [insertBoard, setInsertBoard] = useState([]);
    const nickname = useRecoilValue(nicknameState);

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = () => {
        // 작성한 글을 서버에 전송하는 로직 추가 (API 호출 등)
        console.log('Title:', title);
        console.log('Content:', content);

        const data = {
            title,
            content,
            nickname,

        }
        // 필요한 경우 서버와의 통신 로직을 구현하세요.
        let url = 'http://10.125.121.176:8080/insertBoard';

        axios.post(url, data)
            .then((resp) => {
                // 서버 응답 처리 
                console.log('게시글 작성 성공', resp.data)
                // userReview를 상태에 저장
                setInsertBoard(data);
                navigate('/comm');
            })
            .catch((err) => {
                // 오류 처리
                console.log('리뷰 작성 오류:', err);
            });



    }


    return (

        <div className={`${styles.commBox} container`}>
            <div className={styles.comm_rec1}>
                <div className={styles.comm_rec2}>
                    <h2>글쓰기</h2>
                    <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                    <textarea placeholder="Content" value={content} onChange={handleContentChange} />
                    <button onClick={handleSubmit}>작성 완료</button>
                </div>
            </div>
        </div>

    );
};
export default Write;