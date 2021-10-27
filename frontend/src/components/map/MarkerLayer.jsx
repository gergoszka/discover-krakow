import { useState } from "react";
import { LayerGroup, MapConsumer, Marker } from "react-leaflet";
import { useSelector } from "react-redux";
import { GroupedLayer } from "./LayerControl";
import L from "leaflet"

function MarkerLayer(props) {
	const [lastMarker, setLastMarker] = useState(0);

	const loadedLandmarks = useSelector((state) => state.sights);

  /*
    Constants for custom icons
    TODO: Move to an another file
  */
  const GROUPNAMES = {
    poi : "Point of Interest",
    park: "Park",
    free_time: "Free Time",
    restaurant: "Restaurant or Cafe",
    museum: "Museum",
    other: "Other"
  }

  let defaultOptions = {
    iconSize:    [35, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
  }
  const ICONS = {
    poi: new L.Icon({ iconUrl: './markers/poi.png', ...defaultOptions}),
    park: new L.Icon({ iconUrl: './markers/park.png', ...defaultOptions }),
    free_time: new L.Icon({ iconUrl: './markers/free_time.png', ...defaultOptions }),
    restaurant: new L.Icon({ iconUrl: './markers/restaurant.png', ...defaultOptions}),
    museum: new L.Icon({ iconUrl: './markers/museum.png', ...defaultOptions}),
    other: new L.Icon({ iconUrl: './markers/other.png', ...defaultOptions}),
  }

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
					if (props.mapReset) {
						map.flyTo([50.04071458461792, 19.946708679199222], 12, {
							duration: 1,
						});
					}

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
