import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { useSelector } from "react-redux";

function MainHeader() {
  const totalFavorites = useSelector((state) => state.favorites.length)

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
            <Link to="/favorites">My Favorites <span className="total_fav">{totalFavorites}</span></Link>
          </li>
          <li>
            <Link to="/submit">Submit Content</Link>
          </li>
        </ul> 
      </nav>
    </header>
  );
}

export default MainHeader;
