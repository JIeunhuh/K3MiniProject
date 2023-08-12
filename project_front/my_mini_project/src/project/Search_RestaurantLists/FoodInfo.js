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
import moment from 'moment';

// 다른 컴포넌트에서 해당 컴포넌트의 변수? 함수? 쓰려면 props 설정 해야함
const FoodInfo = ({ isOpen, onClose, restaurant, rvLists }) => {
    // 로그인 사용자만 이용하게 하기 위함 !
    const isLoggedin = useRecoilValue(isLoggedInState);

    // db넣기 위해서 받는 거 (nickname, constent, review score)
    const [restId, setRestId] = useRecoilState(Restaurant_id);
    const nickname = useRecoilValue(nicknameState);
    const [reviewScore, setReviewScore] = useState(0);
    //  review 상태
    const [content, setContent] = useState('');
    //  reviewScore
    const [hoverRating, setHoverRating] = useState(0);

    // userReviews 등록하면 바로 리뷰창에 보일수 있게
    const [userReviews, setUserReviews] = useState(rvLists);

    // 현재 시각 보내기
    // const [date, setDate] = useState
    const moment = require('moment');
    const currentDate = moment();
    const date = currentDate.format('YYYY-MM-DD');
    // console.log(formattedDate)

    //useLocation
    const location = useLocation();
    const from = location.pathname; //현재 페이지 경로 저장
    //useEffect(()=>{console.log('userList',userReviews);},[userReviews]);
    console.log('userRv', userReviews);
    console.log('rvList', rvLists);
    // setUserReviews([...rvLists]);
    if (!isOpen) return null;

    setRestId(restaurant.id);
    // console.log('login', isLoggedin);


    // # submit !
    const handleSubmit = () => {

        const data = {
            restId,
            nickname,
            content,
            date,
            reviewScore,
        }

        //review data fetch하긩
        //review 작성해서 버튼 클릭하면 데이터 보내기
        const getData = () => {
            // event.preventDefault();
            let url = 'http://10.125.121.176:8080/insertReview';

            //fetch()
            axios.post(url, data)
                .then((resp) => {
                    // 서버 응답 처리 
                    console.log('리뷰 작성 성공', resp.data)
                    // userReview를 상태에 저장
                    setUserReviews([data, ...rvLists]);
                })
                .catch((err) => {
                    // 오류 처리
                    console.log('리뷰 작성 오류:', err);
                });
        }
        getData();

        //리뷰작성 완료 후 초기화
        setContent('');
        setReviewScore(0);

    }

    // console.log('rvlist', rvLists);
    // console.log('nickname', nickname);
    // 별점 만들기
    const handleStarClick = (value) => {
        setReviewScore(value);
    }

    const handleStarHover = (value) => {
        setHoverRating(value);
    }
    // console.log('userRV', userReviews)
    // review List 모달창에 띄우기(DB에 nickname, content, score, date)
    let rvTags = [];
    // 처음에 userReviews가 []이라 리뷰를 입력해야 이미 작성된 리뷰도 보임 왜일까..?
    for (let row of userReviews) {

        //db에 들어간 날짜시간에서 날짜만 보이게 하긔(정규식)(프론트에서 백으로 데이터 보낼때 date가 null로 들어가나 ?..)
        let dateStr = row.date.match(/^\d{4}-\d{2}-\d{2}/)[0];
        // reviewScore 별로 보이게 하긔
        let icon = [];
        let score = parseInt(row.reviewScore);
        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                icon.push(<img key={i} src='./images/star1.svg' style={{ width: '5%' }} />);
            } else {
                icon.push(<img key={i} src='./images/star4.svg' style={{ width: '5%' }} />);
            }
        }

        rvTags.push(
            <tr className={style.RvLists} key={row.id}>
                <td>{row.nickname}</td>
                <td>{row.content}</td>
                <td>{score != null ? icon : 'None'}</td>
                <td>{dateStr}</td>
                {/* 내 리뷰 삭제 */}<td>
                    {nickname == row.nickname ? <button onClick={() => handleDeleteReview(row.id)}>X</button> : ''}</td>
            </tr>
        )
    }

    // Delete Reviews (리뷰 삭제는 되는거 같은데 창도 새로고침 되는 듯?)
    const handleDeleteReview = (reviewId) => {
        // 토큰 기반으로 리뷰 삭제 처리
        let url = 'http://10.125.121.176:8080/deleteReview/';
        url = url + `${reviewId}`;

        // API 호출
        axios.delete(url)
            .then((resp) => {
                console.log('리뷰 삭제 성공', resp.data);

                // 리뷰 삭제한 후 해당 리뷰를 제외한 새 배열 생성하기
                const updateReviews = rvLists.filter((item) => item.id !== reviewId);
                setUserReviews(updateReviews);
            })
            .catch((err) => {
                console.log('리뷰 삭제 오류', err);
            });
    };



    return (
        // react-modal 사용할때 요소 지정 다 해주어야 함
        <ReactModal
            isOpen={isOpen} // 모달 오픈
            onRequestClose={onClose} // 클로즈
            portalClassName={style.modalContent} //모달 창 스타일
            overlayClassName={style.modalOverlay} // 배경 스타일
            shouldCloseOnOverlayClick={false} // 모달 창 외부 클릭으로 닫히는 것 방지
        >
            {/* 모달 창의 크기가 변경되지 않는 이유가 react modal이 창 크기를 제어하는 방식과 관련있을 수 있음 ! 그래서 내부에서 클래스 네임 지정해서 창 크기 조절 ; 안됌 ㅡㅡ*/}
            {/* 모달 내용 추가 : 리뷰, 평점 등 */}
            <div className={style.modalContentInner}>
                <h2 style={{ fontSize: '50px' }}>{restaurant.rname}</h2>
                <h4>{restaurant.city + ' ' + restaurant.city_gu + ' ' + restaurant.city_dong + ' ' + restaurant.city_address}</h4>
                {/* 로그인 상태면 리뷰 보이게, 아니면 로그인 하도록 만듦 */}
                {isLoggedin != '' ?
                    (<form>
                        <label htmlFor="textarea_field">리뷰를 작성하세요</label>
                        {/* text area : input type의 text보다 더 긴 텍스트를 입력받을 수 있음 */}
                        <textarea type='text'
                            value={content} onChange={(e) => setContent(e.target.value)} />
                        <div>
                            {/* 별점 입력 */}
                            <p>별점을 입력하세요 : </p>
                            <StarRating
                                reviewScore={reviewScore}
                                onStarClick={handleStarClick}
                                hoverRating={hoverRating}
                                onStarHover={handleStarHover}
                            />
                            <p> 선택한 별점 : {reviewScore}</p>
                        </div>
                        {/* 리뷰리스트 보여주기 */}
                        {/*rvLists === []로 했을때 삼항연산자 앞에 코드 실행 안되는 문제 : rvLists가 빈 배열인 경우에도 빈 테이블이 렌더링되고 있습니다. 이는 JSX의 삼항 연산자 내부에서 배열의 비어있는 상태를 검사하는 방식 때문에 발생하는 문제입니다.
                        이런 경우에는 rvLists의 길이를 검사하여 렌더링 여부를 결정하는 것이 좋습니다. */}
                        {userReviews.length === 0 ? <div>
                            <h3>Review</h3>
                            <p>아직 작성된 리뷰가 없습니다.</p></div> :
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
                                    <tbody>
                                        {rvTags}
                                    </tbody>
                                </table>
                            </div>
                        }
                        {/*제출 버튼 */}
                        <div className={`${style.label} ${style.clickBtn}`}>
                            <button type='button' className={`nes-btn is-error ${style.sarchBtn}`} onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                    ) : (
                        <div>
                            <p>리뷰를 남기기 위해선 로그인이 필요 합니다</p>
                            <Link to={{ pathname: '/login', state: { from } }}>로그인 하러가기</Link>
                        </div>

                    )
                }
                <button onClick={onClose} className={`${style.closeBtn}`}>Close</button>
            </div>
        </ReactModal>
    );
}
export default FoodInfo;