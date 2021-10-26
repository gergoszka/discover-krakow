import {
	MapContainer,
	TileLayer,
	ZoomControl,
	GeoJSON
} from "react-leaflet";
import * as L from "leaflet";
import geoJsonDistricts from "../data/geojson/krakow-district.json";

import MarkerLayer from "../components/map/MarkerLayer";
import LayerControl, { GroupedLayer } from "../components/map/LayerControl";

function MapPage(props) {
	const bounds = new L.LatLngBounds(
		new L.LatLng(49.975847, 19.793307),
		new L.LatLng(50.126649, 20.1)
	);

	const onEachDistrict = (district, layer) => {
		let districtName = district.properties.name;
		layer.bindPopup(districtName);
	};

	return (
		<MapContainer
			center={[50.00605257971319, 19.996646271232147]}
			zoom={12}
			minZoom={11}
			scrollWheelZoom={true}
			className="map"
			maxBounds={bounds}
			zoomControl={false}
			doubleClickZoom={false}
		>
			<ZoomControl position="bottomright" />
			<LayerControl >

				<GroupedLayer checked name="OpenStreetMap" group="Base Layers">
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						//url="https://api.mapbox.com/styles/v1/gergoszka/ckumszpr707ig18qrhiyufsgv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VyZ29zemthIiwiYSI6ImNrdW1wb3ljMTB2Y2wycW1vdGV3M25rMHQifQ.TfAG6DwnHfLUhnygOXizbA"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</GroupedLayer>

				<GroupedLayer name="Parks" group="Base Layers">
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> conasdtributors'
						url="https://api.mapbox.com/styles/v1/gergoszka/ckunvoked4t3g17nslhspmeg0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VyZ29zemthIiwiYSI6ImNrdW1wb3ljMTB2Y2wycW1vdGV3M25rMHQifQ.TfAG6DwnHfLUhnygOXizbA"
					/>
				</GroupedLayer>

				<MarkerLayer mapReset={props.mapReset} />
				
				<GroupedLayer name="Districts" group="Other">
					<GeoJSON data={geoJsonDistricts} onEachFeature={onEachDistrict} />
				</GroupedLayer>

			</LayerControl>
		</MapContainer>
	);
}

export default MapPage;
