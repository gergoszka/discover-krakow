import LandmarkList from "../components/landmarks/LandmarkList";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import FavoritesContext from "../store/favorites-context";
import { Landmark } from "../Interfaces";

/* eslint-disable*/
// Demo of mapping array of objects fom the server to JSX items
function LandmarksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedLandmarks, setLoadedLandmarks] = useState<Array<Landmark>>([]);
  const favoriteCtx = useContext(FavoritesContext)

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:4040/landmarks").then((response: any) => {
      let landmarks = sortLandmarkList(response.data)
      setLoadedLandmarks(landmarks)
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("first");
    
    let landmarks = sortLandmarkList(loadedLandmarks)
    console.log(landmarks);
    
    setLoadedLandmarks(landmarks);
  }, [favoriteCtx]);

  function sortLandmarkList(all:Array<Landmark>) {
    let nonFav = all.filter(item => !favoriteCtx.favorites.map(landmark => landmark._id).includes(item._id))
    let sorted = favoriteCtx.favorites.concat(nonFav)

    return sorted;
  }

  if (isLoading) {
    return <section>Loading...</section>;
  }
 
  return (
    <div>
      <LandmarkList landmarks={loadedLandmarks}></LandmarkList>
    </div>
  );
}

export default LandmarksPage;
