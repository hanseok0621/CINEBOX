# 🎬 CineBox — 지금, 영화의 세계로!

**CineBox**는 최신 영화 정보를 한눈에 확인할 수 있는 직관적이고 감각적인 영화 정보 웹앱입니다.  
현재 상영작부터 개봉 예정작, 높은 평점의 명작까지, 지금 바로 탐험해보세요!
>[CINEBOX](https://hanseok0621.github.io/CINEBOX/)

## 🛠 개발 기간
- 2025년 4월 / 총 1주일

## 🧑개발 인원
- 1명

## 🛠 사용 기술

- `HTML` + `CSS` + `JavaScript`
- `jQuery` for Ajax & 이벤트 처리
- [TMDB API](https://www.themoviedb.org/documentation/api)로 데이터 제공

## 🖼️ 스크린샷
![image](https://github.com/user-attachments/assets/25636b2e-9082-4a37-b1a9-5df70746ca92)
![image](https://github.com/user-attachments/assets/202bac6c-381c-4308-9276-a46bbf552265)


## 🖼 인터페이스 구성

- 🎬 **카테고리 버튼**: 원하는 장르의 영화 리스트로 즉시 이동  
- 🔎 **검색 창**: 제목을 입력해 원하는 영화 검색  
- 🎥 **영화 카드**: 포스터, 제목, 개봉일, 평점 등 핵심 정보 표시  
- 📑 **모달 팝업**: 상세 설명과 감독, 배우 리스트  
- ⏪⏩ **페이지 이동**: 좌우 버튼 및 페이지 번호로 빠른 탐색  

## 🌟 주요 기능

| 기능 | 설명 |
|------|------|
| 🎞 카테고리별 영화 조회 | 현재 상영작 / 개봉 예정작 / 평점 높은 작품으로 분류하여 확인 가능 |
| 🔍 영화 검색 | 제목으로 빠르게 원하는 영화 검색 |
| 🧾 상세 정보 모달 | 감독, 출연진, 줄거리까지 한 번에 확인 |
| 📄 페이지네이션 | 5개 단위의 깔끔한 페이지 구성 |

## 📁 프로젝트 구조

```
cinebox/
├── index.html        // 메인 HTML
├── style.css         // 스타일 정의
├── script.js         // 주요 기능 스크립트
└── config.js         // TMDB API Key
```

## 🧩 핵심 코드 스니펫

### 🔸 영화 정보 불러오기

```javascript
function fetchMovies(category, page = 1) {
  const url = isSearchMode 
    ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`
    : `https://api.themoviedb.org/3/movie/${category}`;
  
  $.ajax({ url, method: 'GET', success: renderMovies });
}
```

### 🔸 영화 상세 정보 모달

```javascript
function fetchMovieDetail(id) {
  const detailUrl = `https://api.themoviedb.org/3/movie/${id}`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits`;

  $.when($.get(detailUrl), $.get(creditsUrl)).done(function(detail, credits) {
    // 감독, 배우 정보 포함한 모달 생성
  });
}
```
