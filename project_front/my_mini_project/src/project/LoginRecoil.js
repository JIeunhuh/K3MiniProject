// recoil 이용해서 로그인 정보 전역으로 사용 가능하게 함
import { atom } from 'recoil';

export const idState = atom({
    key: 'idState',
    default: '',
});

export const passwordState = atom({
    key: 'passwordState',
    default: '',
});

export const nicknameState = atom({
    key : 'nicknameState',
    default : '',
})

// 초기값을 세션에 토큰이 없는걸로 잡음 !!!
//  '!==' : 두 값이 서로 다른지를 비교하는 연산자
export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: '',
});