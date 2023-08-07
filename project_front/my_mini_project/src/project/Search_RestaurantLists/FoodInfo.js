// Foodlist 클릭하면 상세정보 달아주기(Modal)
import style from './Modal.module.css';
import ReactModal from 'react-modal';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState, nicknameState } from '../LoginRecoil';
import axios from 'axios';
import { Link } from 'react-router-dom';

// 다른 컴포넌트에서 해당 컴포넌트의 변수? 함수? 쓰려면 props 설정 해야함
const FoodInfo = ({ isOpen, onClose, restaurant }) => {
    // 로그인 사용자만 이용하게 하기 위함 !
    const [isLoggedin, setIsLoggedIn] = useRecoilState(isLoggedInState);

    // db넣기 위해서 받는 거 (nickname, constent, review score)
    const [nickname, setNickname] = useRecoilState(nicknameState);
    const [reviewScore, setReviewScore] = useState(0);
    //  review 상태
    const [content, setContent] = useState('');

    // db nickname 가져오기 위한 상태
    const [data, setData] = useState([]);

    if (!isOpen) return null;

    // useEffect(() => {
    //     // nickname 가져오기
    //     let url = 'http://10.125.121.176:8080/allmembers';
    //     fetch(url)
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setData(data);
    //             console.log(data);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    // # 검색 !
    const handleSubmit = () => {
        let restId = restaurant.id
        const data = {
            restId,
            nickname,
            content,
            reviewScore,
        }

        //review data fetch하긩
        //review 작성해서 버튼 클릭하면 데이터 보내기
        const getData = () => {
            // event.preventDefault();
            let url = 'http://10.125.121.176:8080/insertReview';

            //fetch()
            axios.post(url, data)
                .then((resp) =>
                    // 서버 응답 처리 
                    console.log('리뷰 작성 성공', resp.data))
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
                {isLoggedInState == false ?
                    (<form>
                        <label htmlFor="textarea_field">리뷰를 작성하세요</label>
                        {/* text area : input type의 text보다 더 긴 텍스트를 입력받을 수 있음 */}
                        <textarea type='text'
                            value={content} onChange={(e) => setContent(e.target.value)} />

                        {/*제출 버튼 */}
                        <div className={`${style.label} ${style.clickBtn}`}>
                            <button type='button' className={`nes-btn is-error ${style.sarchBtn}`} onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                    ) : (<ReactModal
                        isOpen={isOpen} // 모달 오픈
                        onRequestClose={onClose} // 클로즈
                        portalClassName={style.modalLogin}
                        overlayClassName={style.modalOverlay}
                        shouldCloseOnOverlayClick={false}>
                        <div>
                            <p>리뷰를 남기기 위해선 로그인이 필요 합니다</p>
                            <Link to={'/login'}>로그인 하러가기</Link>
                        </div>
                        <button onClick={onClose} className={`${style.closeBtn}`}>Close</button>
                    </ReactModal>
                    )
                }
                <button onClick={onClose} className={`${style.closeBtn}`}>Close</button>
            </div>
        </ReactModal>
    );
}
export default FoodInfo;