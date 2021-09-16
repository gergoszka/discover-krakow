import LandmarkList from "../components/landmarks/LandmarkList";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import FavoritesContext from "../store/favorites-context";
import { Landmark } from "../Interfaces";

/* eslint-disable*/
// Demo of mapping array of objects fom the server to JSX items
function LandmarksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedLandmarks, setLoadedLandmarks] = useState<Array<Landmark>>([]);
  const favoriteCtx = useContext(FavoritesContext);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:4040/landmarks").then((response: AxiosResponse<Array<Landmark>>) => {
      let landmarks = sortLandmarkList(response.data);
      setLoadedLandmarks(landmarks);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let landmarks = sortLandmarkList(loadedLandmarks);
    setLoadedLandmarks(landmarks);
  }, [favoriteCtx]);

  function sortLandmarkList(all: Array<Landmark>) {
    let nonFav = all.filter(
      (item) =>
        !favoriteCtx.favorites
          .map((landmark) => landmark._id)
          .includes(item._id)
    );

    return favoriteCtx.favorites.concat(nonFav);
  }

  if (isLoading) {
    return <section></section>;
  }

  return (
    <div>
      <LandmarkList landmarks={loadedLandmarks}></LandmarkList>
    </div>
  );
}

export default LandmarksPage;
