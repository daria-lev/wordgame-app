import { useState} from 'react'
import './App.css'
import Board from './Board'

function Distance() {
  const [dists, setDists] = useState([])

  function getResults(word, answer) {
    let len = answer.length
    let colors = []
    let dTable = new Array(len+1)
    for (let i = 0; i < len; i++) {
      colors.push("gray")
      dTable[i] = new Array(len+1)
    }
    dTable[len] = new Array(len+1)
    for (let i = 0; i < len+1; i++) {
      dTable[i][0] = i
      dTable[0][i] = i
    }
    for (let i = 1; i < len+1; i++) {
      for (let j = 1; j < len+1; j++) {
        if (word[i-1] === answer.charAt(j-1)) {
          dTable[i][j] = dTable[i-1][j-1]
        } else {
          dTable[i][j] = Math.min(dTable[i-1][j], dTable[i][j-1], dTable[i-1][j-1])+1
        }
      }
    }
    console.log(word.join(""), answer)
    console.log(dTable)
    let dNew = [...dists]
    dNew.push(dTable[len][len])
    setDists(dNew)
    return colors
  }

  return (
    <Board resultFunc={getResults} tries={6} end={dists}></Board>
  )
}

export default Distance;