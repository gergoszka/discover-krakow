import {
	MapContainer,
	TileLayer,
	ZoomControl,
	GeoJSON,
	MapConsumer,
	LayersControl,
} from "react-leaflet";
import * as L from "leaflet";
import geoJsonDistricts from "../data/geojson/krakow-district.json";

import MarkerLayer from "../components/map/MarkerLayer";

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
			<ZoomControl position="bottomright" />
			
			<MapConsumer>
				{(map) => {
					if (props.mapReset) {
						map.flyTo([50.04071458461792, 19.946708679199222], 12, {
							duration: 1.2,
						});
					}
					return null;
				}}
			</MapConsumer>

			<LayersControl>
				
				<LayersControl.BaseLayer checked name="OpenStreetMap" >
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="Esri WorldImagery" >
					<TileLayer
							attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
					/>
				</LayersControl.BaseLayer> 

				<MarkerLayer /> 

				<LayersControl.Overlay name="Districts"  id="district">
					<GeoJSON data={geoJsonDistricts} onEachFeature={onEachDistrict} />
				</LayersControl.Overlay>

			</LayersControl>
		</MapContainer>
	);
}

export default MapPage;
