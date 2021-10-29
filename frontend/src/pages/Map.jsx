import {
	MapContainer,
	TileLayer,
	ZoomControl,
	GeoJSON,
	MapConsumer,
} from "react-leaflet";
import * as L from "leaflet";
import geoJsonDistricts from "../data/geojson/krakow-district.json";

import MarkerLayer from "../components/map/MarkerLayer";
import LayerControl, { GroupedLayer } from "../components/map/LayerControl";


/**
 * Map functional component
 * @component
 * @param {boolean} props.mapReset Indicates whether a mapreset is needed
 * @returns  Stuff here </ MapContainer>
 */
function MapPage(props) {
	const bounds = new L.LatLngBounds(
		new L.LatLng(49.975847, 19.793307),
		new L.LatLng(50.126649, 20.1)
	);

	/**
	 * Test function `code snippet`
	 * @category Functions
	 * @subcategory Void Function
	 * @param {geojson.Feature<geojson.Geometry, any>} district 
	 * @param {L.Layer} layer 
	 */
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
			<MapConsumer>
				{(map) => {
					if (props.mapReset) {
						map.flyTo([50.04071458461792, 19.946708679199222], 12, {
							duration: 1,
						});
						console.log("ran");
					}
					return null;
				}}
			</MapConsumer>

			<ZoomControl position="bottomright" />
			<LayerControl>
				<GroupedLayer checked name="OpenStreetMap" group="Base Layers">
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</GroupedLayer>

				<MarkerLayer />

				<GroupedLayer name="Districts" group="Other">
					<GeoJSON data={geoJsonDistricts} onEachFeature={onEachDistrict} />
				</GroupedLayer>
			</LayerControl>
		</MapContainer>
	);
}

export default MapPage;
