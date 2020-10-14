import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [index, setIndex] = useState(0);
  const getLocationAgain = () => setIndex((i) => i + 1);

  const getLocation = async (isMounted) => {
    if (!isMounted) return;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setError(true);
      setErrorMessage(
        "We need access to your location to find nearby circles!"
      );
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    getLocation(isMounted);

    return () => (isMounted = false);
  }, [index]);

  return [location, loading, error, getLocationAgain, errorMessage];
};

export default useLocation;
