import L from "leaflet";
import icon from "/assets/images/marker-icon-2x.png";

export const MarkerIcon = L.icon({
    iconUrl: icon,
    iconSize: [20, 30], // Adjust the dimensions according to your needs
    iconAnchor: [7, 25], // Adjust the anchor position if necessary
});
