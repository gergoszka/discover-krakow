import axios from "axios";
import * as L from "leaflet";
import { useState } from "react";
import {
	MapContainer,
	Marker,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import LandmarkForm from "../components/landmarks/LandmarkForm";
import { ICONS } from "../components/map/customIcons"

function SubmitPage() {
	let [position, setPosition] = useState([0, 0]);
	let [address, setAddress] = useState("");
	let [type, setType] = useState("poi");

	const bounds = new L.LatLngBounds(
		new L.LatLng(49.975847, 19.793307),
		new L.LatLng(50.126649, 20.1)
	);

	const SubmitMarker = () => { 
		useMapEvents({
			click(e) {
				let pos = [e.latlng.lat, e.latlng.lng];
				setPosition(pos);
				axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${pos[0]} ${pos[1]}&key=${process.env.REACT_APP_GEOCODING_API_KEY}&language=en&pretty=1`)
					.then((res) => {
						let address = ""
						if(res.data?.results[0]) {
							address = res.data.results[0].formatted
							setAddress(address)
						}
					})
			},
		});

		return position ? <Marker position={position} icon={ICONS[type]} interactive={false} /> : null;
	};

	return (
		<div style={{ display: "flex" }}>
			<LandmarkForm position={position} address={address} setMarker={setType}/>
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
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<SubmitMarker />
			</MapContainer>
		</div>
	);
}

export default SubmitPage;
