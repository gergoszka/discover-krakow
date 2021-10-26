import LandmarkList from "../components/landmarks/LandmarkList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* eslint-disable */
//prettier-ignore
function LandmarksPage() {
	const loadedLandmarks = useSelector((state) => state.sights);
	const favoriteLandmarks = useSelector((state) => state.favorites);
	let [landmarks, setLandmarks] = useState([]);

	useEffect(() => {
		let landmarks = sortLandmarkList(loadedLandmarks);
		setLandmarks(landmarks);
	}, [favoriteLandmarks]);

	function sortLandmarkList(all) {
    // filters out non-favorite items
		let nonFav = all
      .filter((item) => !favoriteLandmarks
        .map((landmark) => landmark._id)
        .includes(item._id)
		);

		return favoriteLandmarks.concat(nonFav);
	}

	return (
		<div>
			<LandmarkList landmarks={landmarks}></LandmarkList>
		</div>
	);
}

export default LandmarksPage;
