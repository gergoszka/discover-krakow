import * as L from "leaflet";
import { useState } from "react";
import {
	MapContainer,
	Marker,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import LandmarkForm from "../components/landmarks/LandmarkForm";

function SubmitPage() {
	let [position, setPosition] = useState([0, 0]);

	const bounds = new L.LatLngBounds(
		new L.LatLng(49.975847, 19.793307),
		new L.LatLng(50.126649, 20.1)
	);

	const SubmitMarker = () => {
		useMapEvents({
			click(e) {
				let pos = [e.latlng.lat, e.latlng.lng];
				setPosition(pos);
			},
		});

		return position ? <Marker position={position} interactive={false} /> : null;
	};


	return (
		<div style={{ display: "flex" }}>
			<LandmarkForm position={position}/>
			<MapContainer
				center={[50.00605257971319, 19.996646271232147]}
				zoom={12}
				minZoom={12}
				scrollWheelZoom={true}
				className="map"
				id="submitMap"
				maxBounds={bounds}
				zoomControl={false}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					//url="https://api.mapbox.com/styles/v1/gergoszka/ckumszpr707ig18qrhiyufsgv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VyZ29zemthIiwiYSI6ImNrdW1wb3ljMTB2Y2wycW1vdGV3M25rMHQifQ.TfAG6DwnHfLUhnygOXizbA"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<SubmitMarker />
			</MapContainer>
		</div>
	);
}

export default SubmitPage;
