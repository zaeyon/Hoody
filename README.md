# 후디 - 소비 네트워크 서비스
<img src="https://user-images.githubusercontent.com/49143255/243344983-e75d4dd1-e560-4c03-8cb9-098c1273daa3.png"/>

## 📝 프로젝트 개요

### • 주제

후디는 자신의 소비에 대해 상세한 내용을 기록하여 사람들과 공유하고 자신의 소비 패턴에 대해 분석 받을 수 있는 모바일 서비스 입니다.

### • 기간

1. **서비스 기획 및 개발** <br/>
2020.03 ~ 2020.08 
2. **MVP 테스트 및 오류 개선** <br/>
2020.08 ~ 2020.09
3. **iOS, Android 스토어 출시 (현재 삭제됨)** <br/>
2020.09

### • 대표 사진
<div>
<img width="32%" alt="피드" src="https://user-images.githubusercontent.com/49143255/243345027-de09eb9e-de58-4c22-a861-1a5cf35fa24a.png"/>
<img width="32%" alt="리뷰" src="https://user-images.githubusercontent.com/49143255/243345003-0dd7e7e5-e53d-4ff2-bb05-e5a8296ebc01.png"/>
<img width="32%" alt="추천" src="https://user-images.githubusercontent.com/49143255/243345016-554fa9ab-bfbb-4d9c-8863-b10f3e723ed6.png"/>
</div>
<div>
<img width="32%" alt="지도" src="https://user-images.githubusercontent.com/49143255/243345011-cf5e011b-f761-4492-bfa2-c84d432b3eb0.png"/>
<img width="32%" alt="컬렉션" src="https://user-images.githubusercontent.com/49143255/243345021-a3fc8541-3500-4ef4-8fb7-48eddfc49f66.png"/>
<img width="32%" alt="분석" src="https://user-images.githubusercontent.com/49143255/243345010-2217e81b-4131-42bc-8b17-2271aa3f64aa.png"/>
 </div>

### • 참여

