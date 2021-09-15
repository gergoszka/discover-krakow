import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";
import FavoritesContext from "../../store/favorites-context";
import { useContext } from "react";

function MainHeader() {
  const favoriteCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="">Discover Krakow</Link>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/landmarks">Sights</Link>
          </li>
          <li>
            <Link to="/favorites">My Favorites <span className="total_fav">{favoriteCtx.totalFavorites}</span></Link>
          </li>
          <li>
            <Link to="/submit">Submit Content</Link>
          </li>
         {/*  <li>
            <Link to="">Food & Drinks</Link>
          </li>
          <li>
            <Link to="">Events</Link>
          </li>
          <li>
            <Link to="">For Erasmus Students</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
