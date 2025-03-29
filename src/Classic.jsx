import { useState, useEffect } from 'react'
import './App.css'
import Board from './Board'

function Classic() {

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
    return colors
  }

  return (
    <Board resultFunc={getResults}></Board>
  )
}

export default Classic;