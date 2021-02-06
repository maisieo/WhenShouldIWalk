import React from "react"

function WalkList(props) {
    return (
        <div className="WalkList">
            <h2>My walks</h2>
            <ul>
                {
                    props.walks.map(t => (
                        <li 
                        
                            key={t.date}
                            
                            >
                            {t.title} on {t.date} at {t.time} 
                                                   </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default WalkList;