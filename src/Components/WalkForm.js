import React, {useState} from "react"
import "./WalkForm.css"

function WalkForm(props) {
    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    let [title, setTitle] = useState("");

    function handleChange(event) {
        let {name, value} = event.target;

        switch(name) {
            case "date":
                setDate(value)
                break;
            case "time":
                setTime(value)  
                break;
            default:
                break;
             case "title":
                setTitle(value)  
                break;
          
        }
   }

   function handleSubmit(event) {
    event.preventDefault();
    let walk = { date: date, time: time, title: title};
            props.onSubmit(walk);
    setDate('');
    setTime('');
    setTitle('');
}    

return (
        <div className="WalkForm">
            <h2> Enter a walk</h2>
            <form onSubmit={handleSubmit}>

            <input id= "title"
                 type="textarea"
                  name="title"
                  value={title}
                  onChange={handleChange} />

                <input
                 type="date"
                  name="date"
                  value={date}
                  onChange={handleChange}
                  />


                <input
                 type="time"
                  name="time"
                  value={time}
                  onChange={handleChange} />
                 
                                 
                <button>Add</button>

                {/* display:
                Date at *time */}
            </form>

                        
        </div>
    )
}

export default WalkForm ;