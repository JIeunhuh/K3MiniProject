// 회원가입
import { MapTypeControl } from 'react-kakao-maps-sdk';
import style from './Login.module.css';
import { useEffect, useState } from 'react';
//useHistory
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Joinus = () => {
    // 회원가입 상태 불러오기
    const [firstName, setFisrtName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let name = firstName + ' ' + lastName;

        // DB에 들어가는 칼럼이름 맞춰야 함!!
        const data = {
            name,
            nickname,
            id,
            password
        };

        let url = 'http://10.125.121.176:8080/register';

        axios.post(url, data)
            .then(() => {
                alert('회원가입을 완료하셨습니다.');
                // 회원가입이 완료되면 로그인 페이지로 이동
                history('/login');
            })
            .catch(() => alert('회원가입이 완료되지 않았습니다.'));
    };

    console.log('userId', id);
    console.log('pw', password);

    return (
        <div className={`${style.container}`}>
            <div>
                <div className={`${style.mainTxt}`}>
                    {/* circle image */}
                    <img src='/images/circle.svg' />
                    <h1 className={`${style.signUpcom}`}>
                        User research made easy <br /> and fun.
                    </h1>
                </div>
                <p id={`${style.signUpTxt1}`}>Start testing in minutes !</p>
                <br />
                <p id={`${style.signUpTxt2}`}>Already have an account? <Link to={'/login'}>Log in</Link></p>
                {/* icon image */}
                <div id={`${style.images}`}>
                    <img src='/images/outline-brands-instagram.svg' />
                    <img src='/images/outline-brands-twitter.svg' />
                    <img src='/images/outline-brands-google.svg' />
                </div>
            </div>
            {/* name, id, pw textbox */}
            <form className={`${style.container2}`}>
                <div className={`${style.nameTxt}`} style={{ width: '639px' }}>
                    <div className={`nes-field ${style.inputTxt}`}>
                        <p className={`${style.putText}`}>First name</p>
                        <input type="text" id="name_field" value={firstName} onChange={(e) => setFisrtName(e.target.value)} className="nes-input" />
                    </div>
                    <div className={`nes-field ${style.inputTxt}`}>
                        <p className={`${style.putText}`}>Last name</p>
                        <input type="text" id="name_field" value={lastName} onChange={(e) => setLastName(e.target.value)} className="nes-input" />
                    </div>
                </div>
                <div className={`nes-field ${style.inputTxt}`}>
                    <p className={`${style.putText}`}>Id</p>
                    <input type="text" id="name_field" value={id} onChange={(e) => setId(e.target.value)} className="nes-input"></input>
                </div>
                <div className={`nes-field ${style.inputTxt}`}>
                    <p className={`${style.putText}`}>Password</p>
                    <input type="password" id="name_field" value={password} onChange={(e) => setPassword(e.target.value)} className="nes-input" />
                </div>
                <div className={`nes-field ${style.inputTxt}`}>
                    <p className={`${style.putText}`}>Nickname</p>
                    <input type="text" id="name_field" value={nickname} onChange={(e) => setNickname(e.target.value)} className="nes-input"></input>
                </div>
                {/* id, pw, name 입력안하면 입력하라는 창 뜨게 하기 */}
                <button type="button" onClick={handleSubmit} className={`${style.submitBtn}`}>Sign me up !</button>
            </form>
        </div>
    );
}
export default Joinus;
