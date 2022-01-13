import { useSelector } from "react-redux";
import LandmarkList from "../components/landmarks/LandmarkList";

function FavoritesPage() {
  const favoriteLandmarks = useSelector((state) => state.favorites)
  
  return (
    <div>
      <LandmarkList landmarks={favoriteLandmarks}/>
    </div>
  );
} 
 
export default FavoritesPage;