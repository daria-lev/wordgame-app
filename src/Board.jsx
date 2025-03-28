import { useState, useEffect } from 'react'
import './App.css'
import Tile from './LetterTile.jsx'
import useKeyPress from './useKeyPress.jsx'

function Board() {
  const [completeWords, setComplete] = useState([])
  const [results, setResults] = useState([])
  const [curWord, setWord] = useState([])
  let len = 5
  let maxTries = 6
  const answer = "catto".toUpperCase()
  const pressed = useKeyPress()

  useEffect(() => {
    if (pressed) {
      if (pressed === 'Enter') {
        if (curWord.length === len) {
          let comp = [...completeWords]
          comp.push(curWord)
          setComplete(comp)
          let res = [...results]
          res.push(getResults(curWord))
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

  function getResults(word) { //swappable for different versions?
    let colors = []
    for (let i = 0; i < len; i++) {
      if (word[i] === answer.charAt(i)) {
        colors.push("green")
        console.log(word[i] + " matches " + answer.charAt(i))
      } else if (answer.includes(word[i])) {
        console.log(answer + " includes " + word[i])
        let ansCount = 0
        let tryCount = 0
        for (let j = 0; j < len; j++) {
          if (word[j] === word[i]) {tryCount++}
          if (answer.charAt(j) === word[i]) {ansCount++}
        }
        if (tryCount <= ansCount) {colors.push("yellow")}
        else (colors.push("gray"))
      } else {
        console.log(word[i] + " not matches " + answer.charAt(i))
        colors.push("gray")
      }
    }
    return colors
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

  return <div>{renderBoard()}</div>
}

export default Board;