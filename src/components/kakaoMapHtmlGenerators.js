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
                        level: 9 // 지도의 레벨(확대, 축소 정도)
                    };
                    
                    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 

                    const waypoints = ${JSON.stringify(waypoints)};
                    const imageSize = new kakao.maps.Size(24, 24); // 마커 이미지 크기
                    waypoints.forEach((wp, index) => {
                        const marker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(wp.latitude, wp.longitude),
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
                          level: 5 // 지도의 레벨(확대, 축소 정도)
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
                      waypoints.forEach((wp, index) => {
                          const marker = new kakao.maps.Marker({
                              position: new kakao.maps.LatLng(wp.latitude, wp.longitude),
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

export const categoryHtml = (center, key) => {
  return `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>카테고리별 장소 검색하기</title>
    <style>
.map_wrap, .map_wrap * {margin:0; padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap {position:relative;width:100%;height:600px;}
#category {position:absolute;top:10px;left:10px;border-radius: 5px; border:1px solid #909090;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);background: #fff;overflow: hidden;z-index: 2;}
#category li {float:left;list-style: none;width:50px;border-right:1px solid #acacac;padding:6px 0;text-align: center; cursor: pointer;}
#category li.on {background: #eee;}
#category li:hover {background: #ffe6e6;border-left:1px solid #acacac;margin-left: -1px;}
#category li:last-child{margin-right:0;border-right:0;}
#category li span {display: block;margin:0 auto 3px;width:27px;height: 28px;}
#category li .category_bg {background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png) no-repeat;}
#category li .bank {background-position: -10px 0;}
#category li .mart {background-position: -10px -36px;}
#category li .pharmacy {background-position: -10px -72px;}
#category li .oil {background-position: -10px -108px;}
#category li .cafe {background-position: -10px -144px;}
#category li .store {background-position: -10px -180px;}
#category li.on .category_bg {background-position-x:-46px;}
.placeinfo_wrap {position:absolute;bottom:28px;left:-150px;width:300px;}
.placeinfo {position:relative;width:100%;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;padding-bottom: 10px;background: #fff;}
.placeinfo:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
.placeinfo_wrap .after {content:'';position:relative;margin-left:-12px;left:50%;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.placeinfo a, .placeinfo a:hover, .placeinfo a:active{color:#fff;text-decoration: none;}
.placeinfo a, .placeinfo span {display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.placeinfo span {margin:5px 5px 0 5px;cursor: default;font-size:13px;}
.placeinfo .title {font-weight: bold; font-size:14px;border-radius: 6px 6px 0 0;margin: -1px -1px 0 -1px;padding:10px; color: #fff;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
.placeinfo .tel {color:#0f7833;}
.placeinfo .jibun {color:#999;font-size:11px;margin-top:0;}
</style>
</head>
<body>
<div class="map_wrap">
    <div id="map" style="width:100%;height: 100%;position:relative;overflow:hidden;"></div>
    <ul id="category">
        <li id="BK9" data-order="0"> 
            <span class="category_bg bank"></span>
            은행
        </li>       
        <li id="MT1" data-order="1"> 
            <span class="category_bg mart"></span>
            마트
        </li>  
        <li id="PM9" data-order="2"> 
            <span class="category_bg pharmacy"></span>
            약국
        </li>  
        <li id="OL7" data-order="3"> 
            <span class="category_bg oil"></span>
            주유소
        </li>  
        <li id="CE7" data-order="4"> 
            <span class="category_bg cafe"></span>
            카페
        </li>  
        <li id="CS2" data-order="5"> 
            <span class="category_bg store"></span>
            편의점
        </li>      
    </ul>
</div>

<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services"></script>
<script>

var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
    contentNode = document.createElement('div'), 
    markers = [], 
    currCategory = ''; 

var mapContainer = document.getElementById('map'), 
    mapOption = {
        center: new kakao.maps.LatLng(${center.lat}, ${center.lng}), 
        level: 8 
    };  

var map = new kakao.maps.Map(mapContainer, mapOption); 


var ps = new kakao.maps.services.Places(map); 

kakao.maps.event.addListener(map, 'idle', searchPlaces);

contentNode.className = 'placeinfo_wrap';

addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

placeOverlay.setContent(contentNode);  

addCategoryClickEvent();

function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
        target.addEventListener(type, callback);
    } else {
        target.attachEvent('on' + type, callback);
    }
}

function searchPlaces() {
    if (!currCategory) {
        return;
    }
    
    placeOverlay.setMap(null);

    removeMarker();
    
    ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        postMessageToReactNative('No results found');
    } else if (status === kakao.maps.services.Status.ERROR) {
        postMessageToReactNative('Error occurred');
    }
}

function displayPlaces(places) {
    var order = document.getElementById(currCategory).getAttribute('data-order');

    for ( var i=0; i<places.length; i++ ) {
        var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        (function(marker, place) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayPlaceInfo(place);
            });
        })(marker, places[i]);
    }
}

function addMarker(position, order) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', 
        imageSize = new kakao.maps.Size(27, 28),  
        imgOptions =  {
            spriteSize : new kakao.maps.Size(72, 208), 
            spriteOrigin : new kakao.maps.Point(46, (order*36)), 
            offset: new kakao.maps.Point(11, 28) 
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, 
            image: markerImage 
        });

    marker.setMap(map); 
    markers.push(marker);  

    return marker;
}

function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

function displayPlaceInfo (place) {
    var content = '<div class="placeinfo">' +
                    '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

    if (place.road_address_name) {
        content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                    '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    }  else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }                
   
    content += '    <span class="tel">' + place.phone + '</span>' + 
                '</div>' + 
                '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);  
}

function addCategoryClickEvent() {
    var category = document.getElementById('category'),
        children = category.children;

    for (var i=0; i<children.length; i++) {
        children[i].onclick = onClickCategory;
    }
}

function onClickCategory() {
    var id = this.id,
        className = this.className;

    placeOverlay.setMap(null);

    if (className === 'on') {
        currCategory = '';
        changeCategoryClass();
        removeMarker();
    } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlaces();
    }
}

function changeCategoryClass(el) {
    var category = document.getElementById('category'),
        children = category.children,
        i;

    for ( i=0; i<children.length; i++ ) {
        children[i].className = '';
    }

    if (el) {
        el.className = 'on';
    } 
} 
</script>
</body>
</html>`;
};
