import LandmarkList from "../components/landmarks/LandmarkList";
import { useEffect, useState } from "react";
import axios from "axios";

// Demo of mapping array of objects to JSX items
function LandmarksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedLandmarks, setLoadedLandmarks] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4040/landmarks")
    .then((response)=>{
      setIsLoading(false);
      setLoadedLandmarks(response.data)
    })
  }, [])

  if(isLoading) {
    return <section>
      Loading...
    </section>
  }

  return (
    <div className="sights-container">
      <LandmarkList landmarks={loadedLandmarks}></LandmarkList>
    </div>
  );
}

export default LandmarksPage;
