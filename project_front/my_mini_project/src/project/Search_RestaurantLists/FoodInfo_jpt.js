// Foodlist 클릭하면 상세정보 달아주기(Modal)
import style from './Modal.module.css';
import ReactModal from 'react-modal';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, nicknameState, idState } from '../LoginRecoil';
import { Restaurant_id } from '../FoodInfoRecoil';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import StarRating from './StarRating';

const FoodInfo = ({ isOpen, onClose, restaurant, rvLists }) => {
    const [isLoggedin, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [restId, setRestId] = useRecoilState(Restaurant_id);
    const nickname = useRecoilValue(nicknameState);
    const [reviewScore, setReviewScore] = useState(0);
    const [content, setContent] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [id, setId] = useRecoilState(idState);

    const location = useLocation();
    const from = location.pathname;

    // # submit !
    const handleSubmit = () => {
        const data = {
            restId,
            nickname,
            content,
            reviewScore,
        };

        const getData = () => {
            let url = 'http://10.125.121.176:8080/insertReview';

            axios.post(url, data)
                .then((resp) => console.log('리뷰 작성 성공', resp.data))
                .catch((err) => console.log('리뷰 작성 오류:', err));
        };
        getData();

        setContent('');
        setReviewScore(0);
    };

    // 별점 아이콘 표시 (리뷰 작성할 때)
    const handleStarClick = (value) => {
        setReviewScore(value);
    };

    const handleStarHover = (value) => {
        setHoverRating(value);
    };

    // 상세정보 and review
    let rvTags = [];
    for (let row of rvLists) {
        // date 날짜만 나오게
        let dateStr = row.date.match(/^\d{4}-\d{2}-\d{2}/)[0];
        
        // 리뷰 점수 아이콘으로 대체
        let icon = [];
        let score = parseInt(row.reviewScore);

        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                icon.push(<img key={i} src='./images/star1.svg' style={{ width: '5%' }} />);
            } else {
                icon.push(<img key={i} src='./images/star4.svg' style={{ width: '5%' }} />);
            }
        }

        // 상세정보 
        rvTags.push(
            <tr className={style.RvLists} key={row.id}>
                <td>{row.nickname}</td>
                <td>{row.content}</td>
                <td>{score != null ? icon : 'None'}</td>
                <td>{dateStr}</td>
            </tr>
        );
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            portalClassName={style.modalContent}
            overlayClassName={style.modalOverlay}
            shouldCloseOnOverlayClick={false}
        >
            <div className={style.modalContentInner}>
                <h2 style={{ fontSize: '50px' }}>{restaurant.rname}</h2>
                <h4>{restaurant.city + ' ' + restaurant.city_gu + ' ' + restaurant.city_dong + ' ' + restaurant.city_address}</h4>
                {isLoggedin != null ? (
                    <form>
                        <label htmlFor="textarea_field">리뷰를 작성하세요</label>
                        <textarea type='text' value={content} onChange={(e) => setContent(e.target.value)} />
                        <div>
                            <p>별점을 입력하세요 : </p>
                            <StarRating
                                reviewScore={reviewScore}
                                onStarClick={handleStarClick}
                                hoverRating={hoverRating}
                                onStarHover={handleStarHover}
                            />
                            <p> 선택한 별점 : {reviewScore}</p>
                        </div>
                        {rvLists.length === 0 ? (
                            <div>
                                <h3>Review</h3>
                                <p>아직 작성된 리뷰가 없습니다.</p>
                            </div>
                        ) : (
                            <div>
                                <h3>Review</h3>
                                <table className={style.rvTable}>
                                    <thead>
                                        <tr className={style.RvLists}>
                                            <th>Nickname</th>
                                            <th>Content</th>
                                            <th>Score</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>{rvTags}</tbody>
                                </table>
                            </div>
                        )}
                        <div className={`${style.label} ${style.clickBtn}`}>
                            <button type='button' className={`nes-btn is-error ${style.sarchBtn}`} onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p>리뷰를 남기기 위해선 로그인이 필요 합니다</p>
                        <Link to={{ pathname: '/login', state: { from } }}>로그인 하러가기</Link>
                    </div>
                )}
                <button onClick={onClose} className={`${style.closeBtn}`}>Close</button>
            </div>
        </ReactModal>
    );
};

export default FoodInfo;