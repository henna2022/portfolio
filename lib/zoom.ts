// 데스크톱은 페이지 전체에 zoom 을 건다(globals.css 의 --page-zoom).
// zoom 안에서 getBoundingClientRect·clientX 는 줄어든 화면 값이고 offsetHeight·getComputedStyle 의 px 는 원래 값이라,
// 둘을 섞어 계산하는 곳은 이 값으로 단위를 맞춘다.
export const pageZoom = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--page-zoom")) || 1;
