//login page
import { async } from 'q';
import { useEffect, useState } from "react";
import style from './Login.module.css';

const Login = () => {
    // modal component 이용해서 로그인 구현
    // id / pw 상태관리
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');

    // // 로그인 db url 가져오기
    // const login = async (id, password) => {
    //     // login 요청 보내기
    //     try {
    //         const response = await axios.post('http://10.125.121.176:8080/login', {
    //             id,
    //             password,
    //         });
    //         return response.data; //로그인 성공 시, 서버에서 반환하는 데이터 반환 
    //     }
    //     catch (error) {
    //         throw new Error('Failed Login'); //로그인 실패 시 에러 처리
    //     }



    return (
        <div className={`${style.container}`}>
            <form className={`${style.container2}`}>
                <div className={`nes-field ${style.inputTxt}`}>
                    <p className={`${style.putText}`}>Id</p>
                    <input type="text" id="name_field" value={id} onChange={(e) => setId(e.target.value)} className="nes-input"></input>
                </div>
                <div className={`nes-field ${style.inputTxt}`}>
                    <p className={`${style.putText}`}>Password</p>
                    <input type="password" id="name_field" value={password} onChange={(e) => setPassword(e.target.value)} className="nes-input" />
                </div>
                <button type="button" className={`${style.submitBtn}`}>Sign in !</button>
            </form>
            <div className={`${style.loginImg}`}>
                <img src='/images/loginCircle.svg' />
                <h1 className={`${style.signUpcom} ${style.signUpcom1}`}>
                    Enjoy your <br /> gourmet life !
                </h1>
            </div>
        </div>
    );
}
export default Login;