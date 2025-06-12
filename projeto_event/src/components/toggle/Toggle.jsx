// src/components/toggle/Toggle.jsx
import React from "react";
import "./Toggle.css";

const Toggle = ({ presenca, manipular }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={presenca} onChange={manipular} />
            <span className="slider round"></span>
        </label>
    );
};

export default Toggle;
    