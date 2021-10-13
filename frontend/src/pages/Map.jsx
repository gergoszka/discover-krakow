import {
	MapContainer,
	Marker,
	LayerGroup,
	TileLayer,
	useMapEvents,
	LayersControl,
	ZoomControl,
	MapConsumer,
} from "react-leaflet";
import * as L from "leaflet";
import { useState } from "react";
import { useSelector } from "react-redux";

// prettier-ignore
function MapPage(props) {
	let [lastMarker, setLastMarker] = useState(0);
	const loadedLandmarks = useSelector((state) => state.sights);

	const bounds = new L.LatLngBounds(
		new L.LatLng(49.975847, 19.793307),
		new L.LatLng(50.126649, 20.1)
	);

	function Location() {
		useMapEvents({
			click(e) {
				console.log(e.latlng);
			},
		});

		return null;
	}

	const toogleSidebar = (id) => {
		let sidebar = document.querySelector("#sidebar");
		if (id !== lastMarker || (id === lastMarker && sidebar.hasAttribute("hidden"))) {
			sidebar.removeAttribute("hidden");
		} else {
			sidebar.setAttribute("hidden", "");
		}
	};

	const handleMarkerClick = (sight, map) => {
		let sidebar = document.querySelector("#sidebar");
		toogleSidebar(sight._id);
		setLastMarker(sight._id);

		sidebar.children.namedItem("desc").innerHTML = sight.description;
		sidebar.children.namedItem("title").innerHTML = sight.title;
		sidebar.children.namedItem("image").setAttribute("src", sight.image);

		map.flyTo([sight.position[0], sight.position[1]-0.003], 16); //offset the sidebar when zooming in
	};

	return (
		<MapContainer
			center={[50.00605257971319, 19.996646271232147]}
			zoom={12}
			minZoom={12}
			scrollWheelZoom={true}
			className="map"
			maxBounds={bounds}
			zoomControl={false}
		>
			<ZoomControl position="bottomright" />
			<LayersControl position="topright">
				<LayersControl.BaseLayer checked name="Base">
					<LayerGroup>

						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							//url="https://api.mapbox.com/styles/v1/gergoszka/ckumszpr707ig18qrhiyufsgv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VyZ29zemthIiwiYSI6ImNrdW1wb3ljMTB2Y2wycW1vdGV3M25rMHQifQ.TfAG6DwnHfLUhnygOXizbA"
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

						<MapConsumer>
							{(map) => {
								if (props.mapReset) {
									map.flyTo([50.04071458461792, 19.946708679199222], 12, {
										duration: 1,
									});
								}
								
								return (
									<LayerGroup>
										{loadedLandmarks.map((sight) => (
											<Marker
												key={sight._id}
												position={sight.position}
												eventHandlers={{
													click: () => handleMarkerClick(sight, map)			
												}}
											/>
										))}
									</LayerGroup>
								);

							}}
						</MapConsumer>

					</LayerGroup>
				</LayersControl.BaseLayer>

				<LayersControl.BaseLayer name="Parks">
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> conasdtributors'
						url="https://api.mapbox.com/styles/v1/gergoszka/ckunvoked4t3g17nslhspmeg0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VyZ29zemthIiwiYSI6ImNrdW1wb3ljMTB2Y2wycW1vdGV3M25rMHQifQ.TfAG6DwnHfLUhnygOXizbA"
					/>
				</LayersControl.BaseLayer>
				
			</LayersControl>
		</MapContainer>
	);
}

export default MapPage;
