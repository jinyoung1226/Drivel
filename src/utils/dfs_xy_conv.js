// 지구 반경 및 기타 상수 정의
const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 투영 위도1(degree)
const SLAT2 = 60.0; // 투영 위도2(degree)
const OLON = 126.0; // 기준점 경도(degree)
const OLAT = 38.0; // 기준점 위도(degree)
const XO = 43; // 기준점 X좌표(GRID)
const YO = 136; // 기준점 Y좌표(GRID)

// 위경도 <-> 격자 좌표 변환 함수
const dfs_xy_conv = (code, v1, v2) => {
  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  console.log(code, v1, v2);

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  const sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sn_log = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sf_pow = (Math.pow(sf, sn_log) * Math.cos(slat1)) / sn_log;
  const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  const ro_final = (re * sf_pow) / Math.pow(ro, sn_log);

  const rs = {};
  if (code === 'toXY') {
    const ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    const ra_final = (re * sf_pow) / Math.pow(ra, sn_log);
    let theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn_log;
    rs['x'] = Math.floor(ra_final * Math.sin(theta) + XO + 0.5);
    rs['y'] = Math.floor(ro_final - ra_final * Math.cos(theta) + YO + 0.5);
    rs['lat'] = v1;
    rs['lng'] = v2;
    console.log(rs);
  } else {
    const xn = v1 - XO;
    const yn = ro_final - v2 + YO;
    const ra = Math.sqrt(xn * xn + yn * yn);
    let alat = Math.pow((re * sf_pow) / ra, 1.0 / sn_log);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    let theta;
    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else if (Math.abs(yn) <= 0.0) {
      theta = Math.PI * 0.5;
      if (xn < 0.0) -theta;
    } else {
      theta = Math.atan2(xn, yn);
    }

    const alon = theta / sn_log + olon;
    rs['lat'] = alat * RADDEG;
    rs['lng'] = alon * RADDEG;
    rs['x'] = v1;
    rs['y'] = v2;
  }
  return rs;
};

export default dfs_xy_conv;
