import { createContext, useState } from "react";
import { Landmark } from "../Interfaces";

type favoriteType = {
  favorites: Array<Landmark>;
  totalFavorites: number;
  addFavorite: (favoriteLandmark: Landmark) => void;
  removeFavorite: (landmarkId: string) => void;
  itemIsFavorite: (landmarkId: string) => boolean;
};

const FavoritesContext = createContext<favoriteType>({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteLandmark: Landmark) => {},
  removeFavorite: (landmarkId: string) => {},
  itemIsFavorite: (landmarkId: string) => false
});

export function FavoritesContextProvider(props: any) {
  const [userFavorites, setUserFavorites] = useState<Array<Landmark>>([]);

  function addFavoriteHandler(favoriteLandmark: Landmark):void {
    
    // Makes sure that we are working with the current state snapshot
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteLandmark);
    });
  }

  function removeFavoriteHandler(landmarkId: string) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter(landmark => landmark._id !== landmarkId
      );
    });
  }

  function itemIsFavoriteHandler(landmarkId: string) {
    return userFavorites.some(landmark => landmark._id === landmarkId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;