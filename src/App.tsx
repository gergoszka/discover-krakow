import { Route, Switch } from "react-router-dom";
import MainHeader from "./components/layout/MainHeader";
import Home from "./pages/Home";
import Sights from "./pages/Sights";

function App() {
  return (
    <div>
      <MainHeader/>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/sights" exact>
          <Sights />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
