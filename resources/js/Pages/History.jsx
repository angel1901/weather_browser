import {
    Card,
    CardActionArea,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";

export default function History(props) {
    const { history } = props;

    const getFormatDate = (strDate) => {
        let date = new Date(strDate);
        return date.toLocaleDateString() ?? "-";
    };

    return (
        <Grid container justifyContent={"center"}>
            <Nav />
            {history.length != 0 ? (
                <Grid item xs={11} md={8} style={{ marginTop: "20px" }}>
                    <Grid
                        container
                        justifyContent={"space-around"}
                        alignItems={"center"}
                    >
                        <Grid item xs={4}>
                            Ciudad
                        </Grid>
                        <Grid item xs={3}>
                            Humedad
                        </Grid>
                        <Grid item xs={3}>
                            Fecha
                        </Grid>
                        <Grid item xs={1}>
                            Ver
                        </Grid>
                    </Grid>

                    {history?.map((row) => (
                        <Card style={{ marginTop: "10px" }} key={row?.id}>
                            <CardActionArea>
                                <Grid
                                    style={{ padding: "10px" }}
                                    container
                                    justifyContent={"space-around"}
                                    alignItems={"center"}
                                >
                                    <Grid item xs={4}>
                                        <Typography>{row?.city}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>
                                            {row?.humidity} %
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>
                                            {getFormatDate(row?.created_at)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Link replace href={`${row?.id}`}>
                                            <VisibilityIcon />
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h5" style={{ marginTop: "10px" }}>
                    Ups, no se encontraron registros
                </Typography>
            )}
        </Grid>
    );
}
