import {useContext} from "react"
import LandmarkList from "../components/landmarks/LandmarkList";
import FavoritesContext from "../store/favorites-context";

function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);
  
  return (
    <div >
      <LandmarkList landmarks={favoriteCtx.favorites}/>
    </div>
  );
}
 
export default FavoritesPage;