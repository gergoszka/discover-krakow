import { useState } from "react";
import { LayerGroup, MapConsumer, Marker } from "react-leaflet";
import { useSelector } from "react-redux";
import { GroupedLayer } from "./LayerControl";
import { GROUPNAMES, ICONS } from "./customIcons"

function MarkerLayer(props) {
	const [lastMarker, setLastMarker] = useState(0);
	const loadedLandmarks = useSelector((state) => state.sights);

	//prettier-ignore
	const toogleSidebar = (id) => {
		let sidebar = document.querySelector("#sidebar");
		if (id !== lastMarker || (id === lastMarker && sidebar.hasAttribute("hidden"))) {
			sidebar.removeAttribute("hidden");
		} else {
			sidebar.setAttribute("hidden", "");
		}
	};
	//prettier-ignore
	const handleMarkerClick = (sight, map) => {
		let sidebar = document.querySelector("#sidebar");
		toogleSidebar(sight._id);
		setLastMarker(sight._id);
    console.log(sight.type)

		sidebar.children.namedItem("desc").innerHTML = sight.description;
		sidebar.children.namedItem("title").innerHTML = sight.title;
		sidebar.children.namedItem("image").setAttribute("src", sight.image);

		map.flyTo([sight.position[0], sight.position[1]-0.003], 16); //offset the sidebar when zooming in
	};

	let groupedLandmarks = loadedLandmarks.reduce((obj, sight) => {
		let type = sight.type;

		if (!obj.hasOwnProperty(type)) {
			obj[type] = [];
		}
		obj[type].push(sight);

		return obj;
	},{});

	return (
		<LayerGroup>
			<MapConsumer>
				{(map) => {
					return (
						<LayerGroup>
							{Object.keys(groupedLandmarks).map((keyName, i) => (
								<GroupedLayer key={i} checked name={GROUPNAMES[keyName]} group="Markers">
									<LayerGroup>
										{groupedLandmarks[keyName].map((sight) => (
											<Marker
                        icon={ICONS[keyName]}
												key={sight._id}
												position={sight.position}
												eventHandlers={{
													click: () => handleMarkerClick(sight, map),
												}}
											/>
										))}
									</LayerGroup>
								</GroupedLayer>
							))}
						</LayerGroup>
					);
				}}
			</MapConsumer>
		</LayerGroup>
	);
}

export default MarkerLayer;
