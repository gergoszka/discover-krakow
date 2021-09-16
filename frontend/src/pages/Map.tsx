import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from "leaflet";

function MapPage() {
  var greenIcon = L.icon({
    iconUrl: "markers/leaf-green.png",
    shadowUrl: "markers/leaf-shadow.png",

    iconSize: [30, 70], // size of the icon
    shadowSize: [40, 50], // size of the shadow
    iconAnchor: [20, 80], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  
  return (
    <MapContainer
      center={[50.061, 19.939]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "90vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[50.061, 19.939]} icon={greenIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapPage;
