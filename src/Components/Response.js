import React from "react";
import "./Response.css";

function Response(props) {
  let w = props.forecast;

  // *** INITIAL FETCH FOR AN ARRAY OF HOURS
  let unfilteredHours = Object.entries(w.forecast.forecastday[0].hour); // first fetch of all hours

  //**FINDS DAYLIGHT HOURS */
  let sunsetHour =
    Number(w.forecast.forecastday[0].astro.sunset.slice(0, 2)) + 12; // finds and converts sunset
  let sunriseHour = Number(w.forecast.forecastday[0].astro.sunrise.slice(0, 2));
  let startTime = null;

  // **FINDS START TIME ***
  let optimumTime = "";
  let timeOfAccess = Number(w.location.localtime.slice(11, -3));
  timeOfAccess < sunriseHour
    ? (startTime = sunriseHour)
    : (startTime = timeOfAccess);
  if (timeOfAccess > sunsetHour) optimumTime = "Tomorrow";
  console.log("optimumTime", optimumTime);
  let sunnyHours = []; //these are the sunny hours in a day
  for (let i = 0; i < unfilteredHours.length; i++) {
    if (i > startTime && i < sunsetHour) sunnyHours.push(unfilteredHours[i]);
  }

  /***FINDS DRY HOURS***/
  let dryHours = []; //these are dry hours in a day
  let rainyDayHours = []; //hours to use on a rainy day (all)
  for (let i = 0; i < sunnyHours.length; i++) {
    for (let j = 0; j < sunnyHours[i].length; j++) {
      if (sunnyHours[i][j].will_it_rain === 0) {
        dryHours.push(sunnyHours[i]);
      }
    }
  }
  // *** IF NO DRY HOURS, ALL HOURS ARE "ELIGIBLE" HOURS***//
  if (dryHours.length === 0) rainyDayHours = sunnyHours;

  //**** SORTS HOURS INTO TEMERATURE TYPE *** //
  let comfortableTemp = [];
  let coldTemp = [];
  let rainyCold = [];
  let rainyHot = [];
  let rainyComfortable = [];
  let veryHot = [];

  if (rainyDayHours.length === 0) {
    //if not going to rain all day
    for (let i = 0; i < dryHours.length; i++) {
      // loop through dry hours array to find right hour
      for (let j = 0; j < dryHours[i].length; j++) {
        if ((dryHours[i][j].temp_c > 10) & (dryHours[i][j].temp_c <= 20)) {
          comfortableTemp.push(dryHours[i]); // if temp between 10 and 20, push to comfortable array
        } else if (dryHours[i][j].temp_c < 10) {
          coldTemp.push(dryHours[i]); // if temp less than 10, push to coldtemp array
        } else if (dryHours[i][j].temp_c > 20) {
          veryHot.push(dryHours[i]); // if temp more than 20, push to veryhot array
        }
      }
    }
  } else {
    for (let i = 0; i < rainyDayHours.length; i++) {
      //if whole day is rainy
      for (let j = 0; j < rainyDayHours[i].length; j++) {
        if (
          (rainyDayHours[i][j].temp_c > 10) &
          (rainyDayHours[i][j].temp_c <= 20)
        ) {
          rainyComfortable.push(rainyDayHours[i]); //push temps between 10 and 20 to rainycomfortable
        } else if (rainyDayHours[i][j].temp_c <= 10) {
          rainyCold.push(rainyDayHours[i]); // push temps <= 10 to rainycold
        } else if (rainyDayHours[i][j].temp_c > 20) {
          rainyHot.push(rainyDayHours[i]); // push temps > 20 to rainyhot
        }
      }
    }
  }

  /***SORT TEMP ARRAYS BY A CONDITION ***/

  function sortTemps(oldArray, value, direction) {
    let newArray = oldArray.sort(function (a, b) {
      switch (value) {
        case "wind_mph":
          if (direction === "low-high") {
            return a[1].wind_mph - b[1].wind_mph;
          } else return b[1].wind_mph - a[1].wind_mph;
        case "temp_c":
          if (direction === "low-high") {
            return a[1].temp_c - b[1].temp_c;
          } else return b[1].temp_c - a[1].temp_c;
        case "humidity":
          if (direction === "low-high") {
            return a[1].humidity - b[1].humidity;
          } else return b[1].humidity - a[1].humidity;
        case "totalprecip_mm":
          if (direction === "low-high") {
            return a[1].totalprecip_mm - b[1].totalprecip_mm;
          } else return b[1].totalprecip_mm - a[1].totalprecip_mm;
      }
    });
    return newArray;
  }

  let sortedComfortableTemp = sortTemps(
    comfortableTemp,
    "humidity",
    "low-high"
  );
  let sortedVeryHot = sortTemps(veryHot, "wind_mph", "high-low");
  let sortedCold = sortTemps(coldTemp, "wind_mph", "low-high");
  let sortedRainyCold = sortTemps(rainyCold, "totalprecip_mm", "low-high");
  let sortedRainyHot = sortTemps(rainyHot, "temp_c", "low-high");
  let sortedRainyComfortable = sortTemps(
    rainyComfortable,
    "totalprecip_mm",
    "low-high"
  );
  console.log(
    "Sorted temps",
    sortedComfortableTemp,
    sortedVeryHot,
    sortedCold,
    sortedRainyCold,
    sortedRainyHot,
    sortedRainyComfortable
  );

  // ** FINDS OPTIMUM TIME ** //
  let weatherConditionsAtTime = ""; // weather conditions at time of walk
  function findTime(arrayToCheck) {
    if (Number(arrayToCheck[0][0]) > 12) {
      console.log("Results in arraytoCheck[0][0]", arrayToCheck[0][0]);
      optimumTime = Number(arrayToCheck[0][0] - 12) + ".00 p.m.";
    } else if (Number(arrayToCheck[0][0]) === 12) {
      optimumTime = Number(arrayToCheck[0][0]) + ".00 p.m.";
    } else {optimumTime = Number(arrayToCheck[0][0]) + ".00 a.m."}
    weatherConditionsAtTime =
      "It will be " +
      arrayToCheck[0][1].condition.text.toLowerCase() +
      " at this time.";
  }

  if (sortedComfortableTemp.length > 0) {
    findTime(sortedComfortableTemp);
  } else if (sortedCold.length > 0) {
    findTime(sortedCold);
  } else if (sortedVeryHot.length > 0) {
    findTime(sortedVeryHot);
  } else if (sortedRainyComfortable.length > 0) {
    findTime(sortedRainyComfortable);
  } else if (sortedRainyHot.length > 0) {
    findTime(sortedRainyHot);
  } else if (sortedRainyCold.length > 0) {
    findTime(sortedRainyCold);
  } else if (sortedRainyCold.length === 0) {
    optimumTime = "Now";
  }

  // *** DEFINES A LATE MESSAGE *** //
  let lateMessage = "";
  let optimumTimeMessage = "";
  if (optimumTime === "Tomorrow") lateMessage += "It's too late for a walk.";
  if (optimumTime === "Now")
    lateMessage += "Get out quickly. It'll be dark within the hour.";

  return (
    <div className="Response">
      <p>
        <h1>{w.location.name},<br></br> {w.location.country} </h1>
        {" "}
        The best time for your walk is:<br></br>
        <span id="time">{optimumTime} </span>
        <br></br> {lateMessage}
      </p>
      <p> {weatherConditionsAtTime}</p>
    </div>
  );
}

export default Response;
