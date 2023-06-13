import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
console.log(markerIconPng);
export const MarkerIcon = L.icon({
    iconUrl: markerIconPng,
    // shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
