import { useState, useEffect } from 'react'
import './App.css'
import Tile from './LetterTile.jsx'
import useKeyPress from './useKeyPress.jsx'

function Board(props) {
  const [completeWords, setComplete] = useState([])
  const [results, setResults] = useState([])
  const [curWord, setWord] = useState([])
  const [solved, setSolved] = useState(false)
  let len = 5
  let maxTries = 6
  const answer = "catto".toUpperCase()
  const pressed = useKeyPress()

  useEffect(() => {
    if (pressed && !solved) {
      if (pressed === 'Enter') {
        if (curWord.length === len) {
          if (wordEqual()) {
            setSolved(true)
          }
          let comp = [...completeWords]
          comp.push(curWord)
          setComplete(comp)
          let res = [...results]
          res.push(props.resultFunc(curWord, answer)) // props.resultFunc
          setResults(res)
          setWord([])
        }
      } else if (pressed === 'Backspace') {
        if (curWord.length > 0) {
          let word = [...curWord]
          word = word.slice(0, -1)
          setWord(word)
        }
      } else { // letter
        if (curWord.length < len) {
          let word = [...curWord]
          word.push(pressed.toUpperCase())
          setWord(word)
        }
      }
    }
  }, [pressed]);

  function wordEqual() {
    for (let i = 0; i < len; i++) {
      if (curWord[i] !== answer.charAt(i)) {
        return false
      }
    }
    return true
  }


  function renderBoard() {
    let tiles = []
    let count= 0
    let i = 0;
    for (; i < completeWords.length; i++) {
      let row = []
      for (let j = 0; j < len; j++) {
        row.push(<Tile letter={completeWords[i][j]} color={results[i][j]}></Tile>)
      }
      tiles.push(<div id={i}>{row}</div>)
    }
    if (completeWords.length < maxTries) {
      let curRow = []
      let j = 0;
      for (; j < curWord.length; j++) {
        curRow.push(<Tile letter={curWord[j]} color="gray"></Tile>)
      }
      for (; j < len; j++) {
        curRow.push(<Tile letter="_" color="gray"></Tile>)
      }
      tiles.push(<div id={i}>{curRow}</div>)
      i++;
      for (; i < maxTries; i++) {
        let row = []
        for (let j = 0; j < len; j++) {
          row.push(<Tile letter="_" color="gray"></Tile>)
        }
        tiles.push(<div id={i}>{row}</div>)
      }
    }
    return <div>{tiles}</div>
  }

  function renderDone() {
    if (solved) {
      return <p>Congratulations!</p>
    }
    if (completeWords.length === maxTries) {
      const text = "Fail :( the secret word was " + answer + "."
      return <p>{text}</p>
    }
    return <p></p>
  }

  return <div>{renderBoard()}{renderDone()}</div>
}

export default Board;