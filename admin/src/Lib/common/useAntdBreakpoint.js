import { useState, useEffect } from 'react';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';

// { xs sm md lg xl }
export default () => {
  const [breakpoint, setBreakpoint] = useState({});
  useEffect(() => {
    const token = responsiveObserve.subscribe(v => {
      setBreakpoint(v);
    });

    return () => {
      responsiveObserve.unsubscribe(token);
    };
  }, []);

  return breakpoint;
};
