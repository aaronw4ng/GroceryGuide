import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import _ from "lodash";
/* eslint-disable */

export function useRequest(req, memo = []) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(0);
  const forceFetch = () => setUpdateIndex((i) => i + 1);

  const fetchUrl = async (isMounted) => {
    if (isMounted) {
      setLoading(true);
      const response = await req().catch((e) => {
        setErrorMessage(e);
        setError(true);
      });
      setData(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchUrl(isMounted);

    return () => {
      isMounted = false;
    };
  }, [updateIndex, ..._.flatten(memo)]);

  return [
    data,
    loading ? () => <Text>LOADING</Text> : undefined,
    error,
    forceFetch,
    errorMessage,
  ];
}

export function useRequestWithCallback(req, callback, deps) {
  const [response, Loading, error, refetch] = useRequest(req, deps);
  useEffect(() => {
    if (!response) return;
    callback(response);
  }, [response]);

  return [
    response,
    Loading ? () => <Text>LOADING</Text> : undefined,
    error,
    refetch,
  ];
}
export default useRequest;
