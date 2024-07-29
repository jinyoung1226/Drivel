
import React, { useEffect} from "react"; 
import { useSelector } from "react-redux";
import { useSSE } from "../hooks/useSSE";
const SSE = () => {
  const { fetchSSE, eventSourceRef } = useSSE();
  const {isAuthenticated} = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchSSE();
    };

    if (!isAuthenticated && eventSourceRef.current) {
      console.log('close SSE')
      eventSourceRef.current.close();
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [eventSourceRef, isAuthenticated]);

  return (
    <></>
  )
}

export default SSE;