import React, {useState} from 'react';
import Collapsible from "react-collapsible";
import "./Form.css"

 function Form(props) {
    //  define the initial use state of the form
    const [location, setLocation] = useState("");

    const handleChange = e => {
    // handle key presses
    setLocation(e.target.value)
    // e is the event that receives the event, which has a property of value
    // sets the location field
    };

    const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(location);
    setLocation("");
    // resets to empty string
       
    }
     return(
     <div className="CityForm">
         <form onSubmit={handleSubmit}>
            <label>
                Location
                <input
                 type="text"
                 name="location"
                 value={location}
                 onChange={handleChange}
                 placeholder="I live in..."
                  />
                 {/* Don't want a submit button, need to find a way to submit just with "enter" */}
                 
            </label>
            </form>
            
            <Collapsible trigger="Click here for advanced settings" id="advancedSettings">
                
            <form class="settings-body">
            <label for="startTime">I can get out between the hours of <input id="startTime" type="time"></input></label>
            <label for="endTime"> and <input id="endTime" type="time"></input></label>
            
            </form>
            </Collapsible>
     </div>
     )
 }
 
 export default Form;