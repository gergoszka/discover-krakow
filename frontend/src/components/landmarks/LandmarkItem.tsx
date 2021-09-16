import { useContext } from "react";
import Card from "../ui/Card";
import { Landmark } from "../../Interfaces";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import FavoritesContext from "../../store/favorites-context";
const classes = require("../ui/Card.module.css");

function LandMarkItem(props: any) {
  let landmark: Landmark = props.landmark;
  let id = landmark._id;

  const favoriteCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoriteCtx.itemIsFavorite(id);

  function toggleFavoriteHandler() {
    if (itemIsFavorite) {
      favoriteCtx.removeFavorite(id);
    } else {
      favoriteCtx.addFavorite(landmark);
    }
  }

  return (
    <li style={{ width: "fit-content" }}>
      <Card>
        <img
          src={landmark.image}
          alt={landmark.title}
          height="200px"
          width="300px"
        />
        <h3>
          {landmark.title}
          {itemIsFavorite ? (
            <span
              className={`${classes.star_filled} ${classes.star}`}
              onClick={toggleFavoriteHandler}
            >
              <RiStarFill />
            </span>
          ) : (
            <span className={classes.star} onClick={toggleFavoriteHandler}>
              <RiStarLine />
            </span>
          )}
        </h3>
      </Card>
    </li>
  );
}

export default LandMarkItem;
