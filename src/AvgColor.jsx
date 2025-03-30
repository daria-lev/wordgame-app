import './App.css'
import Board from './Board'

function AvgColor() {
  const rgbVals = {
    "gray" : [128,128,128],
    "green" : [0,128,0],
    "yellow" : [255,255,0]
  }

  function getResults(word, answer) {
    let len = answer.length
    let colors = []
    let countMap = new Map()
    for (let i = 0; i < len; i++) {
      if (countMap.has(answer.charAt(i))) {
        countMap.set(answer.charAt(i), countMap.get(answer.charAt(i))+1)
      } else {
        countMap.set(answer.charAt(i), 1)
      }
    }
    for (let i = 0; i < len; i++) {
      if (word[i] === answer.charAt(i)) {
        colors.push("green")
        countMap.set(word[i], countMap.get(word[i])-1)
        //console.log(word[i] + " matches " + answer.charAt(i))
      } else {
        colors.push("gray")
      }
    }
    //console.log(countMap)
    for (let i = 0; i < len; i++) {
      if (colors[i] !== "green") {
        if (countMap.has(word[i]) && countMap.get(word[i]) > 0) {
          colors[i] = "yellow"
          countMap.set(word[i], countMap.get(word[i])-1)
        }
      }
    }
    let output = []
    let avgColor = calculateColor(colors)
    for (let i = 0; i < len; i++) {
      output.push(avgColor)
    }
    return output
  }

  function calculateColor(colors) {
    let len = colors.length
    let rgbs = [0,0,0]
    for (let i = 0; i < len; i++) {
      let curAdd = rgbVals[colors[i]]
      for (let j = 0; j < 3; j++) {
        rgbs[j] += curAdd[j]
      }
    }
    for (let j = 0; j < 3; j++) {
      rgbs[j] = Math.round(rgbs[j] / len)
    }
    return `rgb(${rgbs[0]}, ${rgbs[1]}, ${rgbs[2]})`
   }

  return (
    <Board resultFunc={getResults} tries={8}></Board>
  )
}

export default AvgColor;