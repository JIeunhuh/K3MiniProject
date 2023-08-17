# __K3MiniProject - 전국 모범음식점 위치 검색 웹페이지 만들기__

## 1. 프로젝트 설명(목적 설명, 개발 기간)
> **부산대학교 k - digital 3기** <br/> **개발기간 : 2023.07 ~ 2023.08.17**

## 2. 팀원

|      Front - End       |          Back - End         |                                                               
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | 
|   [@JIeunhuh](https://github.com/JIeunhuh)   |    [@sou05091](https://github.com/sou05091)  |
| 허지은 | 김민범 |


## 3. 목차 
[프로젝트 소개](#4-프로젝트-소개)  
[시작가이드](#5-시작가이드요구사항설치-및-실행)  
[기술 스택](#6-기술-스택)  
[Front End](#7-화면-구성-개발-화면에-대한-내용---fe)  
[Back End](#8-기능-구현---be)  
[주요기능](#9-주요-기능-📦)  

## 4. 프로젝트 소개

외식업이 우후죽순 발전하고 있는 요즘, 식당 위생이 청결하지 못한 곳은 사람들이 선호 하지 않는다. 

그래서 위생관리 상태와 서비스 수준이 우수한 모범음식점으로 선정 된 곳을 찾아, 관련 지역에서 찾아갈 수 있도록 검색서비스를 구현해보았다. 

더불어, 사용자들이 식당을 평가하고 리뷰를 작성할 수 있는 리뷰 게시판과 자유롭게 소통할 수 있는 커뮤니티 게시판을 추가하여, 사용자들에게 더욱 편리하고 유용한 웹사이트를 제공하였다. 

## 5. 시작가이드(요구사항,설치 및 실행)

- Spring Boot Version : (v2.7.12)

## 6. 기술 스택

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)    

### Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![BootStrap](https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![SpringBoot](https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)


## 7. 화면 구성 (개발 화면에 대한 내용) - FE 

## 8. 기능 구현 - BE

- JWT 로그인 기능
- 회원가입 기능
- Community, Review게시판, 댓글 기능
- 식당 데이터 제공
- 상세 개발 내용 → [바로가기](https://github.com/JIeunhuh/K3MiniProject/tree/back)

## 9. 주요 기능 📦

### ⭐️ 회원가입/로그인 기능 구현
- front에서 user 정보를 Back-End로 전송하면 데이터베이스에 해당 유저 정보를 추가함
- Back-End에서 사용자의 아이디와 비밀번호를 검증, 인증이 성공하면 JWT토큰을 생성
- 생성된 토큰을 클라이언트에 전달, 클라이언트는 이 토큰을 이용하여 인증된 요청을 서버에 보낼 수 있음

### ⭐️ 검색 페이지에서 카테고리에 따른 모범음식점 조회 기능
- 시/도, 군/구 카테고리를 선택해서 키워드를 입력하면 해당 키워드에 알맞는 음식점 리스트만 조회할 수 있는 기능 구현
- 카카오 맵 api를 이용해 음식점 검색하면 해당 위치에 있는 음식점의 위치를 마커를 이용해 표시, 마커 클릭하면 커스텀 오버레이가 뜨도록 구현

### ⭐️ 조회된 음식점 리스트를 클릭하여 상세정보 뜨도록 기능 구현
- React - modal을 이용해 조회된 음식점을 클릭하면 모달 창을 띄워 가게이름, 주소, 전화번호 등의 상세정보를 띄움

### ⭐️ 모달창에서 리뷰 작성 기능 구현
- 모달창 상단에 가게 상세정보, 하단에 리뷰 작성 기능을 만들어 token을 이용해 회원유무를 판별하고 로그인 유저만 리뷰기능을 작성할 수 있도록 구현

### ⭐️ 커뮤니티 게시판 구현
- 게시글에 대한 정보를 받아와 회원들의 작성글을 목록에 보이도록 구현
- 게시글 작성 기능 구현(회원인 경우에만 작성가능)
- 게시글 삭제 기능(본인 글만 삭제 가능)

## 10. 아키텍쳐

```bash
📦src
 ┣ 📂project
 ┃ ┣ 📂Community(SignUp&In) 
 ┃ ┃ ┣ 📜Community.js 
 ┃ ┃ ┣ 📜Community.module.css
 ┃ ┃ ┣ 📜FoodComm.js : 커뮤니티 메인 페이지(게시글 전체목록 조회)
 ┃ ┃ ┣ 📜Joinus.js : 회원가입 페이지
 ┃ ┃ ┣ 📜Login.js : 로그인 페이지
 ┃ ┃ ┣ 📜Login.module.css
 ┃ ┃ ┣ 📜PostDetail.js : 상세 게시글 조회
 ┃ ┃ ┗ 📜Write.js : 포스팅 
 ┃ ┣ 📂Search_RestaurantLists
 ┃ ┃ ┣ 📜FoodFind.js : 메인 음식점 조회 페이지
 ┃ ┃ ┣ 📜FoodInfo.js : 
 ┃ ┃ ┣ 📜FoodInfo_jpt.js
 ┃ ┃ ┣ 📜Modal.module.css
 ┃ ┃ ┣ 📜Mymap.js : 지도 표시 (kakao map api 호출)
 ┃ ┃ ┣ 📜SearchList.js : 지역/키워드 선택후, 검색된 음식점 조회
 ┃ ┃ ┗ 📜StarRating.js : 리뷰 별점 매기기
 ┃ ┣ 📜Food.module.css
 ┃ ┣ 📜FoodInfoRecoil.js : foodinfo 전역상태관리
 ┃ ┣ 📜FoodMain.js : 프로젝트 메인 페이지
 ┃ ┣ 📜FoodNav.js : 페이지들의 상단 네비게이션 바
 ┃ ┣ 📜FoodSearch.js : Route 설정
 ┃ ┣ 📜LoginRecoil.js : 로그인 전역 상태관리
 ┃ ┗ 📜RecoilStateProvider.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```






