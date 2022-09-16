import React, { useState, useEffect, useRef } from "react";
import { InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import APIService from "../../Service/APIService";

import { useStyles } from "./styles";

const GeoAutoComplete = (props) => {
    const {
        placeholder = "",
            icon,
            value = "",
            onResult,
            onFocus,
            onChange,
            style,
    } = props;
    const [showSearch, setShowSearch] = useState(false);

    const inputElement = useRef(null);

    const classes = useStyles();
    const [place, setPlace] = useState(value);
    const [old, setOld] = useState("");
    const [result, setResult] = useState([]);

    const [focus, setFocus] = useState(false);

    const handleInput = (e) => {
        setPlace(e.target.value);
        setOld("");
        let place = e.target.value;
        if (place.length >= 3) {
            if (e.keyCode === 13) {
                fetchPlace(place);
            }
            try {
                APIService.getPlaceLocationFromGeoApify({
                        token: APIService.GEOAPIFY_APIKEY,
                        place: place,
                        limit: 5,
                    })
                    .then((data) => {
                        setResult(data.features);
                        setShowSearch(true);
                    })
                    .catch((err) => console.log(err));
            } catch (err) {
                console.log(err);
            }
        } else {
            setShowSearch(false);
            setShowSearch(false);
        }
        if (onChange) {
            onChange(e);
        }
    };
    const handleClick = (data) => {
        setPlace(data.label);
        if (onResult) {
            onResult(data);
        }
        setShowSearch(false);
    };

    const fetchPlace = (place) => {
        APIService.getPlaceLocationFromGeoApify({
                token: APIService.GEOAPIFY_APIKEY,
                place: place,
                limit: 1,
            })
            .then((data) => {
                if (onResult) {
                    setShowSearch(false);
                    onResult(data.features[0]);
                    // To access the latitude and logitude we proceed as follows
                    // features[0].properties.lat,features[0].properties.lng for latitude anf logitude respectively
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        document.addEventListener("click", () => {
            setShowSearch(false);
        });
        return document.removeEventListener("click", (e) => {});
    });

    return (
        <div className={classes.wrapper} style={style}>
      <div className={classes.searchInput}>
        <div
          className={classes.search}
          style={{border:`${(focus) ? '2px solid black':'2px solid transparent'}`}}
        >
          {icon ? icon : <Search className={classes.icon} />}
          <InputBase
            ref={inputElement}
            required={true}
            fullWidth
            sx={{ ml: 1, flex: 1 }}
            value={old ? old : place}
            onChange={handleInput}
            type="text"
            className={classes.input}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                fetchPlace(place);
              }
            }}
            onBlur={() => {
              setFocus(false);
              if (place.length >= 3) {
                fetchPlace(place);
              }
            }}
            onFocus={() => {
              if (onFocus) {
                onFocus();
              }
              setFocus(true);
            }}
          />
        </div>
        {showSearch && (
          <div className={classes.autoCompleteBox}>
            {result?.map((dt, i) => (
              <div
                key={i}
                className={classes.li}
                onMouseEnter={() => {
                  setOld(dt.properties.formatted);
                }}
                onMouseLeave={() => {
                  setOld("");
                }}
                onClick={() => {
                  handleClick(dt);
                }}
              >
                <p align={"left"}>{dt.properties.address_line1}</p>
                <small align={"right"} style={{ fontSize: ".6em" }}>
                  {dt.properties.formatted}
                </small>
              </div>
            ))}
            {result && (
              <span
              style={{
                width: "100%",
                fontSize: ".7em",
                marginTop: 0,
                textAlign: "right",
                float: "right",
                paddingRight: ".4em",
              }}
            >
              Powered by &copy;ivantom
            </span>
            )}
            
          </div>
        )}
      </div>
    </div>
    );
};

export default GeoAutoComplete;