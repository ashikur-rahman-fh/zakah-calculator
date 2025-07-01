import { useState, useEffect } from "react";

export const useDataLoader = (
  getDataFn: () => Promise<unknown>,
  defaultValue: unknown
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getDataFn();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getDataFn]);

  const reload = async () => {
    try {
      setIsLoading(true);
      const result = await getDataFn();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoading, data, reload };
};
