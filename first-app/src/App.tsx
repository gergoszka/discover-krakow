import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MapPage from "./pages/Map";
import LandmarksPage from "./pages/Landmarks";
import SubmitPage from "./pages/SubmitContent";

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

        <Route path="/submit" exact>
          <SubmitPage />
        </Route>
        
      </Switch>
    </Layout>
  );
}

export default App;
