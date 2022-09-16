import React, { useContext, useEffect } from "react";

// importing images
import Car from "../../images/car.png";
import Car1 from "../../images/car1.png";

// import thr style
import { useStyles } from "./style";

import { TrixContext } from "../../Context/TrixContext";

const carList = [
  {
    service: "Trix1",
    image: Car,
    priceMultiplier: 150,
  },
  {
    service: "Trix2",
    image: Car1,
    priceMultiplier: 250,
  },
  {
    service: "TrixFast",
    image: Car,
    priceMultiplier: 350,
  },
  {
    service: "TrixSUV",
    image: Car1,
    priceMultiplier: 400,
  },
];

const km = 1;

const Component = () => {
  const classes = useStyles();

  const { selectedRide, setSelectedRide, setPrice } = useContext(TrixContext);

  useEffect(() => {
    setSelectedRide(carList[0]);
  }, []);

  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Choose a ride,or swipe up for more</div>
      <div className={classes.carList}>
        {carList?.map((car, index) => (
          <div
            onClick={() => {
              handleSelectRide(car);
            }}
            className={`${
              selectedRide.service === car.service
                ? classes.selectedCar
                : classes.car
            }`}
            key={index}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                className={classes.carImage}
                src={car.image}
                height={50}
                width={50}
                alt={""}
              />
              <div className={classes.carDetails}>
                <div className={classes.service}>{car.service}</div>
                <div className={classes.time}>
                  {(Math.random() + 1).toFixed(0)} min away
                </div>
              </div>
            </div>
            <div className={classes.priceContainer}>
              <div className={classes.price}>
                {(km * car.priceMultiplier).toFixed(2)} XAF
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component;
