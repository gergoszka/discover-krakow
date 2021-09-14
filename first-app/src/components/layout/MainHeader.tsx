import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";
function MainHeader() {
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
