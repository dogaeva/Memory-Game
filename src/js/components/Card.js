import React from "react";
import PropTypes from "prop-types";



const Card = ({ src, onClick, clicked, hide, clickable, tid}) => (

<div className={clickable} data-tid={tid}>
   <img className={hide} src={src} width="200px" height="278" onClick={onClick} /> 
</div>
);

export default Card;