import L from "leaflet"

export const GROUPNAMES = {
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
export const ICONS = {
  poi: new L.Icon({ iconUrl: './markers/poi.png', ...defaultOptions}),
  park: new L.Icon({ iconUrl: './markers/park.png', ...defaultOptions }),
  free_time: new L.Icon({ iconUrl: './markers/free_time.png', ...defaultOptions }),
  restaurant: new L.Icon({ iconUrl: './markers/restaurant.png', ...defaultOptions}),
  museum: new L.Icon({ iconUrl: './markers/museum.png', ...defaultOptions}),
  other: new L.Icon({ iconUrl: './markers/other.png', ...defaultOptions}),
}