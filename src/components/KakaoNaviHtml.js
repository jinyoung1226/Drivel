import config from '../config/config';

export const kakaoNavi = ({
  name0,
  name1,
  name2,
  name3,
  x0,
  x1,
  x2,
  x3,
  y0,
  y1,
  y2,
  y3,
}) => {
  // 경유지 데이터를 배열로 저장
  const viaPoints = [];

  if (name0) viaPoints.push({name: name0, x: x0, y: y0});
  if (name1) viaPoints.push({name: name1, x: x1, y: y1});
  if (name2) viaPoints.push({name: name2, x: x2, y: y2});

  // viaPoints 배열을 문자열로 변환
  const viaPointsString = viaPoints
    .map(via => `{name: '${via.name}', x: ${via.x}, y: ${via.y}}`)
    .join(',');

  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>카카오 네비게이션</title>
      <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4" crossorigin="anonymous"></script>
      <script>
        Kakao.init('${config.KAKAO_NAVI_KEY}');  // 사용하려는 앱의 JavaScript 키 입력
        function startNavigation() {
          Kakao.Navi.start({
            name: '${name3}',
            x: ${x3},
            y: ${y3},
            coordType: 'wgs84',
            viaPoints: [${viaPointsString}], // 동적으로 생성된 viaPoints 사용
          });
        }
      </script>
    </head>
    <body onload="startNavigation()">
    </body>
    </html>
  `;
};
