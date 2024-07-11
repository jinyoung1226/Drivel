import axios from 'axios';
import {
  singlePointHtml,
  multiPointHtml,
} from '../components/kakaoMapHtmlGenerators';
import config from '../config/config';

export const fetchRoute = async (item, setHtmlContent, center) => {
  let waypoints = [];
  let requestBody = {};

  if (item.waypoints.length === 1) {
    // 경유지가 없는 경우
    const html = singlePointHtml(
      center,
      item.waypoints,
      config.KAKAO_JAVASCRIPT_KEY,
    );
    setHtmlContent(html);
    return;
  } else if (item.waypoints.length === 2) {
    // 출발지와 도착지만 있는 경우
    requestBody = {
      origin: {
        x: item.waypoints[0].longitude,
        y: item.waypoints[0].latitude,
      },
      destination: {
        x: item.waypoints[1].longitude,
        y: item.waypoints[1].latitude,
      },
      priority: 'RECOMMEND',
      car_fuel: 'GASOLINE',
      car_hipass: false,
      alternatives: false,
      road_details: false,
    };
  } else if (item.waypoints.length >= 3) {
    // 경유지가 있는 경우
    waypoints = item.waypoints.slice(1, -1).map(wp => ({
      name: wp.name,
      x: wp.longitude,
      y: wp.latitude,
    }));

    requestBody = {
      origin: {
        x: item.waypoints[0].longitude,
        y: item.waypoints[0].latitude,
      },
      destination: {
        x: item.waypoints[item.waypoints.length - 1].longitude,
        y: item.waypoints[item.waypoints.length - 1].latitude,
      },
      waypoints: waypoints,
      priority: 'RECOMMEND',
      car_fuel: 'GASOLINE',
      car_hipass: false,
      alternatives: false,
      road_details: false,
    };
  }

  try {
    const response = await axios.post(
      'https://apis-navi.kakaomobility.com/v1/waypoints/directions',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${config.KAKAO_RESTAPI_KEY} `,
        },
      },
    );

    const data = response.data;
    console.log(data);
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0].sections.flatMap(section =>
        section.roads.flatMap(road => road.vertexes),
      );
      const formattedRoute = [];
      for (let i = 0; i < route.length; i += 2) {
        formattedRoute.push({x: route[i], y: route[i + 1]});
      }

      const html = multiPointHtml(
        center,
        formattedRoute,
        item.waypoints,
        config.KAKAO_JAVASCRIPT_KEY,
      );
      setHtmlContent(html);
    } else {
      console.error('No route data available');
    }
  } catch (error) {
    console.error('Error fetching route:', error);
  }
};
