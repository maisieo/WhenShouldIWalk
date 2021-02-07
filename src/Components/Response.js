import React from "react";
import "./Response.css";

function Response(props) {
   //define all the variables I will need
    let w = props.forecast;
    let optimumTime = ""; // the time at which to walk
    let optimumTimeMessage = ""; // final message to show
    let lateMessage = ""; // additional message if time is late
    let startTime = null; // time after which walk should be
    let weatherConditionsAtTime = ""; // weather conditions at time of walk
    let unfilteredHours = w.forecast.forecastday[0].hour // first fetch of all hours
    let entries = Object.entries(unfilteredHours) // returns an array of these hours
    console.log("initial grab", entries)
      let timeOfAccess = (Number(w.location.localtime.slice(11,-3))); //finds and converts time of access
    console.log("time of A", timeOfAccess)
    let sunsetHours = (Number(w.forecast.forecastday[0].astro.sunset.slice(0,2)) + 12); // finds and converts sunset
    let sunriseHours = (Number(w.forecast.forecastday[0].astro.sunrise.slice(0,2)));
    console.log("Sunrise hours", sunriseHours) // finds and converts sunrise
    let sunnyHours = []; //these are the sunny hours in a day
    let dryHours = []; //these are dry hours in a day
    let rainyDayHours = [] //hours to use on a rainy day (all)

    /**** DEFINES THE START TIME *****/ 
    if (timeOfAccess < sunriseHours) {startTime = sunriseHours}
    //if time of access is before sunrise, set the start time as sun rise
    else {startTime = timeOfAccess;} // or start time is the time of access
    console.log("This is the start time -->", startTime)
    console.log("This is the time of access", timeOfAccess)
    console.log("This is the sunsetHours", sunsetHours)


    /*** SETS THE SUNNY HOURS ***/
    if (timeOfAccess < sunsetHours) { //this if statement ends at the bottom
    for (let i=0; i < entries.length; i++) {
    if (i > startTime && i < sunsetHours) sunnyHours.push(entries[i])}
    console.log("These are sunny hours -->", sunnyHours)

 
    /***FINDS DRY HOURS***/
    for (let i=0; i < sunnyHours.length; i++){
         { 
             for (let j=0; j < sunnyHours[i].length; j++) {
            if (sunnyHours[i][j].will_it_rain === 0) {
                dryHours.push(sunnyHours[i])
            }
         }
      }
    }

    // *** IF NO DRY HOURS, ALL HOURS ARE "DRY" HOURS***//   
    if (dryHours.length === 0) rainyDayHours = dryHours;
        

    //**** SORTS HOURS INTO TEMERATURE TYPE *** //
    let comfortableTemp = [];
    let coldTemp = [];
    let veryHot = [];
    let rainyHot = [];
    let rainyComfortable = [];
    let rainyCold = [];

    if (rainyDayHours.length === 0) { //if not going to rain all day
        for (let i=0; i < dryHours.length; i++){ // loop through dry hours array to find right hour
            { 
                for (let j=0; j < dryHours[i].length; j++) {
               if (dryHours[i][j].temp_c > 10 & dryHours[i][j].temp_c <= 20) {
                   comfortableTemp.push(dryHours[i]) // if temp between 10 and 20, push to comfortable array
               }
               else if (dryHours[i][j].temp_c < 10) {
                   coldTemp.push(dryHours[i]) // if temp less than 10, push to coldtemp array
               }
               else if (dryHours[i][j].temp_c > 20) {
                   veryHot.push(dryHours[i]); // if temp more than 20, push to veryhot array
               }
            }
         }
       }
    }   
    else {
        for (let i=0; i < rainyDayHours.length; i++){ //if whole day is rainy
            { 
                for (let j=0; j < rainyDayHours[i].length; j++) {
               if (rainyDayHours[i][j].temp_c > 10 & rainyDayHours[i][j].temp_c <= 20) {
                   rainyComfortable.push(rainyDayHours[i]) //push temps between 10 and 20 to rainycomfortable
               }
               else if (rainyDayHours[i][j].temp_c <= 10) {
                   rainyCold.push(rainyDayHours[i]) // push temps < 10 to rainycold
               }
               else if (rainyDayHours[i][j].temp_c > 20) {
                   rainyHot.push(rainyDayHours[i]); // push temps > 20 to rainyhot
               }
            }
         }
       }
    }   

/***SORT TEMP ARRAYS BY A CONDITION ***/

let sortedComfortable = comfortableTemp.sort(function(a,b){
     return a[1].humidity - b[1].humidity //sort by lowest humidity
   })
console.log("This is sorted comfortable", sortedComfortable);
let sortedCold = coldTemp.sort(function(a,b){
    
    return a[1].wind_mph - b[1].wind_mph // sort by lowest wind speed 
})
console.log("This is sorted cold", sortedCold);

let sortedHot = veryHot.sort(function(a,b){
    return b[1].wind_mph - a[1].wind_mph // sort by highest wind speed
})
console.log("This is sorted hot", sortedHot);

let sortedRainyHot = rainyHot.sort(function(a,b){
    console.log("This is sorted rainy hot", sortedRainyHot);
    return a[1].temp_c - b[1].temp_c // sort by lowest temp
})

let sortedRainyComfortable = rainyComfortable.sort(function(a,b){
    console.log("This is sorted rainy comfortable", sortedRainyComfortable);
    return a[1].totalprecip_mm - b[1].totalprecip_mm //sort by lowest percipitation
})

let sortedRainyCold =  rainyCold.sort(function(a,b){
    console.log("This is sorted rainy cold", sortedRainyCold);
    return a[1].totalprecip_mm - b[1].totalprecip_mm; //sort by lowest percipitation
})

/**** DEFINING OPTIMUM TIME TO WALK ****/

// checks comfortable dry array first
if (sortedComfortable.length > 0) {
    if (Number(sortedComfortable[0][0]) > 12)  { //if time is greater than 12, take twelve away and add "pm"
    optimumTime = (Number(sortedComfortable[0][0])-12 + ":00 p.m.") 
    //if it has entires, set optimum time to the first entry in the array
}
    else (optimumTime  = (Number(sortedComfortable[0][0]) + ":00 a.m")) // or add am

}

//if no entries in comfortable array, check sorted cold array
else if (sortedCold.length > 0) {
    if (Number(sortedCold[0][0]) > 12)  {
    optimumTime  = (Number(sortedCold[0][0])-12 + ":00 p.m.")//if time is greater than 12, take twelve away and add "pm"
       //if it has entires, set optimum time to the first entry in the array
    }
    else (optimumTime  = (Number(sortedCold[0][0]) + ":00 a.m")) //or am
}

//now checks dry and hot array
else if (sortedHot.length > 0) {
    if (Number(sortedHot[0][0]) > 12)  {
    optimumTime  = (Number(sortedHot[0][0])-12 + ":00 p.m.")//if time is greater than 12, take twelve away and add "pm"
     //if it has entires, set optimum time to the first entry in the array
    }
    else (optimumTime  = (Number(sortedHot[0][0]) + ":00 a.m"))//or "am"
}

// now checks comfortable rainy
else if (sortedRainyComfortable.length > 0) {
    if (Number(sortedRainyComfortable[0][0]) > 12)  {//if time is greater than 12, take twelve away and add "pm"
    optimumTime  = (Number(sortedRainyComfortable[0][0])-12 + ":00 p.m.")
    //if it has entires, set optimum time to the first entry in the array
    }
    else (optimumTime  = (Number(sortedRainyComfortable[0][0]) + ":00 a.m")) //or "am"
    
}
// now checks hot and rainy
else if (sortedRainyHot.length > 0) {
    if (Number(sortedRainyHot[0][0]) > 12)  {
    optimumTime  = (Number(sortedRainyHot[0][0])-12 + ":00 p.m.") //if time is greater than 12, take twelve away and add "pm"
    } //if it has entires, set optimum time to the first entry in the array
    else (optimumTime  = (Number(sortedRainyHot[0][0]) + ":00 a.m"))//or "am"
}

//now checks cold and rainy
else if (sortedRainyCold.length > 0) {
    if (Number(sortedRainyCold[0][0]) > 12)  {
    optimumTime  = (Number(sortedRainyCold[0][0])-12 + ":00 p.m.")//if time is greater than 12, take twelve away and add "pm"
    } //if it has entires, set optimum time to the first entry in the array
    else (optimumTime  = (Number(sortedRainyCold[0][0]) + ":00 a.m"))//or "am"
}

console.log("This is the optimum time -->", optimumTime)

/*** SHOWS DIFFERENT MESSAGE DEPENDING ON TIME OF DAY */
if  (optimumTime === 0) { //if there is no optimum time, it must be after sunset
    optimumTimeMessage = "Tomorrow."
    lateMessage = "It's too late for a walk."
    weatherConditionsAtTime = ""; //no weather conditions show
    
}
else {optimumTimeMessage = optimumTime}

//otherwise the optimum time message shown is the optimum time

    }

 else {
    optimumTimeMessage = "Tomorrow."
 lateMessage = "It's too late for a walk."
 weatherConditionsAtTime = "";

 console.log("This is the optimum time message", optimumTimeMessage)

 }

return (
        <div className="Response"> 
              
                                      
              <p> The perfect time for your walk is:<br>
              </br> <span id="time"> {optimumTimeMessage}</span><br></br> {lateMessage}</p>
              <p></p>
               
        </div>
    )
} 



export default Response;