| 이름 | 담당 | 기능 |
| --- | --- | --- |
| 이재연 [zaeyon](https://github.com/zaeyon) | 프론트엔드 | 프론트엔드 전체 기능 담당 |
| 정지원 [jiwon11](https://github.com/jiwon11) | 백엔드 | 백엔드 전체 기능 담당 |
| 권민정 | 디자인 |  |

### • UX/UI 디자인 작업물

[https://www.figma.com/file/E1AbKKeKZTTDrWbAVL89zy/UI?type=design&node-id=1255%3A6784&t=la2VUeUHHmp1nt3B-1](https://www.figma.com/file/E1AbKKeKZTTDrWbAVL89zy/UI?type=design&node-id=1255%3A6784&t=la2VUeUHHmp1nt3B-1)

## 🛠️ 기술 스택

### • Platform - iOS, Android

React-Native를 사용하여 iOS, Android를 모두 지원하는 하이브리드앱으로 개발하였습니다.

### • 프로그래밍 언어 - JavaScript, TypeScript

타입 에러를 방지하기 위해 TypeScript를 도입하여 기존의 JavaScript와 함께 사용하였습니다.

### • UI 라이브러리 - React-Native

빠른 개발과 테스트가 중요한 스타트업이므로 iOS, Android 앱을 한번에 만들 수 있는 React-Native를 선택하여 하이브리드 앱을 만들었습니다.

### • CSS-In-JS 라이브러리 - styled-components

styled-components를 사용하여 CSS 코드를 JS파일안에 작성함으로써 생산성을 높였습니다.

### • HTTP 비동기 통신 라이브러리 - Axios

백엔드 개발자와 협업하는게 처음이었기에 레퍼런스가 많아 수월하게 작업할 수 있을거 같은 Axios를 선택하여 API 연동을 진행하였습니다.

### • 전역 상태 관리 - Redux

서비스에서 사용되는 사용자의 로그인 데이터, 소비 피드 데이터와 같이 전역으로 사용되는 데이터를 관리하기 위해 Redux를 사용하였습니다.  

### • 디자인 패턴 - Container & Presentational Component

Container 컴포넌트에선 비즈니스 로직과 상태 관리, 라우팅에 대한 코드를 작성하고 사용자한테 보여지는 UI에 대한 코드는 Presentational 컴포넌트로 나눠서 작성하여 코드의 재사용성과 유지보수를 용이하게 하였습니다.

### • 지도 - Google Map API

프로젝트 초반엔 네이버 지도 API를 사용하였는데 이후 해외 장소의 위치 등록을 지원하기 위해 구글 지도 API로 변경하였습니다.

### • 소셜 계정 로그인 - Google, Kakao, Apple

사용자가 회원가입 없이 간편하게 로그인할 수 있도록 구글, 카카오, 애플 계정 로그인 API를 연동하였습니다.

---

## ⭐️ 주요 기능

### 1. 이메일 회원가입/로그인

- 이메일을 통해 회원가입을 하거나 구글, 카카오, 애플 계정을 통해 간편하게 로그인할 수 있습니다.
- 사용자가 로그인을 하면 서버에서 jwtToken을 생성하여 응답합니다.  jwtToken을 클라이언트에 저장하여 사용자가 어플 재실행 시 자동 로그인 되도록 구현하였습니다.

<img alt="로그인" width="30%" src="https://user-images.githubusercontent.com/49143255/244298234-e09e6924-f3ce-4dbf-a02a-2a2f36bcd475.gif"/>


### 2. 홈 탭 - 소비 피드 목록 & 소비 상세 게시글

- 홈탭에서 팔로우한 사용자들의 소비 피드 목록을 확인할 수 있습니다.
- 소비 피드에선 소비 항목중 대표 항목인 가격, 별점, 태그, 내용, 사진을 확인할 수 있습니다.
- 사용자는 피드 목록에서 바로 좋아요, 북마크를 클릭해 다른 사용자의 소비를 자신의 프로필에 저장할수 있습니다.

<img alt="피드목록" width="30%" src="https://user-images.githubusercontent.com/49143255/244301875-d8534c56-dbea-4c0b-86f0-ed3e3f616ee6.gif"/>

### 5. 소비 게시글 작성

- 하단바의 가운데 + 버튼을 통해 자신의 소비에 대해 상세한 글을 작성할 수 있습니다.
- 태그, 별점, 금액, 위치(네이버 장소 API 연동), 날짜, 링크와 같은 정보를 추가할 수 있고 글/사진의 문단을 드래그하여 조정하여 보다 상세한 게시글을 작성할 수 있습니다.

[게시글 작성 테스트 영상 보기](https://test-video-hosting.s3.ap-northeast-2.amazonaws.com/post.mp4)

<img alt="글작성" width="30%" src="https://user-images.githubusercontent.com/49143255/244361360-bc5c0970-0344-4f2c-bf87-31570be1733c.png"/>

### 3. 마이 프로필 탭 - 소비 리포트 & 소비 지도 2:21-2:27 2:28 - 2:48

- 마이프로필 탭에서 자신이 작성한 소비 피드를 확인 할 수 있습니다.
- 왼쪽 상단 리포트 버튼을 통해 자신의 소비에 대해 분석한 리포트를 받을 수 있습니다.
리포트에서는 원하는 달의 평균 만족도(별점), 평균 소비 금액, 총 게시글와 같은 정보를 확인 할 수 있습니다.
- 왼쪽 상단 지도 버튼을 통해 사용자의 소비 위치가 표시된 지도(구글 지도 API 연동)를 확인 할 수 있습니다.

<div>
<img alt="소비리포트" width="30%" src="https://user-images.githubusercontent.com/49143255/244356241-c2050e6b-042b-46fd-aef3-9468b1eef3c4.gif"/>
<img alt="소비지도" width="30%" src="https://user-images.githubusercontent.com/49143255/244358126-153b4ac4-c013-49ea-9235-296f7079a7ab.gif"/>
</div>

### 4. 검색 탭 - 소비 게시글 추천 & 태그 검색

- 검색 탭에서 추천 친구 목록, 나이대별 인기 태그를 통해 현재 인기있는 소비를 추천받을 수 있습니다.
- 사용자가 입력한 키워드로 검색하거나 서버에 저장된 태그, 계정, 장소를 통해 보다 정확한 검색을 할 수 있습니다.

<img alt="검색" width="30%" src="https://user-images.githubusercontent.com/49143255/244359254-e6542e8b-5ba6-417b-98b7-c0bff61edeb9.gif"/>
