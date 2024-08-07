export const singlePointHtml = (center, waypoints, key) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body, html, #map {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
            </style>
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services"></script> 
        </head>
        <body>
            <div id="map"></div>
            <script type="text/javascript">
                (function () {
                    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
                    const options = { // 지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(${center.lat}, ${
    center.lng
  }), // 지도의 중심좌표.
                    };
                    
                    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 

                    const waypoints = ${JSON.stringify(waypoints)};
                    const imageSrc = 'https://drivel-icon.s3.ap-northeast-2.amazonaws.com/pin.svg'; // 기본 마커 이미지
                    const imageSize = new kakao.maps.Size(24, 36); // 마커 이미지 크기
                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 설정

                    waypoints.forEach((wp, index) => {
                        const marker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(wp.latitude, wp.longitude),
                            image: markerImage, // 마커 이미지 설정
                            map: map
                        });
                    });

                    // Auto-pan to include all waypoints
                    const bounds = new kakao.maps.LatLngBounds();
                    waypoints.forEach(wp => bounds.extend(new kakao.maps.LatLng(wp.latitude, wp.longitude)));
                    map.setBounds(bounds);
                    
                    // Set the desired zoom level after setting bounds
                })();
            </script>          
        </body>
        </html>`;
};

export const noneMultiPointHtml = (center, waypoints, key) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body, html, #map {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
            </style>
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services"></script> 
        </head>
        <body>
            <div id="map"></div>
            <script type="text/javascript">
                (function () {
                    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
                    const options = { // 지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(${center.lat}, ${
    center.lng
  }), // 지도의 중심좌표.
                    };
                    
                    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 

                    const waypoints = ${JSON.stringify(waypoints)};
                    const imageSrc = 'https://drivel-icon.s3.ap-northeast-2.amazonaws.com/pin.svg'; // 기본 마커 이미지
                    const imageSize = new kakao.maps.Size(12, 20); // 마커 이미지 크기
                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 설정

                    waypoints.forEach((wp, index) => {
                        const marker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(wp.latitude, wp.longitude),
                            image: markerImage, // 마커 이미지 설정
                            map: map
                        });
                    });

                    // Auto-pan to include all waypoints
                    const bounds = new kakao.maps.LatLngBounds();
                    waypoints.forEach(wp => bounds.extend(new kakao.maps.LatLng(wp.latitude, wp.longitude)));
                    map.setBounds(bounds);
                    
                    // Set the desired zoom level after setting bounds
                })();
            </script>          
        </body>
        </html>`;
};

export const multiPointHtml = (center, route, waypoints, key) => {
  return `
          <!DOCTYPE html>
          <html>
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                body, html, #map {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                }
              </style>
              <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services"></script> 
          </head>
          <body>
              <div id="map"></div>
              <script type="text/javascript">
                  (function () {
                      const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
                      const options = { // 지도를 생성할 때 필요한 기본 옵션
                          center: new kakao.maps.LatLng(${center.lat}, ${
    center.lng
  }), // 지도의 중심좌표.
                      };
                      
                      const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

                      const route = ${JSON.stringify(route)};
                      const linePath = route.map(point => new kakao.maps.LatLng(point.y, point.x));

                      // 경로를 그릴 Polyline 객체 생성
                      const polyline = new kakao.maps.Polyline({
                          path: linePath,
                          strokeWeight: 4,
                          strokeColor: '#5168F6',
                          strokeOpacity: 1,
                          strokeStyle: 'solid'
                      });
                      
                      // 지도에 Polyline 표시
                      polyline.setMap(map);

                      // 경로의 각 지점에 마커 표시
                      const waypoints = ${JSON.stringify(waypoints)};
                      const imageSrc = 'https://drivel-icon.s3.ap-northeast-2.amazonaws.com/pin.svg'; // 기본 마커 이미지
                      const imageSize = new kakao.maps.Size(12, 20); // 마커 이미지 크기
                      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 설정
                      waypoints.forEach((wp, index) => {
                          const marker = new kakao.maps.Marker({
                              position: new kakao.maps.LatLng(wp.latitude, wp.longitude),
                              image: markerImage, // 마커 이미지 설정
                              map: map
                          });
                      });

                      // Auto-pan to include all waypoints
                      const bounds = new kakao.maps.LatLngBounds();
                      waypoints.forEach(wp => bounds.extend(new kakao.maps.LatLng(wp.latitude, wp.longitude)));
                      map.setBounds(bounds);

                  })();
              </script>       
          </body>
          </html>`;
};

export const restaurantPointHtml = (center, key) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body, html, #map {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
            </style>
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services"></script> 
        </head>
        <body>
            <div id="map"></div>
            <script type="text/javascript">
                (function () {
                    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
                    const options = { // 지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(${center.lat}, ${center.lng}), // 지도의 중심좌표.
                        level: 3 // 지도의 확대 레벨
                    };
                    
                    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 

                    const imageSrc = 'https://drivel-icon.s3.ap-northeast-2.amazonaws.com/pin.svg'; // 기본 마커 이미지
                    const imageSize = new kakao.maps.Size(24, 36); // 마커 이미지 크기
                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 설정

                    const marker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(${center.lat}, ${center.lng}),
                        image: markerImage, // 마커 이미지 설정
                        map: map // 마커가 지도 위에 표시되도록 설정
                    });
                })();
            </script>          
        </body>
        </html>`;
};
