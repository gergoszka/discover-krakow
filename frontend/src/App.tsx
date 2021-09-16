import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MapPage from "./pages/Map";
import LandmarksPage from "./pages/Landmarks";
import SubmitPage from "./pages/SubmitContent";
import FavoritesPage from "./pages/Favorites";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <MapPage />
        </Route>

        <Route path="/landmarks" exact>
          <LandmarksPage />
        </Route>

        <Route path="/favorites" exact>
          <FavoritesPage />
        </Route>

        <Route path="/submit" exact>
          <SubmitPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
