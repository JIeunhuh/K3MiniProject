//login page
import axios from "axios";
import { useRecoilState } from "recoil";
import { idState, passwordState, isLoggedInState, nicknameState } from "../LoginRecoil";
import style from './Login.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// token에서 nickname을 추출하기 위함
import jwtDecode from "jwt-decode";

const Login = () => {
    // modal component 이용해서 로그인 구현
    // id / pw 상태관리
    const [id, setId] = useRecoilState(idState);
    const [password, setPassword] = useRecoilState(passwordState);
    // const [name, setName] = useState('');
    const history = useNavigate();

    //인증 상태
    const [isAuth, setIsAuth] = useRecoilState(isLoggedInState);

    // token -> nickname
    const [nickname, setNickname] = useRecoilState(nicknameState);

    // 로그인 db url 가져오기
    const login = () => {

        const data = {
            id,
            password
        };

        // login db 요청
        axios.post('http://10.125.121.176:8080/login', data)
            .then((response) => {
                // token 가져오기
                const jwtToken = response.headers.get('Authorization');
                console.log('response', response);
                if (jwtToken != null) {
                    // sessionStorage에 토큰 저장
                    sessionStorage.setItem('jwt', jwtToken);
                    setIsAuth(false);

                    // 토큰 추출 및 닉네임 저장
                    // token decoding
                    const splitToken = jwtToken.split(" ")[1];
                    const decodedToken = jwtDecode(splitToken);
                    const extractedNickname = decodedToken.nickname;
                    // nickname statement
                    setNickname(extractedNickname);

                    alert('로그인 완료');

                    // 회원가입이 완료되면 로그인 페이지로 이동
                    history('/comm');
                    // history('/find');
                }

            })
            .catch(() => alert('비밀번호가 올바르지 않습니다.'));
    }
    console.log(nickname);

    return (
        <div className={`${style.container}`}>
            <form className={`${style.container2} ${style.loginContainer}`}>
                <div className={`nes-field ${style.inputTxt}`}>
                    <p className={`${style.putText}`}>Id</p>
                    <input type="text" id="name_field" value={id} onChange={(e) => setId(e.target.value)} className="nes-input"></input>
                </div>
                <div className={`nes-field ${style.inputTxt}`}>
                    <p className={`${style.putText}`}>Password</p>
                    <input type="password" id="name_field" value={password} onChange={(e) => setPassword(e.target.value)} className="nes-input" />
                </div>
                <button type="button" onClick={login} className={`${style.submitBtn}`}>Sign in !</button>
            </form>
            <div className={`${style.loginImg}`} >
                <img style={{ backgroundColor: 'transparent' }} src='/images/loginCircle.svg' />
                <h1 className={`${style.signUpcom} ${style.signUpcom1}`}>
                    Enjoy your <br /> gourmet life !
                </h1>
            </div>
        </div>
    );
}
export default Login;