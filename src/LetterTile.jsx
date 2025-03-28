import { useState } from 'react'
import './App.css'

function Tile(props) { //props include: letter, color
  let letter = props.letter === "_" ? "__" : props.letter;
  return (
    <button class="tile" style={{backgroundColor: props.color}}>{props.letter}</button>
  )
}

export default Tile;