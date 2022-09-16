import React, { useRef, useEffect, useState } from "react";
import { Grid, Tooltip, Fab, Box, Button, Divider } from "@mui/material";
import APIService from "../../Service/APIService";
import { Search, KeyboardArrowLeft } from "@mui/icons-material";

// import AutoComplete from "../../components/AutoComplete";

import GeoApifyAutoComplete from "../../components/AutoComplete/GeoApifyAutoComplete";

import { makeStyles } from "@mui/styles";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = APIService.MAP_BOX_TOKEN;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    // overflowY:'auto',
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    // backgroundColor:theme.palette.primary.main
  },
  fab: {
    position: "fixed",
    bottom: 10,
    left: 10,
  },
  searchBox: {
    position: "absolute",
    top: 10,
    width: "40%",
    left: 10,
    zIndex: 999,
    transition: "all .4s linear",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  styleBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    right: 5,
    top: "40%",
    backgroundColor: "#E1D8D8",
    borderRadius: theme.shape.borderRadius,
    zIndex: 9000000,
  },
}));

const SearchPlace = () => {
  const classes = useStyles();

  const mapContainer = useRef(null);
  const mkr = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(11);
  const [lat, setLat] = useState(4);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      projection: 'globe'
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "bottom-right"
    );

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right"
    );

    map.current.on("style.load", () => {
      map.current.setFog({});
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const flyTo = (lng, lat) => {
    map.current.flyTo({
      center: [lng, lat],
      essential: true,
      zoom: 16.5,
    });
    if(mkr.current){
      mkr.current.remove();
    }
    mkr.current = new mapboxgl.Marker().setLngLat([lng,lat]).addTo(map.current);
  };

  const changeStyle = (layer) => {
    map.current.setStyle("mapbox://styles/mapbox/" + layer);
  };

  return (
    <Grid container style={{ position: "relative", height: "100%" }}>
      <Tooltip title="back" aria-label="back" style={{ position: "absolute" }}>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            window.history.back();
          }}
        >
          <KeyboardArrowLeft />
        </Fab>
      </Tooltip>
      <Grid
        item
        style={{ position: "relative", width: "100%" }}
        md={12}
        sm={12}
      >
        <div className={classes.searchBox}>
          <GeoApifyAutoComplete
            icon={<Search style={{ paddingLeft: 2 }} />}
            placeholder={"Search A Location..."}
            onResult={(data) => {
              console.log("Data from geoapify", { data });
              setLat(data.properties.lat);
              setLng(data.properties.lon);
              flyTo(data.properties.lon, data.properties.lat);
            }}
          />
        </div>
        <Box className={classes.styleBox}>
          <Button fullWidth onClick={() => changeStyle("light-v10")}>
            Light
          </Button>
          <Divider />
          <Button fullWidth onClick={() => changeStyle("dark-v10")}>
            Dark
          </Button>
          <Divider />
          <Button fullWidth onClick={() => changeStyle("streets-v11")}>
            City
          </Button>
          <Divider />
          <Button fullWidth onClick={() => changeStyle("satellite-v9")}>
            Satalite
          </Button>
        </Box>
        <div ref={mapContainer} className={classes.map}></div>
      </Grid>
    </Grid>
  );
};

export default SearchPlace;
