import { useState, useEffect, DependencyList } from "react";

export const useStartRender = (deps: DependencyList = []) => {
  const [startRender, setStartRender] = useState(false);
  useEffect(() => {
    if (document?.documentElement?.style?.fontSize) {
      setStartRender(true);
    }
  }, deps);

  return startRender;
};
