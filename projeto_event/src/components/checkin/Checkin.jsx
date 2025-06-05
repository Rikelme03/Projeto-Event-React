import "./Checkin.css"
import { useState } from "react";


const Checkin = (props) => {
    return(

        <> 
    <div className="wrapper"> 
    <label className="switch"> 
    <input type="checkbox" 
        checked={props.presenca}
        onChange={props.manipular}/>
    <span className="slider round"></span> 
    </label> 
    </div> 
    </>
    
    )
}

export default Checkin;