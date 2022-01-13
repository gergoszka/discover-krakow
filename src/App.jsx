/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MapPage from "./pages/Map";
import LandmarksPage from "./pages/Landmarks";
import SubmitPage from "./pages/SubmitContent";
import FavoritesPage from "./pages/Favorites";
import Sidebar from "./components/sidebar/Sidebar"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSights } from "./store/reducers/sightSlice";

function App() {
	const loadedLandmarks = useSelector((state) => state.sights)
  const dispatch = useDispatch()
	let [mapReset, setMapReset] = useState(false)

  function ObjectComparison(objOne, objTwo) {
    return JSON.stringify(objOne) === JSON.stringify(objTwo);
  }

	function handleMapReset(){
		let sidebar = document.querySelector("#sidebar");
		sidebar.setAttribute("hidden", "")
		setMapReset(true)
		setTimeout(() => {
			setMapReset(false)
		}, 500);
	}

  useEffect(() => {
    axios.get("https://discover-krakow.herokuapp.com/landmarks").then((response) => {
      let landmarks = response.data
      if(!ObjectComparison(landmarks, loadedLandmarks)){
        dispatch(getSights(landmarks))
      }
    });
  }, []);

	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<div className={"container"}>
						<MapPage mapReset={mapReset} />
						<Sidebar handleMapReset={handleMapReset} />
					</div>
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
