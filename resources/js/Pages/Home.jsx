import { Alert, Box, Button, Grid, Typography } from "@mui/material";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../../css/app.css";

import Nav from "@/Components/Nav";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { MarkerIcon } from "@/Components/MarkerIcon";

export default function Home(props) {
    const { history } = props;

    const positionInitial =
        screen.width > 600 ? [37.09024, -95.712891] : [37.09024, -80.712891];

    const cities = ["Miami", "New York", "Orlando"];

    const [selectedCity, setSelectedCity] = useState();
    const [error, setError] = useState(false);

    const [response, setResponse] = useState(
        history ? JSON.parse(history[0]?.data) : null
    );

    async function fetchData(city) {
        const response = await fetch(`api/${city}`, { method: "POST" });
        const { message, error } = await response.json();

        if (error) {
            setError(error);
            return;
        }

        setResponse(message);
    }

    const handleLoadCity = (city) => {
        setSelectedCity(city);
        setError(false);
        setResponse();
        fetchData(city);
    };

    return (
        <Grid>
            <Nav />
            {history ? (
                <Box style={{ margin: "15px 0px" }}>
                    <Typography
                        variant="body2"
                        color={"primary"}
                        style={{
                            marginBottom: "10px",
                            marginLeft: "10px",
                            fontWeight: "700",
                        }}
                    >
                        <Link replace href={"/history"}>
                            Volver al historial
                        </Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            marginBottom: "10px",
                            marginLeft: "10px",
                            fontWeight: "700",
                        }}
                    >
                        {history[0]?.city}
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                    >
                        Fecha Consulta: {history[0]?.created_at}
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                    >
                        Humedad: {history[0]?.humidity} %
                    </Typography>
                </Box>
            ) : (
                <Box style={{ margin: "15px 0px" }}>
                    <Typography
                        variant="body1"
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                    >
                        Seleccione una ciudad:
                    </Typography>
                    <Grid item xs={4} justifyContent={"space-between"}>
                        {cities?.map((city, index) => (
                            <Button
                                variant={
                                    selectedCity == city
                                        ? "contained"
                                        : "outlined"
                                }
                                key={index}
                                onClick={() => handleLoadCity(city)}
                                style={{
                                    marginLeft: "10px",
                                    fontWeight: "701",
                                }}
                            >
                                {city}
                            </Button>
                        ))}
                    </Grid>
                </Box>
            )}
            {error && <Alert severity="error">{error}</Alert>}
            <MapContainer center={positionInitial} zoom={4}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {response?.map((res, index) => (
                    <Marker
                        position={res?.geocode}
                        key={index}
                        icon={MarkerIcon}
                    >
                        <Popup>
                            <Typography
                                variant="body2"
                                style={{ fontWeight: "701" }}
                            >
                                {res?.name}
                            </Typography>
                            <Typography
                                style={{
                                    fontWeight: "1rem",
                                    margin: "0px",
                                }}
                            >
                                Humedad: {res?.humidity} %
                            </Typography>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Grid>
    );
}
