import React from "react";
import "./Response.css";

function Response(props) {
    // let w = props.weather;
    // console.log(props.weather.name)
    let w = props.forecast;
    let unfilteredHours = w.forecast.forecastday[0].hour
    let entries = Object.entries(unfilteredHours)
    console.log("initial grab", entries)
  
    // filter out the information we need from the api. 
    // these are all hour objects with no filter on them

    // finds the current time and sunset hours for the particular day
    let timeOfAccess = (Number(w.location.localtime.slice(11,-3)));
    console.log("time of A", timeOfAccess)
    let sunsetHours = (Number(w.forecast.forecastday[0].astro.sunset.slice(0,2)) + 12);
    let sunriseHours = (Number(w.forecast.forecastday[0].astro.sunrise.slice(0,2)));
    console.log("Sunrise hours", sunriseHours)
    let optimumTimeMessage = "";
    let startTime = null;
    if (timeOfAccess < sunriseHours) {
        startTime = sunriseHours
    }

    else {
        startTime = timeOfAccess;
    }
    console.log(startTime)

    // filter out hours after sunrise and before sunset
if (timeOfAccess < sunsetHours) {
    let eligbleHours = [];
    for (let i=0; i < entries.length; i++) {
    if (i > startTime && i < sunsetHours) eligbleHours.push(entries[i])}
    console.log("These are eligibleHours", eligbleHours)

    // filter out hours that are not going to rain   
    let dryHours = [];
    for (let i=0; i < eligbleHours.length; i++){
         { 
             for (let j=0; j < eligbleHours[i].length; j++) {
            if (eligbleHours[i][j].will_it_rain === 0) {
                dryHours.push(eligbleHours[i])
            }
         }
      }
    }
// If there are no dry hours, reset array to eligible hours
     let rainyDayHours = []   
    if (dryHours.length === 0) {
            rainyDayHours = eligbleHours;
            }
 
// This block of code takes the array above with a length of more than 0 and sorts the objects by temperature
    let comfortableTemp = [];
    let coldTemp = [];
    let veryHot = [];
    let rainyHot = [];
    let rainyComfortable = [];
    let rainyCold = [];

    if (rainyDayHours.length === 0) {
        for (let i=0; i < dryHours.length; i++){
            { 
                for (let j=0; j < dryHours[i].length; j++) {
               if (dryHours[i][j].temp_c > 10 & dryHours[i][j].temp_c <= 20) {
                   comfortableTemp.push(dryHours[i])
               }
               else if (dryHours[i][j].temp_c < 10) {
                   coldTemp.push(dryHours[i])
               }
               else if (dryHours[i][j].temp_c > 20) {
                   veryHot.push(dryHours[i]);
               }
            }
         }
       }
    }   
    else {
        for (let i=0; i < rainyDayHours.length; i++){
            { 
                for (let j=0; j < rainyDayHours[i].length; j++) {
               if (rainyDayHours[i][j].temp_c > 10 & rainyDayHours[i][j].temp_c <= 20) {
                   rainyComfortable.push(rainyDayHours[i])
               }
               else if (rainyDayHours[i][j].temp_c <= 10) {
                   rainyCold.push(rainyDayHours[i])
               }
               else if (rainyDayHours[i][j].temp_c > 20) {
                   rainyHot.push(rainyDayHours[i]);
               }
            }
         }
       }
    }   

// those arrays need to now be sorted
// temp between 10 and 20 and dry: lowest humidity

let sortedComfortable = comfortableTemp.sort(function(a,b){
    return a[1].humidity - b[1].humidity
})
// // lowest wind speed (makes more of a difference than a few degrees in temp)
let sortedCold = coldTemp.sort(function(a,b){
    return a[1].wind_mph - b[1].wind_mph
})

// // highest wind speed = (makes more of a difference than a few degrees in temp)
let sortedHot = veryHot.sort(function(a,b){
    return b[1].wind_mph - a[1].wind_mph
})
// //lowest temp
let sortedRainyHot = rainyHot.sort(function(a,b){
    return a[1].temp_c - b[1].temp_c
})
// //lowest percip_mm
let sortedRainyComfortable = rainyComfortable.sort(function(a,b){
    return a[1].totalprecip_mm - b[1].totalprecip_mm
})

// //lowest percip_mm
let sortedRainyCold =  rainyCold.sort(function(a,b){
    return a[1].totalprecip_mm - b[1].totalprecip_mm;
})

// defining the optimum time
let optimumTime = 0;
// ordered by preference
    // checks comfortable dry array first
if (sortedComfortable.length > 0) {
    if (Number(sortedComfortable[0][0]) > 12)  {
    optimumTime = (Number(sortedComfortable[0][0])-12 + ":00 p.m.")
}
    else (optimumTime  = (Number(sortedComfortable[0][0]) + ":00 a.m"))
}
 //now checks cold and dry array
else if (sortedCold.length > 0) {
    if (Number(sortedCold[0][0]) > 12)  {
    optimumTime  = (Number(sortedCold[0][0])-12 + ":00 p.m.")
    }
    else (optimumTime  = (Number(sortedCold[0][0]) + ":00 a.m"))
}

//now checks dry and hot
else if (sortedHot.length > 0) {
    if (Number(sortedHot[0][0]) > 12)  {
    optimumTime  = (Number(sortedHot[0][0])-12 + ":00 p.m.")
    }
    else (optimumTime  = (Number(sortedHot[0][0]) + ":00 a.m"))
}

// now checks comfortable rainy
else if (sortedRainyComfortable.length > 0) {
    if (Number(sortedRainyComfortable[0][0]) > 12)  {
    optimumTime  = (Number(sortedRainyComfortable[0][0])-12 + ":00 p.m.")
    }
    else (optimumTime  = (Number(sortedRainyComfortable[0][0]) + ":00 a.m")) 
}
// now checks hot and rainy
else if (sortedRainyHot.length > 0) {
    if (Number(sortedRainyHot[0][0]) > 12)  {
    optimumTime  = (Number(sortedRainyHot[0][0])-12 + ":00 p.m.")
    }
    else (optimumTime  = (Number(sortedRainyHot[0][0]) + ":00 a.m"))
}

//now checks cold and rainy
else if (sortedRainyCold.length > 0) {
    if (Number(sortedRainyCold[0][0]) > 12)  {
    optimumTime  = (Number(sortedRainyCold[0][0])-12 + ":00 p.m.")
    }
    else (optimumTime  = (Number(sortedRainyCold[0][0]) + ":00 a.m"))
}


if  (optimumTime === 0) {
    optimumTimeMessage = "It's too late for a walk. Try again tomorrow, unless you have a torch."
}
else {optimumTimeMessage = "You should take your walk at " + optimumTime}

}
 else {optimumTimeMessage = "It's too late for a walk. Try again tomorrow, unless you have a torch."}


return (
        <div className="Response"> 
              
                                      
              <p> {optimumTimeMessage}</p>
              <p></p>
               
        </div>
    )
    
}

export default Response;

