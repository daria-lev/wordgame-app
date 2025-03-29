import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"; 
import "@popperjs/core"; 
import "bootstrap";
import Board from './Board.jsx';
import Classic from './Classic.jsx'
import AvgColor from './AvgColor.jsx'



function App() {
  const [game, setGame] = useState("Start")
  let gameList = ["Word Distance", "Classic Wordle", "Average Color Wordle"]

  function renderBody() {
    if (game === "Start") {
      return (
        <div>
          <p>Welcome to the center for various word games! Use the dropdown menu at the top to pick a game, 
            or use the buttons below.</p>
            {renderButtons()}
        </div>
      )
    }
    else if (game === "Classic Wordle") {
      return (<Classic></Classic>)
    } else if (game === "Average Color Wordle") {
      return (<AvgColor></AvgColor>)
    }
    else {
      return (
        <div>
          <p>{game}</p>
        </div>
      )
    }
  }

  function renderButtons() {
    let buttons = []
    gameList.forEach(
      gameName => buttons.push(<button class="startbutton" onClick={() => handleClick(gameName)}>{gameName}</button>)
    )
    return <div class="buttonbox">{buttons}</div>
  }

  function handleClick(gameName) {
    setGame(gameName)
  }

  function handleSelect(eventKey) {
    setGame(eventKey)
  }

  return (
    <>
      <div>
        <nav class="navbar">
          <div class="navmenu">
            <DropdownButton title="Games" id="menu-button" variant='success' onSelect={handleSelect}>
              {gameList.map((gameName, index) => (<Dropdown.Item key={index} eventKey={gameName}>
                {gameName}</Dropdown.Item>))}
            </DropdownButton>
          </div>
          <div class="navcenter">
            {game}
          </div>
          <div class="empty">
            <button onClick={() => (setGame("Start"))}>Home</button>
          </div>
        </nav>
      </div>
      {renderBody()}
    </>
  )
}

export default App
