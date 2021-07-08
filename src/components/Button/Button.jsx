import React from 'react';
import './Button.scss'

const Button = (props)=>{
    const {className, type, onClick, id, name} = props;
    return(
        <button 
            className = {className}
            type = {type}
            onClick = {onClick}
            id = {id}
            >{name}</button>
    )
}; 

export default Button