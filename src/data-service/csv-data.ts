import { useLayoutEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

export const getTableData = () => {
  const { readString } = usePapaParse();
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState<any>([]);
  const [errors, setErrors] = useState<string[]>();

  useLayoutEffect(() => {
    const fetchData = async () => {
      const csv = await fetch("/FMSCA_records.csv").then((res) => res.text());
      setIsLoading(true);
      readString(csv, {
        delimiter: ",",
        worker: true,
        header: true,
        complete: (results) => {
          setIsLoading(false);
          if (results.errors.length > 0) {
            setErrors(results.errors.map((errorObj) => errorObj.message));
          } else {
            setParsedData(results.data);
          }
        },
      });
    };

    fetchData();
  }, []);

  return { isLoading, parsedData, errors };
};
