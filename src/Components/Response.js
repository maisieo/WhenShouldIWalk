import React from "react";
import "./Response.css";

function Response(props) {
    // let w = props.weather;
    // console.log(props.weather.name)
    let w = props.forecast;
 
    /* What consitutes a good time to go on a walk?

    let hours after sunrise but before sunset = []
        if time of i >= sunrise and before sunset
        add to array

        loop through hours after sunrise
        let hours of no rain/thunderstorm/strong wind = []
        if weather conditions of i contain the word "rain", "strong wind", "snow", "thunderstorm", "lightning"
        skip
        otherwise add to array
        
    
    -- it's after sunrise
    -- it's before sunset
    -- it's not raining
    -- if raining all day, the hottest temp is chosen
    -- it's not snowing
    -- if snowing, the hottest temp is shown
    -- The temperature is below 25 degrees
    -- If temp is above 25 degrees, the lowest temperature above that is chosen
    -- The temperature is above 0 degrees
    -- If temperature is below 0 degrees, the hottest temp is chosen
*/


// while x is greater than sunrise time, go to next
// stop at sunset time
// while perciperation - move to next
// while temperature is greater than the temp before,
// but lower than 25. 

  
      
    // let temp = props.weather.main.temp
    // let conditions = props.weather.weather[0].main
    return (
        <div className="Response"> 
              
               <h2>  {w.forecast.forecastday[0].hour[0].chance_of_rain}% chance of rain today! </h2>
               
                {/* Finding forecast== */}
                          
              <p> You should take your  one-hour walk at <span id="time">2pm</span></p>
                     
            
        </div>
    )
    
}

export default Response;

//{w.sys.country}: