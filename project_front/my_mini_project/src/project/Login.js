//login page
import axios from 'axios';
import { async } from 'q';
import { useEffect, useState } from "react";
import style from './Login.module.css';

const Login = () => {
    // modal component 이용해서 로그인 구현
    // id / pw 상태관리
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

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
        <div>
            <h2>로그인</h2>
            <p style={{ color: 'red' }}></p>
            <form>
                <div>
                    <label>아이디:</label>
                    <input
                        type="text"
                        value={id}
                        // onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" >
                    로그인
                </button>
            </form>
        </div>
    );
}
export default Login;