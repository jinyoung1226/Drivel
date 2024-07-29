import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import config from '../config/config';

export const useSSE = () => {
  const {accessToken} = useSelector((state) => state.auth);
  const eventSourceRef = useRef(null);

  // sse 연결 함수
  const fetchSSE = useCallback(() => {
    const EventSource = NativeEventSource || EventSourcePolyfill;
    // 새로운 EventSource 연결
      eventSourceRef.current = new EventSource(
        `${config.SERVER_URL}/alert/connect`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    eventSourceRef.current.addEventListener('CONNECT', event => {
      console.log(event);
    });

    eventSourceRef.current.addEventListener('JOIN', event => {
      const data = JSON.parse(event.data);
      console.log(data);
    });

    eventSourceRef.current.addEventListener('error', event => {
      console.error('SSE Error:', event);
      eventSourceRef.current.close();
    });

  }, [accessToken]);

  // 조건에 따라 sse 연결 함수를 실행하도록 fetchSSE 그리고 eventSource 객체를 리턴합니다.
  return { fetchSSE, eventSourceRef };
};